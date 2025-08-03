import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, globalStyles, spacing, borderRadius, shadows } from '@/styles/globalStyles';

export interface ButtonProps {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'destructive' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  onPress?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const buttonStyles = StyleSheet.create({
  // Base button style
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  
  // Variant styles
  default: {
    backgroundColor: colors.primary,
    ...shadows.sm,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  success: {
    backgroundColor: colors.success,
    ...shadows.sm,
  },
  destructive: {
    backgroundColor: colors.destructive,
    ...shadows.sm,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  link: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  
  // Size styles
  sm: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  lg: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.xl,
  },
  icon: {
    width: 40,
    height: 40,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: borderRadius.md,
  },
  
  // Disabled style
  disabled: {
    opacity: 0.5,
  },
});

const textStyles = StyleSheet.create({
  base: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  default: {
    color: colors.primaryForeground,
  },
  secondary: {
    color: colors.secondaryForeground,
  },
  outline: {
    color: colors.foreground,
  },
  success: {
    color: colors.primaryForeground,
  },
  destructive: {
    color: colors.destructiveForeground,
  },
  ghost: {
    color: colors.foreground,
  },
  link: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  sm: {
    fontSize: 14,
  },
  lg: {
    fontSize: 18,
  },
});

export const Button = React.forwardRef<TouchableOpacity, ButtonProps>(
  ({ variant = 'default', size = 'default', onPress, disabled = false, children, style, textStyle, ...props }, ref) => {
    const buttonStyleArray = [
      buttonStyles.base,
      buttonStyles[variant],
      size !== 'default' && buttonStyles[size],
      disabled && buttonStyles.disabled,
      style,
    ].filter(Boolean);

    const textStyleArray = [
      textStyles.base,
      textStyles[variant],
      size !== 'default' && textStyles[size],
      textStyle,
    ].filter(Boolean);

    return (
      <TouchableOpacity
        ref={ref}
        style={buttonStyleArray}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
        {...props}
      >
        {typeof children === 'string' ? (
          <Text style={textStyleArray}>{children}</Text>
        ) : (
          children
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';
