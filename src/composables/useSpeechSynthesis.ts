import { readonly, ref } from "vue";
import type { Ref } from "vue";

const isSupported = typeof window !== "undefined" && "speechSynthesis" in window;

const isSpeaking = ref<boolean>(false);
const currentText = ref<string | null>(null);

let activeUtterance: SpeechSynthesisUtterance | null = null;

export interface UseSpeechSynthesis {
	isSupported: boolean;
	isSpeaking: Readonly<Ref<boolean>>;
	currentText: Readonly<Ref<string | null>>;
	speak: (text: string, rate?: number) => void;
	cancel: () => void;
}

export const useSpeechSynthesis = (): UseSpeechSynthesis => {
	const clearState = (): void => {
		isSpeaking.value = false;
		currentText.value = null;
	};

	const speak = (text: string, rate = 1): void => {
		if (!isSupported) {
			return;
		}

		window.speechSynthesis.cancel();
		activeUtterance = null;

		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = "en-US";
		utterance.rate = rate;
		activeUtterance = utterance;

		isSpeaking.value = true;
		currentText.value = text;

		const clearIfCurrent = (): void => {
			if (activeUtterance !== utterance) {
				return;
			}

			activeUtterance = null;
			clearState();
		};

		utterance.addEventListener("end", clearIfCurrent);
		utterance.addEventListener("error", clearIfCurrent);

		window.speechSynthesis.speak(utterance);
	};

	const cancel = (): void => {
		if (!isSupported) {
			return;
		}

		window.speechSynthesis.cancel();
		activeUtterance = null;
		clearState();
	};

	return {
		isSupported,
		isSpeaking: readonly(isSpeaking),
		currentText: readonly(currentText),
		speak,
		cancel,
	};
};
