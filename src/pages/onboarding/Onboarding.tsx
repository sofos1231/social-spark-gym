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
  Target,
  ChevronRight,
  Play,
  TrendingUp,
  UserCheck
} from "lucide-react";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [experienceLevel, setExperienceLevel] = useState([50]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({ streak: 0, xp: 0, confidence: 0, level: 0 });
  const [cardSwiped, setCardSwiped] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();

  const finish = () => {
    setConfetti(true);
    setTimeout(() => {
      completeOnboarding();
      navigate("/", { replace: true });
    }, 1500);
  };

  const skip = () => {
    completeOnboarding();
    navigate("/", { replace: true });
  };

  const goals = [
    { id: "confidence", icon: Zap, title: "Confidence", desc: "Build overall social confidence" },
    { id: "dating", icon: Heart, title: "Dating", desc: "Master romantic conversations" },
    { id: "interviews", icon: Briefcase, title: "Job Interviews", desc: "Excel in professional settings" },
    { id: "speaking", icon: Mic, title: "Public Speaking", desc: "Speak confidently to crowds" },
    { id: "networking", icon: Handshake, title: "Networking", desc: "Connect with new people easily" }
  ];

  // Animate stats on step 3
  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        setAnimatedStats({ streak: 7, xp: 340, confidence: 78, level: 2 });
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
    }, 1500);
  };

  // Get experience level text
  const getExperienceText = (level: number) => {
    if (level < 25) return "Shy";
    if (level < 50) return "Learning";
    if (level < 75) return "Confident";
    return "Pro";
  };

  const handleNext = () => {
    if (step === 7) {
      finish();
    } else {
      setStep(step + 1);
    }
  };

  const isNextDisabled = () => {
    return step === 6 && !selectedGoal;
  };

  const renderStep = () => {
    switch (step) {
      // S1 — Welcome / Hero
      case 1:
        return (
          <div className="max-w-sm mx-auto space-y-8 text-center">
            {/* 3D Orb with phone mockup */}
            <div className="relative mb-12">
              {/* Phone mockup frame */}
              <div className="mx-auto w-64 h-80 rounded-[3rem] border border-white/[0.08] bg-gradient-to-b from-white/[0.02] to-transparent backdrop-blur-sm p-4">
                <div className="w-full h-full rounded-[2.5rem] bg-gradient-to-b from-black/40 to-black/60 flex items-center justify-center relative overflow-hidden">
                  {/* 3D Orb animation */}
                  <div className="relative w-24 h-24">
                    {/* Main orb with gradient */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FFB36B] via-[#FF5B8A] to-[#C06BFF] animate-float">
                      {/* Specular highlight */}
                      <div className="absolute top-2 left-2 w-6 h-6 bg-white/30 rounded-full blur-sm"></div>
                      {/* Rim light */}
                      <div className="absolute inset-0 rounded-full ring-1 ring-white/10"></div>
                    </div>
                    {/* Subtle bloom */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FFB36B] via-[#FF5B8A] to-[#C06BFF] blur-lg opacity-40 scale-110"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="space-y-4">
              <h1 className="text-[30px] font-semibold leading-[120%] tracking-tight text-white">
                Train to Succeed Socially
              </h1>
              <p className="text-white/60 text-base leading-[130%] max-w-[28ch] mx-auto">
                Practice real conversations. Build confidence.
              </p>
            </div>
          </div>
        );

      // S2 — Practice Preview (interactive teaser)
      case 2:
        return (
          <div className="max-w-sm mx-auto space-y-8 text-center">
            {/* Phone mockup with chat */}
            <div className="relative mb-8">
              <div className="mx-auto w-64 h-80 rounded-[3rem] border border-white/[0.08] bg-gradient-to-b from-white/[0.02] to-transparent backdrop-blur-sm p-4">
                <div className="w-full h-full rounded-[2.5rem] bg-gradient-to-b from-black/40 to-black/60 p-4 relative">
                  {/* 30-sec demo tag */}
                  <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-white/10 backdrop-blur-md">
                    <span className="text-xs text-white/80">30-sec demo</span>
                  </div>
                  
                  {/* Chat scenario */}
                  <div className="mt-8 space-y-3">
                    <div className="text-xs text-white/60 text-left">Practice scenario:</div>
                    <div className="p-3 bg-white/[0.06] backdrop-blur-[24px] border border-white/[0.16] rounded-[22px]">
                      <p className="text-sm text-white text-left">You're at a party. Start a conversation:</p>
                    </div>
                    
                    {/* Reply chips */}
                    <div className="space-y-2 mt-4">
                      <button 
                        className={`w-full p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                          selectedAnswer === "hi"
                            ? "bg-gradient-to-r from-[#9BE8DA] to-[#59C9B8] text-[#0B1B2F] scale-[0.96]"
                            : "bg-white/[0.06] backdrop-blur-[24px] border border-white/[0.16] text-white hover:bg-white/10"
                        }`}
                        onClick={() => handleAnswerSelect("hi")}
                      >
                        👋 "Hi there!"
                      </button>
                      <button 
                        className={`w-full p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                          selectedAnswer === "party"
                            ? "bg-gradient-to-r from-[#9BE8DA] to-[#59C9B8] text-[#0B1B2F] scale-[0.96]"
                            : "bg-white/[0.06] backdrop-blur-[24px] border border-white/[0.16] text-white hover:bg-white/10"
                        }`}
                        onClick={() => handleAnswerSelect("party")}
                      >
                        🎉 "Great party, isn't it?"
                      </button>
                    </div>

                    {feedbackVisible && (
                      <div className="mt-3 p-2 bg-green-500/20 border border-green-400/30 rounded-lg">
                        <span className="text-xs text-green-300">+10 XP Great choice!</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-white/60">Tap to try →</p>
          </div>
        );

      // S3 — Stats/Value Preview
      case 3:
        return (
          <div className="max-w-sm mx-auto space-y-8 text-center">
            {/* Four metric pills */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/[0.06] backdrop-blur-[24px] border border-white/[0.16] rounded-[22px] text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Flame className="h-4 w-4 text-orange-400" />
                  <span className="text-lg font-semibold text-white">{animatedStats.streak}</span>
                </div>
                <p className="text-xs text-white/60">Day Streak</p>
              </div>
              
              <div className="p-4 bg-white/[0.06] backdrop-blur-[24px] border border-white/[0.16] rounded-[22px] text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-lg font-semibold text-white">{animatedStats.xp}</span>
                </div>
                <p className="text-xs text-white/60">XP</p>
              </div>
              
              <div className="p-4 bg-white/[0.06] backdrop-blur-[24px] border border-white/[0.16] rounded-[22px] text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                  <span className="text-lg font-semibold text-white">{animatedStats.confidence}%</span>
                </div>
                <p className="text-xs text-white/60">Confidence</p>
              </div>
              
              <div className="p-4 bg-white/[0.06] backdrop-blur-[24px] border border-white/[0.16] rounded-[22px] text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Trophy className="h-4 w-4 text-purple-400" />
                  <span className="text-lg font-semibold text-white">Lvl {animatedStats.level}</span>
                </div>
                <p className="text-xs text-white/60">Level</p>
              </div>
            </div>

            {/* XP bar */}
            <div className="space-y-2">
              <div className="h-[10px] bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#9BE8DA] to-[#59C9B8] rounded-full transition-all duration-1000"
                  style={{ width: `${(animatedStats.xp / 500) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-white/60">
                <span>Level {animatedStats.level}</span>
                <span>{animatedStats.xp}/500 XP</span>
              </div>
            </div>

            <p className="text-white/60 text-sm">See your growth after each session</p>
          </div>
        );

      // S4 — Missions Start (swipe model)
      case 4:
        return (
          <div className="max-w-sm mx-auto space-y-8 text-center">
            {/* Swipeable card with depth */}
            <div className="relative h-64 flex items-center justify-center">
              <div 
                className={`relative w-72 h-48 transition-all duration-500 ${
                  cardSwiped ? 'translate-x-full rotate-12 opacity-0' : 'translate-x-0 rotate-0 opacity-100'
                }`}
                style={{
                  filter: 'drop-shadow(0 12px 28px rgba(0,0,0,0.35))'
                }}
              >
                {/* Glass card */}
                <div className="relative w-full h-full bg-white/[0.06] backdrop-blur-[24px] border border-white/[0.16] rounded-[22px] p-6 flex flex-col justify-center">
                  {/* Duotone orb */}
                  <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-[#FFB36B] via-[#FF5B8A] to-[#C06BFF] mb-4 flex items-center justify-center">
                    <span className="text-2xl">💬</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Practice Partner</h3>
                  <p className="text-sm text-white/60">Swipe right to begin a chat</p>
                </div>
                
                {/* Parallax shadow */}
                <div 
                  className="absolute inset-0 bg-black/20 blur-xl rounded-[22px] -z-10"
                  style={{ transform: 'translate(4px, 8px)' }}
                />
              </div>
              
              {/* Helper text */}
              {!cardSwiped && (
                <div className="absolute bottom-4">
                  <button 
                    onClick={handleSwipeDemo}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    Try swiping →
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      // S5 — Personal Feedback
      case 5:
        return (
          <div className="max-w-sm mx-auto space-y-8 text-center">
            {/* Stack of feedback chips */}
            <div className="relative">
              <div className="space-y-3 p-6 bg-white/[0.06] backdrop-blur-[24px] border border-white/[0.16] rounded-[22px]">
                {/* Confetti sparkles (low density) */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>

                {/* Feedback chips */}
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-400/20 rounded-xl">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                      +10
                    </div>
                    <span className="text-sm font-medium text-green-300">XP Humor</span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-400/20 rounded-xl">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                      +5
                    </div>
                    <span className="text-sm font-medium text-blue-300">Listening</span>
                  </div>
                  
                  <div className="p-3 bg-yellow-500/10 border border-yellow-400/20 rounded-xl">
                    <div className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-yellow-400 mt-0.5" />
                      <div className="text-left">
                        <p className="text-xs font-medium text-yellow-300">Tip:</p>
                        <p className="text-xs text-yellow-400">Ask more open-ended questions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      // S6 — Choose Focus
      case 6:
        return (
          <div className="max-w-sm mx-auto space-y-8 text-center">
            <div className="space-y-4">
              <h2 className="text-[22px] font-semibold text-white leading-[120%]">Choose Focus</h2>
              <p className="text-white/60 text-base">What do you want to practice?</p>
            </div>
            
            {/* Selectable glass cards */}
            <div className="space-y-3">
              {goals.map((goal) => {
                const isSelected = selectedGoal === goal.id;
                return (
                  <button
                    key={goal.id}
                    onClick={() => setSelectedGoal(goal.id)}
                    className={`w-full p-4 rounded-[22px] border transition-all duration-300 text-left ${
                      isSelected 
                        ? 'border-white/30 bg-white/[0.08] shadow-[0_0_40px_rgba(155,232,218,0.4)]' 
                        : 'border-white/[0.16] bg-white/[0.06] backdrop-blur-[24px] hover:bg-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <goal.icon className="h-5 w-5 text-white/80" />
                      <div className="flex-1">
                        <div className="font-medium text-sm text-white">{goal.title}</div>
                        <div className="text-xs text-white/60 mt-1">{goal.desc}</div>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="h-5 w-5 text-[#9BE8DA]" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      // S7 — Experience Slider + Start
      case 7:
        return (
          <div className="max-w-sm mx-auto space-y-8 text-center">
            <div className="space-y-4">
              <h2 className="text-[22px] font-semibold text-white leading-[120%]">Experience Level</h2>
              <p className="text-white/60 text-base">Help us personalize your training</p>
            </div>
            
            {/* Duotone face token */}
            <div className="relative">
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-[#FFB36B] via-[#FF5B8A] to-[#C06BFF] flex items-center justify-center mb-6">
                <span className="text-2xl">{getExperienceText(experienceLevel[0]) === "Shy" ? "😅" : getExperienceText(experienceLevel[0]) === "Pro" ? "😎" : "😊"}</span>
              </div>
              
              {/* Discrete slider */}
              <div className="px-6 mb-6">
                <Slider
                  value={experienceLevel}
                  onValueChange={setExperienceLevel}
                  max={100}
                  step={25}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-white/60 mt-3">
                  <span>Shy</span>
                  <span>Pro</span>
                </div>
              </div>
            </div>

            {/* Streak flame + Day 1 preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 p-4 bg-white/[0.06] backdrop-blur-[24px] border border-white/[0.16] rounded-[22px]">
                <Flame className="h-6 w-6 text-orange-400" />
                <span className="text-white font-medium">Day 1</span>
              </div>
              
              {/* XP bar preview */}
              <div className="space-y-2">
                <div className="h-[10px] bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#9BE8DA] to-[#59C9B8] rounded-full w-0" />
                </div>
                <div className="flex justify-between text-xs text-white/60">
                  <span>Level 1</span>
                  <span>0/500 XP</span>
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient (root) */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 45% 20%, rgba(255,130,180,0.18) 0%, rgba(0,0,0,0) 55%),
            linear-gradient(180deg, #9A1B8F 0%, #5B2E8C 40%, #102346 100%)
          `
        }}
      />
      
      {/* Top progress */}
      <div className="sticky top-0 z-50 p-6">
        <div className="max-w-sm mx-auto">
          <div className="flex items-center justify-between text-sm text-white/60 mb-3">
            <span className="text-xs font-medium">{step}/7</span>
            <button 
              onClick={skip} 
              className="text-white/60 hover:text-white transition-colors text-sm font-medium"
            >
              Skip
            </button>
          </div>
          
          {/* Progress segments with glow */}
          <div className="flex gap-1">
            {[...Array(7)].map((_, i) => (
              <div 
                key={i} 
                className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                  i < step 
                    ? 'bg-[#9BE8DA] shadow-[0_0_8px_rgba(155,232,218,0.6)]' 
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6 pb-32">
        <div className="w-full">
          {renderStep()}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6">
        <div className="max-w-sm mx-auto flex gap-4">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 h-[56px] bg-white/10 text-white/80 rounded-xl font-medium transition-all duration-200 hover:bg-white/15 border border-white/20"
            >
              Back
            </button>
          )}
          
          {/* Primary CTA (mint pill) */}
          <button 
            onClick={handleNext}
            disabled={isNextDisabled()}
            className={`flex-1 h-[56px] rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              isNextDisabled() 
                ? 'bg-white/10 text-white/40 cursor-not-allowed' 
                : 'bg-gradient-to-r from-[#9BE8DA] to-[#59C9B8] text-[#0B1B2F] border border-white/10 hover:scale-[0.96] active:scale-[0.96] shadow-[0_4px_12px_rgba(155,232,218,0.3)]'
            }`}
            style={{
              textShadow: !isNextDisabled() ? 'none' : undefined
            }}
          >
            {step === 7 ? "Begin First Mission" : "Continue"}
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Confetti for final step */}
      {confetti && step === 7 && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-[#9BE8DA] to-[#59C9B8] rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}