<template>
  <th width="33%" scope="col" class="p-3 bg-gray-50 dark:bg-gray-700">
    <div class="flex justify-center items-center">
      <p>{{ columnName }}</p>

      <a href="#" :aria-label="`Sort by ${columnName}`" class="ease-in duration-300" @click="onColumnClick">
        <SortIcon class="w-3 h-3 ml-1" :fill="activeColumnName === columnName ? sortIconColor : 'currentColor'" />
      </a>
    </div>
  </th>
</template>

<script setup lang="ts">
import { computed } from "vue";
import SortIcon from "../assets/sort-icon.svg";
const props = defineProps<{ isDescending: boolean; activeColumnName: string; columnName: string }>();

const emit = defineEmits<{
  (e: "click:column", columnName: string): void;
}>();

const sortIconColor = computed<string>(() => (props.isDescending ? "#8a2be2" : "#00CC99"));

const onColumnClick = () => {
  emit("click:column", props.columnName);
};
</script>
