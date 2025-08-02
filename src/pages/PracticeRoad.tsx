import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Lock, 
  CheckCircle, 
  Play, 
  Flame, 
  Diamond,
  Star,
  Trophy,
  Users,
  Heart,
  Briefcase,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import MissionPopup from '@/components/MissionPopup';

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
  const [showMissionPopup, setShowMissionPopup] = useState(false);

  // Get mission data based on category
  const getMissionData = () => {
    switch (category) {
      case 'dating':
        return {
          title: 'Dating & Romance',
          chapterNumber: 1,
          icon: Heart,
          color: 'from-pink-500 to-red-500',
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
          icon: Briefcase,
          color: 'from-blue-500 to-indigo-500',
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
          icon: Sparkles,
          color: 'from-purple-500 to-pink-500',
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
          icon: Users,
          color: 'from-slate-500 to-slate-600',
          missions: []
        };
    }
  };

  const { title, chapterNumber, icon: CategoryIcon, color, missions } = getMissionData();

  const completedMissions = missions.filter(m => m.status === 'completed').length;
  const totalMissions = missions.length;
  const progressPercentage = (completedMissions / totalMissions) * 100;

  const getMissionIcon = (mission: Mission) => {
    if (mission.status === 'completed') return CheckCircle;
    if (mission.status === 'locked') return Lock;
    if (mission.type === 'boss') return Flame;
    if (mission.type === 'premium') return Diamond;
    if (mission.type === 'video') return Play;
    return Star;
  };

  const getMissionNodeStyle = (mission: Mission) => {
    const baseClasses = "relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg transform hover:scale-105";
    
    if (mission.status === 'completed') {
      return `${baseClasses} bg-gradient-to-br from-green-400 to-green-600 shadow-green-400/30`;
    }
    if (mission.status === 'current') {
      return `${baseClasses} bg-gradient-to-br ${color} shadow-primary/40 animate-pulse`;
    }
    if (mission.status === 'available') {
      return `${baseClasses} bg-gradient-to-br from-slate-600 to-slate-700 shadow-slate-500/30 hover:shadow-primary/30`;
    }
    if (mission.type === 'boss') {
      return `${baseClasses} bg-gradient-to-br from-orange-400 to-red-500 shadow-orange-400/40`;
    }
    if (mission.type === 'premium') {
      return `${baseClasses} bg-gradient-to-br from-purple-400 to-pink-500 shadow-purple-400/40`;
    }
    return `${baseClasses} bg-gradient-to-br from-slate-700 to-slate-800 shadow-slate-600/20`;
  };

  const getPathStyle = (fromMission: Mission, toMission: Mission) => {
    if (fromMission.status === 'completed' && toMission.status === 'completed') {
      return "bg-gradient-to-r from-green-400 to-green-400";
    }
    if (fromMission.status === 'completed' && toMission.status === 'current') {
      return "bg-gradient-to-r from-green-400 to-primary";
    }
    if (fromMission.status === 'completed') {
      return "bg-gradient-to-r from-green-400 to-slate-600";
    }
    return "bg-slate-600";
  };

  const handleMissionClick = (mission: Mission) => {
    setSelectedMission(mission);
    setShowMissionPopup(true);
  };

  const handleStartMission = (mission: Mission) => {
    setShowMissionPopup(false);
    
    setTimeout(() => {
      if (mission.type === 'premium') {
        navigate('/upgrade');
      } else {
        navigate(`/practice/${mission.id}`);
      }
    }, 150);
  };

  const generatePath = () => {
    const radius = 120;
    const centerX = 200;
    const centerY = 200;
    const angleStep = (Math.PI * 2) / missions.length;
    
    return missions.map((_, index) => {
      const angle = index * angleStep - Math.PI / 2; // Start from top
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return { x, y };
    });
  };

  const positions = generatePath();

  return (
    <div 
      className="min-h-screen pb-20 pt-16"
      style={{ background: 'var(--gradient-background)' }}
    >
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 px-4 pt-4 pb-2" style={{ background: 'var(--gradient-background)' }}>
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
            <div className="flex items-center justify-center gap-2 mb-1">
              <CategoryIcon className="w-5 h-5 text-white" />
              <h1 className="text-lg font-display font-bold text-white">{title}</h1>
            </div>
            <p className="text-sm text-slate-300">Chapter {chapterNumber}</p>
          </div>
          <div className="w-16" />
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
      <div className="px-4 pt-32 pb-8">
        <div className="relative w-full max-w-lg mx-auto" style={{ height: '500px' }}>
          {/* Connection Paths */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {missions.map((mission, index) => {
              if (index === missions.length - 1) return null;
              const startPos = positions[index];
              const endPos = positions[index + 1];
              
              return (
                <line
                  key={`path-${index}`}
                  x1={startPos.x}
                  y1={startPos.y}
                  x2={endPos.x}
                  y2={endPos.y}
                  stroke="currentColor"
                  strokeWidth="3"
                  className={getPathStyle(mission, missions[index + 1])}
                  strokeDasharray={mission.status === 'locked' ? "8,8" : "none"}
                />
              );
            })}
          </svg>

          {/* Mission Nodes */}
          {missions.map((mission, index) => {
            const position = positions[index];
            const MissionIcon = getMissionIcon(mission);
            
            return (
              <div key={mission.id} className="absolute" style={{ 
                left: position.x - 40, 
                top: position.y - 40,
                transform: 'translate(0, 0)'
              }}>
                {/* Mission Circle */}
                <div 
                  className={getMissionNodeStyle(mission)}
                  onClick={() => handleMissionClick(mission)}
                >
                  <MissionIcon className="w-8 h-8 text-white" />
                  
                  {/* Special Effects */}
                  {mission.type === 'boss' && mission.status !== 'locked' && (
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-orange-400 to-red-500 opacity-20 animate-pulse" />
                  )}
                  
                  {mission.type === 'premium' && (
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-30 animate-pulse" />
                  )}
                </div>

                {/* Mission Title */}
                <div className="mt-3 text-center">
                  <h3 className="text-sm font-medium text-white leading-tight max-w-[100px] mx-auto">
                    {mission.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chapter Complete Celebration */}
        {progressPercentage === 100 && (
          <div className="mt-8 p-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl text-center animate-scale-in">
            <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-display font-bold text-gradient-xp mb-2">
              Chapter Complete! 🎉
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              You've mastered the basics of {title.toLowerCase()}. Ready for the next challenge?
            </p>
            <Button className="w-full">
              Continue to Chapter {chapterNumber + 1}
            </Button>
          </div>
        )}
      </div>

      {/* Mission Popup */}
      <MissionPopup
        isOpen={showMissionPopup}
        onClose={() => setShowMissionPopup(false)}
        mission={selectedMission}
        onStartMission={handleStartMission}
      />
    </div>
  );
};

export default PracticeRoad;