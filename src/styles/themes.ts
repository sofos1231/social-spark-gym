// React Native theme constants converted from CSS variables
export const colors = {
  // Background System
  background: '#10131C',          // --background
  backgroundDeep: '#0D0F1A',      // --background-deep  
  backgroundElevated: '#141519',  // --background-elevated
  backgroundWarm: '#111418',      // --background-warm
  foreground: '#FFFFFF',          // --foreground

  // Card System
  card: '#1C2137',               // --card (hsl(218, 45%, 12%))
  cardForeground: '#FFFFFF',     // --card-foreground
  cardWarm: '#242B44',           // --card-warm (hsl(215, 40%, 15%))
  cardBorder: '#5A6B8A',         // --card-border (hsl(210, 35%, 35%))
  cardGlow: '#4A6CF7',           // --card-glow (hsl(218, 60%, 25%))

  // Primary Colors (Purple = Level/Progress)
  primary: '#8B5CF6',            // --primary (hsl(262, 83%, 58%))
  primaryForeground: '#FFFFFF',   // --primary-foreground
  primaryGlow: '#A78BFA',        // --primary-glow

  // Secondary Colors (Orange = XP/Streak)
  secondary: '#F97316',          // --secondary (hsl(25, 95%, 53%))
  secondaryForeground: '#FFFFFF', // --secondary-foreground
  secondaryGlow: '#FB923C',      // --secondary-glow

  // Success Colors (Green)
  success: '#10B981',            // --success (hsl(142, 76%, 47%))
  successForeground: '#FFFFFF',   // --success-foreground
  successGlow: '#34D399',        // --success-glow

  // Destructive Colors (Red)
  destructive: '#EF4444',        // --destructive (hsl(0, 84%, 55%))
  destructiveForeground: '#FFFFFF', // --destructive-foreground
  destructiveGlow: '#F87171',    // --destructive-glow

  // Neutral Colors
  accent: '#404B5F',             // --accent (hsl(220, 15%, 25%))
  accentForeground: '#FFFFFF',   // --accent-foreground
  accentGlow: '#5A6B8A',         // --accent-glow

  muted: '#404B5F',              // --muted (hsl(220, 20%, 25%))
  mutedForeground: '#B6B6B6',    // --muted-foreground
  foregroundSecondary: '#EAEAEA', // --text-secondary
  surface: '#1C2137',            // Surface color

  // XP Tier Colors
  xpBronze: '#D97706',           // --xp-bronze
  xpSilver: '#9CA3AF',           // --xp-silver
  xpGold: '#F59E0B',             // --xp-gold
  xpDiamond: '#A78BFA',          // --xp-diamond

  // Category Theme Colors
  dating: {
    primary: '#D946EF',          // --dating-primary
    secondary: '#F472B6',        // --dating-secondary
    bg: '#FDF2F8',              // --dating-bg
  },
  interview: {
    primary: '#3B82F6',          // --interview-primary
    secondary: '#93C5FD',        // --interview-secondary
    bg: '#EFF6FF',              // --interview-bg
  },
  charisma: {
    primary: '#059669',          // --charisma-primary
    secondary: '#FCD34D',        // --charisma-secondary
    bg: '#ECFDF5',              // --charisma-bg
  },
  speaking: {
    primary: '#F97316',          // --speaking-primary
    secondary: '#1F2937',        // --speaking-secondary
    bg: '#FFF7ED',              // --speaking-bg
  },

  // UI Elements
  border: '#334155',             // --border (hsl(220, 25%, 20%))
  input: '#1E293B',              // --input (hsl(220, 25%, 15%))
  ring: '#8B5CF6',               // --ring

  // Text Colors
  textPrimary: '#FFFFFF',        // --text-primary
  textSecondary: '#EAEAEA',      // --text-secondary
  textMuted: '#B6B6B6',          // --text-muted
  textAccent: '#A78BFA',         // --text-accent
};

export const spacing = {
  xs: 8,    // 0.5rem
  sm: 16,   // 1rem
  md: 24,   // 1.5rem
  lg: 32,   // 2rem
  xl: 48,   // 3rem
};

export const borderRadius = {
  sm: 6,    // 0.375rem
  md: 12,   // 0.75rem
  lg: 16,   // 1rem
  xl: 24,   // 1.5rem
};

export const shadows = {
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
  elevation: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 8,
  },
  elevated: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 32,
    elevation: 12,
  },
};

export const gradients = {
  primary: ['#8B5CF6', '#A78BFA'],      // Primary gradient
  secondary: ['#F97316', '#FB923C'],    // Secondary gradient
  success: ['#10B981', '#34D399'],      // Success gradient
  destructive: ['#EF4444', '#F87171'], // Destructive gradient
  background: ['#0D0F1A', '#141519'],   // Background gradient
  subtle: ['#1C2137', '#242B44'],       // Subtle gradient
  dating: ['#D946EF', '#F472B6'],       // Dating gradient
  interview: ['#3B82F6', '#93C5FD'],    // Interview gradient
  charisma: ['#059669', '#FCD34D'],     // Charisma gradient
  speaking: ['#F97316', '#1F2937'],     // Speaking gradient
};