<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import ArrowIcon from "@assets/up-arrow.svg";

const maxHeight = 300;
const timerId = ref<undefined | ReturnType<typeof setTimeout>>(undefined);
const scrollY = ref<number>(0);

const handleScroll = (): void => {
	if (timerId.value) return;

	timerId.value = setTimeout(() => {
		scrollY.value = window.scrollY;

		clearTimeout(timerId.value);
		timerId.value = undefined;
	}, 100);
};

const toTop = (): void => {
	window.scrollTo({
		top: 0,
	});
};

onMounted(() => {
	window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
	window.addEventListener("scroll", handleScroll);
});
</script>

<template>
	<div class="icon-wrapper" title="Scroll to top" v-show="scrollY > maxHeight" @click="toTop">
		<ArrowIcon alt="Scroll to top" width="48" height="48" />
	</div>
</template>

<style lang="postcss" scoped>
.icon-wrapper {
	@apply fixed bottom-3 right-5 cursor-pointer opacity-70 duration-300 ease-in hover:opacity-100 dark:opacity-50 dark:hover:opacity-50;
}
</style>
