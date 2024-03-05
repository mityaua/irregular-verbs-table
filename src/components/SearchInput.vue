<template>
  <div class="flex items-baseline">
    <div class="bg-blue-100 dark:bg-gray-800">
      <label for="table-search" class="sr-only">Search</label>

      <div class="relative mt-1 dark:bg-gray-800">
        <!-- Search icon -->
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon class="size-5 text-gray-500 dark:text-gray-400" />
        </div>

        <!-- Search input -->
        <input
          type="search"
          placeholder="Search for verbs"
          id="search-input"
          role="searchbox"
          aria-description="Search results"
          class="block p-2 pl-10 text-base text-gray-900 border border-gray-300 rounded-lg w-50 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-500 placeholder-gray-400 placeholder-opacity-75 dark:placeholder-gray-400 dark:placeholder-opacity-50 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          :value="filter"
          @input="handleSearch"
        />
      </div>
    </div>

    <!-- Clears search button -->
    <button
      v-show="filter"
      type="button"
      class="ml-2 py-1 px-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      @click="handleClearSearch"
    >
      x
    </button>
  </div>
</template>

<script setup lang="ts">
import SearchIcon from "../assets/search-icon.svg";

defineProps<{ filter: String }>();
const emit = defineEmits<{
  (e: "update:filter", filter: string): void;
  (e: "clear:filter"): void;
}>();

const handleSearch = (event: Event): void => {
  const inputValue = (event.target as HTMLInputElement).value.trim();
  emit("update:filter", inputValue);

  updateUrlOnSearch(inputValue);
};

const handleClearSearch = () => {
  emit("clear:filter");

  updateUrlOnSearch("");
};

const updateUrlOnSearch = (query: string) => {
  const params: URLSearchParams = new URLSearchParams(window.location.search);

  query ? params.set("search", query) : params.delete("search");

  const paramString = params.toString();
  const newUrl = `${window.location.pathname}${paramString && `?${paramString}`}`;

  window.history.replaceState({}, "", newUrl);
};
</script>

<style scoped>
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  display: none;
}
</style>
