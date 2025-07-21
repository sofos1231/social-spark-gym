import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Users, Briefcase, Mic, MessageCircle, Video, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CategoryData {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  theme: 'dating' | 'interview' | 'charisma' | 'speaking';
  xp: number;
  streak: number;
  completedMissions: number;
  totalMissions: number;
  route: string;
  bgGradient: string;
}

interface TrainingOption {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  isPremium?: boolean;
  route: string;
}

const PracticeHubSwiper = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const swiperRef = useRef<HTMLDivElement>(null);

  const categories: CategoryData[] = [
    {
      id: 'dating',
      title: 'Dating & Romance',
      subtitle: 'Build confidence in romantic conversations',
      icon: Heart,
      theme: 'dating',
      xp: 1450,
      streak: 7,
      completedMissions: 12,
      totalMissions: 20,
      route: '/practice-road/dating',
      bgGradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)'
    },
    {
      id: 'interviews',
      title: 'Job Interviews',
      subtitle: 'Master professional communication',
      icon: Briefcase,
      theme: 'interview',
      xp: 890,
      streak: 3,
      completedMissions: 5,
      totalMissions: 15,
      route: '/practice-road/interviews',
      bgGradient: 'linear-gradient(135deg, #4ECDC4 0%, #6EE6DD 100%)'
    },
    {
      id: 'charisma',
      title: 'Social Skills',
      subtitle: 'Develop charisma and social presence',
      icon: Users,
      theme: 'charisma',
      xp: 2100,
      streak: 12,
      completedMissions: 18,
      totalMissions: 25,
      route: '/practice-road/charisma',
      bgGradient: 'linear-gradient(135deg, #A8E6CF 0%, #C8F7C5 100%)'
    },
    {
      id: 'speaking',
      title: 'Public Speaking',
      subtitle: 'Overcome fear and speak with authority',
      icon: Mic,
      theme: 'speaking',
      xp: 650,
      streak: 2,
      completedMissions: 4,
      totalMissions: 12,
      route: '/practice-road/speaking',
      bgGradient: 'linear-gradient(135deg, #FFD93D 0%, #FFE66D 100%)'
    }
  ];

  const trainingOptions: TrainingOption[] = [
    {
      id: 'ai-chat',
      title: 'AI Chat Practice',
      description: 'Practice with AI scenarios',
      icon: MessageCircle,
      route: '/quick-drill'
    },
    {
      id: 'video-analysis',
      title: 'Video Analysis',
      description: 'Record and get feedback',
      icon: Video,
      isPremium: true,
      route: '/shadow-practice'
    }
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && activeIndex < categories.length - 1) {
      setActiveIndex(prev => prev + 1);
    }
    if (isRightSwipe && activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  const currentCategory = categories[activeIndex];
  const Icon = currentCategory.icon;
  const progressPercentage = (currentCategory.completedMissions / currentCategory.totalMissions) * 100;

  return (
    <div className="flex flex-col h-full">
      {/* Main Category Card */}
      <div 
        ref={swiperRef}
        className="relative flex-1 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex transition-transform duration-300 ease-out h-full"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {categories.map((category, index) => {
            const CategoryIcon = category.icon;
            const categoryProgress = (category.completedMissions / category.totalMissions) * 100;
            
            return (
              <div key={category.id} className="w-full flex-shrink-0 px-6">
                <div 
                  className="relative h-full rounded-3xl p-8 flex flex-col justify-between overflow-hidden shadow-glow-primary/20"
                  style={{ background: category.bgGradient }}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-white/20" />
                    <div className="absolute bottom-8 left-8 w-16 h-16 rounded-full bg-white/15" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <CategoryIcon size={28} className="text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white leading-tight">{category.title}</h2>
                        <p className="text-white/80 text-sm mt-1">{category.subtitle}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center">
                        <div className="text-2xl font-bold text-white">{category.xp}</div>
                        <div className="text-white/70 text-xs font-medium">XP Earned</div>
                      </div>
                      <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center">
                        <div className="text-2xl font-bold text-white flex items-center justify-center gap-1">
                          🔥 {category.streak}
                        </div>
                        <div className="text-white/70 text-xs font-medium">Day Streak</div>
                      </div>
                      <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center">
                        <div className="text-2xl font-bold text-white">{Math.round(categoryProgress)}%</div>
                        <div className="text-white/70 text-xs font-medium">Complete</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/80 text-sm font-medium">Progress</span>
                        <span className="text-white text-sm font-bold">{category.completedMissions}/{category.totalMissions}</span>
                      </div>
                      <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-white rounded-full transition-all duration-700"
                          style={{ width: `${categoryProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Start Training Button */}
                  <div className="relative z-10">
                    <Button
                      onClick={() => navigate(category.route)}
                      className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/30 rounded-2xl py-6 text-lg font-bold transition-all duration-200"
                      variant="outline"
                    >
                      Start Training
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-2 py-6">
        {categories.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === activeIndex 
                ? 'bg-primary w-6' 
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
          />
        ))}
      </div>

      {/* Training Options */}
      <div className="px-6 pb-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Quick Training</h3>
        <div className="grid grid-cols-2 gap-3">
          {trainingOptions.map((option) => {
            const OptionIcon = option.icon;
            return (
              <Button
                key={option.id}
                onClick={() => navigate(option.route)}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2 bg-card-secondary/60 hover:bg-card-secondary border-border/30 rounded-2xl"
              >
                <div className="flex items-center gap-2">
                  <OptionIcon size={16} className="text-muted-foreground" />
                  {option.isPremium && (
                    <div className="text-xs bg-accent-purple text-white px-2 py-0.5 rounded-full">PRO</div>
                  )}
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-foreground">{option.title}</div>
                  <div className="text-xs text-muted-foreground">{option.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PracticeHubSwiper;