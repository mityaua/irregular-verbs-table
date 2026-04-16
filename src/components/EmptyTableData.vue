<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import EmptySearch from "@assets/empty-search.svg";
import { verbs } from "@/data/verbs.json";
import IVerb from "@/interfaces/IVerb";

const randomVerb = ref<IVerb | null>(null);

const tips = computed<{ label: string, value: string | undefined }[]>(() => {
	return [
		{ label: 'Infinitive', value: randomVerb.value?.infinitive },
		{ label: 'Past Simple', value: randomVerb.value?.pastSimple },
		{ label: 'Past Participle', value: randomVerb.value?.pastParticiple }
	]
})

const setRandomVerb = (): void => {
	const randomIndex = Math.floor(Math.random() * verbs.length);
	randomVerb.value = verbs[randomIndex];
}

onMounted(setRandomVerb);
</script>

<template>
	<div class="w-full bg-white dark:bg-gray-800 p-8 rounded-b-md border-t border-gray-200 dark:border-gray-700">
		<div class="flex flex-col items-center justify-center py-4 text-lg">
			<div class="flex items-center justify-center text-gray-700 dark:text-gray-400">
				<span>Nothing found</span>
				<EmptySearch class="ml-2 animate-pulse" width="35" height="35" />
			</div>

			<div v-if="randomVerb" class="mt-8 p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800">
				<p class="mb-4 text-center text-sm text-gray-500 dark:text-gray-400 font-medium">But here is a random irregular verb to learn</p>

				<div class="flex flex-col sm:flex-row gap-4 items-center sm:items-start text-base">
					<div v-for="tip in tips" :key="tip.label"
						class="flex flex-col items-center p-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 min-w-32">
						<span class="text-xs text-gray-400 dark:text-gray-500 mb-1 uppercase tracking-wider">{{ tip.label }}</span>
						<span class="text-base text-gray-600 dark:text-gray-400">{{ tip.value }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
