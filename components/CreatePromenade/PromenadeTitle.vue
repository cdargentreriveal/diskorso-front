<script lang="ts" setup>
import { usePromenadeStore } from '~~/store/promenade'
const PromenadeStore = usePromenadeStore()

const localTitleInput = ref(PromenadeStore.creationTitlePromenade)

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  PromenadeStore.setCreationTitlePromenade(value)
  localTitleInput.value = value
}
</script>

<template>
  <div class="promenade_title font-semibold xl:text-md 2xl:text-lg mb-8">
    <div class="flex items-center justify-between">
      <h2>Titre de la promenade<sup>*</sup></h2>
      <div class="max_words font-normal text-xs italic">60 caractères max</div>
    </div>
    <div class="my-2">
      <input
        type="text"
        name="scales"
        class="my-2 p-2 text-sm border border-slate-300 rounded w-full h-[40px]"
        maxlength="60"
        :value="localTitleInput"
        @input="onInput"
      />
    </div>
  </div>
</template>
