import os
import json
import instructor
from openai import OpenAI
from pydantic import BaseModel, Field
from typing import List
from dotenv import load_dotenv

load_dotenv()

# --- 1. DEMO INSURANCE (The Safety Net) ---
# If AI fails, we return this. It uses standard SQL that works on ANY data.
FALLBACK_INSIGHTS = [
    {
        "title": "Total Events Tracked",
        "sql_query": "SELECT count(*) FROM analytics_events WHERE project_id = :project_id"
    },
    {
        "title": "Activity by Event Name",
        "sql_query": "SELECT event_name, count(*) FROM analytics_events WHERE project_id = :project_id GROUP BY 1 ORDER BY 2 DESC LIMIT 5"
    }
]

# --- 2. DATA STRUCTURE ---
class Insight(BaseModel):
    title: str = Field(..., description="Short title (e.g., 'Daily Active Users')")
    sql_query: str = Field(..., description="PostgreSQL JSONB query. MUST use :project_id parameter.")

class DashboardConfig(BaseModel):
    insights: List[Insight]

# --- 3. SETUP CLIENT ---
client = instructor.from_openai(
    OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=os.getenv("OPENROUTER_API_KEY"),
        default_headers={
            "HTTP-Referer": "http://localhost:8000",
            "X-Title": "DeltaHacks Analytics",
        }
    ),
    mode=instructor.Mode.JSON
)

MODEL = os.getenv("AI_MODEL", "google/gemini-2.0-flash-thinking-exp:free")

def generate_insights(project_name: str, project_description: str, sample_events: list) -> List[dict]:
    """
    Tries to get smart insights from AI. If it fails, returns Safe Mode insights.
    """
    print(f"AI Engine: Analyzing {len(sample_events)} events...")

    # If no data exists yet, the AI will hallucinate. Return fallback immediately.
    if not sample_events:
        print("No events found. Returning fallback.")
        return FALLBACK_INSIGHTS

    data_preview = json.dumps(sample_events, indent=2)

    system_prompt = f"""
    You are a Data Architect.
    CONTEXT: {project_name} - {project_description}
    TABLE: analytics_events (event_name, properties)
    SAMPLE DATA: {data_preview}
    RULES: Use PostgreSQL JSONB. Always filter by project_id = :project_id.
    """

    try:
        response = client.chat.completions.create(
            model=MODEL,
            response_model=DashboardConfig,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": "Generate 3-4 interesting insights."}
            ],
            max_retries=2, 
        )
        
        print("AI Success! Returning generated insights.")
        return [insight.model_dump() for insight in response.insights]
        
    except Exception as e:
        # --- THE SAFETY NET ---
        print(f"AI FAILED: {e}")
        return FALLBACK_INSIGHTS