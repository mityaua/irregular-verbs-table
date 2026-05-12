<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import ScrollToTopArrow from "@assets/scroll-to-top-arrow.svg";

const maxHeight = 100;

const scrollPosition = ref<number>(0);

const scrollValue = computed<number>(() => {
	const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

	if (calcHeight <= 0) {
		return 0;
	}

	return Math.floor((scrollPosition.value * maxHeight) / calcHeight);
});

const progressWrapperBackground = computed<string>(
	() => `conic-gradient(#00cc99 ${scrollValue.value}%, #d7d7d7 ${scrollValue.value}%)`
);

const progressTextContent = computed<string>(() => `${scrollValue.value}%`);

const onScroll = (): void => {
	scrollPosition.value = document.documentElement.scrollTop;
};

const scrollToTop = (): void => {
	window.scrollTo(0, 0);
};

onMounted(() => {
	window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
	window.removeEventListener("scroll", onScroll);
});
</script>

<template>
	<div
		class="fixed right-5 bottom-3 grid h-12 w-12 cursor-pointer place-items-center rounded-full opacity-70 duration-300 ease-in hover:opacity-100 dark:opacity-50 dark:hover:opacity-50"
		v-show="scrollPosition > maxHeight"
		:style="{ background: progressWrapperBackground }"
		@click="scrollToTop"
	>
		<span
			class="progress-content flex flex-col items-center justify-center rounded-full bg-white text-[11px] font-medium text-slate-950 select-none"
			id="progress-content"
			title="Scroll To Top"
		>
			<ScrollToTopArrow class="-mb-[2px] opacity-70" />

			<span>{{ progressTextContent }}</span>
		</span>
	</div>
</template>

<style lang="css" scoped>
.progress-content {
	--border-value: 10px;

	height: calc(100% - var(--border-value));
	width: calc(100% - var(--border-value));
}
</style>
