import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Github, ChevronRight } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-8", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
        <h1 className="text-3xl font-black uppercase tracking-tighter italic">
          Login_Account
        </h1>
        <p className="text-white/50 text-sm uppercase font-bold tracking-tight">
          Enter credentials to start session
        </p>
      </div>

      <div className="grid gap-6">
        {/* Email Field */}
        <div className="grid gap-2">
          <label
            htmlFor="email"
            className="text-xs font-bold uppercase text-secondary italic"
          >
            [User_Email]
          </label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            required
            className="rounded-none border-2 border-secondary bg-card focus-visible:ring-0 focus-visible:border-white transition-colors"
          />
        </div>

        {/* Password Field */}
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-xs font-bold uppercase text-secondary italic"
            >
              [Access_Key]
            </label>
            <a
              href="#"
              className="text-[10px] uppercase font-bold hover:text-white transition-colors underline underline-offset-4"
            >
              Forgot?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            className="rounded-none border-2 border-secondary bg-card focus-visible:ring-0 focus-visible:border-white transition-colors"
          />
        </div>

        {/* Primary Login Button (Pop-on-Hover) */}
        <Button
          type="submit"
          className="rounded-none h-12 bg-white text-black font-black uppercase border-2 border-white transition-all duration-200 
                     hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]
                     active:translate-x-0 active:translate-y-0 active:shadow-none"
        >
          Authorize_Access <ChevronRight size={18} className="ml-2" />
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-secondary/30" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold">
            <span className="bg-background px-2 text-secondary">
              Or_Continue_With
            </span>
          </div>
        </div>

        {/* Github Button (Secondary Boxy) */}
        <Button
          variant="outline"
          type="button"
          className="rounded-none h-12 border-2 border-secondary bg-transparent font-bold uppercase hover:bg-secondary hover:text-white transition-all"
        >
          <Github className="mr-2" size={18} />
          GitHub_OAuth
        </Button>
      </div>

      <p className="text-center text-[10px] uppercase font-bold text-white/40">
        New to the system?{" "}
        <Link
          href="/auth/register"
          className="text-white underline underline-offset-4 hover:text-secondary transition-colors"
        >
          Initialize_New_Account
        </Link>
      </p>
    </form>
  );
}
