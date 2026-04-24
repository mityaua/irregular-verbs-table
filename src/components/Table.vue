<script setup lang="ts">
import { computed, ref } from "vue";
import IVerb from "@/interfaces/IVerb";
import Columns from "@/enums/Columns";
import { verbs } from "@/data/verbs.json";
import SearchInput from "@components/SearchInput.vue";
import SearchResults from "@components/SearchResults.vue";
import TableHead from "@components/TableHead.vue";
import TableRow from "@/components/TableRow.vue";
import EmptyTableData from "@components/EmptyTableData.vue";

const verbsData = ref<IVerb[]>(verbs);

const searchParam: string | null = new URLSearchParams(window.location.search).get("search");
const searchQuery = ref<string>(searchParam || "");
const isDescending = ref<boolean>(false);
const defaultSortColumn = Columns.Infinitive;
const sortByColumn = ref<keyof IVerb>(defaultSortColumn);

const searchResults = computed<IVerb[]>(() => {
	const query = searchQuery.value.toLowerCase();

	return verbsData.value
		.filter((verbsObj: IVerb) =>
			(Object.keys(verbsObj) as Array<keyof IVerb>).some(verb => verbsObj[verb].toLowerCase().includes(query))
		)
		.toSorted((a: IVerb, b: IVerb) =>
			isDescending.value
				? b[sortByColumn.value].localeCompare(a[sortByColumn.value])
				: a[sortByColumn.value].localeCompare(b[sortByColumn.value])
		);
});

const onSort = (columnName: string): void => {
	sortByColumn.value = columnName as keyof IVerb;
	isDescending.value = !isDescending.value;
};
</script>

<template>
	<div class="shadow-md dark:shadow-xl">
		<table class="w-full text-center text-sm text-gray-500 dark:text-gray-400">
			<!-- Table caption -->

			<caption
				class="sticky top-0 z-20 bg-blue-100 p-2 text-center text-lg font-semibold text-gray-900 transition-all duration-300 md:rounded-t-md dark:border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
			>
				<div class="mx-auto flex w-full max-w-7xl flex-col items-center gap-1">
					<!-- Title and Results -->
					<div class="flex items-center gap-2">
						<h1 class="text-sm font-bold tracking-tight text-gray-900 uppercase dark:text-gray-400">
							List of irregular <span class="text-blue-600 dark:text-blue-400">verbs</span>
						</h1>
						<search-results :results="searchResults.length" />
					</div>

					<!-- Search input -->
					<div class="w-full md:w-1/2 lg:max-w-2xl">
						<search-input v-model="searchQuery" />
					</div>
				</div>
			</caption>

			<!-- Table head -->
			<thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
				<tr>
					<TableHead
						v-for="(_, result) in searchResults[0]"
						:key="result"
						:isDescending="isDescending"
						:activeColumnName="sortByColumn"
						:columnName="result"
						@click:column="onSort"
					/>
				</tr>
			</thead>

			<!-- Table body -->
			<tbody v-if="searchResults.length">
				<transition-group
					enter-active-class="transition-all duration-300 ease-in-out"
					enter-from-class="opacity-0 translate-y-[10px]"
					leave-active-class="transition-all duration-300 ease-in-out"
					leave-to-class="opacity-0 translate-y-[10px]"
					move-class="transition-all duration-300 ease-in-out"
				>
					<TableRow
						v-for="result in searchResults"
						:key="result.infinitive"
						:rowData="result"
						:searchQuery="searchQuery"
					/>
				</transition-group>
			</tbody>
		</table>
		<EmptyTableData v-if="!searchResults.length" />
	</div>
</template>
