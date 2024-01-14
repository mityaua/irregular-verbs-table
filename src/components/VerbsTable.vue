<script setup lang="ts">
import { computed, ref, Ref, ComputedRef } from "vue";
import IVerb from "../interfaces/IVerb";
import { verbs } from "../data/verbs.json";
import TableRow from "./TableRow.vue";
import SearchInput from "../components/SearchInput.vue";
import SearchResults from "../components/SearchResults.vue";

const defaultSortColumn = "infinitive";

const verbsData: Ref<IVerb[]> = ref(verbs);
const filter: Ref<string> = ref("");
const isDescending: Ref<boolean> = ref(false);
const sortByColumn: Ref<string> = ref(defaultSortColumn);

const searchResults: ComputedRef<IVerb[]> = computed(() => {
  const result: IVerb[] = verbsData.value
    .filter((verbsObj: IVerb) =>
      Object.keys(verbsObj).some((verb: string) => verbsObj[verb].toLowerCase().includes(filter.value.toLowerCase()))
    )
    .sort((a: IVerb, b: IVerb) =>
      isDescending.value
        ? b[sortByColumn.value].localeCompare(a[sortByColumn.value])
        : a[sortByColumn.value].localeCompare(b[sortByColumn.value])
    );

  return result;
});
const sortIconColor = computed(() => (isDescending.value ? "#8a2be2" : "#00CC99"));

const onSort = (columnName: string): void => {
  sortByColumn.value = columnName;
  isDescending.value = !isDescending.value;
};
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400" style="overflow: hidden">
      <!-- Table caption -->
      <caption class="px-4 py-2 text-lg font-semibold text-left text-gray-900 bg-blue-100 dark:text-white dark:bg-gray-800">
        <p class="uppercase">List of irregular verbs</p>

        <!-- Search input -->
        <search-input v-model:filter="filter" @clear:filter="filter = ''" />

        <!-- Search results -->
        <search-results :results="searchResults.length" />
      </caption>

      <!-- Table head -->
      <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
        <tr>
          <!-- Infinitive column -->
          <th width="33%" scope="col" class="p-3 bg-gray-50 dark:bg-gray-700">
            <div class="flex justify-center items-center">
              <p>Infinitive</p>
              <a href="#" aria-label="Sort by infinitive" class="ease-in duration-300" @click="onSort('infinitive')"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-3 h-3 ml-1"
                  aria-hidden="true"
                  :fill="sortByColumn === 'infinitive' ? sortIconColor : 'currentColor'"
                  viewBox="0 0 320 512"
                >
                  <path
                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"
                  /></svg
              ></a>
            </div>
          </th>

          <!--  Past simple column -->
          <th width="33%" scope="col" class="p-3 bg-gray-50 dark:bg-gray-700">
            <div class="flex justify-center items-center">
              <p>Past simple</p>
              <a href="#" aria-label="Sort by past simple" class="ease-in duration-300" @click="onSort('pastSimple')"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-3 h-3 ml-1"
                  aria-hidden="true"
                  :fill="sortByColumn === 'pastSimple' ? sortIconColor : 'currentColor'"
                  viewBox="0 0 320 512"
                >
                  <path
                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"
                  /></svg
              ></a>
            </div>
          </th>

          <!--  Past participle column -->
          <th width="33%" scope="col" class="p-3 bg-gray-50 dark:bg-gray-700">
            <div class="flex justify-center items-center">
              <p>Past participle</p>
              <a href="#" aria-label="Sort by past participle" class="ease-in duration-300" @click="onSort('pastParticiple')"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-3 h-3 ml-1"
                  aria-hidden="true"
                  :fill="sortByColumn === 'pastParticiple' ? sortIconColor : 'currentColor'"
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
            v-for="(verb, index) in searchResults"
            :key="verb.infinitive"
            :verbsData="searchResults"
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
