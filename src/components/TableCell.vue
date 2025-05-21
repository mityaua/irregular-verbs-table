<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import unMutedIcon from "@assets/unmuted.svg?url";
import mutedIcon from "@assets/muted.svg?url";
import { langToReversoMap } from "@/data/lang-map";

const props = defineProps<{
	verb: string;
	columnName: string;
	searchQuery: string;
}>();

const reversoBaseUrl = "https://context.reverso.net/translation/";
const defaultLangPair = langToReversoMap["uk"];

const synthesizer = ref<SpeechSynthesis | null>(null);
const isSpeaking = ref<boolean>(false);

const defaultReversoLangPair = ref<string>(defaultLangPair);
const reversoUrl = computed<string>(
	() => `${reversoBaseUrl}${defaultReversoLangPair.value}/${props.verb.split("/")[0]}`
);
const linkTitle = computed<string>(() => `Go to Reverso: ${props.verb}`);

const detectReversoLanguagePair = (): void => {
	const langCode: string = navigator.language?.split("-")[0].toLowerCase();
	const detectedPair: string = langCode && langToReversoMap[langCode];
	defaultReversoLangPair.value = detectedPair ?? defaultLangPair;
};

const highlightMatches = (): string => {
	const query = props.searchQuery;
	const verb = props.verb;
	const upperCasedVerb = verb.charAt(0).toUpperCase() + verb.slice(1);

	if (!query) {
		return upperCasedVerb;
	}

	const regex = new RegExp(query, "gi");
	const matches = verb.match(regex);

	if (!matches) {
		return upperCasedVerb;
	}

	const highlighted = upperCasedVerb.replace(regex, "<strong>$&</strong>");

	return highlighted;
};

const startSpeech = (): void => {
	isSpeaking.value = true;
	const message: string = props.verb.split("/").join();

	const utterance = new SpeechSynthesisUtterance(message);
	synthesizer.value?.speak(utterance);

	utterance.onend = () => {
		isSpeaking.value = false;
	};
};

onMounted(() => {
	synthesizer.value = window.speechSynthesis;

	detectReversoLanguagePair();
});

onUnmounted(() => {
	synthesizer.value = null;
});
</script>

<template>
	<td class="border border-gray-200 py-3 dark:border-gray-700">
		<div class="flex flex-wrap justify-center">
			<a
				class="text-base text-gray-600 duration-300 ease-in dark:text-gray-400"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Open Reverso in new tab"
				:title="linkTitle"
				:href="reversoUrl"
			>
				<span v-html="highlightMatches()"></span>
			</a>

			<img
				title="Pronunciation"
				alt="Pronunciation"
				width="16"
				height="16"
				:class="['ml-2 cursor-pointer duration-300 ease-in', isSpeaking ? 'opacity-100' : 'opacity-50']"
				:src="isSpeaking ? unMutedIcon : mutedIcon"
				@click.prevent="!isSpeaking && startSpeech()"
			/>
		</div>
	</td>
</template>
