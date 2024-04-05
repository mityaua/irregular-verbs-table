<script setup lang="ts">
import TableCell from "@/components/TableCell.vue";
import IVerb from "@/interfaces/IVerb";

defineProps<{ rowData: IVerb; searchQuery: string }>();
</script>

<template>
	<tr class="border-b border-gray-200 dark:border-gray-700">
		<TableCell
			v-for="(value, time) in rowData"
			:key="time"
			:verb="value"
			:columnName="time"
			:searchQuery="searchQuery"
		/>
	</tr>
</template>
