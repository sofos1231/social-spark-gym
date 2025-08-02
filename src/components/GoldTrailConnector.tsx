interface GoldTrailConnectorProps {
  isCompleted: boolean;
  isActive?: boolean;
  height?: number;
  curve?: 'left' | 'right' | 'straight';
  animationDelay?: number;
}

const GoldTrailConnector = ({ 
  isCompleted, 
  isActive = false, 
  height = 48, 
  curve = 'straight',
  animationDelay = 0
}: GoldTrailConnectorProps) => {
  const getTrailStyle = () => {
    if (isCompleted) {
      return "bg-gradient-to-b from-gold via-gold to-orange-400 shadow-glow-gold";
    }
    if (isActive) {
      return "bg-gradient-to-b from-gold via-primary to-muted animate-flow-active";
    }
    return "bg-muted";
  };

  const getCurveStyle = () => {
    const baseClasses = "relative transition-all duration-700 ease-out";
    
    if (curve === 'left') {
      return `${baseClasses} transform -translate-x-2`;
    }
    if (curve === 'right') {
      return `${baseClasses} transform translate-x-2`;
    }
    return baseClasses;
  };

  return (
    <div className="flex justify-center">
      <div 
        className={getCurveStyle()}
        style={{ 
          animationDelay: `${animationDelay}ms`,
          height: `${height}px`
        }}
      >
        {/* Main Trail */}
        <div 
          className={`w-1 rounded-full ${getTrailStyle()}`}
          style={{ height: `${height}px` }}
        />
        
        {/* Animated Flow Effect for Active Trail */}
        {isActive && (
          <div 
            className="absolute inset-0 w-1 rounded-full bg-gradient-to-b from-transparent via-white/50 to-transparent animate-flow-down"
            style={{ height: `${height}px` }}
          />
        )}
        
        {/* Glow Effect for Completed Trail */}
        {isCompleted && (
          <>
            <div 
              className="absolute -inset-0.5 rounded-full bg-gradient-to-b from-gold/30 to-orange-400/30 blur-sm animate-pulse"
              style={{ height: `${height}px` }}
            />
            {/* Subtle Sparkle Effect */}
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-sparkle" />
            <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-sparkle animation-delay-500" />
          </>
        )}
      </div>
    </div>
  );
};

export default GoldTrailConnector;