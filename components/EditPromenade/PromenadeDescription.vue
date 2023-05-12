<script lang="ts" setup>
import { usePromenadeStore } from '~~/store/promenade'
const PromenadeStore = usePromenadeStore()

const localSummaryInput = ref(PromenadeStore.selectPromenade?.summary)

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  PromenadeStore.setCreationSummaryPromenadeEdit(value)
  localSummaryInput.value = value
}
</script>

<template>
  <div class="promenade_description font-semibold xl:text-md 2xl:text-lg mb-8">
    <div class="flex items-center justify-between">
      <h2>Modifier la description<sup>*</sup></h2>
      <div class="max_words font-normal text-xs italic">350 caractères max</div>
    </div>
    <textarea
      type="text"
      name="scales"
      class="my-2 p-2 text-sm border border-slate-300 rounded w-full"
      maxlength="350"
      :value="localSummaryInput"
      @input="onInput"
    />
  </div>
</template>
