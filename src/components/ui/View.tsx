import React from 'react';
import { View as RNView, ViewProps as RNViewProps } from 'react-native';
import { globalStyles } from '@/styles/globalStyles';

interface ViewProps extends RNViewProps {
  variant?: 'container' | 'card' | 'surface' | 'row' | 'column' | 'center';
  children?: React.ReactNode;
}

export const View: React.FC<ViewProps> = ({ 
  variant, 
  style, 
  children, 
  ...props 
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'container':
        return globalStyles.container;
      case 'card':
        return globalStyles.card;
      case 'surface':
        return globalStyles.cardSurface;
      case 'row':
        return globalStyles.row;
      case 'column':
        return globalStyles.column;
      case 'center':
        return globalStyles.centerContent;
      default:
        return {};
    }
  };

  return (
    <RNView 
      style={[getVariantStyle(), style]} 
      {...props}
    >
      {children}
    </RNView>
  );
};