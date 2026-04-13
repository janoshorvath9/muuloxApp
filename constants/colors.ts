/**
 * App color tokens. Import where you use StyleSheet or inline styles.
 */
export const colors = {
  appPurple: '#26ABBE',
  appPurpleDark: '#1F8FA0',
  /** Slightly lighter brand-blue tile behind the icon on primary rows */
  iconTilePrimary: '#3CC0D2',
  /** Pale blue tile behind the icon on secondary rows */
  iconTileSecondary: '#E6F7FA',
  background: '#F3FBFC',
  textSecondary: '#9ca3af',
  /** Secondary row title — deep teal for contrast on white */
  textPrimary: '#0F3941',
  white: '#fff',
  /** Muted line around secondary cards */
  borderSubtle: '#D7EEF2',
} as const;

export type ColorName = keyof typeof colors;
