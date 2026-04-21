<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ results: number }>();

const resultsLabel = computed<string>(() => {
	if (props.results === 0) {
		return ""
	};

	return `${props.results} ${props.results === 1 ? "verb" : "verbs"}`;
});
</script>

<template>
	<div class="flex items-center">
		<transition enter-active-class="transition-opacity duration-200 ease-in" enter-from-class="opacity-0"
			leave-active-class="transition-opacity duration-150 ease-out" leave-to-class="opacity-0" mode="out-in">
			<output v-if="results" :key="results" class="text-sm font-normal text-gray-600 whitespace-nowrap dark:text-gray-400">
				{{ resultsLabel }}
			</output>
		</transition>
	</div>
</template>
