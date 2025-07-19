import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Crown, Zap } from 'lucide-react';
import PracticeStepCard from '@/components/PracticeStepCard';

interface StepData {
  id: string;
  title: string;
  icon: string;
  status: 'locked' | 'unlocked' | 'completed';
}

interface CategoryConfig {
  title: string;
  subtitle: string;
  theme: 'dating' | 'interview' | 'charisma' | 'speaking';
  steps: StepData[];
  totalXP: number;
  level: number;
}

const PracticeRoad = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const categoryConfigs: Record<string, CategoryConfig> = {
    dating: {
      title: 'Dating & Romance',
      subtitle: 'Master the art of romantic connection',
      theme: 'dating',
      totalXP: 1450,
      level: 3,
      steps: [
        { id: 'conversation', title: 'Start a Conversation', icon: '💬', status: 'completed' },
        { id: 'playful', title: 'Be Playful', icon: '😄', status: 'completed' },
        { id: 'tension', title: 'Build Tension', icon: '💓', status: 'completed' },
        { id: 'spark', title: 'Create Spark', icon: '🔥', status: 'unlocked' },
        { id: 'rejection', title: 'Handle Rejection', icon: '❌', status: 'locked' },
        { id: 'chemistry', title: 'Build Chemistry', icon: '⚡', status: 'locked' },
        { id: 'escalation', title: 'Physical Escalation', icon: '👫', status: 'locked' }
      ]
    },
    interviews: {
      title: 'Job Interviews',
      subtitle: 'Land your dream job with confidence',
      theme: 'interview',
      totalXP: 890,
      level: 2,
      steps: [
        { id: 'intro', title: 'Introduce Yourself', icon: '🧑‍💼', status: 'completed' },
        { id: 'star', title: 'Answer with STAR', icon: '🎯', status: 'completed' },
        { id: 'eye-contact', title: 'Maintain Eye Contact', icon: '👁️', status: 'unlocked' },
        { id: 'time-management', title: 'Time Management', icon: '⏱️', status: 'unlocked' },
        { id: 'confidence', title: 'Show Confidence', icon: '🧘', status: 'locked' },
        { id: 'questions', title: 'Ask Smart Questions', icon: '🤔', status: 'locked' }
      ]
    },
    charisma: {
      title: 'Charisma & Social Manners',
      subtitle: 'Become naturally magnetic and likeable',
      theme: 'charisma',
      totalXP: 2100,
      level: 4,
      steps: [
        { id: 'first-impression', title: 'First Impressions', icon: '✨', status: 'completed' },
        { id: 'active-listening', title: 'Active Listening', icon: '👂', status: 'completed' },
        { id: 'storytelling', title: 'Storytelling', icon: '📚', status: 'completed' },
        { id: 'humor', title: 'Use Humor', icon: '😂', status: 'completed' },
        { id: 'presence', title: 'Command Presence', icon: '👑', status: 'unlocked' },
        { id: 'networking', title: 'Smart Networking', icon: '🤝', status: 'unlocked' },
        { id: 'influence', title: 'Gentle Influence', icon: '🎭', status: 'locked' }
      ]
    },
    speaking: {
      title: 'Public Speaking',
      subtitle: 'Captivate any audience with confidence',
      theme: 'speaking',
      totalXP: 650,
      level: 1,
      steps: [
        { id: 'nerves', title: 'Overcome Nerves', icon: '😰', status: 'completed' },
        { id: 'voice', title: 'Voice Control', icon: '🎤', status: 'unlocked' },
        { id: 'gestures', title: 'Body Language', icon: '👋', status: 'unlocked' },
        { id: 'structure', title: 'Speech Structure', icon: '🏗️', status: 'locked' },
        { id: 'audience', title: 'Read the Audience', icon: '👥', status: 'locked' },
        { id: 'impact', title: 'Memorable Endings', icon: '🎯', status: 'locked' }
      ]
    }
  };

  const config = categoryConfigs[categoryId || ''];

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Category not found</h1>
          <button 
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Return to Practice Hub
          </button>
        </div>
      </div>
    );
  }

  const getThemeBackground = () => {
    switch (config.theme) {
      case 'dating':
        return 'linear-gradient(135deg, #3d1a3d 0%, #6b2154 30%, #b83280 70%, #e91e63 100%)';
      case 'interview':
        return 'linear-gradient(135deg, #0d1421 0%, #1e3a5f 30%, #1e88e5 70%, #42a5f5 100%)';
      case 'charisma':
        return 'linear-gradient(135deg, #0d2818 0%, #1a4d3a 30%, #00c896 70%, #4dd0e1 100%)';
      case 'speaking':
        return 'linear-gradient(135deg, #2d1810 0%, #5d3317 30%, #ff8f00 70%, #ffb74d 100%)';
      default:
        return 'linear-gradient(135deg, #0f1323 0%, #1a1a2e 100%)';
    }
  };

  const completedSteps = config.steps.filter(step => step.status === 'completed').length;
  const progressPercentage = Math.round((completedSteps / config.steps.length) * 100);

  return (
    <div 
      className={`min-h-screen pb-20 transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={{ background: getThemeBackground() }}
    >
      {/* Header */}
      <div className="relative pt-6 pb-8">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-6 left-4 z-10 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Header content */}
        <div className="px-4 pt-12">
          <div className="text-center text-white mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Crown size={20} className="text-yellow-300" />
              <span className="text-sm font-bold text-yellow-200">Level {config.level}</span>
            </div>
            <h1 className="text-3xl font-display font-bold mb-2">{config.title}</h1>
            <p className="text-lg font-display opacity-90 mb-4">{config.subtitle}</p>
            
            {/* Progress overview */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-sm mx-auto">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-yellow-300" />
                  <span className="text-sm font-bold">{config.totalXP.toLocaleString()} XP</span>
                </div>
                <span className="text-sm font-bold text-green-200">{progressPercentage}% complete</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="h-full bg-white/70 rounded-full transition-all duration-700"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="text-xs opacity-75 mt-1">
                {completedSteps} of {config.steps.length} skills mastered
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Road */}
      <div className="px-6 relative">
        {/* Vertical connector line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/20" />
        
        <div className="space-y-4">
          {config.steps.map((step, index) => (
            <PracticeStepCard
              key={step.id}
              id={step.id}
              title={step.title}
              icon={step.icon}
              status={step.status}
              theme={config.theme}
              order={index + 1}
              onClick={() => {
                if (step.status !== 'locked') {
                  // Navigate to specific drill/training
                  navigate('/quick-drill', { 
                    state: { 
                      category: config.theme, 
                      skill: step.id,
                      title: step.title 
                    } 
                  });
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom motivational section */}
      <div className="mt-12 px-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center text-white">
          <p className="text-sm font-medium opacity-90">
            {config.theme === 'dating' && "💕 Love is a skill that can be learned"}
            {config.theme === 'interview' && "🎯 Your next opportunity awaits"}
            {config.theme === 'charisma' && "✨ Charisma is your superpower"}
            {config.theme === 'speaking' && "🎤 Your voice deserves to be heard"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PracticeRoad;