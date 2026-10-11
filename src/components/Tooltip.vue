<script setup lang="ts">
const props = defineProps<{
	text: string;
}>();
</script>

<template>
	<span
		aria-hidden="true"
		class="pointer-events-none absolute top-full left-1/2 z-40 mt-1 -translate-x-1/2 rounded-md bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 dark:bg-gray-700 dark:text-gray-300"
	>
		{{ props.text }}
	</span>
</template>
