import { useNavigate } from 'react-router-dom';
import { Heart, Users, Briefcase, Mic, LucideIcon } from 'lucide-react';
import PracticeCard from '@/components/PracticeCard';
import JourneyFlashcards from '@/components/JourneyFlashcards';

interface CategoryData {
  id: string;
  title: string;
  icon: LucideIcon;
  theme: 'dating' | 'interview' | 'charisma' | 'speaking';
  xp: number;
  streak: number;
  completedMissions: number;
  totalMissions: number;
  route: string;
}

interface InfoCardData {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
}

const PracticeHub = () => {
  const navigate = useNavigate();

  const categories: CategoryData[] = [
    {
      id: 'dating',
      title: 'Dating & Romance',
      icon: Heart,
      theme: 'dating',
      xp: 1450,
      streak: 7,
      completedMissions: 12,
      totalMissions: 20,
      route: '/practice-road/dating'
    },
    {
      id: 'interviews',
      title: 'Job Interviews',
      icon: Briefcase,
      theme: 'interview',
      xp: 890,
      streak: 3,
      completedMissions: 5,
      totalMissions: 15,
      route: '/practice-road/interviews'
    },
    {
      id: 'charisma',
      title: 'Charisma & Social Manners',
      icon: Users,
      theme: 'charisma',
      xp: 2100,
      streak: 12,
      completedMissions: 18,
      totalMissions: 25,
      route: '/practice-road/charisma'
    },
    {
      id: 'speaking',
      title: 'Public Speaking',
      icon: Mic,
      theme: 'speaking',
      xp: 650,
      streak: 2,
      completedMissions: 4,
      totalMissions: 12,
      route: '/practice-road/speaking'
    }
  ];

  const handleCategoryClick = (category: CategoryData) => {
    navigate(category.route);
  };

  return (
    <div 
      className="min-h-screen pb-20"
      style={{ background: 'var(--gradient-background)' }}
    >
      {/* Header */}
      <div className="section-container">
        <div className="text-center mb-8">
          <h1 className="heading-hero mb-3">
            Practice Hub
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            Choose your training world
          </p>
        </div>
      </div>

      {/* Category Cards */}
      <div className="section-container-sm">
        <div className="space-y-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <PracticeCard
                id={category.id}
                title={category.title}
                icon={category.icon}
                theme={category.theme}
                xp={category.xp}
                streak={category.streak}
                completedMissions={category.completedMissions}
                totalMissions={category.totalMissions}
                onClick={() => handleCategoryClick(category)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="section-container-sm">
        <h2 className="heading-section">Your Journey</h2>
        <JourneyFlashcards />
      </div>

      {/* Motivational Footer */}
      <div className="section-container-sm">
        <div className="card-secondary text-center animate-scale-in" style={{ animationDelay: '800ms' }}>
          <p className="text-sm font-semibold">
            <span className="text-gradient-xp">"Every conversation is a chance to level up!"</span> 💪
          </p>
        </div>
      </div>
    </div>
  );
};

export default PracticeHub;