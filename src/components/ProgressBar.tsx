interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  showNumbers?: boolean;
  size?: 'sm' | 'md' | 'lg';
  intense?: boolean;
}

const ProgressBar = ({ 
  current, 
  max, 
  label, 
  showNumbers = true, 
  size = 'md',
  intense = false
}: ProgressBarProps) => {
  const percentage = Math.min((current / max) * 100, 100);
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  return (
    <div className="w-full">
      {(label || showNumbers) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-foreground">{label}</span>
          )}
          {showNumbers && (
            <span className="text-xs text-muted-foreground">
              {current}/{max}
            </span>
          )}
        </div>
      )}
      
      <div className={`progress-bar ${sizeClasses[size]}`}>
        <div 
          className={intense ? "progress-fill-intense" : "progress-fill"}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {percentage >= 100 && (
        <div className="mt-1 text-xs text-success font-medium flex items-center gap-1">
          <span>🎉</span>
          <span>Complete!</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;