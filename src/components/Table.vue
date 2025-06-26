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
	const result: IVerb[] = verbsData.value
		.filter((verbsObj: IVerb) =>
			(Object.keys(verbsObj) as Array<keyof IVerb>).some(verb =>
				verbsObj[verb].toLowerCase().includes(searchQuery.value.toLowerCase())
			)
		)
		.sort((a: IVerb, b: IVerb) =>
			isDescending.value
				? b[sortByColumn.value].localeCompare(a[sortByColumn.value])
				: a[sortByColumn.value].localeCompare(b[sortByColumn.value])
		);

	return result;
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
				class="sticky top-0 z-20 bg-blue-100 p-2 text-left text-lg font-semibold text-gray-900 md:rounded-t-md dark:border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
			>
				<div class="flex flex-nowrap items-center">
					<p class="mr-2 whitespace-nowrap text-sm uppercase dark:text-gray-400">List of irregular verbs</p>
					<!-- Search results -->
					<search-results :results="searchResults.length" />
				</div>

				<!-- Search input -->
				<search-input class="mt-1" v-model:query="searchQuery" @clear:query="searchQuery = ''" />
			</caption>

			<!-- Table head -->
			<thead class="text-xs uppercase text-gray-700 dark:text-gray-400">
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
			<tbody v-if="searchResults.length">
				<transition-group name="list">
					<TableRow
						v-for="result in searchResults"
						:key="result.infinitive"
						:rowData="result"
						:searchQuery="searchQuery"
					/>
				</transition-group>
			</tbody>

			<EmptyTableData v-else />
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
