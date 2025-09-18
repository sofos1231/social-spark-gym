import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const SocialSparkScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/practice-landing')}
            className="text-amber-700 hover:bg-amber-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-200 rounded-lg">
              <Zap className="w-6 h-6 text-amber-700" />
            </div>
            <h1 className="text-2xl font-bold text-amber-900">Social Spark</h1>
          </div>
        </div>

        {/* Content Card */}
        <Card className="border-amber-200 shadow-lg">
          <CardContent className="p-8 text-center space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-amber-900">
                Fast-Paced Social Training
              </h2>
              <p className="text-amber-700 leading-relaxed">
                Experience rapid-fire social scenarios with instant feedback. 
                Swipe through real-world situations and build your social instincts 
                through dynamic, changing challenges.
              </p>
            </div>

            {/* Start Button */}
            <Button 
              size="lg" 
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-amber-900 font-semibold py-4"
            >
              Start Training Session
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SocialSparkScreen;