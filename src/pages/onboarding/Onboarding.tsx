import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  MessageSquare, 
  BarChart3, 
  Users, 
  CheckCircle2, 
  X, 
  Flame,
  Star,
  Trophy,
  Zap,
  Heart,
  Briefcase,
  Mic,
  Handshake,
  Sparkles,
  Target
} from "lucide-react";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [experienceLevel, setExperienceLevel] = useState([50]);
  const [swipeDemo, setSwipeDemo] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({ streak: 0, xp: 0, confidence: 0, boldness: 0 });
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [cardSwiped, setCardSwiped] = useState(false);
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
    { id: "confidence", icon: Zap, title: "💪 Confidence", desc: "Overall social confidence boost" },
    { id: "dating", icon: Heart, title: "❤️ Dating", desc: "Improving romantic/social flirting skills" },
    { id: "interviews", icon: Briefcase, title: "💼 Job Interviews", desc: "Excelling in professional interviews" },
    { id: "speaking", icon: Mic, title: "🎤 Public Speaking", desc: "Becoming better at speaking to crowds" },
    { id: "networking", icon: Handshake, title: "🤝 Networking", desc: "Meeting and connecting with new people" }
  ];

  // Animate stats on step 3
  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        setAnimatedStats({ streak: 12, xp: 340, confidence: 86, boldness: 7 });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Handle demo answer selection
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setTimeout(() => {
      setFeedbackVisible(true);
    }, 500);
  };

  // Handle swipe demo
  const handleSwipeDemo = () => {
    setCardSwiped(true);
    setTimeout(() => {
      setCardSwiped(false);
    }, 2000);
  };

  // Get experience emoji
  const getExperienceEmoji = (level: number) => {
    if (level < 20) return "😅";
    if (level < 40) return "🙂";
    if (level < 60) return "😊";
    if (level < 80) return "😎";
    return "🏆";
  };

  const renderStep = () => {
    switch (step) {
      // Step 1: Welcome Screen
      case 1:
        return (
          <div className="space-y-6 text-center animate-fade-in">
            <div className="space-y-4">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center animate-scale-in shadow-2xl">
                <Sparkles className="h-10 w-10 text-white animate-pulse" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Train to Succeed Socially
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Practice real conversations. Build confidence where it matters most.
              </p>
            </div>
            
            <div className="relative mt-8">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-xl">
                <div className="text-center space-y-4">
                  <div className="text-6xl animate-bounce">🚀</div>
                  <p className="font-medium text-foreground">Ready to level up your social game?</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span>Build streaks, earn XP, unlock confidence</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      // Step 2: Practice Preview - Interactive Demo
      case 2:
        return (
          <div className="space-y-6 text-center animate-fade-in">
            <div className="space-y-3">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Practice Preview</h1>
              <p className="text-muted-foreground">Try this interactive conversation demo</p>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl blur-lg"></div>
              <div className="relative bg-background/90 backdrop-blur-sm border border-border/50 rounded-xl p-5 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="font-medium text-sm">Practice Scenario</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4 p-3 bg-muted/50 rounded-lg italic">
                  "You're at a party where you don't know anyone. How would you start a conversation?"
                </p>
                <div className="space-y-2">
                  <Button 
                    size="sm" 
                    variant={selectedAnswer === "hi" ? "default" : "outline"} 
                    className="w-full transition-all duration-300"
                    onClick={() => handleAnswerSelect("hi")}
                  >
                    👋 "Hi there!"
                  </Button>
                  <Button 
                    size="sm" 
                    variant={selectedAnswer === "party" ? "default" : "outline"} 
                    className="w-full transition-all duration-300"
                    onClick={() => handleAnswerSelect("party")}
                  >
                    🎉 "Great party, isn't it?"
                  </Button>
                </div>
                
                {feedbackVisible && (
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg animate-fade-in">
                    <div className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">Nice choice! +10 XP</div>
                    <div className="text-xs text-green-600 dark:text-green-400">Great conversation starter - friendly and approachable!</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      // Step 3: Stats Screen Preview
      case 3:
        return (
          <div className="space-y-6 text-center animate-fade-in">
            <div className="space-y-3">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Track Your Social Growth</h1>
              <p className="text-muted-foreground">See your confidence build with personalized stats</p>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur-lg"></div>
              <div className="relative bg-background/90 backdrop-blur-sm border border-border/50 rounded-xl p-5 shadow-lg">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Flame className="h-4 w-4 text-orange-500" />
                      <div className="text-lg font-bold text-foreground transition-all duration-1000">
                        {animatedStats.streak}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">Day Streak</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <div className="text-lg font-bold text-foreground transition-all duration-1000">
                        {animatedStats.xp}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">XP Earned</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Trophy className="h-4 w-4 text-purple-500" />
                      <div className="text-lg font-bold text-foreground transition-all duration-1000">
                        {animatedStats.confidence}%
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">Confidence</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Zap className="h-4 w-4 text-blue-500" />
                      <div className="text-lg font-bold text-foreground transition-all duration-1000">
                        Lvl {animatedStats.boldness}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">Boldness</div>
                  </div>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-3 bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all duration-1000"
                    style={{ width: `${animatedStats.confidence}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Progress to next level</p>
              </div>
            </div>
          </div>
        );

      // Step 4: Swipe Demo
      case 4:
        return (
          <div className="space-y-6 text-center animate-fade-in">
            <div className="space-y-3">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Missions Start Like This...</h1>
              <p className="text-muted-foreground">Swipe right to begin a chat</p>
            </div>
            
            <div className="relative h-64 flex items-center justify-center">
              <div 
                className={`relative w-64 h-48 transition-all duration-500 ${
                  cardSwiped ? 'translate-x-full rotate-12 opacity-0' : 'translate-x-0 rotate-0 opacity-100'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-xl blur-lg"></div>
                <div className="relative bg-background/90 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-xl h-full flex flex-col justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center">
                      <span className="text-2xl">👋</span>
                    </div>
                    <h3 className="font-bold text-foreground">Match with Rotem</h3>
                    <p className="text-sm text-muted-foreground">🤝 Rotem will be your practice partner</p>
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    <button className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                      <X className="h-6 w-6 text-red-500" />
                    </button>
                    <button className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                      <Heart className="h-6 w-6 text-green-500" />
                    </button>
                  </div>
                </div>
              </div>
              
              {!cardSwiped && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute bottom-0 text-primary hover:text-primary/80"
                  onClick={handleSwipeDemo}
                >
                  Try swiping right →
                </Button>
              )}
            </div>
          </div>
        );

      // Step 5: AI Feedback Preview
      case 5:
        return (
          <div className="space-y-6 text-center animate-fade-in">
            <div className="space-y-3">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Your Personal Feedback</h1>
              <p className="text-muted-foreground">AI Coach insights after each conversation</p>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur-lg"></div>
              <div className="relative bg-background/90 backdrop-blur-sm border border-border/50 rounded-xl p-5 shadow-lg space-y-4">
                <div className="text-left space-y-3">
                  <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">+10</span>
                    </div>
                    <span className="text-sm font-medium">XP for Humor</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">+5</span>
                    </div>
                    <span className="text-sm font-medium">Good Listening</span>
                  </div>
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium text-yellow-700 dark:text-yellow-300">Tip for next time:</div>
                        <div className="text-yellow-600 dark:text-yellow-400">Try asking more open-ended questions</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground italic">
                    "Your first rep earns XP, even if you fail!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      // Step 6: Goal Selection
      case 6:
        return (
          <div className="space-y-6 text-center animate-fade-in">
            <div className="space-y-3">
              <h1 className="text-2xl font-bold text-foreground">What's Your Main Goal?</h1>
              <p className="text-muted-foreground">Choose what you want to focus on first</p>
            </div>
            
            <div className="space-y-3">
              {goals.map((goal) => {
                const Icon = goal.icon;
                const isSelected = selectedGoal === goal.id;
                return (
                  <button
                    key={goal.id}
                    onClick={() => setSelectedGoal(goal.id)}
                    className={`w-full p-4 rounded-xl border transition-all duration-300 text-left hover:scale-[1.02] ${
                      isSelected 
                        ? 'border-primary bg-primary/10 shadow-lg scale-[1.02]' 
                        : 'border-border hover:border-primary/50 bg-background'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{goal.title.split(' ')[0]}</div>
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

      // Step 7: Experience Level
      case 7:
        return (
          <div className="space-y-6 text-center animate-fade-in">
            <div className="space-y-3">
              <h1 className="text-2xl font-bold text-foreground">How Socially Experienced Are You?</h1>
              <p className="text-muted-foreground">Help us personalize your training</p>
            </div>
            
            <div className="space-y-6">
              <div className="text-6xl transition-all duration-300">
                {getExperienceEmoji(experienceLevel[0])}
              </div>
              
              <div className="px-4">
                <Slider
                  value={experienceLevel}
                  onValueChange={setExperienceLevel}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>😅 Shy</span>
                  <span>😎 Pro</span>
                </div>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-xl">
                <p className="text-sm text-muted-foreground">
                  {experienceLevel[0] < 20 && "We'll start with gentle, supportive scenarios"}
                  {experienceLevel[0] >= 20 && experienceLevel[0] < 40 && "Perfect! We'll build your confidence step by step"}
                  {experienceLevel[0] >= 40 && experienceLevel[0] < 60 && "Great! We'll focus on intermediate challenges"}
                  {experienceLevel[0] >= 60 && experienceLevel[0] < 80 && "Awesome! We'll help you refine your skills"}
                  {experienceLevel[0] >= 80 && "Excellent! We'll provide advanced scenarios to master"}
                </p>
              </div>
            </div>
          </div>
        );

      // Step 8: Motivation & Streak
      case 8:
        return (
          <div className="space-y-6 text-center animate-fade-in">
            <div className="space-y-4">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-3xl flex items-center justify-center animate-pulse shadow-2xl">
                <Flame className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">You're Ready. Start Your Journey!</h1>
              <p className="text-muted-foreground">Can you practice every day?</p>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-background/90 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <Flame className="h-8 w-8 text-orange-500 animate-pulse" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">Day 1</div>
                    <div className="text-sm text-muted-foreground">Your streak starts now</div>
                  </div>
                </div>
                
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="text-sm font-medium mb-1">Level 1</div>
                  <div className="h-2 bg-muted rounded-full">
                    <div className="h-2 bg-gradient-to-r from-primary to-purple-500 rounded-full w-0 animate-pulse"></div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">0 XP → 50 XP</div>
                </div>
                
                <div className="text-center space-y-2">
                  <p className="font-medium text-green-600">Your first rep earns XP... even if you fail!</p>
                  <p className="text-sm text-muted-foreground">Consistency is key – come back daily to build your streak!</p>
                </div>
              </div>
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
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className={`h-1.5 w-6 rounded-full transition-all duration-500 ${
                  i <= step ? 'bg-gradient-to-r from-primary to-purple-500' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{step}/8</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={skip}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
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
                onClick={step === 8 ? finish : () => setStep(step + 1)}
                disabled={(step === 6 && !selectedGoal)}
                className="flex-1 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
              >
                {step === 8 ? (
                  <>
                    <Flame className="h-4 w-4 mr-1" />
                    Begin First Mission!
                  </>
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