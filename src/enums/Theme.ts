export enum ThemePreference {
	Light = "light",
	Dark = "dark",
	System = "system",
}

export type ResolvedTheme = Exclude<ThemePreference, ThemePreference.System>;
