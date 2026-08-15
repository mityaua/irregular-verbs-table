<script setup lang="ts">
import sourceFile from "@/data/irregular_verbs.pdf";

import ThemeToggle from "@components/ThemeToggle.vue";

import GithubIcon from "@assets/github-icon.svg";
import PdfIcon from "@assets/pdf-icon.svg";
</script>

<template>
	<div class="my-4 text-center text-gray-500 dark:text-gray-400">
		<div class="mb-4 flex justify-center">
			<ThemeToggle />
		</div>
		<div class="flex items-center justify-center gap-6">
			<a
				aria-label="Open source file"
				target="_blank"
				rel="noopener noreferrer"
				title="Open source file"
				:href="sourceFile"
				class="group inline-flex items-center text-blue-600 transition-all duration-500 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400"
			>
				<PdfIcon class="size-5 transition-all duration-500 group-hover:scale-125" />
				<span class="sr-only">Source PDF</span>
			</a>
			<a
				aria-label="GitHub profile"
				href="https://github.com/mityaua"
				target="_blank"
				rel="noopener noreferrer"
				title="GitHub profile"
				class="group inline-flex items-center text-gray-500 transition-all duration-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
			>
				<GithubIcon class="size-5 transition-all duration-500 group-hover:scale-125" />
				<span class="sr-only">GitHub profile</span>
			</a>
		</div>
	</div>
</template>
