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
  const [networkError, setNetworkError] = useState(false);
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
              <p className="text-white/40 text-sm">30-sec drills • XP • streaks</p>
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
                  {/* 30-sec demo pill tag */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-[24px] border border-white/[0.16] flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-orange-400 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                    <span className="text-xs text-white/80 font-medium">30-sec demo</span>
                  </div>
                  
                  {/* Chat scenario */}
                  <div className="mt-8 space-y-3">
                    <div className="text-xs text-white/60 text-left">Practice scenario:</div>
                    <div className="p-3 bg-white/[0.06] backdrop-blur-[24px] border border-white/[0.16] rounded-[22px] shadow-[0_12px_28px_rgba(0,0,0,0.35)]">
                      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      <p className="text-sm text-white text-left">You're at a party. Start a conversation:</p>
                    </div>
                    
                    {/* Reply chips */}
                    <div className="space-y-2 mt-4">
                      <button 
                        className={`w-full p-3 rounded-[22px] text-sm font-medium transition-all duration-300 shadow-[0_12px_28px_rgba(0,0,0,0.35)] ${
                          selectedAnswer === "hi"
                            ? "bg-gradient-to-r from-[#9BE8DA] to-[#59C9B8] text-[#0B1B2F] scale-[0.96] border border-white/10"
                            : "bg-white/[0.06] backdrop-blur-[24px] border border-white/[0.16] text-white hover:bg-white/10"
                        }`}
                        onClick={() => handleAnswerSelect("hi")}
                      >
                        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        👋 "Hi there!"
                      </button>
                      <button 
                        className={`w-full p-3 rounded-[22px] text-sm font-medium transition-all duration-300 shadow-[0_12px_28px_rgba(0,0,0,0.35)] ${
                          selectedAnswer === "party"
                            ? "bg-gradient-to-r from-[#9BE8DA] to-[#59C9B8] text-[#0B1B2F] scale-[0.96] border border-white/10"
                            : "bg-white/[0.06] backdrop-blur-[24px] border border-white/[0.16] text-white hover:bg-white/10"
                        }`}
                        onClick={() => handleAnswerSelect("party")}
                      >
                        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        🎉 "Great party, isn't it?"
                      </button>
                    </div>

                    {feedbackVisible && (
                      <div className="mt-3 p-2 bg-green-500/20 border border-green-400/30 rounded-lg backdrop-blur-[24px]">
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
            {/* Four metric pills with 3D tokens */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative p-4 bg-white/[0.06] backdrop-blur-[24px] border border-white/[0.16] rounded-[22px] text-center shadow-[0_12px_28px_rgba(0,0,0,0.35)]">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <div className="relative w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-br from-[#FF9A5A] to-[#FF6B35] flex items-center justify-center">
                  <Flame className="h-4 w-4 text-white" />
                  <div className="absolute top-1 left-1 w-2 h-2 bg-white/30 rounded-full blur-sm"></div>
                </div>
                <span className="text-[20px] font-semibold text-white">{animatedStats.streak}</span>
                <p className="text-[12px] text-white/60 mt-1">Day Streak</p>
              </div>
              
              <div className="relative p-4 bg-white/[0.06] backdrop-blur-[24px] border border-white/[0.16] rounded-[22px] text-center shadow-[0_12px_28px_rgba(0,0,0,0.35)]">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <div className="relative w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-br from-[#FFE082] to-[#FFC107] flex items-center justify-center">
                  <Star className="h-4 w-4 text-white" />
                  <div className="absolute top-1 left-1 w-2 h-2 bg-white/30 rounded-full blur-sm"></div>
                </div>
                <span className="text-[20px] font-semibold text-white">{animatedStats.xp}</span>
                <p className="text-[12px] text-white/60 mt-1">XP</p>
              </div>
              
              <div className="relative p-4 bg-white/[0.06] backdrop-blur-[24px] border border-white/[0.16] rounded-[22px] text-center shadow-[0_12px_28px_rgba(0,0,0,0.35)]">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <div className="relative w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-br from-[#64B5F6] to-[#1976D2] flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                  <div className="absolute top-1 left-1 w-2 h-2 bg-white/30 rounded-full blur-sm"></div>
                </div>
                <span className="text-[20px] font-semibold text-white">{animatedStats.confidence}%</span>
                <p className="text-[12px] text-white/60 mt-1">Confidence</p>
              </div>
              
              <div className="relative p-4 bg-white/[0.06] backdrop-blur-[24px] border border-white/[0.16] rounded-[22px] text-center shadow-[0_12px_28px_rgba(0,0,0,0.35)]">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <div className="relative w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-br from-[#BA68C8] to-[#7B1FA2] flex items-center justify-center">
                  <Trophy className="h-4 w-4 text-white" />
                  <div className="absolute top-1 left-1 w-2 h-2 bg-white/30 rounded-full blur-sm"></div>
                </div>
                <span className="text-[20px] font-semibold text-white">Lvl {animatedStats.level}</span>
                <p className="text-[12px] text-white/60 mt-1">Level</p>
              </div>
            </div>

            {/* XP progress bar */}
            <div className="space-y-2">
              <div className="relative h-[10px] bg-white/10 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-[#9BE8DA] to-[#59C9B8] rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(155,232,218,0.4)]"
                  style={{ width: `${(animatedStats.xp / 500) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[13px] text-white/60">
                <span>Level {animatedStats.level}</span>
                <span className="font-medium">{animatedStats.xp}/500 XP</span>
              </div>
            </div>

            <p className="text-white/60 text-sm">See your growth after each session</p>
          </div>
        );

      // S4 — Missions Start (swipe model)
      case 4:
        return (
          <div className="max-w-sm mx-auto space-y-8 text-center">
            {/* Swipeable card with enhanced depth */}
            <div className="relative h-64 flex items-center justify-center">
              {/* Blurred background shapes for richness */}
              <div className="absolute inset-0">
                <div className="absolute top-8 left-4 w-20 h-20 bg-purple-400/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-12 right-6 w-16 h-16 bg-pink-400/10 rounded-full blur-2xl"></div>
              </div>
              
              <div 
                className={`relative w-72 h-48 transition-all duration-500 ${
                  cardSwiped ? 'translate-x-full rotate-12 opacity-0' : 'translate-x-0 rotate-0 opacity-100'
                }`}
                style={{
                  filter: 'drop-shadow(0 16px 40px rgba(0,0,0,0.5))'
                }}
              >
                {/* Glass card with enhanced depth */}
                <div className="relative w-full h-full bg-white/[0.06] backdrop-blur-[24px] border border-white/[0.16] rounded-[22px] p-6 flex flex-col justify-center shadow-[0_12px_28px_rgba(0,0,0,0.35)]">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  
                  {/* Enhanced 3D orb */}
                  <div className="relative mx-auto w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FFB36B] via-[#FF5B8A] to-[#C06BFF] flex items-center justify-center">
                      <span className="text-2xl">💬</span>
                      <div className="absolute top-2 left-2 w-4 h-4 bg-white/30 rounded-full blur-sm"></div>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FFB36B] via-[#FF5B8A] to-[#C06BFF] blur-lg opacity-40 scale-110"></div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">Practice Partner</h3>
                  <p className="text-sm text-white/60">Swipe right to begin a chat</p>
                  
                  {/* Focus ring on active card */}
                  <div className="absolute inset-0 rounded-[22px] ring-2 ring-white/10 ring-opacity-0 hover:ring-opacity-100 transition-all duration-300"></div>
                </div>
                
                {/* Enhanced parallax shadow */}
                <div 
                  className="absolute inset-0 bg-black/30 blur-2xl rounded-[22px] -z-10"
                  style={{ transform: 'translate(6px, 12px)' }}
                />
              </div>
              
              {/* Ghost button with animated arrow */}
              {!cardSwiped && (
                <div className="absolute bottom-4">
                  <button 
                    onClick={handleSwipeDemo}
                    className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10"
                  >
                    <span>Try swiping</span>
                    <ChevronRight className="h-3 w-3 animate-pulse" />
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
            {/* Stack of color-coded feedback chips */}
            <div className="relative">
              <div className="space-y-3 p-6 bg-white/[0.06] backdrop-blur-[24px] border border-white/[0.16] rounded-[22px] shadow-[0_12px_28px_rgba(0,0,0,0.35)]">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                
                {/* Tiny sparkle particles (low density) */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
                      style={{
                        left: `${25 + Math.random() * 50}%`,
                        top: `${25 + Math.random() * 50}%`,
                        animationDelay: `${Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>

                {/* Color-coded feedback chips */}
                <div className="relative z-10 space-y-3">
                  {/* Green for +XP */}
                  <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-400/20 rounded-[22px] shadow-[0_8px_20px_rgba(0,0,0,0.25)]">
                    <div className="relative w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-xs text-white font-bold">
                      +10
                      <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-white/30 rounded-full blur-sm"></div>
                    </div>
                    <span className="text-sm font-medium text-green-300">XP Humor</span>
                  </div>
                  
                  {/* Blue for trait */}
                  <div className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-400/20 rounded-[22px] shadow-[0_8px_20px_rgba(0,0,0,0.25)]">
                    <div className="relative w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-xs text-white font-bold">
                      +5
                      <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-white/30 rounded-full blur-sm"></div>
                    </div>
                    <span className="text-sm font-medium text-blue-300">Listening</span>
                  </div>
                  
                  {/* Amber for Tip with expand affordance */}
                  <div className="p-3 bg-yellow-500/10 border border-yellow-400/20 rounded-[22px] shadow-[0_8px_20px_rgba(0,0,0,0.25)]">
                    <div className="flex items-start gap-2">
                      <div className="relative w-4 h-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mt-0.5">
                        <Target className="h-2.5 w-2.5 text-white" />
                        <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-white/30 rounded-full blur-sm"></div>
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-xs font-medium text-yellow-300">Tip:</p>
                        <p className="text-xs text-yellow-400">Ask more open-ended questions</p>
                      </div>
                      <ChevronRight className="h-3 w-3 text-yellow-400/60 mt-1" />
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
                    className={`w-full p-4 rounded-[22px] border transition-all duration-300 text-left shadow-[0_12px_28px_rgba(0,0,0,0.35)] ${
                      isSelected 
                        ? 'border-white/30 bg-white/[0.08] shadow-[0_0_40px_rgba(155,232,218,0.4)] ring-2 ring-[#9BE8DA]/20' 
                        : 'border-white/[0.16] bg-white/[0.06] backdrop-blur-[24px] hover:bg-white/[0.08]'
                    }`}
                  >
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    <div className="flex items-center gap-4">
                      <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                        <goal.icon className="h-4 w-4 text-white/80" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-white">{goal.title}</div>
                        <div className="text-xs text-white/60 mt-1">{goal.desc}</div>
                      </div>
                      {isSelected && (
                        <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-[#9BE8DA] to-[#59C9B8] flex items-center justify-center">
                          <CheckCircle2 className="h-3 w-3 text-[#0B1B2F]" />
                        </div>
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