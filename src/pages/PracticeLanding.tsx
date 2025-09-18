import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Map, EyeOff } from 'lucide-react';
import { ModeCard } from '@/components/ModeCard';

const PracticeLanding: React.FC = () => {
  const navigate = useNavigate();

  const handleModeSelect = (mode: string, path: string) => {
    console.log(`mode_selected = ${mode}`);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30 px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 pt-8">
          <h1 className="text-3xl font-bold text-foreground">
            Practice Modes
          </h1>
          <p className="text-muted-foreground text-lg">
            Choose how you want to train today.
          </p>
        </div>

        {/* Mode Cards */}
        <div className="space-y-6">
          <ModeCard
            title="Social Spark"
            description="Fast, changing challenges. Swipe & react."
            icon={Zap}
            ctaText="Start Spark"
            badge="Trending"
            variant="spark"
            onClick={() => handleModeSelect('spark', '/social-spark')}
          />

          <ModeCard
            title="Practice Hub"
            description="Roadmaps, chapters, and skills."
            icon={Map}
            ctaText="Open Hub"
            variant="hub"
            onClick={() => handleModeSelect('hub', '/practice-hub')}
          />

          <ModeCard
            title="Shadow Mode"
            description="Practice freely. No stats tracked."
            icon={EyeOff}
            ctaText="Enter Shadow"
            badge="No Tracking"
            variant="shadow"
            onClick={() => handleModeSelect('shadow', '/shadow-mode')}
          />
        </div>
      </div>
    </div>
  );
};

export default PracticeLanding;