import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ShadowModeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/practice-landing')}
            className="text-slate-300 hover:bg-slate-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-700 rounded-lg">
              <EyeOff className="w-6 h-6 text-slate-300" />
            </div>
            <h1 className="text-2xl font-bold text-slate-100">Shadow Mode</h1>
          </div>
        </div>

        {/* Content Card */}
        <Card className="bg-slate-800 border-slate-600 shadow-lg">
          <CardContent className="p-8 text-center space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-100">
                Private Practice Space
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Practice without pressure in a completely private environment. 
                No progress tracking, no statistics, no judgment. Just pure 
                practice to build confidence at your own pace.
              </p>
            </div>

            {/* Start Button */}
            <Button 
              size="lg" 
              className="w-full bg-slate-700 hover:bg-slate-600 text-slate-100 font-semibold py-4 border border-slate-600"
              variant="outline"
            >
              Enter Shadow Mode
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShadowModeScreen;