import { useState } from 'react';
import { 
  TrendingUp, 
  Flame, 
  Clock, 
  Trophy, 
  Zap, 
  Target, 
  Brain, 
  Heart, 
  Sparkles, 
  MessageCircle, 
  Volume2, 
  Smile, 
  TrendingDown,
  CheckCircle,
  AlertCircle,
  Star,
  Award,
  Users,
  BarChart3
} from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Stats = () => {
  // Key Metrics Data
  const keyMetrics = {
    speakingPace: 130, // WPM
    fillerWordFreq: 4, // per minute
    talkListenRatio: { talk: 60, listen: 40 },
    sentiment: { positive: 65, neutral: 30, negative: 5 },
    confidenceLevel: "High",
    energyClarity: "Moderate-High"
  };

  // Filler Words Data
  const fillerWords = [
    { word: "Um", count: 240, percentage: 40, color: "from-red-400 to-red-600" },
    { word: "Like", count: 120, percentage: 20, color: "from-orange-400 to-orange-600" },
    { word: "You know", count: 90, percentage: 15, color: "from-yellow-400 to-yellow-600" },
    { word: "Uh", count: 75, percentage: 12.5, color: "from-green-400 to-green-600" },
    { word: "So", count: 60, percentage: 10, color: "from-blue-400 to-blue-600" },
    { word: "Other", count: 15, percentage: 2.5, color: "from-purple-400 to-purple-600" }
  ];

  // Strengths Data
  const strengths = [
    {
      title: "Confident Delivery",
      description: "Strong, confident speaking style with high credibility projection",
      icon: <Trophy className="w-5 h-5" />,
      score: 92
    },
    {
      title: "Clear Articulation", 
      description: "Excellent enunciation with minimal mumbling or confusion",
      icon: <Volume2 className="w-5 h-5" />,
      score: 88
    },
    {
      title: "Positive Engagement",
      description: "Friendly tone with encouraging phrases and genuine interest",
      icon: <Smile className="w-5 h-5" />,
      score: 85
    }
  ];

  // Areas for Improvement
  const improvements = [
    {
      title: "Pacing (Slow Down Slightly)",
      description: "At ~130 WPM, consider slowing down for complex explanations",
      priority: "Medium",
      icon: <Clock className="w-5 h-5" />
    },
    {
      title: "Filler Words Reduction", 
      description: "Target reducing 'um' and 'like' to under 2 per minute",
      priority: "High",
      icon: <MessageCircle className="w-5 h-5" />
    },
    {
      title: "Conciseness & Structure",
      description: "Practice more concise responses and structured thinking",
      priority: "Medium", 
      icon: <Target className="w-5 h-5" />
    }
  ];

  // Fun Facts Data
  const funFacts = [
    { label: "Favorite Filler", value: '"Um" - 240 times this week', emoji: "😅" },
    { label: "Longest Um-Free Streak", value: "5 minutes 20 seconds", emoji: "🎉" },
    { label: "Most Talkative Meeting", value: "75% speaking time on Aug 10th", emoji: "🗣️" },
    { label: "Common Catchphrase", value: '70% of responses start with "So"', emoji: "💬" },
    { label: "Vocabulary Variety", value: "8,500 unique words this month", emoji: "📚" }
  ];

  return (
    <div 
      className="min-h-screen pb-20 pt-24"
      style={{ background: 'var(--gradient-background)' }}
    >
      {/* Header */}
      <div className="section-container">
        <div className="text-center mb-8">
          <h1 className="heading-hero mb-3">
            Communication Dashboard
          </h1>
          <p className="text-subtitle">
            AI-powered analysis of your speaking habits and performance
          </p>
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div className="px-4 mb-6">
        <Card className="card-warm animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" />
              Key Metrics Summary
            </CardTitle>
            <CardDescription>
              Comprehensive analysis of your recent conversations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Speaking Pace */}
              <div className="p-4 card-warm">
                <div className="flex items-center gap-2 mb-2">
                  <Volume2 className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-white">Speaking Pace</span>
                </div>
                <div className="text-2xl font-bold text-blue-300 mb-1">{keyMetrics.speakingPace} WPM</div>
                <p className="text-xs text-slate-300">Slightly faster than typical 120-150 WPM</p>
              </div>

              {/* Filler Words */}
              <div className="p-4 card-warm">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-medium text-white">Filler Words</span>
                </div>
                <div className="text-2xl font-bold text-orange-300 mb-1">{keyMetrics.fillerWordFreq}/min</div>
                <p className="text-xs text-slate-300">Improved from ~5/min last month</p>
              </div>

              {/* Talk-Listen Ratio */}
              <div className="p-4 card-warm">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-white">Talk-Listen Ratio</span>
                </div>
                <div className="text-2xl font-bold text-green-300 mb-1">{keyMetrics.talkListenRatio.talk}:{keyMetrics.talkListenRatio.listen}</div>
                <p className="text-xs text-slate-300">Healthy balance in meetings</p>
              </div>

              {/* Sentiment */}
              <div className="p-4 card-warm">
                <div className="flex items-center gap-2 mb-2">
                  <Smile className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-white">Sentiment</span>
                </div>
                <div className="text-2xl font-bold text-purple-300 mb-1">{keyMetrics.sentiment.positive}%</div>
                <p className="text-xs text-slate-300">Positive tone dominance</p>
              </div>

              {/* Confidence */}
              <div className="p-4 card-warm">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium text-white">Confidence Level</span>
                </div>
                <div className="text-2xl font-bold text-yellow-300 mb-1">{keyMetrics.confidenceLevel}</div>
                <p className="text-xs text-slate-300">Steady and credible delivery</p>
              </div>

              {/* Energy & Clarity */}
              <div className="p-4 card-warm">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-teal-400" />
                  <span className="text-sm font-medium text-white">Energy & Clarity</span>
                </div>
                <div className="text-2xl font-bold text-teal-300 mb-1">{keyMetrics.energyClarity}</div>
                <p className="text-xs text-slate-300">Clear articulation, stable energy</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filler Words Breakdown */}
      <div className="px-4 mb-6">
        <Card className="card-warm animate-scale-in" style={{animationDelay: '100ms'}}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-orange-600" />
              Filler Words Usage Breakdown
            </CardTitle>
            <CardDescription>
              Distribution of your most frequently used filler words
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fillerWords.map((filler, index) => (
                <div key={filler.word} className="space-y-2 animate-slide-up" style={{animationDelay: `${200 + index * 50}ms`}}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-foreground min-w-[80px]">"{filler.word}"</span>
                      <span className="text-sm text-muted-foreground">{filler.count} times</span>
                    </div>
                    <span className="text-sm font-bold text-foreground">{filler.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${filler.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${filler.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 card-warm">
              <p className="text-sm text-white leading-relaxed">
                <strong>Key Insight:</strong> "Um" and "like" account for 60% of your filler words. 
                Targeting these for reduction can improve your speech clarity by up to 20%.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strengths */}
      <div className="px-4 mb-6">
        <Card className="card-warm animate-scale-in" style={{animationDelay: '200ms'}}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-6 h-6 text-green-600" />
              Strengths & Positive Traits
            </CardTitle>
            <CardDescription>
              Your communication superpowers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {strengths.map((strength, index) => (
                <div key={strength.title} className="p-4 card-warm animate-slide-up" style={{animationDelay: `${300 + index * 100}ms`}}>
                  <div className="flex items-start gap-3">
                    <div className="text-green-400 mt-1">
                      {strength.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white">{strength.title}</h4>
                        <span className="text-sm font-bold text-green-300">{strength.score}%</span>
                      </div>
                      <p className="text-sm text-slate-300">{strength.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Areas for Improvement */}
      <div className="px-4 mb-6">
        <Card className="card-warm animate-scale-in" style={{animationDelay: '300ms'}}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              Areas for Improvement
            </CardTitle>
            <CardDescription>
              Opportunities to enhance your communication
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {improvements.map((improvement, index) => (
                <div key={improvement.title} className="p-4 card-warm animate-slide-up" style={{animationDelay: `${400 + index * 100}ms`}}>
                  <div className="flex items-start gap-3">
                    <div className="text-blue-400 mt-1">
                      {improvement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white">{improvement.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          improvement.priority === 'High' 
                            ? 'bg-red-500/20 text-red-300 border border-red-400/30'
                            : 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30'
                        }`}>
                          {improvement.priority} Priority
                        </span>
                      </div>
                      <p className="text-sm text-slate-300">{improvement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fun Facts */}
      <div className="px-4 mb-6">
        <Card className="card-warm animate-scale-in" style={{animationDelay: '400ms'}}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              Fun Facts & Quirky Insights
            </CardTitle>
            <CardDescription>
              Interesting patterns and achievements in your speech
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {funFacts.map((fact, index) => (
                <div key={fact.label} className="p-4 card-warm animate-scale-in" style={{animationDelay: `${500 + index * 100}ms`}}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{fact.emoji}</span>
                    <div>
                      <h4 className="font-medium text-white text-sm mb-1">{fact.label}</h4>
                      <p className="text-sm text-slate-300">{fact.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Motivational Footer */}
      <div className="px-4 py-8">
        <div className="card-warm p-6 text-center animate-scale-in" style={{animationDelay: '600ms'}}>
          <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-display font-bold text-gradient-xp mb-2">
            Your AI Communication Coach is Here! 🚀
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Keep reflecting on these insights to become an even more effective communicator. 
            Your progress is tracked over time to help you watch your speaking skills evolve.
          </p>
          <div className="text-xs text-muted-foreground italic">
            "By leveraging your strengths and focusing on specific areas for improvement, 
            you can focus on honing skills like pacing and filler-word reduction. Happy speaking!"
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;