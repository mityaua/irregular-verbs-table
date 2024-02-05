<script setup lang="ts">
import { computed, ref } from "vue";
import IVerb from "../interfaces/IVerb";
import Columns from "../enums/Columns";
import { verbs } from "../data/verbs.json";
import SearchInput from "../components/SearchInput.vue";
import SearchResults from "../components/SearchResults.vue";
import TableHead from "../components/TableHead.vue";
import TableRow from "./TableRow.vue";

const verbsData = ref<IVerb[]>(verbs);
const filter = ref<string>("");
const isDescending = ref<boolean>(false);
const defaultSortColumn = Columns.Infinitive;
const sortByColumn = ref<string>(defaultSortColumn);

const searchResults = computed<IVerb[]>(() => {
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

const onSort = (columnName: string): void => {
  sortByColumn.value = columnName;
  isDescending.value = !isDescending.value;
};
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400 overflow-hidden">
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
          <TableHead
            v-for="(value, result) in searchResults[0]"
            :key="result"
            :isDescending="isDescending"
            :activeColumnName="sortByColumn"
            :columnName="result"
            @click:column="onSort"
          />
        </tr>
      </thead>

      <!-- Table body -->
      <tbody>
        <transition-group name="list">
          <TableRow v-for="result in searchResults" :key="result.infinitive" :rowData="result" :searchQuery="filter" />
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
