import { nextTick, onBeforeUnmount, watch } from "vue";
import type { Ref } from "vue";

export interface UseDismissableOptions {
	isOpen: Ref<boolean>;
	panel: Ref<HTMLElement | null>;
	trigger: Ref<HTMLElement | null>;
	focusRef?: Ref<HTMLElement | null>;
	onDismiss: () => void;
}

export const useDismissable = ({ isOpen, panel, trigger, focusRef, onDismiss }: UseDismissableOptions): void => {
	const onDocumentMouseDown = (event: MouseEvent): void => {
		const target = event.target as Node | null;

		if (!target) {
			return;
		}

		if (panel.value?.contains(target) || trigger.value?.contains(target)) {
			return;
		}

		onDismiss();
	};

	const onDocumentKeydown = (event: KeyboardEvent): void => {
		if (event.key === "Escape") {
			onDismiss();
		}
	};

	watch(isOpen, async (openNow: boolean): Promise<void> => {
		if (openNow) {
			document.addEventListener("mousedown", onDocumentMouseDown);
			document.addEventListener("keydown", onDocumentKeydown);

			if (focusRef) {
				await nextTick();
				focusRef.value?.focus();
			}
		} else {
			document.removeEventListener("mousedown", onDocumentMouseDown);
			document.removeEventListener("keydown", onDocumentKeydown);

			const activeElement = document.activeElement;

			if (!activeElement || panel.value?.contains(activeElement)) {
				trigger.value?.focus();
			}
		}
	});

	onBeforeUnmount(() => {
		document.removeEventListener("mousedown", onDocumentMouseDown);
		document.removeEventListener("keydown", onDocumentKeydown);
	});
};
