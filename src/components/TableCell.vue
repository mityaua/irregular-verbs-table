<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import UnMutedIcon from "@assets/unmuted.svg";
import MutedIcon from "@assets/muted.svg";

import { useSpeechSynthesis } from "@/composables/useSpeechSynthesis";

import { splitIntoSegments } from "@/utils/search";
import type { ISearchSegment } from "@/utils/search";

import { langToReversoMap } from "@/data/lang-map";

const props = defineProps<{
	verb: string;
	columnName: string;
	searchQuery: string;
}>();

const { currentText, speak, cancel } = useSpeechSynthesis();

const reversoBaseUrl = "https://context.reverso.net/translation/";
const defaultLangPair = langToReversoMap["uk"];

const defaultReversoLangPair = ref<string>(defaultLangPair);
const reversoUrl = computed<string>(
	() => `${reversoBaseUrl}${defaultReversoLangPair.value}/${props.verb.split("/")[0]}`
);
const linkTitle = computed<string>(() => `Go to Reverso: ${props.verb}`);
const ariaLabel = computed<string>(() => `Translate '${props.verb}' on Reverso Context`);

const displayText = computed<string>(() => props.verb.charAt(0).toUpperCase() + props.verb.slice(1));
const segments = computed<ISearchSegment[]>(() => splitIntoSegments(displayText.value, props.searchQuery));

const pronounceText = computed<string>(() => props.verb.split("/").join(", "));
const isCellSpeaking = computed<boolean>(() => currentText.value === pronounceText.value);

const onPronounceClick = (): void => {
	if (isCellSpeaking.value) {
		cancel();
	} else {
		speak(pronounceText.value);
	}
};

const detectReversoLanguagePair = (): void => {
	const langCode: string = navigator.language?.split("-")[0].toLowerCase();
	const detectedPair: string = langCode && langToReversoMap[langCode];
	defaultReversoLangPair.value = detectedPair ?? defaultLangPair;
};

onMounted(detectReversoLanguagePair);
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

			<button
				type="button"
				:aria-pressed="isCellSpeaking"
				:aria-label="`${isCellSpeaking ? 'Stop' : 'Play'} pronunciation of '${props.verb}'`"
				:title="isCellSpeaking ? 'Stop pronunciation' : 'Pronunciation'"
				class="ml-2 inline-flex cursor-pointer items-center justify-center rounded p-1 text-gray-400 transition-all duration-300 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500/40 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-800"
				@click="onPronounceClick"
			>
				<component aria-hidden="true" :is="isCellSpeaking ? UnMutedIcon : MutedIcon" class="size-4" />
			</button>
		</div>
	</td>
</template>
