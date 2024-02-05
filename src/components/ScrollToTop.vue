<template>
  <div class="icon-wrapper" title="Scroll to top" v-show="scrollY > maxHeight" @click="toTop">
    <ArrowIcon alt="Scroll to top" width="48" height="48" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, Ref } from "vue";
import ArrowIcon from "../assets/up-arrow.svg";

const maxHeight = 300;
const timer: Ref<number> = ref(0);
const scrollY: Ref<number> = ref(0);

const handleScroll = (): void => {
  if (timer.value) return;

  timer.value = setTimeout(() => {
    scrollY.value = window.scrollY;

    clearTimeout(timer.value);
    timer.value = 0;
  }, 100);
};

const toTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.addEventListener("scroll", handleScroll);
});
</script>

<style lang="postcss" scoped>
.icon-wrapper {
  @apply fixed right-2 bottom-2 cursor-pointer ease-in duration-300 opacity-70 hover:opacity-100 dark:opacity-50 dark:hover:opacity-50;
}
</style>
