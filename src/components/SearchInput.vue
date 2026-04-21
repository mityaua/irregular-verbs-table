<script setup lang="ts">
import { watch, onUnmounted } from "vue";
import { event as gEvent } from "vue-gtag";
import {
	SEARCH_DEBOUNCE_DELAY,
	SEARCH_URL_PARAM,
	APP_LOCALE,
	ANALYTICS,
} from "@/consts";
import SearchIcon from "@assets/search-icon.svg";
import CloseIcon from "@assets/close-icon.svg";

const model = defineModel<string>({ required: true });

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const updateUrl = (query: string): void => {
	const params = new URLSearchParams(window.location.search);

	if (query) {
		params.set(SEARCH_URL_PARAM, query);
	} else {
		params.delete(SEARCH_URL_PARAM);
	}

	const paramString = params.toString();
	const newUrl = `${window.location.pathname}${paramString ? `?${paramString}` : ""}`;

	window.history.replaceState({}, "", newUrl);
};

const sendAnalyticsEvent = (searchValue: string): void => {
	if (!searchValue) {
		return
	};

	gEvent(ANALYTICS.EVENTS.SEARCH, {
		event_category: ANALYTICS.CATEGORIES.VERBS_SEARCH,
		search_term: searchValue,
		search_time: new Date().toLocaleString(APP_LOCALE),
	});
};

const syncSearchState = (searchValue: string): void => {
	if (debounceTimer) {
		clearTimeout(debounceTimer);
	}

	const delay = searchValue ? SEARCH_DEBOUNCE_DELAY : 0;

	debounceTimer = setTimeout(() => {
		updateUrl(searchValue);
		sendAnalyticsEvent(searchValue);
	}, delay);
};

watch(model, syncSearchState);

const handleClearSearch = (): void => {
	model.value = "";
};

onUnmounted(() => {
	if (debounceTimer) {
		clearTimeout(debounceTimer)
	};
});
</script>

<template>
	<div class="flex items-baseline">
		<!-- Search container -->
		<search class="relative mt-1">
			<form @submit.prevent>
				<!-- Search icon -->
				<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<SearchIcon class="size-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
				</div>

				<!-- Search input -->
				<input id="search-input" v-model.trim="model" type="search"
					class="placeholder-opacity-75 dark:placeholder-opacity-50 block w-60 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-base text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					placeholder="Search for verbs" role="searchbox" aria-label="Search for verbs" />
			</form>
		</search>

		<!-- Clear search button -->
		<button v-show="model" type="button"
			class="ml-2 inline-flex cursor-pointer items-center rounded-lg border border-gray-300 p-2.5 hover:!bg-gray-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 dark:border-blue-500 dark:hover:bg-blue-500 dark:focus:ring-blue-800"
			aria-label="Clear search query" title="Clear search" @click="handleClearSearch">
			<CloseIcon class="size-3 text-gray-900 dark:text-white" aria-hidden="true" />
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
