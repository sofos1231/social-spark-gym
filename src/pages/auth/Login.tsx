import React, { useEffect, useState } from "react";
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
import { X, Apple, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import OnboardingHeroCarousel from "@/components/auth/OnboardingHeroCarousel";


const schema = z.object({
  username: z.string().min(3, "Min 3 characters").optional(),
  email: z.string().email().optional(),
  password: z.string().min(6, "Min 6 characters"),
}).refine((data) => data.username || data.email, {
  message: "Username or email is required",
  path: ["username"],
});

type FormValues = z.infer<typeof schema>;

export default function Login() {
  const { login, onboardingDone } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    login(data.username || data.email);
    toast({ title: "Welcome back!", description: "Signed in successfully" });
    navigate(onboardingDone ? "/" : "/onboarding", { replace: true });
  };

  // Page SEO
  useEffect(() => {
    document.title = "Level Up – Sign in | SocialGym";
    const desc = "Sign in to SocialGym. Level up fast with Google, Apple, or Email.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', desc);
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', window.location.href);
  }, []);

  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState<null | 'google' | 'apple' | 'email'>(null);
  const [errorProvider, setErrorProvider] = useState<null | 'google' | 'apple'>(null);
  const [showEmailForm, setShowEmailForm] = useState(false);

  const handleProvider = async (provider: 'google' | 'apple') => {
    if (!consent) {
      toast({ title: 'Please agree to continue', description: 'You must accept the terms to continue.' });
      return;
    }
    setLoading(provider);
    setErrorProvider(null);
    await new Promise((r) => setTimeout(r, 800));
    setErrorProvider(provider);
    toast({ title: 'Coming soon', description: `${provider === 'apple' ? 'Apple' : 'Google'} sign-in isn\'t connected yet.`});
    setLoading(null);
  };

  const handleEmailContinue = () => {
    if (!consent) {
      toast({ title: 'Please agree to continue', description: 'You must accept the terms to continue.' });
      return;
    }
    setShowEmailForm(true);
  };

  const onClose = () => {
    navigate("/", { replace: true });
  };

  const devSkip = () => {
    if (import.meta.env.DEV) {
      login();
      navigate("/", { replace: true });
    }
  };

  return (
    <main
      className="relative min-h-[100dvh] flex items-end"
      style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* Cinematic background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div className="hero-bg" />
        <div className="hero-spotlight" />
        <div className="hero-noise" />
        <div className="hero-particles" />
      </div>

      {/* Content */}
      <section className="relative z-10 w-full px-6 pb-8 sm:pb-10">
        <div className="relative mx-auto w-full max-w-none px-6 sm:px-8 py-8 animate-slide-up" role="dialog" aria-labelledby="signin-title">
          <div aria-hidden className="pointer-events-none absolute -inset-x-12 -top-24 h-48 rounded-full bg-[radial-gradient(closest-side,_hsl(var(--primary))/0.25,_transparent_70%)] blur-3xl opacity-30 -z-10" />
          {/* Close */}
          <button
            type="button"
            aria-label="Close"
            className="glass-chip absolute right-3 top-3 hover-scale focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>

          {/* Brand emblem */}
          <div className="brand-emblem brand-emblem--sg mx-auto mb-4 animate-scale-in" style={{ animationDelay: '120ms' }}>
            {/* Shield glyph */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 2l7 3v5c0 5-3.5 9.2-7 10-3.5-.8-7-5-7-10V5l7-3z" fill="white" opacity="0.95"/>
              <path d="M8.5 12.2c0-2.1 1.8-3.7 3.9-3.7 1 0 1.9.3 2.6.9l-1.1 1.5c-.4-.3-.9-.5-1.5-.5-1.1 0-2 .8-2 1.8 0 1.1.9 1.9 2 1.9.7 0 1.4-.3 1.8-.8V12h-2v-1.6h3.8v2.8c-.8 1.5-2.3 2.4-3.9 2.4-2.1 0-3.9-1.6-3.9-3.8z" fill="hsl(var(--background))"/>
            </svg>
          </div>

          {/* Heading */}
          <header className="text-center space-y-1">
            <h1 id="signin-title" className="text-2xl font-bold leading-tight text-[hsl(var(--text-primary))]">
              Level Up
            </h1>
            <p className="text-sm italic text-[hsl(var(--text-muted))]">Enter SocialGym</p>
          </header>

          {/* Onboarding carousel */}
          <OnboardingHeroCarousel />

          {/* Social buttons */}
          <div className="mt-6 space-y-4" aria-label="Sign in options">
            <Button
              type="button"
              variant="brand"
              className="btn-hero-metal press-96 group w-full h-14 rounded-[18px] justify-start px-4 animate-slide-up"
              onClick={() => handleProvider('google')}
              disabled={!!loading}
              style={{ animationDelay: '180ms' }}
              aria-label="Continue with Google"
            >
              <span className="mr-3 grid place-items-center rounded-lg bg-white/10 p-2" aria-hidden>
                {/* Google G */}
                <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden>
                  <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.6 6.4 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"/>
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.6 6.4 29.6 4 24 4 16.1 4 9.2 8.3 6.3 14.7z"/>
                  <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.1 35.4 26.7 36 24 36c-5.2 0-9.6-3.4-11.2-8.1l-6.6 5.1C9.1 39.7 16 44 24 44z"/>
                  <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.2 3.5-4.3 6.2-8.3 6.2-5.2 0-9.6-3.4-11.2-8.1l-6.6 5.1C9.1 39.7 16 44 24 44c8 0 14.8-5.1 17.2-12.3 0-1.2.4-2.3.4-3.7 0-1.2-.1-2.3-.4-3.5z"/>
                </svg>
              </span>
              <span className="flex-1 text-left font-semibold">Continue with Google</span>
              {loading === 'google' && (
                <span className="ml-auto inline-flex h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
              )}
            </Button>
            {errorProvider === 'google' && (
              <p className="text-xs text-destructive">Google sign-in failed. Please try again.</p>
            )}

            <Button
              type="button"
              variant="brand"
              className="btn-hero-metal press-96 group w-full h-14 rounded-[18px] justify-start px-4 animate-slide-up"
              onClick={() => handleProvider('apple')}
              disabled={!!loading}
              style={{ animationDelay: '240ms' }}
              aria-label="Continue with Apple"
            >
              <span className="mr-3 grid place-items-center rounded-lg bg-white/10 p-2" aria-hidden>
                <Apple className="h-5 w-5" />
              </span>
              <span className="flex-1 text-left font-semibold">Continue with Apple</span>
              {loading === 'apple' && (
                <span className="ml-auto inline-flex h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
              )}
            </Button>
            {errorProvider === 'apple' && (
              <p className="text-xs text-destructive">Apple sign-in failed. Please try again.</p>
            )}

            <Button
              type="button"
              variant="brand"
              className="btn-hero-metal press-96 group w-full h-14 rounded-[18px] justify-start px-4 animate-slide-up"
              onClick={handleEmailContinue}
              disabled={!!loading}
              style={{ animationDelay: '300ms' }}
              aria-label="Continue with Email"
            >
              <span className="mr-3 grid place-items-center rounded-lg bg-white/10 p-2" aria-hidden>
                <Mail className="h-5 w-5" />
              </span>
              <span className="flex-1 text-left font-semibold">Continue with Email</span>
              {loading === 'email' && (
                <span className="ml-auto inline-flex h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
              )}
            </Button>
          </div>

          {/* Username/Password form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" aria-label="Username and password sign in">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="text" placeholder="yourname" {...register("username")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-inline">Password</Label>
              <Input id="password-inline" type="password" placeholder="••••••••" {...register("password")} aria-invalid={!!errors.password} />
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full h-12 rounded-xl">Sign in</Button>
          </form>

          {/* Consent */}
          <div className="mt-4">
            <label htmlFor="consent" className="flex items-center gap-3 text-[hsl(var(--text-secondary))] cursor-pointer select-none">
              <Checkbox id="consent" checked={consent} onCheckedChange={(v) => setConsent(Boolean(v))} aria-label="I agree to the terms" />
              <span className="text-sm">I agree to SocialGym's <Link to="/terms" className="story-link">Terms</Link> and acknowledge the <Link to="/privacy" className="story-link">Privacy Policy</Link>.</span>
            </label>
          </div>


          {/* Footer */}
          <p className="mt-6 text-center text-sm text-[hsl(var(--text-muted))]">
            Already have an account?{' '}
            <Link to="/auth/login" className="story-link">Sign in</Link>
          </p>

          {import.meta.env.DEV && (
            <Button type="button" variant="ghost" className="w-full mt-6" onClick={devSkip}>
              Skip for now (dev)
            </Button>
          )}
        </div>
      </section>
    </main>
  );
}
