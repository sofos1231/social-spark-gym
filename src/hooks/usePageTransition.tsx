import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const location = useLocation();
  
  const pageOrder = ['/', '/stats', '/shop', '/profile'];
  
  useEffect(() => {
    const currentIndex = pageOrder.indexOf(location.pathname);
    const prevIndex = pageOrder.indexOf(sessionStorage.getItem('prevPath') || '/');
    
    // Determine slide direction based on page order
    if (currentIndex > prevIndex) {
      setDirection('right'); // sliding from right (forward)
    } else if (currentIndex < prevIndex) {
      setDirection('left'); // sliding from left (backward)
    }
    
    setIsTransitioning(true);
    
    // Store current path for next navigation
    sessionStorage.setItem('prevPath', location.pathname);
    
    // Reset transition state after animation completes
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  return { isTransitioning, direction };
};

export default usePageTransition;