import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();

  const finish = () => {
    completeOnboarding();
    navigate("/", { replace: true });
  };

  const skip = () => {
    if (import.meta.env.DEV) {
      localStorage.setItem("DEV_ONBOARDING_DONE", "1");
      finish();
    }
  };

  return (
    <main className="min-h-[100dvh] grid place-items-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="sr-only">Onboarding</h1>
          <CardTitle>Onboarding</CardTitle>
          <CardDescription>Let’s personalize your experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section className="space-y-2">
            <h2 className="text-lg font-semibold">Step {step} of 3</h2>
            <p className="text-muted-foreground">This is a placeholder step. Design your fields here.</p>
          </section>
          <div className="flex gap-2">
            {step < 3 ? (
              <Button className="flex-1" onClick={() => setStep((s) => s + 1)}>Next</Button>
            ) : (
              <Button className="flex-1" onClick={finish}>Finish</Button>
            )}
            {import.meta.env.DEV && (
              <Button variant="ghost" className="flex-1" onClick={skip}>Skip for now (dev)</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
