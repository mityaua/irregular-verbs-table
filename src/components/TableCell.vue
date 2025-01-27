<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import unMutedIcon from "@assets/unmuted.svg?url";
import mutedIcon from "@assets/muted.svg?url";

const props = defineProps<{
	verb: string;
	columnName: string;
	searchQuery: string;
}>();

const defaultReversoUrl = "https://context.reverso.net/translation/english-ukrainian/";

const synthesizer = ref<SpeechSynthesis | null>(null);
const isSpeaking = ref<boolean>(false);

const reversoLink = computed<string>(() => `${defaultReversoUrl}${props.verb.split("/")[0]}`);
const linkTitle = computed<string>(() => `Go to Reverso: ${props.verb}`);

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
				:href="reversoLink"
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
