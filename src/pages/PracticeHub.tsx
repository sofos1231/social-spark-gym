import { useNavigate } from 'react-router-dom';
import { Heart, Users, Briefcase, Mic, Smile, Crown, Star, LucideIcon, Flame, Zap, Brain } from 'lucide-react';
import CategorySection from '@/components/CategorySection';
import JourneyFlashcards from '@/components/JourneyFlashcards';
import ProfileCard from '@/components/ProfileCard';

// Import illustrations
import eyeContactIllustration from '@/assets/eye-contact-illustration.jpg';
import handshakeIllustration from '@/assets/handshake-illustration.jpg';
import groupConversationIllustration from '@/assets/group-conversation-illustration.jpg';
import publicSpeakingIllustration from '@/assets/public-speaking-illustration.jpg';
import leadershipIllustration from '@/assets/leadership-illustration.jpg';
import humorIllustration from '@/assets/humor-illustration.jpg';

interface Mission {
  id: string;
  title: string;
  illustration: string;
  category: 'dating' | 'interview' | 'charisma' | 'speaking' | 'humor' | 'power';
  duration: string;
  xpReward: number;
  isLocked?: boolean;
  isCompleted?: boolean;
  progress?: number;
  tags?: Array<{
    type: 'trending' | 'premium' | 'quick' | 'deep' | 'new';
    label: string;
    icon: LucideIcon;
  }>;
}

interface Category {
  id: string;
  title: string;
  description?: string;
  icon: LucideIcon;
  missions: Mission[];
}

const PracticeHub = () => {
  const navigate = useNavigate();

  const categories: Category[] = [
    {
      id: 'top-picks',
      title: 'Top Picks for You',
      description: 'Personalized recommendations based on your progress',
      icon: Star,
      missions: [
        {
          id: 'eye-contact-master',
          title: 'Mastering Eye Contact',
          illustration: eyeContactIllustration,
          category: 'dating',
          duration: '2 min',
          xpReward: 25,
          progress: 65,
          tags: [
            { type: 'trending', label: 'Trending', icon: Flame },
            { type: 'quick', label: '90 sec', icon: Zap }
          ]
        },
        {
          id: 'confident-handshake',
          title: 'Confident Handshake',
          illustration: handshakeIllustration,
          category: 'interview',
          duration: '1 min',
          xpReward: 15,
          isCompleted: true,
          tags: [
            { type: 'quick', label: 'Quick Drill', icon: Zap }
          ]
        },
        {
          id: 'own-the-room',
          title: 'Own the Room',
          illustration: leadershipIllustration,
          category: 'charisma',
          duration: '5 min',
          xpReward: 40,
          tags: [
            { type: 'deep', label: 'Deep Dive', icon: Brain }
          ]
        }
      ]
    },
    {
      id: 'dating',
      title: 'Dating & Romance',
      description: 'Master the art of romantic connections',
      icon: Heart,
      missions: [
        {
          id: 'eye-contact-dating',
          title: 'Mastering Eye Contact',
          illustration: eyeContactIllustration,
          category: 'dating',
          duration: '2 min',
          xpReward: 25,
          progress: 65,
          tags: [
            { type: 'trending', label: 'Trending', icon: Flame },
            { type: 'quick', label: '90 sec', icon: Zap }
          ]
        },
        {
          id: 'push-pull-teasing',
          title: 'Push-Pull Teasing',
          illustration: humorIllustration,
          category: 'dating',
          duration: '3 min',
          xpReward: 30,
          tags: [
            { type: 'trending', label: 'Hot', icon: Flame },
            { type: 'new', label: '+20 XP', icon: Star }
          ]
        },
        {
          id: 'conversation-starters',
          title: 'Conversation Starters',
          illustration: groupConversationIllustration,
          category: 'dating',
          duration: '4 min',
          xpReward: 35,
          isLocked: true,
          tags: [
            { type: 'premium', label: 'Premium', icon: Crown }
          ]
        }
      ]
    },
    {
      id: 'interviews',
      title: 'Job Interviews',
      description: 'Ace your next career opportunity',
      icon: Briefcase,
      missions: [
        {
          id: 'confident-handshake-interview',
          title: 'Confident Handshake',
          illustration: handshakeIllustration,
          category: 'interview',
          duration: '1 min',
          xpReward: 15,
          isCompleted: true,
          tags: [
            { type: 'quick', label: 'Quick Drill', icon: Zap }
          ]
        },
        {
          id: 'tell-me-about-yourself',
          title: 'Acing "Tell Me About Yourself"',
          illustration: publicSpeakingIllustration,
          category: 'interview',
          duration: '6 min',
          xpReward: 45,
          tags: [
            { type: 'deep', label: 'Deep Dive', icon: Brain }
          ]
        },
        {
          id: 'salary-negotiation',
          title: 'Salary Negotiation',
          illustration: handshakeIllustration,
          category: 'interview',
          duration: '8 min',
          xpReward: 50,
          isLocked: true,
          tags: [
            { type: 'premium', label: 'Premium', icon: Crown },
            { type: 'deep', label: 'Advanced', icon: Brain }
          ]
        }
      ]
    },
    {
      id: 'humor',
      title: 'Humor & Comedy',
      description: 'Bring laughter and levity to any situation',
      icon: Smile,
      missions: [
        {
          id: 'witty-comebacks',
          title: 'Witty Comebacks',
          illustration: humorIllustration,
          category: 'humor',
          duration: '3 min',
          xpReward: 30,
          tags: [
            { type: 'trending', label: 'Trending', icon: Flame }
          ]
        },
        {
          id: 'timing-your-jokes',
          title: 'Timing Your Jokes',
          illustration: humorIllustration,
          category: 'humor',
          duration: '4 min',
          xpReward: 35,
          isLocked: true,
          tags: [
            { type: 'premium', label: 'Premium', icon: Crown }
          ]
        },
        {
          id: 'self-deprecating-humor',
          title: 'Self-Deprecating Humor',
          illustration: humorIllustration,
          category: 'humor',
          duration: '3 min',
          xpReward: 25,
          progress: 30,
          tags: [
            { type: 'new', label: 'New', icon: Star }
          ]
        }
      ]
    },
    {
      id: 'power-presence',
      title: 'Power & Presence',
      description: 'Command respect and attention',
      icon: Crown,
      missions: [
        {
          id: 'own-the-room-power',
          title: 'Own the Room',
          illustration: leadershipIllustration,
          category: 'power',
          duration: '5 min',
          xpReward: 40,
          tags: [
            { type: 'deep', label: 'Deep Dive', icon: Brain }
          ]
        },
        {
          id: 'commanding-voice',
          title: 'Commanding Voice Projection',
          illustration: publicSpeakingIllustration,
          category: 'power',
          duration: '4 min',
          xpReward: 35,
          tags: [
            { type: 'deep', label: 'Deep Dive', icon: Brain }
          ]
        },
        {
          id: 'executive-presence',
          title: 'Executive Presence',
          illustration: leadershipIllustration,
          category: 'power',
          duration: '7 min',
          xpReward: 50,
          isLocked: true,
          tags: [
            { type: 'premium', label: 'Premium', icon: Crown },
            { type: 'deep', label: 'Advanced', icon: Brain }
          ]
        }
      ]
    },
    {
      id: 'group-dynamics',
      title: 'Group Dynamics',
      description: 'Master group interactions and leadership',
      icon: Users,
      missions: [
        {
          id: 'team-icebreakers',
          title: 'Team Icebreakers',
          illustration: groupConversationIllustration,
          category: 'charisma',
          duration: '2 min',
          xpReward: 20,
          tags: [
            { type: 'quick', label: '90 sec', icon: Zap }
          ]
        },
        {
          id: 'navigating-group-conversations',
          title: 'Navigating Group Conversations',
          illustration: groupConversationIllustration,
          category: 'charisma',
          duration: '5 min',
          xpReward: 40,
          tags: [
            { type: 'new', label: '+15 XP Bonus', icon: Star }
          ]
        },
        {
          id: 'group-leadership',
          title: 'Group Leadership',
          illustration: leadershipIllustration,
          category: 'charisma',
          duration: '6 min',
          xpReward: 45,
          progress: 80,
          tags: [
            { type: 'deep', label: 'Deep Dive', icon: Brain }
          ]
        }
      ]
    }
  ];

  const handleMissionClick = (mission: Mission) => {
    if (!mission.isLocked) {
      navigate(`/practice/${mission.id}`);
    }
  };

  return (
    <div 
      className="min-h-screen pb-20 pt-4"
      style={{ background: 'var(--gradient-background)' }}
    >
      {/* Profile Card Hero */}
      <ProfileCard />
      
      {/* Header */}
      <div className="section-container text-center mb-8 mt-6">
        <h1 className="heading-hero mb-3 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
          Practice Hub
        </h1>
        <p className="text-lg text-muted-foreground font-medium">
          Master social skills through interactive training
        </p>
      </div>

      {/* Category Sections with Horizontal Carousels */}
      <div className="space-y-8">
        {categories.map((category, index) => (
          <CategorySection
            key={category.id}
            title={category.title}
            description={category.description}
            icon={category.icon}
            missions={category.missions}
            onMissionClick={handleMissionClick}
            animationDelay={index * 200}
          />
        ))}
      </div>

      {/* Stats Section */}
      <div className="section-container-sm mt-12">
        <h2 className="heading-section mb-6">Your Journey</h2>
        <JourneyFlashcards />
      </div>

      {/* Motivational Footer */}
      <div className="section-container-sm mt-8">
        <div className="card-secondary text-center animate-scale-in" style={{ animationDelay: '1000ms' }}>
          <p className="text-sm font-semibold">
            <span className="text-gradient-xp">"Every conversation is a chance to level up!"</span> 💪
          </p>
        </div>
      </div>
    </div>
  );
};

export default PracticeHub;