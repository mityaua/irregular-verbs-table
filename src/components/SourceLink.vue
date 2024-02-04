<template>
  <p class="my-4 text-center text-gray-500 dark:text-gray-400">
    List of irregular verbs
    <a
      class="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 ease-in duration-300 hover:underline"
      target="_blank"
      aria-label="Open source file"
      title="Open source file"
      :href="sourceFile"
    >
      Source
      <SourceIcon class="w-5 h-5 ml-1" />
    </a>
  </p>
</template>

<script setup lang="ts">
import sourceFile from "../data/irregular_verbs.pdf";
import SourceIcon from "../assets/to-right-arrow.svg";
</script>
