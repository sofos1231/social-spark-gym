import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

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

  const devSkip = () => {
    if (import.meta.env.DEV) {
      login();
      navigate("/", { replace: true });
    }
  };

  return (
    <main className="min-h-[100dvh] grid place-items-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <h1 className="sr-only">Login</h1>
          <CardTitle>Login</CardTitle>
          <CardDescription>Access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <Button type="submit" className="w-full" disabled={isSubmitting}>Sign in</Button>
            <p className="text-sm text-muted-foreground text-center">
              Don&apos;t have an account? <Link to="/auth/signup" className="story-link">Create one</Link>
            </p>
            {import.meta.env.DEV && (
              <Button type="button" variant="ghost" className="w-full" onClick={devSkip}>
                Skip for now (dev)
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
