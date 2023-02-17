<script setup lang="ts">
import { ref, Ref } from "vue";
import { verbs } from "./data/verbs.json";

const search: Ref<string> = ref("");
const verbsData = ref(verbs);
const sortDirection = ref(false);

const onSearch = () => {
  if (!search.value) {
    verbsData.value = verbs;
    return;
  }

  verbsData.value = verbs.filter((verb) => Object.keys(verb).some((item) => verb[item].toLowerCase().includes(search.value.toLowerCase())));
};

const onSort = (columnName: any) => {
  sortDirection.value = !sortDirection.value;

  verbsData.value = [...verbsData.value].sort((a, b) =>
    sortDirection.value ? a[columnName].localeCompare(b[columnName]) : b[columnName].localeCompare(a[columnName])
  );
};
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400">
      <caption class="p-4 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
        Irregular Verbs
        <!-- Search input -->
        <div class="mt-2 bg-white dark:bg-gray-900">
          <label for="table-search" class="sr-only">Search</label>

          <div class="relative mt-1 dark:bg-gray-800">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>

            <input
              v-model.trim="search"
              @input="onSearch"
              type="text"
              id="table-search"
              class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-50 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
            />
          </div>
        </div>

        <p v-if="verbsData.length" class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">{{ verbsData.length }} results</p>

        <p v-else class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Nothing found ☹️</p>
      </caption>

      <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
        <tr>
          <th scope="col" class="px-3 py-3">
            <div class="flex justify-center items-center">
              Infinitive
              <a href="#" @click="onSort('infinitive')"
                ><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512">
                  <path
                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"
                  /></svg
              ></a>
            </div>
          </th>

          <th scope="col" class="px-3 py-3 bg-gray-50 dark:bg-gray-800">
            <div class="flex justify-center items-center">
              Past simple
              <a href="#" @click="onSort('pastSimple')"
                ><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512">
                  <path
                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"
                  /></svg
              ></a>
            </div>
          </th>
          <th scope="col" class="px-3 py-3">
            <div class="flex justify-center items-center">
              Past participle
              <a href="#" @click="onSort('pastParticiple')"
                ><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512">
                  <path
                    d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"
                  /></svg
              ></a>
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="verb in verbsData" :key="verb.infinitive" class="border-b border-gray-200 dark:border-gray-700">
          <td scope="row" class="px-2 py-4 capitalize hover:bg-gray-50 dark:hover:bg-gray-600">{{ verb.infinitive }}</td>
          <td class="px-2 py-4 capitalize bg-gray-50 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">{{ verb.pastSimple }}</td>
          <td class="px-2 py-4 capitalize hover:bg-gray-50 dark:hover:bg-gray-600">{{ verb.pastParticiple }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
