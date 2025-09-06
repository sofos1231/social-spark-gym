import React from 'react';
import { Button } from '@/components/ui/button';

interface DevButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  className?: string;
}

export default function DevButton({ 
  onClick, 
  children, 
  variant = 'destructive',
  className = '' 
}: DevButtonProps) {
  // Only show in development mode
  if (!import.meta.env.DEV) return null;

  return (
    <Button
      onClick={onClick}
      variant={variant}
      size="sm"
      className={`fixed bottom-20 left-4 z-50 font-bold text-xs shadow-lg ${className}`}
    >
      {children}
    </Button>
  );
}