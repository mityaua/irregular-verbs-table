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

				<search>
					<form>
						<input
							class="block w-60 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-base text-gray-700 placeholder-gray-400 placeholder-opacity-75 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:placeholder-opacity-50 dark:focus:border-blue-500 dark:focus:ring-blue-500"
							id="search-input"
							type="search"
							placeholder="Search for verbs"
							role="searchbox"
							aria-description="Search results"
							:value="query"
							@input="handleSearch"
						/>
					</form>
				</search>
			</div>
		</div>

		<!-- Clears search button -->
		<button
			class="focus:outline-hidden ml-2 inline-flex cursor-pointer items-center rounded-lg border border-gray-300 p-2.5 hover:!bg-gray-300 focus:ring-2 focus:ring-blue-500 dark:border-blue-500 dark:hover:bg-blue-500 dark:focus:ring-blue-800"
			v-show="query"
			@click="handleClearSearch"
			type="button"
		>
			<svg
				class="h-[12px] w-[12px] text-gray-900 dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="3"
					d="M6 18 17.94 6M18 18 6.06 6"
				/>
			</svg>

			<span class="sr-only">Icon description</span>
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
