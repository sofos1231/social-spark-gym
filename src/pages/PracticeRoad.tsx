import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import ProgressTopStickyBar from '@/components/ProgressTopStickyBar';
import ChapterStartCard from '@/components/ChapterStartCard';
import MissionNodeCompleted from '@/components/MissionNodeCompleted';
import MissionNodeLocked from '@/components/MissionNodeLocked';
import MissionNodeAvailable from '@/components/MissionNodeAvailable';
import GoldTrailConnector from '@/components/GoldTrailConnector';
import MissionMiniCard from '@/components/MissionMiniCard';
import XPBurstOverlay from '@/components/XPBurstOverlay';

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
  const [showXPBurst, setShowXPBurst] = useState(false);
  const [xpBurstData, setXpBurstData] = useState<{ xp: number; position: { x: number; y: number } } | null>(null);
  const [showChapterStart, setShowChapterStart] = useState(true);

  // Get mission data based on category
  const getMissionData = () => {
    switch (category) {
      case 'dating':
        return {
          title: 'Dating & Romance',
          chapterNumber: 1,
          description: 'Master the art of romantic conversation and create meaningful connections with confidence.',
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
              title: "Boss Challenge",
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
          description: 'Ace your next interview with confidence and professional communication skills.',
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
          description: 'Develop magnetic presence and natural leadership abilities in any social setting.',
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
          description: 'Begin your journey to better communication.',
          missions: []
        };
    }
  };

  const { title, chapterNumber, description, missions } = getMissionData();

  const completedMissions = missions.filter(m => m.status === 'completed').length;
  const totalMissions = missions.length;
  const totalXP = missions.reduce((sum, m) => m.status === 'completed' ? sum + m.xpReward : sum, 0);
  const maxPossibleXP = missions.reduce((sum, m) => sum + m.xpReward, 0);
  const streakCount = 3; // Mock streak data

  const handleMissionClick = (mission: Mission) => {
    if (mission.status === 'locked') return;
    
    // Add haptic feedback simulation
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    setSelectedMission(mission);
    
    // Simulate XP burst for completed missions (demo purposes)
    if (mission.status === 'completed') {
      setXpBurstData({
        xp: mission.xpReward,
        position: { x: 50, y: 50 }
      });
      setShowXPBurst(true);
      return;
    }
    
    // Navigate to mission after a brief delay for visual feedback
    setTimeout(() => {
      if (mission.type === 'premium') {
        navigate('/upgrade');
      } else {
        navigate(`/practice/${mission.id}`);
      }
    }, 150);
  };

  const handleStartChapter = () => {
    setShowChapterStart(false);
  };

  const getConnectorCurve = (index: number): 'left' | 'right' | 'straight' => {
    if (index % 4 === 0) return 'left';
    if (index % 4 === 2) return 'right';
    return 'straight';
  };

  const renderMissionNode = (mission: Mission, index: number) => {
    const animationDelay = index * 100;
    
    if (mission.status === 'completed') {
      return (
        <MissionNodeCompleted
          missionType={mission.type}
          xpReward={mission.xpReward}
          onClick={() => handleMissionClick(mission)}
          animationDelay={animationDelay}
          showBadge={index < 3} // Show badges for first few completed missions
        />
      );
    }
    
    if (mission.status === 'locked') {
      return (
        <MissionNodeLocked
          missionType={mission.type}
          animationDelay={animationDelay}
        />
      );
    }
    
    return (
      <MissionNodeAvailable
        missionType={mission.type}
        isCurrentMission={mission.status === 'current'}
        onClick={() => handleMissionClick(mission)}
        animationDelay={animationDelay}
      />
    );
  };

  if (missions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
        <Card className="p-6 text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">Coming Soon</h2>
          <p className="text-muted-foreground">This practice category is being prepared for you.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background pb-20">
      {/* Sticky Top Progress Bar */}
      <ProgressTopStickyBar
        categoryTitle={title}
        chapterNumber={chapterNumber}
        completedMissions={completedMissions}
        totalMissions={totalMissions}
        totalXP={totalXP}
        streakCount={streakCount}
        onBackClick={() => navigate('/practice')}
      />

      {/* Main Content */}
      <div className="pt-28 px-4">
        {/* Chapter Start Card */}
        {showChapterStart && (
          <div className="mb-8">
            <ChapterStartCard
              chapterNumber={chapterNumber}
              categoryTitle={title}
              description={description}
              totalMissions={totalMissions}
              totalXP={maxPossibleXP}
              onStartChapter={handleStartChapter}
              animationDelay={200}
            />
          </div>
        )}

        {/* Mission Road */}
        {!showChapterStart && (
          <div className="max-w-md mx-auto">
            {missions.map((mission, index) => (
              <div key={mission.id} className="relative animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 150}ms` }}>
                {/* Mission Row */}
                <div className={`flex items-center mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className="flex items-center gap-4">
                    {/* Mission Card - Right Side */}
                    {index % 2 === 1 && (
                      <MissionMiniCard
                        mission={mission}
                        position="right"
                        onClick={() => handleMissionClick(mission)}
                        animationDelay={index * 100 + 200}
                      />
                    )}

                    {/* Mission Node */}
                    <div className="relative z-10">
                      {renderMissionNode(mission, index)}
                    </div>

                    {/* Mission Card - Left Side */}
                    {index % 2 === 0 && (
                      <MissionMiniCard
                        mission={mission}
                        position="left"
                        onClick={() => handleMissionClick(mission)}
                        animationDelay={index * 100 + 200}
                      />
                    )}
                  </div>
                </div>

                {/* Connection Trail */}
                {index < missions.length - 1 && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 -mt-4 mb-4 z-0">
                    <GoldTrailConnector
                      isCompleted={mission.status === 'completed'}
                      isActive={mission.status === 'current'}
                      height={48}
                      curve={getConnectorCurve(index)}
                      animationDelay={index * 100 + 300}
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Coming Up Next Teaser */}
            <div className="mt-12 text-center animate-in fade-in" style={{ animationDelay: `${missions.length * 150}ms` }}>
              <Card className="p-4 bg-muted/10 border-muted/20 backdrop-blur-sm">
                <h3 className="text-sm font-semibold text-muted-foreground mb-1">Coming Up Next</h3>
                <p className="text-xs text-muted-foreground">Chapter {chapterNumber + 1} missions will unlock when you complete this chapter</p>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* XP Burst Overlay */}
      {showXPBurst && xpBurstData && (
        <XPBurstOverlay
          xp={xpBurstData.xp}
          position={xpBurstData.position}
          onComplete={() => setShowXPBurst(false)}
          showStreakBonus={streakCount > 0}
          streakMultiplier={1.2}
        />
      )}
    </div>
  );
};

export default PracticeRoad;