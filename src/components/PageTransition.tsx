import { ReactNode } from 'react';
import { usePageTransition } from '@/hooks/usePageTransition';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const { isTransitioning, direction } = usePageTransition();
  
  const getAnimationClass = () => {
    if (!isTransitioning) return '';
    
    return direction === 'right' 
      ? 'animate-slide-in-right' 
      : 'animate-slide-in-left';
  };
  
  return (
    <div className={`min-h-screen ${getAnimationClass()}`}>
      {children}
    </div>
  );
};

export default PageTransition;