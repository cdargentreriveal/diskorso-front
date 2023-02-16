<template>
  <div class="w-9/12 mx-auto pt-[150px]">
    <div class="pt-8 flex items-center justify-between">
      <div class="title uppercase font-bold text-3xl -md:text-3xl">
        <h2>
          {{ titleBlack }}
          <span class="font-medium purple-color">{{ titlePurple }}</span>
        </h2>
      </div>
      <div class="action-button px-4 py-3 text-sm rounded-md text-white">
        <button>
          <span></span>
          <span>{{ actionBtn }}</span>
        </button>
      </div>
    </div>
    <Separator />
  </div>
</template>

<script lang="ts" setup>
const propsAdminTitle = defineProps({
  titleBlack: {
    type: String,
    default: '',
  },
  titlePurple: {
    type: String,
    default: '',
  },
  actionBtn: {
    type: String,
    default: '',
  },
})
</script>

<style scoped lang="scss">
.action-button {
  background-color: var(--purple-color);
}
</style>
