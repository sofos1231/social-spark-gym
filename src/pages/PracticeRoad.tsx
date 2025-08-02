import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Lock, 
  CheckCircle, 
  Play, 
  Flame, 
  Diamond,
  Star,
  Clock,
  Trophy,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';

interface Mission {
  id: number;
  title: string;
  description: string;
  type: 'chat' | 'video' | 'boss' | 'premium';
  duration: string;
  xpReward: number;
  status: 'locked' | 'available' | 'completed' | 'current';
  difficulty: 'easy' | 'medium' | 'hard';
}

const PracticeRoad = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [completedAnimations, setCompletedAnimations] = useState<Set<number>>(new Set());

  // Get mission data based on category
  const getMissionData = () => {
    switch (category) {
      case 'dating':
        return {
          title: 'Dating & Romance',
          chapterNumber: 1,
          missions: [
            {
              id: 1,
              title: "Flirty Hello",
              description: "Master the art of an engaging first impression",
              type: 'chat' as const,
              duration: '3 min',
              xpReward: 50,
              status: 'completed' as const,
              difficulty: 'easy' as const
            },
            {
              id: 2,
              title: "Playful Disagreement",
              description: "Navigate disagreements with charm and wit",
              type: 'chat' as const,
              duration: '4 min',
              xpReward: 75,
              status: 'completed' as const,
              difficulty: 'easy' as const
            },
            {
              id: 3,
              title: "Reading the Room",
              description: "Pick up on subtle social cues and respond appropriately",
              type: 'chat' as const,
              duration: '5 min',
              xpReward: 100,
              status: 'completed' as const,
              difficulty: 'medium' as const
            },
            {
              id: 4,
              title: "Storytelling Magic",
              description: "Captivate with engaging personal anecdotes",
              type: 'chat' as const,
              duration: '6 min',
              xpReward: 125,
              status: 'current' as const,
              difficulty: 'medium' as const
            },
            {
              id: 5,
              title: "Confident Compliments",
              description: "Give genuine compliments that create connection",
              type: 'chat' as const,
              duration: '4 min',
              xpReward: 100,
              status: 'available' as const,
              difficulty: 'medium' as const
            },
            {
              id: 6,
              title: "Handling Awkward Silence",
              description: "Turn uncomfortable pauses into opportunities",
              type: 'chat' as const,
              duration: '5 min',
              xpReward: 150,
              status: 'locked' as const,
              difficulty: 'hard' as const
            },
            {
              id: 7,
              title: "Teasing & Banter",
              description: "Master playful conversation dynamics",
              type: 'premium' as const,
              duration: '7 min',
              xpReward: 200,
              status: 'locked' as const,
              difficulty: 'hard' as const
            },
            {
              id: 8,
              title: "Deep Connection",
              description: "Move beyond surface-level conversation",
              type: 'chat' as const,
              duration: '8 min',
              xpReward: 175,
              status: 'locked' as const,
              difficulty: 'hard' as const
            },
            {
              id: 9,
              title: "The Perfect Exit",
              description: "End conversations memorably and gracefully",
              type: 'chat' as const,
              duration: '4 min',
              xpReward: 125,
              status: 'locked' as const,
              difficulty: 'medium' as const
            },
            {
              id: 10,
              title: "Video: Convince Her You're Not Boring",
              description: "Put it all together in a real conversation challenge",
              type: 'boss' as const,
              duration: '3 min',
              xpReward: 300,
              status: 'locked' as const,
              difficulty: 'hard' as const
            }
          ]
        };
      case 'interview':
        return {
          title: 'Job Interviews',
          chapterNumber: 2,
          missions: [
            {
              id: 11,
              title: "Perfect Introduction",
              description: "Make a strong first impression in interviews",
              type: 'chat' as const,
              duration: '4 min',
              xpReward: 60,
              status: 'available' as const,
              difficulty: 'easy' as const
            },
            {
              id: 12,
              title: "Answering Tough Questions",
              description: "Handle challenging interview questions with confidence",
              type: 'chat' as const,
              duration: '6 min',
              xpReward: 100,
              status: 'locked' as const,
              difficulty: 'medium' as const
            },
            {
              id: 13,
              title: "Salary Negotiation",
              description: "Get the compensation you deserve",
              type: 'premium' as const,
              duration: '8 min',
              xpReward: 200,
              status: 'locked' as const,
              difficulty: 'hard' as const
            }
          ]
        };
      case 'charisma':
        return {
          title: 'Charisma & Social Skills',
          chapterNumber: 3,
          missions: [
            {
              id: 21,
              title: "Commanding Presence",
              description: "Enter any room with confidence and authority",
              type: 'chat' as const,
              duration: '5 min',
              xpReward: 75,
              status: 'available' as const,
              difficulty: 'medium' as const
            },
            {
              id: 22,
              title: "Leading Conversations",
              description: "Guide group discussions naturally",
              type: 'chat' as const,
              duration: '7 min',
              xpReward: 125,
              status: 'locked' as const,
              difficulty: 'hard' as const
            }
          ]
        };
      default:
        return {
          title: 'Practice Road',
          chapterNumber: 1,
          missions: []
        };
    }
  };

  const { title, chapterNumber, missions } = getMissionData();

  const completedMissions = missions.filter(m => m.status === 'completed').length;
  const totalMissions = missions.length;
  const progressPercentage = (completedMissions / totalMissions) * 100;

  const getMissionIcon = (mission: Mission) => {
    if (mission.status === 'completed') return <CheckCircle className="w-6 h-6 text-green-400" />;
    if (mission.status === 'locked') return <Lock className="w-6 h-6 text-slate-500" />;
    if (mission.type === 'boss') return <Flame className="w-6 h-6 text-orange-400" />;
    if (mission.type === 'premium') return <Diamond className="w-6 h-6 text-purple-400" />;
    if (mission.type === 'video') return <Play className="w-6 h-6 text-blue-400" />;
    return <Star className="w-6 h-6 text-yellow-400" />;
  };

  const getMissionNodeStyle = (mission: Mission) => {
    const baseClasses = "relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 border-2 cursor-pointer";
    
    if (mission.status === 'completed') {
      return `${baseClasses} bg-green-500/20 border-green-400 shadow-lg shadow-green-400/30`;
    }
    if (mission.status === 'current') {
      return `${baseClasses} bg-primary/20 border-primary shadow-lg shadow-primary/40 animate-pulse`;
    }
    if (mission.status === 'available') {
      return `${baseClasses} bg-slate-700/50 border-slate-600 hover:border-primary hover:bg-primary/10`;
    }
    if (mission.type === 'boss') {
      return `${baseClasses} bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-400 shadow-lg shadow-orange-400/30`;
    }
    if (mission.type === 'premium') {
      return `${baseClasses} bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400 shadow-lg shadow-purple-400/30`;
    }
    return `${baseClasses} bg-slate-800/50 border-slate-700`;
  };

  const getPathStyle = (index: number) => {
    const mission = missions[index];
    if (mission.status === 'completed') {
      return "bg-gradient-to-b from-green-400 to-green-600";
    }
    if (mission.status === 'current' && index > 0) {
      return "bg-gradient-to-b from-green-400 to-primary";
    }
    return "bg-slate-700";
  };

  const handleMissionClick = (mission: Mission) => {
    if (mission.status === 'locked') return;
    
    // Add haptic feedback simulation
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    setSelectedMission(mission);
    
    // Navigate to mission after a brief delay for visual feedback
    setTimeout(() => {
      if (mission.type === 'premium') {
        navigate('/upgrade');
      } else {
        navigate(`/practice/${mission.id}`);
      }
    }, 150);
  };

  return (
    <div 
      className="min-h-screen pb-20 pt-16"
      style={{ background: 'var(--gradient-background)' }}
    >
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 pb-2" style={{ background: 'var(--gradient-background)' }}>
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/practice')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <div className="text-center">
            <h1 className="text-lg font-display font-bold text-white">{title}</h1>
            <p className="text-sm text-slate-300">Chapter {chapterNumber}</p>
          </div>
          <div className="w-16" /> {/* Spacer */}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-300">Progress</span>
            <span className="text-white font-medium">{completedMissions}/{totalMissions} missions</span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-2 bg-slate-800"
          />
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{Math.round(progressPercentage)}% Complete</span>
            <div className="flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              <span>{missions.reduce((sum, m) => m.status === 'completed' ? sum + m.xpReward : sum, 0)} XP earned</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Road */}
      <div className="px-8 pt-32">
        <div className="relative max-w-md mx-auto">
          {missions.map((mission, index) => (
            <div key={mission.id} className="relative">
              {/* Mission Node */}
              <div 
                className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-8`}
              >
                <div className="flex items-center gap-4">
                  {index % 2 === 1 && (
                    <Card 
                      className={`p-3 max-w-[200px] card-warm cursor-pointer transform transition-all duration-200 ${
                        selectedMission?.id === mission.id ? 'scale-105' : 'hover:scale-102'
                      } ${mission.status === 'locked' ? 'opacity-50' : ''}`}
                      onClick={() => handleMissionClick(mission)}
                    >
                      <div className="text-right">
                        <div className="flex items-center justify-end gap-2 mb-1">
                          {mission.type === 'boss' && <Flame className="w-3 h-3 text-orange-400" />}
                          {mission.type === 'premium' && <Diamond className="w-3 h-3 text-purple-400" />}
                          <h3 className="text-sm font-semibold text-white">{mission.title}</h3>
                        </div>
                        <p className="text-xs text-slate-300 mb-2">{mission.description}</p>
                        <div className="flex items-center justify-end gap-3 text-xs text-slate-400">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {mission.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Zap className="w-3 h-3 text-yellow-400" />
                            {mission.xpReward} XP
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* Mission Node Circle */}
                  <div 
                    className={getMissionNodeStyle(mission)}
                    onClick={() => handleMissionClick(mission)}
                  >
                    {getMissionIcon(mission)}
                    
                    {/* Boss Mission Fire Effect */}
                    {mission.type === 'boss' && mission.status !== 'locked' && (
                      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-orange-400 to-red-500 opacity-20 animate-pulse" />
                    )}
                    
                    {/* Premium Mission Glow */}
                    {mission.type === 'premium' && (
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-30 animate-pulse" />
                    )}
                  </div>

                  {index % 2 === 0 && (
                    <Card 
                      className={`p-3 max-w-[200px] card-warm cursor-pointer transform transition-all duration-200 ${
                        selectedMission?.id === mission.id ? 'scale-105' : 'hover:scale-102'
                      } ${mission.status === 'locked' ? 'opacity-50' : ''}`}
                      onClick={() => handleMissionClick(mission)}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-white">{mission.title}</h3>
                        {mission.type === 'boss' && <Flame className="w-3 h-3 text-orange-400" />}
                        {mission.type === 'premium' && <Diamond className="w-3 h-3 text-purple-400" />}
                      </div>
                      <p className="text-xs text-slate-300 mb-2">{mission.description}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {mission.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="w-3 h-3 text-yellow-400" />
                          {mission.xpReward} XP
                        </div>
                      </div>
                    </Card>
                  )}
                </div>
              </div>

              {/* Connection Path */}
              {index < missions.length - 1 && (
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-8 -mt-4 mb-4">
                  <div className={`w-full h-full ${getPathStyle(index)} transition-all duration-500`} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Chapter Complete Celebration */}
        {progressPercentage === 100 && (
          <Card className="mt-8 p-6 card-warm text-center animate-scale-in">
            <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-display font-bold text-gradient-xp mb-2">
              Chapter Complete! 🎉
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              You've mastered the basics of dating communication. Ready for the next challenge?
            </p>
            <Button className="w-full">
              Continue to Chapter 2
            </Button>
          </Card>
        )}
      </div>

      {/* Bottom Spacing */}
      <div className="h-20" />
    </div>
  );
};

export default PracticeRoad;