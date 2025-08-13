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
  ChevronRight
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
  const [confetti, setConfetti] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
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

  // Helper text for experience level
  const getHelperText = (level: number) => {
    if (level < 25) return "We'll start gently";
    if (level < 50) return "Perfect confidence building zone";
    if (level < 75) return "Ready for real challenges";
    return "We'll push your edge";
  };

  const handleNext = () => {
    if (step === 8) {
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
      // Step 1: Welcome Screen
      case 1:
        return (
          <div className="max-w-sm mx-auto space-y-8 text-center animate-fade-in">
            {/* Radial spotlight behind hero */}
            <div className="relative">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-gradient-radial from-purple-500/25 to-transparent rounded-full blur-3xl"></div>
              <div className="relative space-y-6">
                {/* Brand conversation spotlight illustration */}
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center shadow-[0_20px_40px_-15px_rgba(138,92,246,0.4)] animate-scale-in relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                  <Sparkles className="h-12 w-12 text-white relative z-10" />
                </div>
                
                {/* Tightened typography with proper letter spacing */}
                <div className="space-y-4">
                  <h1 className="text-[32px] font-semibold leading-tight tracking-[-0.5px] bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Train to Succeed Socially
                  </h1>
                  <p className="text-gray-400 text-base leading-relaxed max-w-[28ch] mx-auto">
                    Practice real conversations. Build confidence where it matters most.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Glass panel with backdrop blur */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-lg"></div>
              <div className="relative bg-[rgba(8,12,24,0.55)] backdrop-blur-[20px] border border-white/6 rounded-2xl p-6 shadow-[0_18px_40px_-10px_rgba(0,0,0,0.35)]">
                <div className="text-center space-y-4">
                  <div className="text-5xl animate-bounce">🚀</div>
                  <p className="font-medium text-white">Ready to level up your social game?</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <Flame className="h-4 w-4 text-orange-400 animate-pulse" />
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
          <div className="max-w-sm mx-auto space-y-8 text-center animate-fade-in">
            <div className="space-y-4">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-[0_18px_40px_-10px_rgba(34,197,94,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
                <MessageSquare className="h-10 w-10 text-white relative z-10" />
              </div>
              <h2 className="text-[24px] font-semibold text-white tracking-[-0.3px]">Practice Preview</h2>
              <p className="text-gray-400 text-base">Try this interactive conversation demo</p>
            </div>
            
            {/* Glass panel conversation card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/15 to-emerald-500/15 rounded-2xl blur-lg"></div>
              <div className="relative bg-[rgba(8,12,24,0.55)] backdrop-blur-[20px] border border-white/6 rounded-2xl p-6 shadow-[0_18px_40px_-10px_rgba(0,0,0,0.35)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="font-medium text-sm text-white">Practice Scenario</span>
                </div>
                <p className="text-sm text-gray-300 mb-6 p-4 bg-white/5 rounded-xl italic border border-white/10">
                  "You're at a party where you don't know anyone. How would you start a conversation?"
                </p>
                <div className="space-y-3">
                  <button 
                    className={`w-full h-12 text-sm font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                      selectedAnswer === "hi" 
                        ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg transform scale-[1.02]" 
                        : "bg-white/10 text-gray-300 hover:bg-white/15 hover:text-white border border-white/20"
                    }`}
                    onClick={() => handleAnswerSelect("hi")}
                  >
                    👋 "Hi there!"
                  </button>
                  <button 
                    className={`w-full h-12 text-sm font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                      selectedAnswer === "party" 
                        ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg transform scale-[1.02]" 
                        : "bg-white/10 text-gray-300 hover:bg-white/15 hover:text-white border border-white/20"
                    }`}
                    onClick={() => handleAnswerSelect("party")}
                  >
                    🎉 "Great party, isn't it?"
                  </button>
                </div>
                
                {feedbackVisible && (
                  <div className="mt-4 p-4 bg-green-500/10 border border-green-400/20 rounded-xl animate-fade-in relative overflow-hidden">
                    {/* XP token animation */}
                    <div className="absolute top-2 right-2 bg-green-400 text-black text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                      +10
                    </div>
                    <div className="text-sm font-medium text-green-300 mb-1">Nice choice!</div>
                    <div className="text-xs text-green-400">Great conversation starter - friendly and approachable!</div>
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-sm text-purple-400 underline">Try interactive demo →</p>
          </div>
        );

      // Step 3: Stats Screen Preview
      case 3:
        return (
          <div className="max-w-sm mx-auto space-y-8 text-center animate-fade-in">
            <div className="space-y-4">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-[0_18px_40px_-10px_rgba(59,130,246,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
                <BarChart3 className="h-10 w-10 text-white relative z-10" />
              </div>
              <h2 className="text-[24px] font-semibold text-white tracking-[-0.3px]">Track Your Social Growth</h2>
              <p className="text-gray-400 text-base">See your confidence build with personalized stats</p>
            </div>
            
            {/* Compact dashboard with real product feel */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-2xl blur-lg"></div>
              <div className="relative bg-[rgba(8,12,24,0.55)] backdrop-blur-[20px] border border-white/6 rounded-2xl p-6 shadow-[0_18px_40px_-10px_rgba(0,0,0,0.35)] space-y-6">
                
                {/* Progress to next level overline */}
                <div className="text-center">
                  <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">Progress to next level</p>
                </div>
                
                {/* Four stat tiles */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Streak with flickering flame */}
                  <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Flame className={`h-5 w-5 text-orange-400 ${animatedStats.streak > 0 ? 'animate-pulse' : ''}`} />
                      <div className="text-xl font-bold text-white transition-all duration-1000">
                        {animatedStats.streak}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">Day Streak</div>
                  </div>
                  
                  {/* XP with gradient meter and spark particles */}
                  <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Star className="h-5 w-5 text-yellow-400" />
                      <div className="text-xl font-bold text-white transition-all duration-1000">
                        {animatedStats.xp}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">XP Earned</div>
                    {/* Tiny spark particles */}
                    {animatedStats.xp > 0 && (
                      <div className="relative overflow-hidden h-1 mt-2">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Confidence as animated donut ring */}
                  <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="relative w-12 h-12 mx-auto mb-2">
                      <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="rgb(168, 85, 247)"
                          strokeWidth="2"
                          strokeDasharray={`${animatedStats.confidence}, 100`}
                          className="transition-all duration-[850ms] ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-white">{animatedStats.confidence}%</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">Confidence</div>
                  </div>
                  
                  {/* Boldness with starburst highlight */}
                  <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10 relative overflow-hidden">
                    {animatedStats.boldness > 0 && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
                    )}
                    <div className="relative">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Zap className="h-5 w-5 text-blue-400" />
                        <div className="text-xl font-bold text-white transition-all duration-1000">
                          Lvl {animatedStats.boldness}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">Boldness</div>
                    </div>
                  </div>
                </div>
                
                {/* XP progress bar with tick marks */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Level 1</span>
                    <span>0/50 XP</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden relative">
                    {/* Tick marks */}
                    <div className="absolute inset-0 flex justify-between items-center px-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-px h-1 bg-white/20"></div>
                      ))}
                    </div>
                    <div 
                      className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-1000 relative"
                      style={{ width: `${(animatedStats.confidence / 100) * 50}%` }}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      // Step 4: Swipe Scenario Demo - Tinder Style
      case 4:
        return (
          <div className="max-w-sm mx-auto space-y-8 text-center animate-fade-in">
            <div className="space-y-4">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-[0_18px_40px_-10px_rgba(236,72,153,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
                <Heart className="h-10 w-10 text-white relative z-10" />
              </div>
              <h2 className="text-[24px] font-semibold text-white tracking-[-0.3px]">Missions start like this...</h2>
              <p className="text-gray-400 text-base">Swipe right to begin a chat</p>
            </div>
            
            {/* Swipeable card */}
            <div className="relative h-64 flex items-center justify-center">
              <div 
                className={`relative w-72 h-48 transition-all duration-500 ${
                  cardSwiped ? 'translate-x-full rotate-12 opacity-0' : 'translate-x-0 rotate-0 opacity-100'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/15 to-rose-500/15 rounded-2xl blur-lg"></div>
                <div className="relative bg-[rgba(8,12,24,0.55)] backdrop-blur-[20px] border border-white/6 rounded-2xl p-6 shadow-[0_18px_40px_-10px_rgba(0,0,0,0.35)] h-full flex flex-col justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center">
                      <span className="text-2xl">👋</span>
                    </div>
                    <h3 className="font-bold text-white text-lg">Match with Rotem</h3>
                    <p className="text-sm text-gray-400">🤝 Rotem will be your practice partner</p>
                  </div>
                  
                  {/* Like/Nope buttons */}
                  <div className="flex justify-center gap-6 mt-6">
                    <button className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/30 hover:bg-red-500/30 transition-all">
                      <X className="h-7 w-7 text-red-400" />
                    </button>
                    <button className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30 hover:bg-green-500/30 transition-all">
                      <Heart className="h-7 w-7 text-green-400" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Match stamp when swiped */}
              {cardSwiped && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-green-500/90 text-white font-bold text-2xl px-6 py-3 rounded-xl border-4 border-green-400 rotate-12 animate-scale-in">
                    MATCHED!
                  </div>
                </div>
              )}
              
              {/* Swipe instruction */}
              {!cardSwiped && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <button 
                    onClick={handleSwipeDemo}
                    className="text-sm text-purple-400 underline hover:text-purple-300 transition-colors"
                  >
                    Try swiping right →
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      // Step 5: AI Feedback Preview
      case 5:
        return (
          <div className="max-w-sm mx-auto space-y-8 text-center animate-fade-in">
            <div className="space-y-4">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-[0_18px_40px_-10px_rgba(99,102,241,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
                <Sparkles className="h-10 w-10 text-white relative z-10" />
              </div>
              <h2 className="text-[24px] font-semibold text-white tracking-[-0.3px]">Your Personal Feedback</h2>
              <p className="text-gray-400 text-base">AI Coach insights after each conversation</p>
            </div>
            
            {/* Feedback pills */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/15 to-purple-500/15 rounded-2xl blur-lg"></div>
              <div className="relative bg-[rgba(8,12,24,0.55)] backdrop-blur-[20px] border border-white/6 rounded-2xl p-6 shadow-[0_18px_40px_-10px_rgba(0,0,0,0.35)] space-y-4">
                
                {/* Three feedback pills */}
                <div className="space-y-3">
                  {/* Green pill with sparkles icon */}
                  <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-400/20 rounded-xl">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-green-300">+10 XP for Humor</span>
                  </div>
                  
                  {/* Blue pill */}
                  <div className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-400/20 rounded-xl">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">+5</span>
                    </div>
                    <span className="text-sm font-medium text-blue-300">Good Listening</span>
                  </div>
                  
                  {/* Tip card that gently pulses */}
                  <div className="p-4 bg-yellow-500/10 border border-yellow-400/20 rounded-xl animate-pulse">
                    <div className="flex items-start gap-3">
                      <Target className="h-5 w-5 text-yellow-400 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium text-yellow-300 mb-1">Tip for next time:</div>
                        <div className="text-yellow-400">Try asking more open-ended questions</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Footer message */}
                <div className="text-center pt-2 border-t border-white/10">
                  <p className="text-sm text-gray-400 italic">
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
          <div className="max-w-sm mx-auto space-y-8 text-center animate-fade-in">
            <div className="space-y-4">
              <h2 className="text-[24px] font-semibold text-white tracking-[-0.3px]">What's Your Main Goal?</h2>
              <p className="text-gray-400 text-base max-w-[30ch] mx-auto">Choose what you want to focus on first</p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">so we tailor missions</p>
            </div>
            
            {/* Illustrated goal cards */}
            <div className="space-y-3">
              {goals.map((goal) => {
                const isSelected = selectedGoal === goal.id;
                return (
                  <button
                    key={goal.id}
                    onClick={() => setSelectedGoal(goal.id)}
                    className={`w-full p-4 rounded-2xl border transition-all duration-300 text-left hover:scale-[1.02] ${
                      isSelected 
                        ? 'border-purple-400/50 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.35)] scale-[1.02]' 
                        : 'border-white/20 bg-[rgba(8,12,24,0.55)] backdrop-blur-[20px] hover:border-purple-400/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Mini illustration */}
                      <div className={`text-2xl transition-transform duration-300 ${isSelected ? 'scale-110' : ''}`}>
                        {goal.title.split(' ')[0]}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-white">{goal.title}</div>
                        <div className="text-xs text-gray-400 mt-1">{goal.desc}</div>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="h-5 w-5 text-purple-400 animate-scale-in" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            
            {selectedGoal && (
              <p className="text-sm text-purple-400 animate-fade-in">Continue with this goal</p>
            )}
          </div>
        );

      // Step 7: Experience Slider
      case 7:
        return (
          <div className="max-w-sm mx-auto space-y-8 text-center animate-fade-in">
            <div className="space-y-4">
              <h2 className="text-[24px] font-semibold text-white tracking-[-0.3px]">How Socially Experienced Are You?</h2>
              <p className="text-gray-400 text-base">Help us personalize your training</p>
            </div>
            
            {/* Emoji slider */}
            <div className="space-y-6">
              <div className="text-7xl transition-all duration-300">
                {getExperienceEmoji(experienceLevel[0])}
              </div>
              
              {/* Two-tone slider track */}
              <div className="px-6">
                <div className="relative">
                  <Slider
                    value={experienceLevel}
                    onValueChange={setExperienceLevel}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-3">
                    <span>😅 Shy</span>
                    <span>😎 Pro</span>
                  </div>
                </div>
              </div>
              
              {/* Dynamic helper text */}
              <div className="p-4 bg-[rgba(8,12,24,0.55)] backdrop-blur-[20px] border border-white/6 rounded-2xl">
                <p className="text-sm text-gray-300 font-medium">
                  {getHelperText(experienceLevel[0])}
                </p>
              </div>
            </div>
          </div>
        );

      // Step 8: Commitment & Streak Start
      case 8:
        return (
          <div className="max-w-sm mx-auto space-y-8 text-center animate-fade-in">
            <div className="space-y-4">
              <h2 className="text-[24px] font-semibold text-white tracking-[-0.3px]">You're ready. Start your journey!</h2>
              <p className="text-gray-400 text-base">Can you practice every day?</p>
            </div>
            
            {/* Glass coin with Day 1 */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/15 to-pink-500/15 rounded-2xl blur-lg"></div>
              <div className="relative bg-[rgba(8,12,24,0.55)] backdrop-blur-[20px] border border-white/6 rounded-2xl p-8 shadow-[0_18px_40px_-10px_rgba(0,0,0,0.35)]">
                
                {/* Glass coin with flame */}
                <div className="relative mx-auto w-24 h-24 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-pink-500/20 rounded-full backdrop-blur-sm border border-orange-400/30 transform rotate-8 animate-[spin_8s_ease-in-out_infinite]"></div>
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Flame className="h-12 w-12 text-orange-400 animate-pulse" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-2xl font-bold text-white">Day 1</div>
                  </div>
                </div>
                
                {/* Level progress with tick marks */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Level 1</span>
                    <span>0/50 XP</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden relative">
                    {/* Gamey tick marks */}
                    <div className="absolute inset-0 flex justify-between items-center px-1">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-px h-2 bg-white/30"></div>
                      ))}
                    </div>
                    <div className="h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-0 animate-pulse"></div>
                  </div>
                </div>
                
                {/* Motivational text */}
                <div className="space-y-3">
                  <p className="font-medium text-green-400">Your first rep earns XP... even if you fail!</p>
                  <p className="text-sm text-gray-400">Consistency is key – come back daily to build your streak!</p>
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
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1F] to-[#11162B] flex flex-col relative overflow-hidden">
      {/* Subtle grain/noise overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-gradient-to-br from-gray-900/50 to-transparent pointer-events-none"></div>
      
      {/* Progress rail with shimmer */}
      <div className="sticky top-0 z-50 p-6 bg-[rgba(8,12,24,0.8)] backdrop-blur-[18px] border-b border-white/6">
        <div className="max-w-sm mx-auto">
          <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
            <span className="text-xs uppercase tracking-wide font-medium">{step}/8</span>
            <button 
              onClick={skip} 
              className="text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
            >
              Skip
            </button>
          </div>
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
            <div 
              className="h-[2px] bg-gradient-to-r from-purple-500 via-purple-400 to-pink-400 rounded-full transition-all duration-500 relative"
              style={{ width: `${(step / 8) * 100}%` }}
            >
              {/* Shimmer sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
            </div>
            {/* Progress dots */}
            <div className="absolute inset-0 flex justify-between items-center">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1 h-1 rounded-full transition-all duration-300 ${
                    i < step ? 'bg-purple-400' : 'bg-white/20'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content with proper spacing */}
      <div className="flex-1 flex items-center justify-center p-6 pb-32">
        <div className="w-full">
          {renderStep()}
        </div>
      </div>

      {/* Navigation with gradient pill buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0A0F1F] via-[#0A0F1F]/95 to-transparent">
        <div className="max-w-sm mx-auto flex gap-4">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 h-14 bg-white/10 text-gray-300 rounded-xl font-medium transition-all duration-200 hover:bg-white/15 hover:text-white border border-white/20"
            >
              Back
            </button>
          )}
          <button 
            onClick={handleNext}
            disabled={isNextDisabled()}
            className={`flex-1 h-14 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              isNextDisabled() 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : `bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl active:scale-[0.98] ${
                    buttonPressed ? 'scale-[0.98]' : ''
                  }`
            }`}
            onMouseDown={() => setButtonPressed(true)}
            onMouseUp={() => setButtonPressed(false)}
            onMouseLeave={() => setButtonPressed(false)}
          >
            {step === 8 ? "Begin First Mission" : "Continue"}
            <ChevronRight className={`h-5 w-5 transition-transform duration-200 ${buttonPressed ? 'translate-x-1' : ''}`} />
          </button>
        </div>
      </div>
      
      {/* Confetti for final step */}
      {confetti && step === 8 && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}