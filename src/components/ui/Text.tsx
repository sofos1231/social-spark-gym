import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { globalStyles } from '@/styles/globalStyles';

interface TextProps extends RNTextProps {
  variant?: 'hero' | 'large' | 'medium' | 'small' | 'body' | 'bodyLarge' | 'bodySmall' | 'subtitle';
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({ 
  variant = 'body', 
  style, 
  children, 
  ...props 
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'hero':
        return globalStyles.headingHero;
      case 'large':
        return globalStyles.headingLarge;
      case 'medium':
        return globalStyles.headingMedium;
      case 'small':
        return globalStyles.headingSmall;
      case 'bodyLarge':
        return globalStyles.bodyLarge;
      case 'bodySmall':
        return globalStyles.bodySmall;
      case 'subtitle':
        return globalStyles.subtitle;
      default:
        return globalStyles.bodyMedium;
    }
  };

  return (
    <RNText 
      style={[getVariantStyle(), style]} 
      {...props}
    >
      {children}
    </RNText>
  );
};