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
};
</script>
