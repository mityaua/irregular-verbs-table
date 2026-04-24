<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ results: number }>();

const resultsLabel = computed<string>(() => {
	if (props.results === 0) {
		return "";
	}

	return `${props.results} ${props.results === 1 ? "verb" : "verbs"}`;
});
</script>

<template>
	<div class="flex items-center">
		<transition
			enter-active-class="transition-all duration-300 ease-out"
			enter-from-class="opacity-0 transform -translate-y-2"
			leave-active-class="transition-all duration-200 ease-in"
			leave-to-class="opacity-0 transform translate-y-2"
			mode="out-in"
		>
			<output
				class="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold tracking-wider whitespace-nowrap text-blue-600 uppercase dark:border-blue-800/50 dark:bg-blue-900/30 dark:text-blue-400"
				v-if="results"
				:key="results"
			>
				{{ resultsLabel }}
			</output>
		</transition>
	</div>
</template>
