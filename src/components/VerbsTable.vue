<script setup lang="ts">
import { ref, Ref } from "vue";
import IVerb from "../interfaces/Iverbs";
import { verbs } from "../data/verbs.json";
import SearchInput from "../components/SearchInput.vue";
import SearchResults from "../components/SearchResults.vue";

const verbsData: Ref<IVerb[]> = ref(verbs);
const filter: Ref<string> = ref("");
const sortDirection: Ref<boolean> = ref(false);

const searchResultsHandler = (results: IVerb[]) => {
  verbsData.value = results;
};
const filterHandler = (query: string) => {
  filter.value = query;
};
const onSort = (columnName: string): void => {
  sortDirection.value = !sortDirection.value;

  verbsData.value = [...verbsData.value].sort((a: IVerb, b: IVerb) =>
    sortDirection.value ? a[columnName].localeCompare(b[columnName]) : b[columnName].localeCompare(a[columnName])
  );
};
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400">
      <!-- Table caption -->
      <caption class="px-4 py-1 text-lg font-semibold text-left text-gray-900 bg-blue-100 dark:text-white dark:bg-gray-800">
        List of irregular verbs

        <!-- Search input -->
        <search-input v-model:filter="filter" :data="verbs" @update-results="searchResultsHandler" @update-filter="filterHandler" />

        <!-- Search results -->
        <search-results :results="verbsData.length" />
      </caption>

      <!-- Table head -->
      <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
        <tr>
          <th scope="col" class="px-3 py-3 bg-gray-50 dark:bg-gray-700">
            <div class="flex justify-center items-center">
              Infinitive
              <a href="#" @click="onSort('infinitive')"
                ><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512">
                  <path
                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"
                  /></svg
              ></a>
            </div>
          </th>

          <th scope="col" class="px-3 py-3 bg-gray-50 dark:bg-gray-700">
            <div class="flex justify-center items-center">
              Past simple
              <a href="#" @click="onSort('pastSimple')"
                ><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512">
                  <path
                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"
                  /></svg
              ></a>
            </div>
          </th>

          <th scope="col" class="px-3 py-3 bg-gray-50 dark:bg-gray-700">
            <div class="flex justify-center items-center">
              Past participle
              <a href="#" @click="onSort('pastParticiple')"
                ><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512">
                  <path
                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"
                  /></svg
              ></a>
            </div>
          </th>
        </tr>
      </thead>

      <!-- Table body -->
      <tbody>
        <tr v-for="verb in verbsData" :key="verb.infinitive" class="border-b border-gray-200 dark:border-gray-700">
          <td scope="row" class="capitalize hover:bg-blue-100 dark:hover:bg-gray-600">
            <a
              :href="`https://context.reverso.net/translation/english-ukrainian/${verb.infinitive}`"
              target="_blank"
              rel="noopener noreferrer"
              class="px-2 py-4"
              style="width: 100%; display: block"
              :title="`Go to Reverso: ${verb.pastSimple}`"
              data-tooltip-target="tooltip-default"
            >
              {{ verb.infinitive }}
            </a>
          </td>
          <td class="capitalize bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-600">
            <a
              :href="`https://context.reverso.net/translation/english-ukrainian/${verb.pastSimple}`"
              target="_blank"
              rel="noopener noreferrer"
              class="px-2 py-4"
              style="width: 100%; display: block"
              :title="`Go to Reverso: ${verb.pastSimple}`"
            >
              {{ verb.pastSimple }}
            </a>
          </td>
          <td class="capitalize hover:bg-blue-100 dark:hover:bg-gray-600">
            <a
              :href="`https://context.reverso.net/translation/english-ukrainian/${verb.pastParticiple}`"
              target="_blank"
              rel="noopener noreferrer"
              class="px-2 py-4"
              style="width: 100%; display: block"
              :title="`Go to Reverso: ${verb.pastSimple}`"
            >
              {{ verb.pastParticiple }}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
