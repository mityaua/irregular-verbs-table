<script setup lang="ts">
import TableCell from "@/components/TableCell.vue";
import IVerb from "@/interfaces/IVerb";

defineProps<{ rowData: IVerb; searchQuery: string }>();
</script>

<template>
	<tr class="border border-gray-200 hover:bg-blue-100 dark:border-gray-700 dark:hover:bg-gray-600">
		<TableCell
			v-for="(value, time) in rowData"
			:key="time"
			:verb="value"
			:columnName="time"
			:searchQuery="searchQuery"
		/>
	</tr>
</template>

<style lang="postcss" scoped>
tr:nth-child(even) {
	@apply bg-gray-100 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-600;
}
</style>
