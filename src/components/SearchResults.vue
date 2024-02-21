<template>
  <div class="text-sm font-normal text-gray-500 dark:text-gray-400">
    <span v-if="results"> {{ results }} {{ results > 1 ? "results" : "result" }} </span>

    <span v-else>Nothing found ☹️</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ results: number }>();
</script>
