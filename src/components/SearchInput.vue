<template>
  <div class="flex items-baseline mt-2">
    <div class="bg-blue-100 dark:bg-gray-800">
      <label for="table-search" class="sr-only">Search</label>

      <div class="relative mt-1 dark:bg-gray-800">
        <!-- Search icon -->
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>

        <!-- Search input -->
        <input
          :value="filter"
          @input="handleSearch"
          type="text"
          id="table-search"
          class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-50 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-500 placeholder-gray-400 placeholder-opacity-75 dark:placeholder-gray-400 dark:placeholder-opacity-50 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for items"
        />
      </div>
    </div>

    <!-- Clears results button -->
    <button
      v-show="filter"
      type="button"
      class="ml-2 py-1 px-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      @click="clearSearchResults"
    >
      x
    </button>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import IVerb from "../interfaces/IVerb";

const props = defineProps<{ data: Array<IVerb>; filter: String }>();
const emit = defineEmits<{
  (e: "update-results", data: Array<IVerb>): void;
  (e: "update-filter", filter: string): void;
}>();

const { data, filter } = toRefs(props);

const handleSearch = (event: Event): void => {
  const inputValue = (event.target as HTMLInputElement).value.trim();

  if (!inputValue) {
    emit("update-filter", "");
    emit("update-results", data.value);
    return;
  }

  const results: IVerb[] = data.value.filter((verbsObj: IVerb) =>
    Object.keys(verbsObj).some((verb: string) => verbsObj[verb].toLowerCase().includes(inputValue.toLowerCase()))
  );

  emit("update-filter", inputValue);
  emit("update-results", results);
};

const clearSearchResults = () => {
  emit("update-filter", "");
  emit("update-results", data.value);
};
</script>
