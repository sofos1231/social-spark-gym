// Simple className utility for React Native (replacement for clsx + tailwind-merge)
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}