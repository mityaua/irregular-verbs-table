<script setup lang="ts">
defineProps<{ results: number }>();
</script>

<template>
	<div class="whitespace-nowrap text-sm font-normal text-gray-600 dark:text-gray-400">
		<span v-show="results"> {{ results }} {{ results > 1 ? "verbs" : "verb" }} </span>
	</div>
</template>
