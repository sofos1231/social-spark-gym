import React from 'react';
import { TouchableOpacity as RNTouchableOpacity, TouchableOpacityProps as RNTouchableOpacityProps } from 'react-native';
import { globalStyles } from '@/styles/globalStyles';

interface TouchableOpacityProps extends RNTouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'none';
  children?: React.ReactNode;
}

export const TouchableOpacity: React.FC<TouchableOpacityProps> = ({ 
  variant = 'none', 
  style, 
  children, 
  activeOpacity = 0.8,
  ...props 
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'primary':
        return globalStyles.buttonPrimary;
      case 'secondary':
        return globalStyles.buttonSecondary;
      case 'outline':
        return globalStyles.buttonOutline;
      default:
        return {};
    }
  };

  return (
    <RNTouchableOpacity 
      style={[getVariantStyle(), style]} 
      activeOpacity={activeOpacity}
      {...props}
    >
      {children}
    </RNTouchableOpacity>
  );
};