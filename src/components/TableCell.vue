<script setup lang="ts">
import { computed } from "vue";

import { splitIntoSegments } from "@/utils/search";
import type { ISearchSegment } from "@/utils/search";

import { useReversoLink } from "@/composables/useReversoLink";

import PronounceButton from "@components/PronounceButton.vue";

const props = defineProps<{
	verb: string;
	columnName: string;
	searchQuery: string;
}>();

const { url: reversoUrl, title: linkTitle, ariaLabel } = useReversoLink(() => props.verb);

const displayText = computed<string>(() => props.verb.charAt(0).toUpperCase() + props.verb.slice(1));
const segments = computed<ISearchSegment[]>(() => splitIntoSegments(displayText.value, props.searchQuery));
</script>

<template>
	<td class="border border-gray-200 py-3 dark:border-gray-700">
		<div class="flex flex-wrap justify-center">
			<a
				target="_blank"
				rel="noopener noreferrer"
				:aria-label="ariaLabel"
				:title="linkTitle"
				:href="reversoUrl"
				class="text-base text-gray-600 duration-300 ease-in dark:text-gray-400"
			>
				<span>
					<template v-for="(segment, index) in segments" :key="index">
						<mark
							v-if="segment.isMatch"
							class="rounded bg-yellow-200 px-0.5 text-gray-900 dark:bg-yellow-500/30 dark:text-white"
						>
							{{ segment.text }}
						</mark>
						<template v-else>{{ segment.text }}</template>
					</template>
				</span>

				<span class="sr-only"> - translation of the verb '{{ props.verb }}' on Reverso Context</span>
			</a>

			<PronounceButton class="ml-2 dark:hover:bg-gray-800" :verb="props.verb" />
		</div>
	</td>
</template>
