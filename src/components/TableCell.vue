<template>
  <td class="table-cell">
    <div class="flex justify-center flex-wrap">
      <a
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Reverso in new tab"
        class="ease-in duration-300"
        :title="`Go to Reverso: ${verb}`"
        :href="reversoLink"
      >
        <span v-html="highlightMatches()"></span>
      </a>

      <img
        title="Pronunciation"
        alt="Pronunciation"
        width="16"
        height="16"
        :class="['sound-icon', isSpeaking ? 'opacity-100' : 'opacity-50']"
        :src="isSpeaking ? unMutedIcon : mutedIcon"
        @click.prevent="!isSpeaking && startSpeech()"
      />
    </div>
  </td>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import unMutedIcon from "../assets/unmuted.svg?url";
import mutedIcon from "../assets/muted.svg?url";

const props = defineProps<{
  verb: string;
  columnName: string;
  searchQuery: string;
}>();

const defaultReversoUrl = "https://context.reverso.net/translation/english-ukrainian/";

const synthesizer = ref<SpeechSynthesis | null>(null);
const isSpeaking = ref<boolean>(false);

const reversoLink = computed<string>(() => `${defaultReversoUrl}${props.verb.split("/")[0]}`);

const highlightMatches = (): string => {
  const word = props.verb;
  const query = props.searchQuery;

  if (!query) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const regex = new RegExp(query, "gi");
  const matches = word.match(regex);

  if (!matches) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const upperCasedWord = word.charAt(0).toUpperCase() + word.slice(1);
  const highlighted = upperCasedWord.replace(regex, "<strong>$&</strong>");

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

<style lang="postcss" scoped>
.table-cell {
  @apply py-3 hover:bg-blue-100 dark:hover:bg-gray-600;
}

.table-cell:nth-child(even) {
  @apply bg-gray-100 dark:bg-gray-800;
}

.sound-icon {
  @apply ml-2 hover:opacity-100 ease-in duration-300 cursor-pointer;
}
</style>
