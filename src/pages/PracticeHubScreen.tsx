import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const PracticeHubScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/practice-landing')}
            className="text-primary hover:bg-primary/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Map className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Practice Hub</h1>
          </div>
        </div>

        {/* Content Card */}
        <Card className="border-primary/20 shadow-lg">
          <CardContent className="p-8 text-center space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                Structured Learning Path
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Follow comprehensive roadmaps designed to build your social skills 
                systematically. Track your progress through organized chapters and 
                unlock new abilities as you advance.
              </p>
            </div>

            {/* Start Button */}
            <Button 
              size="lg" 
              className="w-full font-semibold py-4"
              variant="default"
            >
              Open Learning Hub
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PracticeHubScreen;