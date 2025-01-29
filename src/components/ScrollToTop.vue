<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

const maxHeight = 100;

const progressWrapper = ref<HTMLDivElement | null>(null);
const progressContent = ref<HTMLSpanElement | null>(null);

const progressTextContent = ref<string>("");

const scrollPosition = ref<number>(0);
const progressWrapperStyle = computed((): string => (scrollPosition.value > maxHeight ? "grid" : "none"));
const progressWrapperBackground = ref<string>("");

const onScroll = (): void => {
	scrollPosition.value = document.documentElement.scrollTop;
	const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

	const scrollValue = Math.round(Math.floor(scrollPosition.value * maxHeight) / calcHeight);

	progressWrapperBackground.value = `conic-gradient(#00cc99 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
	progressTextContent.value = `${scrollValue}%`;
};

const scrollToTop = (): void => {
	window.scrollTo(0, 0);
};

onMounted(() => {
	window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
	window.addEventListener("scroll", onScroll);
});
</script>

<template>
	<div
		class="fixed right-5 bottom-3 hidden h-12 w-12 cursor-pointer place-items-center rounded-full opacity-70 duration-300 ease-in hover:opacity-100 dark:opacity-50 dark:hover:opacity-50"
		ref="progressWrapper"
		:style="{ display: progressWrapperStyle, background: progressWrapperBackground }"
		@click="scrollToTop"
	>
		<span
			class="progress-content grid place-items-center rounded-full bg-white text-sm text-slate-950 select-none"
			id="progress-content"
			title="Scroll To Top"
			ref="progressContent"
			>{{ progressTextContent }}</span
		>
	</div>
</template>

<style lang="css" scoped>
.progress-content {
	--border-value: 10px;

	height: calc(100% - var(--border-value));
	width: calc(100% - var(--border-value));
}
</style>
