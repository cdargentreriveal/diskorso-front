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
  firstBtnPagination: {
    type: Boolean,
    default: true,
  },
  middleBtnPagination: {
    type: Boolean,
    default: false,
  },
  lastBtnPagination: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 w-full pagination"
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
    </div>
    <nav
      class="isolate inline-flex -space-x-px rounded-md shadow-sm"
      aria-label="Pagination"
    >
      <div
        class="click relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        @click="previous()"
      >
        <span class="sr-only">Previous</span>
        <svg
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
      <div
        class="click first relative z-10 inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 focus:z-20"
        :class="firstBtnPagination ? 'active' : ''"
        @click="first()"
      >
        1
      </div>
      <span
        class="relative middle inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
        :class="middleBtnPagination ? 'active' : ''"
        >...</span
      >
      <div
        class="relative last inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        :class="lastBtnPagination ? 'active' : 'ctive'"
      >
        {{ totalpage }}
      </div>
      <div
        class="click relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        @click="next()"
      >
        <span class="sr-only">Next</span>
        <svg
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.click {
  cursor: pointer;
}
.pagination .first.active,
.pagination .middle.active,
.pagination .last.active {
  color: var(--purple-color);
  border: 1px solid var(--purple-color);
  background-color: #f6f2ff;
}
</style>
