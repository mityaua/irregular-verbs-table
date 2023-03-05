<script setup lang="ts">
import sourceFile from "../data/irregular_verbs.pdf";
</script>

<template>
  <p class="my-4 text-center text-gray-500 dark:text-gray-400">
    List of irregular verbs
    <a
      :href="sourceFile"
      class="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 ease-in duration-300 hover:underline"
      download="Irregular Verbs"
      aria-label="Download source file"
      title="Download source file"
    >
      Source
      <svg aria-hidden="true" class="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </a>
  </p>
</template>
