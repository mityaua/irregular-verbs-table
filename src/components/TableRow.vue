<script setup lang="ts">
import TableCell from "@/components/TableCell.vue";
import IVerb from "@/interfaces/IVerb";

defineProps<{ rowData: IVerb; searchQuery: string }>();
</script>

<template>
	<tr
		class="border border-gray-200 even:bg-gray-100 hover:bg-blue-50 dark:border-gray-700 even:dark:bg-gray-800 dark:hover:bg-gray-900"
	>
		<TableCell
			v-for="(value, time) in rowData"
			:key="time"
			:verb="value"
			:columnName="time"
			:searchQuery="searchQuery"
		/>
	</tr>
</template>
