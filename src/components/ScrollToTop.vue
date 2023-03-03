<template>
  <div
    id="pagetop"
    class="fixed right-2 bottom-2 cursor-pointer ease-in duration-300 opacity-70 hover:opacity-100"
    title="Scroll to top"
    v-show="scrollY > 300"
    @click="toTop"
  >
    <img src="../assets/up-arrow.svg" alt="Scroll to top" width="48" height="48" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, Ref } from "vue";

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
