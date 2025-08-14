import React from 'react';
import { cn } from '@/lib/utils';

interface Mission {
  id: number;
  status: 'locked' | 'available' | 'completed' | 'current';
}

interface EnhancedRoadmapPathProps {
  missions: Mission[];
  pathPoints: { x: number; y: number }[];
  className?: string;
}

const EnhancedRoadmapPath: React.FC<EnhancedRoadmapPathProps> = ({
  missions,
  pathPoints,
  className = ""
}) => {
  const totalHeight = pathPoints[pathPoints.length - 1]?.y + 100 || 400;

  // Generate SVG path string for smooth curves
  const generateSmoothPath = () => {
    if (pathPoints.length < 2) return '';
    
    let path = `M ${pathPoints[0].x} ${pathPoints[0].y}`;
    
    for (let i = 1; i < pathPoints.length; i++) {
      const prev = pathPoints[i - 1];
      const curr = pathPoints[i];
      
      // Control points for smooth curves
      const cpX1 = prev.x;
      const cpY1 = prev.y + (curr.y - prev.y) * 0.3;
      const cpX2 = curr.x;
      const cpY2 = curr.y - (curr.y - prev.y) * 0.3;
      
      path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${curr.x} ${curr.y}`;
    }
    
    return path;
  };

  // Generate completed path up to current mission
  const generateCompletedPath = () => {
    const lastCompletedIndex = missions.reduce((lastIndex, mission, index) => {
      return mission.status === 'completed' ? index : lastIndex;
    }, -1);
    
    if (lastCompletedIndex < 0) return '';
    
    const endIndex = Math.min(lastCompletedIndex + 1, pathPoints.length - 1);
    const completedPoints = pathPoints.slice(0, endIndex + 1);
    
    if (completedPoints.length < 2) return '';
    
    let path = `M ${completedPoints[0].x} ${completedPoints[0].y}`;
    
    for (let i = 1; i < completedPoints.length; i++) {
      const prev = completedPoints[i - 1];
      const curr = completedPoints[i];
      
      const cpX1 = prev.x;
      const cpY1 = prev.y + (curr.y - prev.y) * 0.3;
      const cpX2 = curr.x;
      const cpY2 = curr.y - (curr.y - prev.y) * 0.3;
      
      path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${curr.x} ${curr.y}`;
    }
    
    return path;
  };

  const fullPath = generateSmoothPath();
  const completedPath = generateCompletedPath();

  return (
    <div className={cn("absolute inset-0 pointer-events-none", className)}>
      <svg 
        className="w-full h-full" 
        style={{ height: `${totalHeight}px` }}
        preserveAspectRatio="none"
      >
        <defs>
          {/* Base Path Gradient */}
          <linearGradient id="basePath" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--muted))" />
            <stop offset="100%" stopColor="hsl(var(--muted) / 0.5)" />
          </linearGradient>
          
          {/* Completed Path Gradient */}
          <linearGradient id="completedPath" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--success))" />
            <stop offset="50%" stopColor="hsl(var(--success-glow))" />
            <stop offset="100%" stopColor="hsl(var(--success) / 0.8)" />
          </linearGradient>
          
          {/* Animated Progress Gradient */}
          <linearGradient id="progressPath" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1">
              <animate 
                attributeName="stop-opacity" 
                values="1;0.6;1" 
                dur="2s" 
                repeatCount="indefinite" 
              />
            </stop>
            <stop offset="50%" stopColor="hsl(var(--primary-glow))" stopOpacity="0.8">
              <animate 
                attributeName="stop-opacity" 
                values="0.8;0.4;0.8" 
                dur="2s" 
                repeatCount="indefinite" 
              />
            </stop>
            <stop offset="100%" stopColor="hsl(var(--primary) / 0.6)" stopOpacity="0.6">
              <animate 
                attributeName="stop-opacity" 
                values="0.6;0.3;0.6" 
                dur="2s" 
                repeatCount="indefinite" 
              />
            </stop>
          </linearGradient>
          
          {/* Glow Filter */}
          <filter id="pathGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Shimmer Effect */}
          <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-100 0;100 0;-100 0"
              dur="3s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>
        
        {/* Base Path (Full Route) */}
        {fullPath && (
          <path
            d={fullPath}
            fill="none"
            stroke="url(#basePath)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="8,4"
            opacity="0.3"
          />
        )}
        
        
        {/* Path Decorations (Milestone Markers) */}
        {pathPoints.map((point, index) => {
          if (index % 3 === 0 && index > 0 && index < pathPoints.length - 1) {
            return (
              <g key={`milestone-${index}`}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="3"
                  fill="hsl(var(--accent))"
                  opacity="0.6"
                >
                  <animate
                    attributeName="r"
                    values="3;5;3"
                    dur="3s"
                    repeatCount="indefinite"
                    begin={`${index * 0.5}s`}
                  />
                </circle>
              </g>
            );
          }
          return null;
        })}
      </svg>
    </div>
  );
};

export default EnhancedRoadmapPath;