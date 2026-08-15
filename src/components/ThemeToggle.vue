<script setup lang="ts">
import { ThemePreference } from "@/enums/Theme";

import { useTheme } from "@/composables/useTheme";

import MoonIcon from "@assets/moon.svg";
import SunIcon from "@assets/sun.svg";
import SystemIcon from "@assets/system.svg";

const { theme, setTheme } = useTheme();

const options: { value: ThemePreference; label: string; icon: typeof SunIcon }[] = [
	{ value: ThemePreference.Light, label: "Light", icon: SunIcon },
	{ value: ThemePreference.Dark, label: "Dark", icon: MoonIcon },
	{ value: ThemePreference.System, label: "System", icon: SystemIcon },
];
</script>

<template>
	<div
		class="flex items-center gap-1 rounded-lg border border-gray-300 bg-white p-1 dark:border-gray-600 dark:bg-gray-700"
	>
		<button
			v-for="option in options"
			type="button"
			:key="option.value"
			:aria-pressed="theme === option.value"
			:aria-label="`Switch to ${option.label.toLowerCase()} theme`"
			:title="`${option.label} theme`"
			class="inline-flex cursor-pointer items-center justify-center rounded-md p-1.5 text-gray-500 transition-colors duration-200 hover:text-blue-600 aria-pressed:bg-blue-50 aria-pressed:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 dark:aria-pressed:bg-blue-900/30 dark:aria-pressed:text-blue-400"
			@click="setTheme(option.value)"
		>
			<component aria-hidden="true" :is="option.icon" class="size-4" />
		</button>
	</div>
</template>
