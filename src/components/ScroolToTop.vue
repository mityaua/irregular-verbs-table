<template>
  <div id="pagetop" class="fixed right-0 bottom-0 cursor-pointer" v-show="scrollY > 300" @click="toTop">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#4a5568"
      stroke-width="1"
      stroke-linecap="square"
    >
      <path d="M18 15l-6-6-6 6" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const timer = ref(0);
const scrollY = ref(0);

const handleScroll = () => {
  if (timer.value) return;

  timer.value = setTimeout(() => {
    scrollY.value = window.scrollY;

    clearTimeout(timer.value);
    timer.value = 0;
  }, 100);
};

const toTop = () => {
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
