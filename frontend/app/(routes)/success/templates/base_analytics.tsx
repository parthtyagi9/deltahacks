import React, { useState } from "react";

// 1. The Data
const PIZZA_METRICS = [
  {
    name: "Revenue per Order",
    description: "Average spend per order (Dine-in vs Delivery).",
  },
  {
    name: "Delivery Time",
    description: "Time from order placement to doorstep.",
  },
  {
    name: "Customer Acquisition Cost (CAC)",
    description: "Cost to acquire a new customer.",
  },
  {
    name: "Customer Retention Rate",
    description: "Percentage of repeat customers.",
  },
  {
    name: "Food Cost Percentage",
    description: "Cost of ingredients vs revenue.",
  },
];

// 2. The Hardcoded Snippet Generator
const generateHardcodedSDK = () => {
  return `
<script src="https://cdn.pizzalytics.com/v1/sdk.js"></script>
<script>
  // Initializing Pizza Shop Analytics
  window.Pizzalytics.init({
    projectId: "PIZZA_SHOP_DEMO_001",
    autoTrack: true,
    activeMetrics: [
      "Revenue per Order",
      "Delivery Time",
      "Customer Acquisition Cost (CAC)",
      "Customer Retention Rate",
      "Food Cost Percentage"
    ],
    onReady: () => {
      console.log("Pizza Analytics is live! Tracking 5 metrics.");
    }
  });
</script>`.trim();
};

export const SDKDisplay: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const sdkCode = generateHardcodedSDK();

  const handleCopy = () => {
    navigator.clipboard.writeText(sdkCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Your Analytics SDK
          </h2>
          <p className="text-sm text-slate-500">
            Copy this into your HTML &lt;head&gt; tag.
          </p>
        </div>
        <button
          onClick={handleCopy}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            copied
              ? "bg-green-600 text-white"
              : "bg-slate-900 text-white hover:bg-slate-800"
          }`}
        >
          {copied ? "Copied!" : "Copy Snippet"}
        </button>
      </div>

      {/* Visual Metric Preview */}
      <div className="grid grid-cols-1 gap-2 mb-6">
        {PIZZA_METRICS.map((m) => (
          <div
            key={m.name}
            className="px-3 py-2 bg-white border border-slate-200 rounded-md flex items-center gap-2"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-xs font-mono text-slate-700 font-bold">
              {m.name}
            </span>
          </div>
        ))}
      </div>

      {/* The Code Box */}
      <div className="relative">
        <pre className="p-5 bg-slate-900 text-blue-300 rounded-xl overflow-x-auto font-mono text-xs leading-relaxed border border-slate-700">
          <code>{sdkCode}</code>
        </pre>
      </div>
    </div>
  );
};
