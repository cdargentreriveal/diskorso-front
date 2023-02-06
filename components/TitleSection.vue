<template>
  <div class="py-8 text-center">
    <div class="title uppercase font-bold text-4xl -md:text-3xl">
      <h2>
        {{ titleBlack }} <br />
        <span class="font-medium purple-color">{{ titlePurple }}</span>
      </h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
const propsTitle = defineProps({
  titleBlack: {
    type: String,
    default: '',
  },
  titlePurple: {
    type: String,
    default: '',
  },
})
</script>

<style></style>
