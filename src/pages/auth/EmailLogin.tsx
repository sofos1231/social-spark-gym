import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { X } from "lucide-react";
import ImmersiveBackground from "@/components/auth/ImmersiveBackground";
import eyeIllustration from "@/assets/eye-contact-illustration.jpg";
import speakingIllustration from "@/assets/public-speaking-illustration.jpg";
import groupIllustration from "@/assets/group-conversation-illustration.jpg";

const schema = z
  .object({
    username: z.string().min(3, "Min 3 characters").optional(),
    email: z.string().email().optional(),
    password: z.string().min(6, "Min 6 characters"),
  })
  .refine((data) => data.username || data.email, {
    message: "Username or email is required",
    path: ["username"],
  });

type FormValues = z.infer<typeof schema>;

export default function EmailLogin() {
  const { login, onboardingDone } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [consent, setConsent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    if (!consent) {
      toast({ title: "Please agree to continue", description: "You must accept the terms to continue." });
      return;
    }
    login(data.username || data.email);
    toast({ title: "Welcome back!", description: "Signed in successfully" });
    navigate(onboardingDone ? "/" : "/onboarding", { replace: true });
  };

  useEffect(() => {
    document.title = "Email Sign in | SocialGym";
    const desc = "Sign in with email to enter SocialGym.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", window.location.href);
  }, []);

  const onClose = () => navigate("/auth/login");

  return (
    <main
      className="relative min-h-[100dvh] flex items-end"
      style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <ImmersiveBackground images={[eyeIllustration, speakingIllustration, groupIllustration]} activeIndex={0} />
      </div>

      <section className="relative z-10 w-full px-6 pb-8 sm:pb-10">
        <div className="relative mx-auto w-full max-w-none px-6 sm:px-8 py-8 animate-slide-up" role="dialog" aria-labelledby="email-title">
          <button
            type="button"
            aria-label="Back"
            className="glass-chip absolute right-3 top-3 hover-scale focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>

          <header className="text-center space-y-1">
            <h1 id="email-title" className="text-2xl font-bold leading-tight text-[hsl(var(--text-primary))]">
              Email sign in
            </h1>
            <p className="text-sm italic text-[hsl(var(--text-muted))]">Enter SocialGym</p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" aria-label="Username and password sign in">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="text" placeholder="yourname" {...register("username")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email (optional)</Label>
              <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" {...register("password")} aria-invalid={!!errors.password} />
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>

            <label htmlFor="consent" className="mt-2 flex items-center gap-3 text-[hsl(var(--text-secondary))] cursor-pointer select-none">
              <Checkbox id="consent" checked={consent} onCheckedChange={(v) => setConsent(Boolean(v))} aria-label="I agree to the terms" />
              <span className="text-sm">
                I agree to SocialGym's <Link to="/terms" className="story-link">Terms</Link> and acknowledge the <Link to="/privacy" className="story-link">Privacy Policy</Link>.
              </span>
            </label>

            <Button type="submit" className="w-full h-12 rounded-xl" disabled={!consent || isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>
      </section>

      {import.meta.env.DEV && (
        <Button
          onClick={() => {
            login();
            navigate("/practice-landing", { replace: true });
          }}
          className="fixed bottom-4 right-4 z-50 bg-red-500 hover:bg-red-600 text-white font-bold text-xs px-3 py-2 rounded-lg shadow-lg"
          size="sm"
        >
          DEV SKIP
        </Button>
      )}
    </main>
  );
}
