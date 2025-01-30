<script setup lang="ts">
defineProps<{ results: number }>();
</script>

<template>
	<div class="text-sm font-normal whitespace-nowrap text-gray-600 dark:text-gray-400">
		<span v-show="results"> {{ results }} {{ results > 1 ? "verbs" : "verb" }} </span>
	</div>
</template>
