<script setup lang="ts">
import sourceFile from "@/data/irregular_verbs.pdf";
import SourceIcon from "@assets/to-right-arrow.svg";
</script>

<template>
	<p class="my-4 text-center text-gray-500 dark:text-gray-400">
		List of irregular verbs
		<a class="source-link" target="_blank" title="Open source file" aria-label="Open source file" :href="sourceFile">
			Source
			<SourceIcon class="ml-1 size-5" />
		</a>
	</p>
</template>

<style lang="postcss" scoped>
.source-link {
	@apply inline-flex items-center font-medium text-blue-600 duration-300 ease-in hover:underline dark:text-blue-500;
}
</style>
