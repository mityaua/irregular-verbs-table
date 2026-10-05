import { computed, ref } from "vue";
import type { ComputedRef } from "vue";

import { getDayKey } from "@/utils/wordOfDay";

const WORD_OF_DAY_SEEN_STORAGE_KEY = "wordOfDaySeen";

const readSeenDay = (): string | null => {
	try {
		return localStorage.getItem(WORD_OF_DAY_SEEN_STORAGE_KEY);
	} catch {
		return null;
	}
};

const seenDay = ref<string | null>(readSeenDay());

const markSeen = (): void => {
	seenDay.value = getDayKey();

	try {
		localStorage.setItem(WORD_OF_DAY_SEEN_STORAGE_KEY, seenDay.value);
	} catch {}
};

export interface UseWordOfDay {
	isSeenToday: ComputedRef<boolean>;
	markSeen: () => void;
}

export const useWordOfDay = (): UseWordOfDay => {
	const isSeenToday = computed<boolean>(() => seenDay.value === getDayKey());

	return { isSeenToday, markSeen };
};
