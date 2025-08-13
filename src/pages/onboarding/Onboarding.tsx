import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowRight, MessageSquare, BarChart3, Users, CheckCircle2, X } from "lucide-react";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [swipeDemo, setSwipeDemo] = useState(false);
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();

  const finish = () => {
    completeOnboarding();
    navigate("/", { replace: true });
  };

  const skip = () => {
    finish();
  };

  const goals = [
    { id: "confidence", icon: MessageSquare, title: "Build Confidence", desc: "Overcome social anxiety" },
    { id: "speaking", icon: Users, title: "Public Speaking", desc: "Master presentations" },
    { id: "networking", icon: BarChart3, title: "Networking", desc: "Connect professionally" }
  ];

  const handleSwipeDemo = () => {
    setSwipeDemo(true);
    setTimeout(() => setSwipeDemo(false), 2000);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 text-center">
            <div className="space-y-3">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Train to succeed socially</h1>
              <p className="text-muted-foreground">Practice real conversations and build confidence where it matters most.</p>
            </div>
            
            <div className="relative">
              <div className={`bg-gradient-to-br from-background to-muted/50 border border-border/50 rounded-xl p-4 transition-transform duration-300 ${swipeDemo ? 'scale-95 opacity-70' : 'scale-100'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium text-sm">Practice Scenario</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">"You're at a networking event. How do you start a conversation with someone new?"</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">👋 "Hi there!"</Button>
                  <Button size="sm" variant="outline" className="flex-1">💼 "Great event!"</Button>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-3 text-primary hover:text-primary/80"
                onClick={handleSwipeDemo}
              >
                Try interactive demo →
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 text-center">
            <div className="space-y-3">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Track your social growth</h1>
              <p className="text-muted-foreground">See your confidence build with personalized stats and streaks.</p>
            </div>
            
            <div className="bg-gradient-to-br from-background to-muted/50 border border-border/50 rounded-xl p-4">
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">12</div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">340</div>
                  <div className="text-xs text-muted-foreground">XP Earned</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">86%</div>
                  <div className="text-xs text-muted-foreground">Confidence</div>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full">
                <div className="h-2 bg-gradient-to-r from-primary to-primary/60 rounded-full w-[86%]"></div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 text-center">
            <div className="space-y-3">
              <h1 className="text-xl font-bold text-foreground">What's your main goal?</h1>
              <p className="text-muted-foreground text-sm">Choose what you'd like to focus on first</p>
            </div>
            
            <div className="space-y-3">
              {goals.map((goal) => {
                const Icon = goal.icon;
                const isSelected = selectedGoal === goal.id;
                return (
                  <button
                    key={goal.id}
                    onClick={() => setSelectedGoal(goal.id)}
                    className={`w-full p-4 rounded-xl border transition-all duration-200 text-left ${
                      isSelected 
                        ? 'border-primary bg-primary/10 shadow-md' 
                        : 'border-border hover:border-primary/50 bg-background'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{goal.title}</div>
                        <div className="text-xs text-muted-foreground">{goal.desc}</div>
                      </div>
                      {isSelected && <CheckCircle2 className="h-5 w-5 text-primary" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-[100dvh] flex items-center justify-center px-4 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="w-full max-w-md">
        {/* Progress */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                  i <= step ? 'bg-primary' : 'bg-muted'
                }`}
                style={{ width: '60px' }}
              />
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={skip}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Skip
          </Button>
        </div>

        {/* Content */}
        <Card className="border-border/50 shadow-lg">
          <CardContent className="p-6">
            {renderStep()}
            
            {/* Navigation */}
            <div className="flex gap-3 pt-6">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="flex-1"
                >
                  Back
                </Button>
              )}
              
              <Button
                onClick={step === 3 ? finish : () => setStep(step + 1)}
                disabled={step === 3 && !selectedGoal}
                className="flex-1"
              >
                {step === 3 ? (
                  <>Start Training <ArrowRight className="h-4 w-4 ml-1" /></>
                ) : (
                  <>Next <ArrowRight className="h-4 w-4 ml-1" /></>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}