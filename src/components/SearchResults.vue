<script setup lang="ts">
defineProps<{ results: number }>();
</script>

<template>
  <div>
    <p v-if="results" class="my-2 text-sm font-normal text-gray-500 dark:text-gray-400">
      {{ results }} {{ results > 1 ? "results" : "result" }}
    </p>

    <p v-else class="my-2 text-sm font-normal text-gray-500 dark:text-gray-400">Nothing found ☹️</p>
  </div>
</template>
