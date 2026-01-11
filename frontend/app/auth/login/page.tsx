import { Command } from "lucide-react";
import { LoginForm } from "@/components/login-form";
import Logo from "@/components/ui/Logo";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-background font-mono text-white">
      {/* Left Side: Form */}
      <div className="flex flex-col gap-4 p-6 md:p-10 border-r-2 border-secondary/20">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
        {/* Footer detail for character */}
        <div className="text-[10px] uppercase opacity-30 text-center md:text-left">
          Terminal_ID: 882-Alpha // Secure_Session_Active
        </div>
      </div>

      {/* Right Side: System Visual */}
      <div className="bg-muted relative hidden lg:flex items-center justify-center overflow-hidden">
        {/* Dot Grid Background */}
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 p-12 border-2 border-white/10 bg-black/40 backdrop-blur-sm max-w-md">
          <div className="space-y-4">
            <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">
              // Authorization_Required
            </span>
            <h2 className="text-4xl font-black uppercase italic leading-none">
              Access the <br />{" "}
              <span className="text-white">Analytics_Engine</span>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed">
              Please authenticate to access the global data streams and AI
              processing units. Unauthorized access attempts are logged.
            </p>
          </div>
          {/* Decorative "Loading" Bars */}
          <div className="mt-8 space-y-2">
            {[70, 45, 90].map((width, i) => (
              <div key={i} className="h-1 bg-secondary/20 w-full">
                <div
                  className="h-full bg-secondary"
                  style={{ width: `${width}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
