<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import EmptySearch from "@assets/empty-search.svg";
import { verbs } from "@/data/verbs.json";
import IVerb from "@/interfaces/IVerb";

const randomVerb = ref<IVerb | null>(null);

const tips = computed<{ label: string; value: string | undefined }[]>(() => {
	return [
		{ label: "Infinitive", value: randomVerb.value?.infinitive },
		{ label: "Past Simple", value: randomVerb.value?.pastSimple },
		{ label: "Past Participle", value: randomVerb.value?.pastParticiple },
	];
});

const setRandomVerb = (): void => {
	const randomIndex = Math.floor(Math.random() * verbs.length);
	randomVerb.value = verbs[randomIndex];
};

onMounted(setRandomVerb);
</script>

<template>
	<div class="w-full rounded-b-md border-t border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
		<div class="flex flex-col items-center justify-center py-4 text-lg">
			<div class="flex items-center justify-center text-gray-700 dark:text-gray-400">
				<span>Nothing found</span>
				<EmptySearch class="ml-2 animate-pulse" width="35" height="35" />
			</div>

			<div
				class="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800"
				v-if="randomVerb"
			>
				<p class="mb-4 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
					But here is a random irregular verb to learn
				</p>

				<div class="flex flex-col items-center gap-4 text-base sm:flex-row sm:items-start">
					<div
						class="flex min-w-32 flex-col items-center rounded-lg border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-900"
						v-for="tip in tips"
						:key="tip.label"
					>
						<span class="mb-1 text-xs tracking-wider text-gray-400 uppercase dark:text-gray-500">{{ tip.label }}</span>
						<span class="text-base text-gray-600 dark:text-gray-400">{{ tip.value }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
