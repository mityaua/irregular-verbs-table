<script setup lang="ts">
import { computed } from "vue";
import Columns from "@/enums/Columns";
import SortIcon from "@assets/sort-icon.svg";

const props = defineProps<{ isDescending: boolean; activeColumnName: string; columnName: string }>();

const emit = defineEmits<{
	"click:column": [columnName: string];
}>();

const sortIconColor = computed<string>(() => (props.isDescending ? "#8a2be2" : "#00CC99"));
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

const onColumnClick = (): void => {
	emit("click:column", props.columnName);
};
</script>

<template>
	<th class="sticky z-10 bg-gray-50 p-2 dark:bg-gray-700" width="33%" scope="col">
		<div class="flex items-center justify-center">
			<p>{{ visibleColumnName }}</p>

			<a class="duration-300 ease-in" href="#" :aria-label="`Sort by ${visibleColumnName}`" @click="onColumnClick">
				<SortIcon class="ml-1 size-3" :fill="activeColumnName === columnName ? sortIconColor : 'currentColor'" />
			</a>
		</div>
	</th>
</template>

<style scoped>
th {
	top: 85px;
}
</style>
