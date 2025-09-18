import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ModeCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  ctaText: string;
  badge?: string;
  variant: 'spark' | 'hub' | 'shadow';
  onClick: () => void;
}

export const ModeCard: React.FC<ModeCardProps> = ({
  title,
  description,
  icon: Icon,
  ctaText,
  badge,
  variant,
  onClick
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'spark':
        return 'bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 border-amber-300 shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30';
      case 'hub':
        return 'bg-gradient-to-br from-primary via-primary/90 to-primary/80 border-primary/20 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25';
      case 'shadow':
        return 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 border-slate-600 shadow-lg shadow-slate-900/50 hover:shadow-xl hover:shadow-slate-900/60';
    }
  };

  const getTextClasses = () => {
    switch (variant) {
      case 'spark':
        return 'text-amber-900';
      case 'hub':
        return 'text-primary-foreground';
      case 'shadow':
        return 'text-slate-100';
    }
  };

  const getDescriptionClasses = () => {
    switch (variant) {
      case 'spark':
        return 'text-amber-800/90';
      case 'hub':
        return 'text-primary-foreground/80';
      case 'shadow':
        return 'text-slate-300';
    }
  };

  const getBadgeClasses = () => {
    switch (variant) {
      case 'spark':
        return 'bg-amber-200 text-amber-900 border-amber-300';
      case 'hub':
        return 'bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30';
      case 'shadow':
        return 'bg-slate-600 text-slate-200 border-slate-500';
    }
  };

  return (
    <Card
      className={cn(
        'p-6 cursor-pointer transition-all duration-200 hover:scale-[0.98] active:scale-95 min-h-[140px] border-2',
        getVariantClasses()
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className={cn('p-2 rounded-lg bg-white/10 backdrop-blur-sm')}>
          <Icon className={cn('w-6 h-6', getTextClasses())} />
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className={cn('text-xl font-bold', getTextClasses())}>
              {title}
            </h3>
            {badge && (
              <Badge 
                className={cn('text-xs font-medium', getBadgeClasses())}
                variant="outline"
              >
                {badge}
              </Badge>
            )}
          </div>
          
          <p className={cn('text-sm leading-relaxed', getDescriptionClasses())}>
            {description}
          </p>
          
          <div className="pt-2">
            <span className={cn('text-sm font-semibold', getTextClasses())}>
              {ctaText} →
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};