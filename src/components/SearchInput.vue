<script setup lang="ts">
import { event as gEvent } from "vue-gtag";
import SearchIcon from "@assets/search-icon.svg";

defineProps<{ query: string }>();

const emit = defineEmits<{
	"update:query": [query: string];
	"clear:query": [];
}>();

const handleSearch = (event: Event): void => {
	const inputValue = (event.target as HTMLInputElement).value.trim();
	emit("update:query", inputValue);

	sendGoogleEvent(inputValue);
	updateUrlOnSearch(inputValue);
};

const handleClearSearch = (): void => {
	emit("clear:query");

	updateUrlOnSearch("");
};

const updateUrlOnSearch = (query: string): void => {
	const params: URLSearchParams = new URLSearchParams(window.location.search);

	query ? params.set("search", query) : params.delete("search");

	const paramString = params.toString();
	const newUrl = `${window.location.pathname}${paramString && `?${paramString}`}`;

	window.history.replaceState({}, "", newUrl);
};

const sendGoogleEvent = (searchValue: string): void => {
	const currentDate = new Date().toLocaleDateString("uk-UA");
	const currentTime = new Date().toLocaleTimeString("uk-UA");

	gEvent("search", {
		event_category: "verbs-search",
		search_term: searchValue,
		search_time: `${currentDate}, ${currentTime}`,
	});
};
</script>

<template>
	<div class="flex items-baseline">
		<div class="bg-blue-100 dark:bg-gray-800">
			<div class="relative mt-1 dark:bg-gray-800">
				<!-- Search icon -->
				<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<SearchIcon class="size-5 text-gray-500 dark:text-gray-400" />
				</div>

				<!-- Search input -->
				<input
					class="w-50 block rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-base text-gray-900 placeholder-gray-400 placeholder-opacity-75 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:placeholder-opacity-50 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					id="search-input"
					type="search"
					placeholder="Search for verbs"
					role="searchbox"
					aria-description="Search results"
					:value="query"
					@input="handleSearch"
				/>
			</div>
		</div>

		<!-- Clears search button -->
		<button
			class="ml-2 rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
			v-show="query"
			type="button"
			@click="handleClearSearch"
		>
			x
		</button>
	</div>
</template>

<style scoped>
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
	display: none;
}
</style>
