<script setup lang="ts">
import { ref, watch } from "vue";

import { event as gEvent } from "vue-gtag";

import { ANALYTICS } from "@/consts";

import type IVerb from "@/interfaces/IVerb";

import { getWordOfDay } from "@/utils/wordOfDay";

import { useDismissable } from "@/composables/useDismissable";
import { useReversoLink } from "@/composables/useReversoLink";
import { useWordOfDay } from "@/composables/useWordOfDay";

import PronounceButton from "@components/PronounceButton.vue";

import CloseIcon from "@assets/close-icon.svg";
import LightBulbIcon from "@assets/light-bulb.svg";

const wordOfDay: IVerb = getWordOfDay();

const dateLabel = new Date().toLocaleDateString("en-US", {
	weekday: "long",
	year: "numeric",
	month: "long",
	day: "numeric",
});

const forms = [
	{ label: "Infinitive", value: wordOfDay.infinitive },
	{ label: "Past Simple", value: wordOfDay.pastSimple },
	{ label: "Past Participle", value: wordOfDay.pastParticiple },
];

const isOpen = ref<boolean>(false);
const isRevealed = ref<boolean>(false);
const iconButton = ref<HTMLButtonElement | null>(null);
const closeButton = ref<HTMLButtonElement | null>(null);
const popover = ref<HTMLElement | null>(null);

const { isSeenToday, markSeen } = useWordOfDay();

const {
	url: reversoUrl,
	title: reversoLinkTitle,
	ariaLabel: reversoAriaLabel,
} = useReversoLink(() => wordOfDay.infinitive);

const open = (): void => {
	isOpen.value = true;
};

const close = (): void => {
	isOpen.value = false;
};

const toggle = (): void => {
	if (isOpen.value) {
		close();
	} else {
		open();
	}
};

watch(isOpen, (openNow: boolean): void => {
	if (!openNow) {
		return;
	}

	isRevealed.value = false;
	markSeen();

	gEvent(ANALYTICS.EVENTS.WORD_OF_DAY, {
		event_category: ANALYTICS.CATEGORIES.WORD_OF_DAY,
	});
});

useDismissable({
	isOpen,
	panel: popover,
	trigger: iconButton,
	focusRef: closeButton,
	onDismiss: close,
});
</script>

<template>
	<div class="relative">
		<button
			ref="iconButton"
			type="button"
			aria-haspopup="dialog"
			:aria-expanded="isOpen"
			aria-label="Word of the day"
			title="Word of the day"
			class="relative cursor-pointer rounded p-1 text-gray-500 transition-all duration-300 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500/40 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700"
			@click="toggle"
		>
			<LightBulbIcon aria-hidden="true" class="size-4" />

			<span
				v-if="!isSeenToday"
				aria-hidden="true"
				class="absolute top-0 right-0 size-2 animate-pulse rounded-full bg-blue-600 dark:bg-blue-400"
			/>
		</button>

		<transition
			enter-active-class="transition-all duration-300 ease-out"
			enter-from-class="opacity-0 -translate-y-1 scale-95"
			leave-active-class="transition-all duration-200 ease-in"
			leave-to-class="opacity-0 -translate-y-1 scale-95"
		>
			<div
				v-if="isOpen"
				ref="popover"
				role="dialog"
				aria-label="Word of the day"
				class="absolute top-full right-0 z-30 mt-1 w-72 rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:shadow-xl"
			>
				<!-- Card header -->
				<div
					class="flex items-start justify-between gap-2 border-b border-gray-200 px-4 py-3 text-left dark:border-gray-700"
				>
					<div>
						<p class="text-xs font-bold tracking-wider text-blue-600 uppercase dark:text-blue-400">Word of the Day</p>
						<p class="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{{ dateLabel }}</p>
					</div>

					<button
						ref="closeButton"
						type="button"
						aria-label="Close word of the day"
						title="Close"
						class="cursor-pointer rounded p-1 text-gray-400 transition-all duration-300 hover:bg-gray-100 hover:text-gray-600 focus:ring-2 focus:ring-blue-500/40 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
						@click="close"
					>
						<CloseIcon aria-hidden="true" class="size-3" />
					</button>
				</div>

				<!-- Stage 1: recall -->
				<div v-if="!isRevealed" class="px-4 py-4 text-center">
					<div class="text-2xl">
						<span class="font-bold text-gray-900 dark:text-gray-400">{{ wordOfDay.infinitive }}</span>

						<PronounceButton class="ml-2 align-middle dark:hover:bg-gray-700" :verb="wordOfDay.infinitive" />
					</div>

					<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Try to recall the Past Simple and Past Participle</p>

					<button
						type="button"
						class="mt-4 cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/10 focus:outline-none dark:bg-blue-500 dark:text-gray-300 dark:hover:bg-blue-400"
						@click="isRevealed = true"
					>
						Show forms
					</button>
				</div>

				<!-- Stage 2: revealed -->
				<div v-else class="px-4 py-4">
					<div class="flex flex-col gap-2">
						<div
							v-for="form in forms"
							:key="form.label"
							class="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
						>
							<div class="flex flex-col items-start">
								<span class="text-xs tracking-wider text-gray-400 uppercase dark:text-gray-500">
									{{ form.label }}
								</span>
								<span class="text-base text-gray-600 dark:text-gray-400">{{ form.value }}</span>
							</div>

							<PronounceButton class="dark:hover:bg-gray-700" :verb="form.value" />
						</div>
					</div>

					<a
						target="_blank"
						rel="noopener noreferrer"
						:aria-label="reversoAriaLabel"
						:title="reversoLinkTitle"
						:href="reversoUrl"
						class="mt-3 block text-center text-sm text-blue-600 underline underline-offset-2 transition-colors duration-300 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
					>
						Translate on Reverso Context
					</a>
				</div>
			</div>
		</transition>
	</div>
</template>
