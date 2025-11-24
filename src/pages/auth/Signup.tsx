import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import ImmersiveBackground from "@/components/auth/ImmersiveBackground";
import eyeIllustration from "@/assets/eye-contact-illustration.jpg";
import speakingIllustration from "@/assets/public-speaking-illustration.jpg";
import groupIllustration from "@/assets/group-conversation-illustration.jpg";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Min 6 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    // Mock signup -> logged in
    login(data.email);
    toast({ title: "Account created!", description: "Let’s get you set up" });
    navigate("/onboarding", { replace: true });
  };

  const devSkip = () => {
    if (import.meta.env.DEV) {
      login();
      navigate("/practice-landing", { replace: true });
    }
  };

  // Page SEO
  useEffect(() => {
    document.title = "Create account – SocialGym";
    const desc = "Create your SocialGym account. Fast signup with email.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta); }
    meta.setAttribute('content', desc);
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'canonical'); document.head.appendChild(link); }
    link.setAttribute('href', window.location.href);
  }, []);

  return (
    <main className="relative min-h-[100dvh] flex items-center" style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {/* Cinematic background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <ImmersiveBackground
          images={[eyeIllustration, speakingIllustration, groupIllustration]}
          activeIndex={0}
        />
      </div>

      <section className="relative z-10 w-full px-6 py-8 sm:py-10">
        <div className="relative mx-auto w-full max-w-[420px] animate-slide-up">
          <div aria-hidden className="pointer-events-none absolute -inset-x-12 -top-24 h-48 rounded-full bg-[radial-gradient(closest-side,_hsl(var(--primary))/0.25,_transparent_70%)] blur-3xl opacity-30 -z-10" />
          {/* Brand emblem for consistency with Login */}
          <div className="brand-emblem brand-emblem--sg mx-auto mb-4 animate-scale-in" style={{ animationDelay: '120ms' }} aria-hidden>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l7 3v5c0 5-3.5 9.2-7 10-3.5-.8-7-5-7-10V5l7-3z" fill="white" opacity="0.95"/>
              <path d="M8.5 12.2c0-2.1 1.8-3.7 3.9-3.7 1 0 1.9.3 2.6.9l-1.1 1.5c-.4-.3-.9-.5-1.5-.5-1.1 0-2 .8-2 1.8 0 1.1.9 1.9 2 1.9.7 0 1.4-.3 1.8-.8V12h-2v-1.6h3.8v2.8c-.8 1.5-2.3 2.4-3.9 2.4-2.1 0-3.9-1.6-3.9-3.8z" fill="hsl(var(--background))"/>
            </svg>
          </div>

          {/* Heading */}
          <header className="text-center space-y-1">
            <h1 className="text-2xl font-bold leading-tight text-[hsl(var(--text-primary))]">Create account</h1>
            <p className="text-sm italic text-[hsl(var(--text-muted))]">Start your journey</p>
          </header>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" className="h-12 rounded-xl" {...register("email")} aria-invalid={!!errors.email} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" className="h-12 rounded-xl" {...register("password")} aria-invalid={!!errors.password} />
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>
            <Button type="submit" variant="brand" className="btn-hero-metal press-96 group w-full h-14 rounded-[18px]" disabled={isSubmitting}>Create account</Button>
            <div className="mt-3">
              <label htmlFor="consent" className="flex items-center gap-3 text-[hsl(var(--text-secondary))] cursor-pointer select-none">
                <Checkbox id="consent" aria-label="I agree to the terms" />
                <span className="text-sm">I agree to SocialGym's <Link to="/terms" className="story-link">Terms</Link> and acknowledge the <Link to="/privacy" className="story-link">Privacy Policy</Link>.</span>
              </label>
            </div>
            <p className="mt-4 text-sm text-[hsl(var(--text-muted))] text-center">
              Already have an account? <Link to="/auth/login" className="story-link">Sign in</Link>
            </p>
          </form>
        </div>
      </section>

      {import.meta.env.DEV && (
        <Button
          onClick={devSkip}
          className="fixed bottom-4 right-4 z-50 bg-red-500 hover:bg-red-600 text-white font-bold text-xs px-3 py-2 rounded-lg shadow-lg"
          size="sm"
        >
          DEV SKIP
        </Button>
      )}
    </main>
  );
}
