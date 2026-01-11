"use client";

import { useState, useRef, useEffect } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import {
  Send,
  Plus,
  MessageCircle,
  Database,
  Terminal,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { schema } from "@/lib/schema";
import { useRouter } from "next/navigation";

// Helper for UI-only message state
type UIMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState<UIMessage[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [loadingDone, setLoadingDone] = useState(false);
  const router = useRouter();

  // useObject handles the structured data stream for the main workspace
  const { object, submit, isLoading } = useObject({
    api: "/api/chat",
    schema: schema,
    onFinish({ object }) {
      // When the object finishes streaming, push the verbal response to the chat sidebar
      if (object?.schema) {
        setChatHistory((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content: object.schema.response,
          },
        ]);
      }
    },
  });

  const handleDone = async () => {
    if (object?.schema) {
      setLoadingDone(true);
      const targetObject = object.schema;
      localStorage.setItem("queries", JSON.stringify(targetObject.queries));
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push("/success");
    }
  };

  // Auto-scroll chat sidebar
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chatHistory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: UIMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };
    setChatHistory((prev) => [...prev, userMsg]);

    // Pass history to the object streamer
    submit([...chatHistory, userMsg]);
    setInput("");
  };

  return (
    <div className="flex h-screen w-full bg-background text-white font-mono overflow-hidden">
      {/* --- SIDEBAR: CHAT LOG --- */}
      <aside className="w-[400px] h-screen border-r-2 border-secondary flex flex-col bg-card/50">
        <div className="h-16 shrink-0 p-4 border-b-2 border-secondary flex items-center justify-between bg-card">
          <span className="text-base font-bold uppercase tracking-widest">
            Analyst_Log
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setChatHistory([])}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1 min-h-0 w-full">
          {chatHistory.length > 0 ? (
            <div className="p-4 space-y-6">
              {chatHistory.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col gap-2 ${
                    m.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <span className="text-[10px] font-bold opacity-40 uppercase tracking-tighter">
                    {m.role === "user" ? "[USER]" : "[SYSTEM]"}
                  </span>
                  <div
                    className={`p-4 border-2 max-w-[90%] text-sm ${
                      m.role === "user"
                        ? "bg-secondary text-black border-secondary"
                        : "bg-card border-secondary"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} className="h-1" />
            </div>
          ) : (
            <div className="flex-1 flex h-full flex-col items-center justify-center opacity-20">
              <MessageCircle className="size-12 mb-4" />
              <p className="text-xs uppercase font-bold italic text-center">
                // NO_ACTIVE_SESSION
              </p>
            </div>
          )}
        </ScrollArea>

        <div className="shrink-0 p-4 border-t-2 border-secondary bg-card">
          <form onSubmit={handleSubmit} className="relative group">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Input query parameters..."
              className="bg-background border-2 border-secondary h-12 pr-14"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="absolute right-0 top-0 bottom-0 h-12 w-12 bg-secondary text-black hover:bg-white transition-colors"
            >
              {isLoading ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </form>
        </div>
      </aside>

      {/* --- MAIN: WORKSPACE (ACCORDIONS) --- */}
      <main className="flex-1 flex flex-col h-full bg-[#050505]">
        <nav className="flex items-center justify-between px-8 h-16 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-3 text-secondary">
            <Database size={18} />
            <span className="text-sm font-bold uppercase tracking-[0.2em]">
              Data_Insights_Engine
            </span>
          </div>
          <Button
            className="bg-white text-black font-bold uppercase text-xs h-8 px-6 rounded-none hover:bg-secondary"
            onClick={handleDone}
          >
            Done
          </Button>
        </nav>

        <ScrollArea className="flex-1 p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Empty State */}
            {!object?.schema?.queries && !isLoading && (
              <div className="border-2 border-dashed border-white/10 p-20 flex flex-col items-center justify-center space-y-6">
                <Terminal size={48} className="opacity-10" />
                <p className="text-white/30 text-sm italic">
                  Waiting for system analysis command...
                </p>
              </div>
            )}

            {/* Structured Insights List */}
            {object?.schema?.queries && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-[2px] flex-1 bg-secondary/30" />
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">
                    Results_Generated
                  </span>
                  <div className="h-[2px] flex-1 bg-secondary/30" />
                </div>

                <Accordion type="multiple" className="w-full space-y-4">
                  {object.schema?.queries.map((query, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border-2 border-secondary bg-card p-2 px-4 transition-all hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)]"
                    >
                      <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex items-center gap-4 text-left">
                          <span className="text-[10px] font-mono text-secondary">
                            0{index + 1}
                          </span>
                          <span className="text-lg font-bold uppercase tracking-tight">
                            {query?.name || "Initializing..."}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pb-6 text-white/70 leading-relaxed font-sans border-t border-white/5 mt-2">
                        {query?.description || "Processing insight data..."}
                        <div className="mt-6 p-4 bg-black/50 border border-white/10 rounded flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-white/40 italic">
                            Query_Optimization: Active
                          </span>
                          <Button
                            variant="link"
                            className="text-secondary text-xs font-bold uppercase tracking-tighter p-0 h-auto"
                          >
                            Run Insight -&gt;
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}

            {/* Streaming Indicator */}
            {isLoading && !object?.schema?.queries && (
              <div className="flex flex-col items-center gap-4 py-20">
                <Loader2 className="animate-spin text-secondary" size={32} />
                <span className="text-xs uppercase tracking-widest opacity-40">
                  Compiling Analytics...
                </span>
              </div>
            )}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
