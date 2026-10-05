import { computed, onMounted, ref } from "vue";
import type { ComputedRef, MaybeRefOrGetter } from "vue";
import { toValue } from "vue";

import { langToReversoMap } from "@/data/lang-map";

const REVERSO_BASE_URL = "https://context.reverso.net/translation/";
const DEFAULT_LANG_PAIR = langToReversoMap["uk"];

export interface UseReversoLink {
	url: ComputedRef<string>;
	title: ComputedRef<string>;
	ariaLabel: ComputedRef<string>;
}

export const useReversoLink = (verb: MaybeRefOrGetter<string>): UseReversoLink => {
	const langPair = ref<string>(DEFAULT_LANG_PAIR);

	onMounted(() => {
		const langCode: string = navigator.language?.split("-")[0].toLowerCase();
		const detectedPair: string = langCode && langToReversoMap[langCode];

		langPair.value = detectedPair ?? DEFAULT_LANG_PAIR;
	});

	const infinitive = computed<string>(() => toValue(verb).split("/")[0]);

	const url = computed<string>(() => `${REVERSO_BASE_URL}${langPair.value}/${infinitive.value}`);
	const title = computed<string>(() => `Go to Reverso: ${toValue(verb)}`);
	const ariaLabel = computed<string>(() => `Translate '${toValue(verb)}' on Reverso Context`);

	return { url, title, ariaLabel };
};
