import { Terminal } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { SignUpForm } from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-background font-mono text-white">
      {/* Right Side (Visual) - Swapped for variety or kept for symmetry */}
      <div className="bg-muted relative hidden lg:flex items-center justify-center overflow-hidden border-r-2 border-secondary/20">
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 w-full max-w-md p-8 border-2 border-white/10 bg-black/60 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-6 text-secondary">
            <Terminal size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Initialization_Log
            </span>
          </div>

          <div className="space-y-3 text-[11px] uppercase font-bold text-white/40">
            <p className="text-green-500">[OK] Mounting_Data_Drives...</p>
            <p className="text-green-500">
              [OK] Establishing_Secure_Handshake...
            </p>
            <p className="text-white/60">
              [WAIT] Awaiting_User_Input_Identity...
            </p>
            <p className="animate-pulse">_ Generating_System_UUID...</p>
            <div className="pt-4 border-t border-white/10 mt-4">
              <h2 className="text-3xl font-black text-white italic leading-10 mb-4">
                Join the <br />{" "}
                <span className="bg-white text-black px-2">Intelligence</span>{" "}
                Network.
              </h2>
              <p className="text-sm leading-relaxed lowercase">
                // start your journey with 10k+ agents processing 1.2pb of data
                daily.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Left Side (Form) */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-end">
          <Logo />
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <SignUpForm />
          </div>
        </div>

        <div className="text-[10px] uppercase opacity-30 text-center md:text-right">
          Build_772-Omega // Node_Pending
        </div>
      </div>
    </div>
  );
}
