import { computed, readonly, ref, watch } from "vue";
import type { Ref } from "vue";

import { ThemePreference, type ResolvedTheme } from "@/enums/Theme";

const THEME_STORAGE_KEY = "theme";
const THEME_COLORS: Record<ResolvedTheme, string> = {
	[ThemePreference.Light]: "#e1effd",
	[ThemePreference.Dark]: "#1f2937",
};
const DARK_MEDIA_QUERY = "(prefers-color-scheme: dark)";
const THEME_COLOR_META_SELECTOR = 'meta[name="theme-color"]';

export interface UseTheme {
	theme: Readonly<Ref<ThemePreference>>;
	resolvedTheme: Readonly<Ref<ResolvedTheme>>;
	setTheme: (preference: ThemePreference) => void;
}

const isThemePreference = (value: string | null): value is ThemePreference =>
	value === ThemePreference.Light || value === ThemePreference.Dark || value === ThemePreference.System;

const readStoredPreference = (): ThemePreference => {
	try {
		const stored = localStorage.getItem(THEME_STORAGE_KEY);
		return isThemePreference(stored) ? stored : ThemePreference.System;
	} catch {
		return ThemePreference.System;
	}
};

const mediaQuery = window.matchMedia(DARK_MEDIA_QUERY);

const resolveTheme = (preference: ThemePreference): ResolvedTheme =>
	preference === ThemePreference.System
		? mediaQuery.matches
			? ThemePreference.Dark
			: ThemePreference.Light
		: preference;

const applyTheme = (resolved: ResolvedTheme): void => {
	document.documentElement.dataset.theme = resolved;
	document.querySelector<HTMLMetaElement>(THEME_COLOR_META_SELECTOR)?.setAttribute("content", THEME_COLORS[resolved]);
};

const persistPreference = (preference: ThemePreference): void => {
	try {
		localStorage.setItem(THEME_STORAGE_KEY, preference);
	} catch {}
};

const theme = ref<ThemePreference>(readStoredPreference());

watch(
	theme,
	preference => {
		applyTheme(resolveTheme(preference));
		persistPreference(preference);
	},
	{ immediate: true }
);

mediaQuery.addEventListener("change", event => {
	if (theme.value === ThemePreference.System) {
		applyTheme(event.matches ? ThemePreference.Dark : ThemePreference.Light);
	}
});

export const useTheme = (): UseTheme => {
	const resolvedTheme = computed<ResolvedTheme>(() => resolveTheme(theme.value));
	const setTheme = (preference: ThemePreference): void => {
		theme.value = preference;
	};

	return { theme: readonly(theme), resolvedTheme: readonly(resolvedTheme), setTheme };
};
