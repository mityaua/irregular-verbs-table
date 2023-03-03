<template>
  <tr class="border-b border-gray-200 dark:border-gray-700">
    <!-- Infinitive cell -->
    <td scope="row" class="py-3 hover:bg-blue-100 dark:hover:bg-gray-600" @click="handleCellClick(rowData, Object.keys(rowData)[0])">
      <div class="flex justify-center flex-wrap">
        <a
          :href="`https://context.reverso.net/translation/english-ukrainian/${rowData.infinitive.split('/')[0]}`"
          target="_blank"
          rel="noopener noreferrer"
          :title="`Go to Reverso: ${rowData.infinitive}`"
          aria-label="Open Reverso in new tab"
          class="ease-in duration-300"
        >
          <span v-html="highlightMatches(rowData.infinitive, searchQuery)"></span>
        </a>

        <img
          title="Pronunciation"
          :src="selectedColumn === Object.keys(rowData)[0] && clickedRowIndex === rowIndex && speaking ? unMutedIcon : mutedIcon"
          alt="Pronunciation"
          width="16"
          height="16"
          class="ml-2 opacity-50 hover:opacity-100 ease-in duration-300 cursor-pointer"
          @click.prevent="
            selectedColumn === Object.keys(rowData)[0] && clickedRowIndex === rowIndex && speaking
              ? ''
              : startSpeech(rowData.infinitive.split('/').join())
          "
        />
      </div>
    </td>

    <!-- Past simple cell -->
    <td
      class="py-3 bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-600"
      @click="handleCellClick(rowData, Object.keys(rowData)[1])"
    >
      <div class="flex justify-center flex-wrap">
        <a
          :href="`https://context.reverso.net/translation/english-ukrainian/${rowData.pastSimple.split('/')[0]}`"
          target="_blank"
          rel="noopener noreferrer"
          :title="`Go to Reverso: ${rowData.pastSimple}`"
          aria-label="Open Reverso in new tab"
          class="ease-in duration-300"
        >
          <span v-html="highlightMatches(rowData.pastSimple, searchQuery)"></span>
        </a>

        <img
          title="Pronunciation"
          :src="selectedColumn === Object.keys(rowData)[1] && clickedRowIndex === rowIndex && speaking ? unMutedIcon : mutedIcon"
          alt="Pronunciation"
          width="16"
          height="16"
          class="ml-2 opacity-50 hover:opacity-100 ease-in duration-300 cursor-pointer"
          @click.prevent="
            selectedColumn === Object.keys(rowData)[1] && clickedRowIndex === rowIndex && speaking
              ? ''
              : startSpeech(rowData.pastSimple.split('/').join())
          "
        />
      </div>
    </td>

    <!--  Past participle cell -->
    <td class="py-3 hover:bg-blue-100 dark:hover:bg-gray-600" @click="handleCellClick(rowData, Object.keys(rowData)[2])">
      <div class="flex justify-center flex-wrap">
        <a
          :href="`https://context.reverso.net/translation/english-ukrainian/${rowData.pastParticiple.split('/')[0]}`"
          target="_blank"
          rel="noopener noreferrer"
          :title="`Go to Reverso: ${rowData.pastParticiple}`"
          aria-label="Open Reverso in new tab"
          class="ease-in duration-300"
        >
          <span v-html="highlightMatches(rowData.pastParticiple, searchQuery)"></span>
        </a>

        <img
          title="Pronunciation"
          :src="selectedColumn === Object.keys(rowData)[2] && clickedRowIndex === rowIndex && speaking ? unMutedIcon : mutedIcon"
          alt="Pronunciation"
          width="16"
          height="16"
          class="ml-2 opacity-50 hover:opacity-100 ease-in duration-300 cursor-pointer"
          @click.prevent="
            selectedColumn === Object.keys(rowData)[2] && clickedRowIndex === rowIndex && speaking
              ? ''
              : startSpeech(rowData.pastParticiple.split('/').join())
          "
        />
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { ref, Ref, toRefs, onMounted, onUnmounted } from "vue";
import IVerb from "../interfaces/Iverbs";
import unMutedIcon from "../assets/unmuted.svg";
import mutedIcon from "../assets/muted.svg";

const props = defineProps<{ verbsData: IVerb[]; rowData: IVerb; rowIndex: Number; searchQuery: string }>();
const { verbsData, rowData, rowIndex, searchQuery } = toRefs(props);

const clickedRowIndex: Ref<number> = ref(-1);
const selectedColumn: Ref<string> = ref("");

const synthesizer = ref<SpeechSynthesis | null>(null);
const speaking: Ref<boolean> = ref(false);

const handleCellClick = (verb: IVerb, columnName: string) => {
  const index = verbsData.value.indexOf(verb);

  clickedRowIndex.value = index;
  selectedColumn.value = columnName;
};

const highlightMatches = (word: string, query: string) => {
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

const startSpeech = (message: string) => {
  speaking.value = true;

  const utterance = new SpeechSynthesisUtterance(message);
  synthesizer.value?.speak(utterance);

  utterance.onend = () => {
    speaking.value = false;
  };
};

onMounted(() => {
  synthesizer.value = window.speechSynthesis;
});

onUnmounted(() => {
  synthesizer.value = null;
});
</script>
