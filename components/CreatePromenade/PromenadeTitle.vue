<script lang="ts" setup>
const props = defineProps({
  setTitleInput: {
    type: Function,
    required: true,
  },
  setTitleInputBind: {
    type: String,
    default: '',
  },
})
const localTitleInput = ref(props.setTitleInputBind)
</script>

<template>
  <div class="promenade_title font-semibold text-lg mb-8">
    <div class="flex items-center justify-between">
      <h2>Titre de la promenade<sup>*</sup></h2>
      <div class="max_words font-normal text-xs italic">40 caractères max</div>
    </div>
    <div class="my-2">
      <input
        v-model="localTitleInput"
        type="text"
        name="scales"
        class="my-2 p-2 text-sm border border-slate-300 rounded w-full h-[40px]"
        maxlength="40"
        @change="setTitleInput(localTitleInput)"
      />
    </div>
  </div>
</template>
