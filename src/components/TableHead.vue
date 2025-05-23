<script setup lang="ts">
import { computed } from "vue";
import Columns from "@/enums/Columns";
import SortIcon from "@assets/sort-icon.svg";
import DownArrow from "@assets/down-arrow.svg";
import UpArrow from "@assets/up-arrow.svg";

const props = defineProps<{ isDescending: boolean; activeColumnName: string; columnName: string }>();

const emit = defineEmits<{
	"click:column": [columnName: string];
}>();

const visibleColumnName = computed<string>(() => {
	let name = "";

	switch (props.columnName) {
		case Columns.Infinitive:
			name = "Infinitive";
			break;
		case Columns.PastSimple:
			name = "Past Simple";
			break;
		case Columns.PastParticiple:
			name = "Past Participle";
			break;
	}

	return name;
});

const isActiveColumn = computed<boolean>(() => props.activeColumnName === props.columnName);

const sortIconColor = computed<string>(() => {
	if (isActiveColumn.value) {
		return props.isDescending ? "#8a2be2" : "#00CC99";
	}
	return "#a4b0be";
});

const onColumnClick = (): void => {
	emit("click:column", props.columnName);
};
</script>

<template>
	<th
		class="sticky z-10 cursor-pointer border border-gray-200 bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-600"
		width="33.3333%"
		scope="col"
		@click="onColumnClick"
	>
		<div class="flex items-center justify-center">
			<p>{{ visibleColumnName }}</p>

			<button
				class="cursor-pointer duration-300 ease-in"
				:title="isActiveColumn ? (isDescending ? 'Descending' : 'Ascending') : ''"
				:aria-label="`Sort by ${visibleColumnName}`"
			>
				<component
					class="ml-1 size-3"
					:is="isActiveColumn ? (isDescending ? DownArrow : UpArrow) : SortIcon"
					:fill="sortIconColor"
				/>
			</button>
		</div>
	</th>
</template>

<style scoped>
th {
	top: 85px;
}
</style>
