import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Design system colors (keeping the same HSL values converted to RGB)
export const colors = {
  // Background colors
  background: '#000000',
  backgroundSecondary: '#0a0a0a',
  surface: '#1a1a1a',
  card: '#1f1f1f',
  
  // Text colors
  foreground: '#ffffff',
  foregroundSecondary: '#b3b3b3',
  muted: '#666666',
  mutedForeground: '#999999',
  
  // Brand colors
  primary: '#8b5cf6',
  primaryForeground: '#ffffff',
  secondary: '#374151',
  secondaryForeground: '#ffffff',
  accent: '#6366f1',
  accentForeground: '#ffffff',
  
  // Status colors
  destructive: '#ef4444',
  destructiveForeground: '#ffffff',
  warning: '#f59e0b',
  success: '#10b981',
  
  // Border colors
  border: '#333333',
  input: '#374151',
  ring: '#8b5cf6',
  
  // Gradients (for LinearGradient components)
  gradientPrimary: ['#8b5cf6', '#6366f1'],
  gradientSecondary: ['#374151', '#1f2937'],
  gradientSurface: ['#1a1a1a', '#0a0a0a'],
};

// Typography
export const typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  fontWeights: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 96,
};

// Border radius
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

// Shadows (using elevation for Android, shadow for iOS)
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
};

// Common styles
export const globalStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  
  // Text styles
  headingHero: {
    fontSize: typography.fontSizes['4xl'],
    fontWeight: typography.fontWeights.bold,
    color: colors.foreground,
    lineHeight: typography.lineHeights.tight * typography.fontSizes['4xl'],
  },
  headingLarge: {
    fontSize: typography.fontSizes['3xl'],
    fontWeight: typography.fontWeights.bold,
    color: colors.foreground,
    lineHeight: typography.lineHeights.tight * typography.fontSizes['3xl'],
  },
  headingMedium: {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.semibold,
    color: colors.foreground,
    lineHeight: typography.lineHeights.tight * typography.fontSizes['2xl'],
  },
  headingSmall: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: colors.foreground,
    lineHeight: typography.lineHeights.normal * typography.fontSizes.lg,
  },
  bodyLarge: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.normal,
    color: colors.foreground,
    lineHeight: typography.lineHeights.normal * typography.fontSizes.lg,
  },
  bodyMedium: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.normal,
    color: colors.foreground,
    lineHeight: typography.lineHeights.normal * typography.fontSizes.base,
  },
  bodySmall: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.normal,
    color: colors.foregroundSecondary,
    lineHeight: typography.lineHeights.normal * typography.fontSizes.sm,
  },
  subtitle: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.normal,
    color: colors.mutedForeground,
    lineHeight: typography.lineHeights.normal * typography.fontSizes.base,
  },
  
  // Card styles
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.md,
  },
  cardSurface: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.sm,
  },
  
  // Button styles
  buttonPrimary: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    ...shadows.sm,
  },
  buttonSecondary: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  buttonText: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: colors.primaryForeground,
    textAlign: 'center',
  },
  buttonTextSecondary: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: colors.secondaryForeground,
    textAlign: 'center',
  },
  buttonTextOutline: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: colors.foreground,
    textAlign: 'center',
  },
  
  // Input styles
  input: {
    backgroundColor: colors.input,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.fontSizes.base,
    color: colors.foreground,
    borderWidth: 1,
    borderColor: colors.border,
  },
  
  // Screen dimensions
  screenWidth: {
    width: screenWidth,
  },
  screenHeight: {
    height: screenHeight,
  },
  
  // Safe area
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // Positioning
  absolute: {
    position: 'absolute',
  },
  relative: {
    position: 'relative',
  },
  
  // Visibility
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
});

export { screenWidth, screenHeight };
