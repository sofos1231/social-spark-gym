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
import authBg from "@/assets/auth-bg.jpg";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Min 6 characters"),
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
    login(data.email);
    toast({ title: "Welcome back!", description: "Signed in successfully" });
    navigate(onboardingDone ? "/" : "/onboarding", { replace: true });
  };

  // Page SEO
  useEffect(() => {
    document.title = "Sign in – PetCare Social Login";
    const desc = "Sign in to PetCare with Google, Apple, or Email. Fast, secure, and premium UX.";
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
      className="relative min-h-[100dvh] grid place-items-center"
      style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* Background image */}
      <img
        src={authBg}
        alt="Happy person with their dog, soft light"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Overlay gradient & subtle vignette */}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            'linear-gradient(to bottom, hsl(0 0% 0% / 0.45), hsl(0 0% 0% / 0.6)), radial-gradient(60% 40% at 50% 30%, hsl(var(--primary) / 0.10), transparent 60%)',
        }}
      />

      {/* Content */}
      <section className="relative z-10 w-full px-6">
        <div className="mx-auto w-full max-w-[360px] glass-card rounded-2xl p-6 sm:p-7 animate-slide-up" role="dialog" aria-labelledby="signin-title">
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
          <div className="brand-emblem mx-auto mb-4 animate-scale-in" style={{ animationDelay: '120ms' }}>
            {/* Paw glyph */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 13c-3 0-6 1.5-6 4 0 1.657 1.79 3 4 3h4c2.21 0 4-1.343 4-3 0-2.5-3-4-6-4z" fill="white"/>
              <circle cx="6.5" cy="8" r="2" fill="white"/>
              <circle cx="12" cy="6.5" r="2.2" fill="white"/>
              <circle cx="17.5" cy="8" r="2" fill="white"/>
              <circle cx="9.5" cy="10.5" r="1.6" fill="white"/>
              <circle cx="14.5" cy="10.5" r="1.6" fill="white"/>
            </svg>
          </div>

          {/* Heading & legal */}
          <header className="text-center space-y-2">
            <h1 id="signin-title" className="text-2xl font-semibold leading-tight text-[hsl(var(--text-primary))]">
              Take care of your beloved
              <br />
              Pet
            </h1>
            <p className="text-sm text-[hsl(var(--text-muted))]">
              By continuing, you agree to our{' '}
              <Link to="#" className="story-link">User Agreement</Link> and{' '}
              <Link to="#" className="story-link">Privacy Policy</Link>.
            </p>
          </header>

          {/* Social buttons */}
          <div className="mt-5 space-y-3" aria-label="Sign in options">
            {/* Google */}
            <Button
              type="button"
              className="w-full h-14 rounded-2xl justify-start px-4 active:scale-95"
              onClick={() => handleProvider('google')}
              disabled={!!loading}
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
              <span className="flex-1 text-left">Continue with Google</span>
              {loading === 'google' && (
                <span className="ml-auto inline-flex h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
              )}
            </Button>
            {errorProvider === 'google' && (
              <p className="text-xs text-destructive">Google sign-in failed. Please try again.</p>
            )}

            {/* Apple */}
            <Button
              type="button"
              className="w-full h-14 rounded-2xl justify-start px-4 active:scale-95"
              onClick={() => handleProvider('apple')}
              disabled={!!loading}
            >
              <span className="mr-3 grid place-items-center rounded-lg bg-white/10 p-2" aria-hidden>
                <Apple className="h-5 w-5" />
              </span>
              <span className="flex-1 text-left">Continue with Apple</span>
              {loading === 'apple' && (
                <span className="ml-auto inline-flex h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
              )}
            </Button>
            {errorProvider === 'apple' && (
              <p className="text-xs text-destructive">Apple sign-in failed. Please try again.</p>
            )}

            {/* Email */}
            <Button
              type="button"
              className="w-full h-14 rounded-2xl justify-start px-4 active:scale-95"
              onClick={handleEmailContinue}
              disabled={!!loading}
            >
              <span className="mr-3 grid place-items-center rounded-lg bg-white/10 p-2" aria-hidden>
                <Mail className="h-5 w-5" />
              </span>
              <span className="flex-1 text-left">Continue with Email</span>
              {loading === 'email' && (
                <span className="ml-auto inline-flex h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
              )}
            </Button>
          </div>

          {/* Consent */}
          <div className="mt-4">
            <label htmlFor="consent" className="flex items-center gap-3 text-[hsl(var(--text-secondary))] cursor-pointer select-none">
              <Checkbox id="consent" checked={consent} onCheckedChange={(v) => setConsent(Boolean(v))} aria-label="I agree to the terms" />
              <span className="text-sm">I agree to the Terms and acknowledge the Privacy Policy.</span>
            </label>
          </div>

          {/* Email form (revealed) */}
          {showEmailForm && (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4" aria-label="Email sign in form">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" {...register("email")} aria-invalid={!!errors.email} />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" {...register("password")} aria-invalid={!!errors.password} />
                {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full">Sign in</Button>
            </form>
          )}

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-[hsl(var(--text-muted))]">
            New to PetCare?{' '}
            <Link to="/auth/signup" className="story-link">Create an account</Link>
          </p>

          {import.meta.env.DEV && (
            <Button type="button" variant="ghost" className="w-full mt-3" onClick={devSkip}>
              Skip for now (dev)
            </Button>
          )}
        </div>
      </section>
    </main>
  );
}
