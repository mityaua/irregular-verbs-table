<script setup lang="ts">
import { ref, Ref } from "vue";
import IVerb from "../interfaces/Iverbs";
import { verbs } from "../data/verbs.json";
import TableRow from "./TableRow.vue";
import SearchInput from "../components/SearchInput.vue";
import SearchResults from "../components/SearchResults.vue";

const verbsData: Ref<IVerb[]> = ref(verbs);
const filter: Ref<string> = ref("");
const isDescending: Ref<boolean> = ref(false);

const sortByColumn: Ref<string> = ref("infinitive");

const searchResultsHandler = (results: IVerb[]): void => {
  verbsData.value = [...results].sort((a: IVerb, b: IVerb) =>
    isDescending.value
      ? b[sortByColumn.value].localeCompare(a[sortByColumn.value])
      : a[sortByColumn.value].localeCompare(b[sortByColumn.value])
  );
};
const filterHandler = (query: string): void => {
  filter.value = query;
};
const onSort = (columnName: string): void => {
  sortByColumn.value = columnName;
  isDescending.value = !isDescending.value;

  verbsData.value = [...verbsData.value].sort((a: IVerb, b: IVerb) =>
    isDescending.value ? b[columnName].localeCompare(a[columnName]) : a[columnName].localeCompare(b[columnName])
  );
};
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400" style="overflow: hidden">
      <!-- Table caption -->
      <caption class="px-4 py-1 text-lg font-semibold text-left text-gray-900 bg-blue-100 dark:text-white dark:bg-gray-800">
        <p class="uppercase">List of irregular verbs</p>

        <!-- Search input -->
        <search-input v-model:filter="filter" :data="verbs" @update-results="searchResultsHandler" @update-filter="filterHandler" />

        <!-- Search results -->
        <search-results :results="verbsData.length" />
      </caption>

      <!-- Table head -->
      <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
        <tr>
          <!-- Infinitive column -->
          <th scope="col" class="p-3 bg-gray-50 dark:bg-gray-700">
            <div class="flex justify-center items-center">
              Infinitive
              <a href="#" aria-label="Sort by infinitive" @click="onSort('infinitive')"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-3 h-3 ml-1"
                  aria-hidden="true"
                  :fill="sortByColumn === 'infinitive' ? '#60A5FA' : 'currentColor'"
                  viewBox="0 0 320 512"
                >
                  <path
                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"
                  /></svg
              ></a>
            </div>
          </th>

          <!--  Past simple column -->
          <th scope="col" class="p-3 bg-gray-50 dark:bg-gray-700">
            <div class="flex justify-center items-center">
              Past simple
              <a href="#" aria-label="Sort by past simple" @click="onSort('pastSimple')"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-3 h-3 ml-1"
                  aria-hidden="true"
                  :fill="sortByColumn === 'pastSimple' ? '#60A5FA' : 'currentColor'"
                  viewBox="0 0 320 512"
                >
                  <path
                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"
                  /></svg
              ></a>
            </div>
          </th>

          <!--  Past participle column -->
          <th scope="col" class="p-3 bg-gray-50 dark:bg-gray-700">
            <div class="flex justify-center items-center">
              Past participle
              <a href="#" aria-label="Sort by past participle" @click="onSort('pastParticiple')"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-3 h-3 ml-1"
                  aria-hidden="true"
                  :fill="sortByColumn === 'pastParticiple' ? '#60A5FA' : 'currentColor'"
                  viewBox="0 0 320 512"
                >
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
        <transition-group name="list">
          <!-- Table row -->
          <table-row
            v-for="(verb, index) in verbsData"
            :key="verb.infinitive"
            :verbsData="verbsData"
            :rowData="verb"
            :rowIndex="index"
            :searchQuery="filter"
          />
        </transition-group>
      </tbody>
    </table>
  </div>
</template>

<style lang="css" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease-in-out;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
