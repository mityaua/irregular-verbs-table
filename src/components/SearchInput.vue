<script setup lang="ts">
import { watch, onUnmounted } from "vue";
import { event as gEvent } from "vue-gtag";
import { SEARCH_DEBOUNCE_DELAY, SEARCH_URL_PARAM, APP_LOCALE, ANALYTICS } from "@/consts";
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
		return;
	}

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
		clearTimeout(debounceTimer);
	}
});
</script>

<template>
	<div class="flex w-full items-center gap-2">
		<!-- Search container -->
		<search class="group relative flex-grow">
			<form class="relative" @submit.prevent>
				<!-- Search icon -->
				<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<SearchIcon
						aria-hidden="true"
						class="size-5 text-gray-400 transition-colors duration-200 group-focus-within:text-blue-500"
					/>
				</div>

				<!-- Search input -->
				<input
					id="search-input"
					aria-label="Search for verbs"
					type="search"
					placeholder="Search for verbs"
					role="searchbox"
					v-model.trim="model"
					class="block w-full rounded-lg border border-gray-300 bg-white p-2 pl-10 text-base text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
				/>
			</form>
		</search>

		<!-- Clear search button -->
		<button
			v-show="model"
			aria-label="Clear search query"
			type="button"
			title="Clear search"
			class="inline-flex cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white p-2 transition-all duration-200 hover:bg-gray-50 focus:ring-4 focus:ring-blue-500/10 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-700"
			@click="handleClearSearch"
		>
			<CloseIcon aria-hidden="true" class="size-3 text-gray-500 dark:text-gray-400" />
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
