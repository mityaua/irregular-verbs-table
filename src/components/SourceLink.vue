<script setup lang="ts">
import sourceFile from "@/data/irregular_verbs.pdf";
import PdfIcon from "@assets/pdf-icon.svg";
import GithubIcon from "@assets/github-icon.svg";
</script>

<template>
	<div class="my-4 text-center text-gray-500 dark:text-gray-400">
		<div class="flex items-center justify-center gap-6">
			<a
				class="group ease inline-flex items-center text-blue-600 transition-all duration-500 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400"
				target="_blank"
				title="Open source file"
				aria-label="Open source file"
				:href="sourceFile"
			>
				<PdfIcon class="ease size-5 transition-all duration-500 group-hover:scale-125" />
			</a>
			<a
				class="group ease inline-flex items-center text-gray-500 transition-all duration-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
				href="https://github.com/mityaua"
				target="_blank"
				title="GitHub profile"
				aria-label="GitHub profile"
			>
				<GithubIcon class="ease size-5 transition-all duration-500 group-hover:scale-125" />
			</a>
		</div>
	</div>
</template>
