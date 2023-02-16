<script lang="ts" setup>
const propsNavigation = defineProps({
  first: {
    type: Function,
    required: true,
  },
  previous: {
    type: Function,
    required: true,
  },
  next: {
    type: Function,
    required: true,
  },
  totalPromenade: {
    type: Number,
    required: true,
  },
  totalpage: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div
    class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
  >
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          <span class="font-medium">{{ totalPromenade }}</span>
          résultats
          <span class="font-medium">{{ totalpage }}</span>
          pages
        </p>
      </div>
      <!--//TODO : à mettre en français, et à rendre plus ux friendly-->
      <button class="p-8" @click="first()">First Page</button>
      <button class="p-8" @click="previous()">Previous</button>
      <button class="p-8" @click="next()">Next</button>
    </div>
  </div>
</template>

<style></style>
