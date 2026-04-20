<script setup lang="ts">
import { computed } from "vue";

import { SORT_ICON_COLORS, COLUMN_DISPLAY_NAMES } from "@/consts";

import SortIcon from "@assets/sort-icon.svg";
import DownArrow from "@assets/down-arrow.svg";
import UpArrow from "@assets/up-arrow.svg";

const props = defineProps<{ isDescending: boolean; activeColumnName: string; columnName: string }>();

const emit = defineEmits<{
	"click:column": [columnName: string];
}>();


const visibleColumnName = computed<string>(() => COLUMN_DISPLAY_NAMES[props.columnName] || "");

const isActiveColumn = computed<boolean>(() => props.activeColumnName === props.columnName);

const ariaSort = computed<"none" | "descending" | "ascending">(() => {
	if (!isActiveColumn.value) {
		return "none";
	}

	return props.isDescending ? "descending" : "ascending";
});


const sortIconColor = computed(() => {
	if (!isActiveColumn.value) {
		return SORT_ICON_COLORS.INACTIVE
	};

	return props.isDescending ? SORT_ICON_COLORS.DESCENDING : SORT_ICON_COLORS.ASCENDING;
});

const onColumnClick = (): void => {
	emit("click:column", props.columnName);
};
</script>

<template>
	<th
		class="sticky top-[85px] z-10 w-1/3 cursor-pointer border-x border-t border-gray-200 bg-gray-50 p-2 shadow-[inset_0_-1px_0_0_var(--color-gray-200)] dark:border-gray-700 dark:bg-gray-600 dark:shadow-[inset_0_-1px_0_0_var(--color-gray-700)]"
		scope="col" :aria-sort="ariaSort" @click="onColumnClick">
		<div class="flex items-center justify-center gap-1 select-none">
			<p>{{ visibleColumnName }}</p>

			<div class="flex items-center transition-transform duration-300"
				:title="isActiveColumn ? (isDescending ? 'Descending' : 'Ascending') : `Sort by ${visibleColumnName}`">

				<component class="size-3" :is="isActiveColumn ? (isDescending ? DownArrow : UpArrow) : SortIcon" :fill="sortIconColor" />
			</div>
		</div>
	</th>
</template>