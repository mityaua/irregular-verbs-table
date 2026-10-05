<script setup lang="ts">
import { computed } from "vue";

import { useSpeechSynthesis } from "@/composables/useSpeechSynthesis";

import MutedIcon from "@assets/muted.svg";
import UnMutedIcon from "@assets/unmuted.svg";

const props = defineProps<{
	verb: string;
}>();

const { currentText, speak, cancel } = useSpeechSynthesis();

const pronounceText = computed<string>(() => props.verb.split("/").join(", "));
const isSpeaking = computed<boolean>(() => currentText.value === pronounceText.value);

const onPronounce = (): void => {
	if (isSpeaking.value) {
		cancel();
	} else {
		speak(pronounceText.value);
	}
};
</script>

<template>
	<button
		type="button"
		:aria-pressed="isSpeaking"
		:aria-label="`${isSpeaking ? 'Stop' : 'Play'} pronunciation of '${verb}'`"
		:title="isSpeaking ? 'Stop pronunciation' : 'Pronunciation'"
		class="inline-flex cursor-pointer items-center justify-center rounded p-1 text-gray-400 transition-all duration-300 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500/40 focus:outline-none dark:text-gray-500"
		@click="onPronounce"
	>
		<component aria-hidden="true" :is="isSpeaking ? UnMutedIcon : MutedIcon" class="size-4" />
	</button>
</template>
