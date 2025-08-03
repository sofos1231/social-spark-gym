import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, borderRadius, shadows } from './themes';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Re-export for compatibility
export { colors, spacing, borderRadius, shadows };

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
