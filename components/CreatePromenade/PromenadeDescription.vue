<script lang="ts" setup>
const props = defineProps({
  updateSummaryPromenade: {
    type: Function,
    required: true,
  },
})

const localSummaryPromenade = ref('')
</script>

<template>
  <div class="promenade_description font-semibold text-lg mb-8">
    <div class="flex items-center justify-between">
      <h2>Ajouter une description<sup>*</sup></h2>
      <div class="max_words font-normal text-xs italic">350 caractères max</div>
    </div>
    <textarea
      v-model="localSummaryPromenade"
      type="text"
      name="scales"
      class="my-2 p-2 text-sm border border-slate-300 rounded w-full"
      maxlength="350"
      @input="updateSummaryPromenade(localSummaryPromenade)"
    />
  </div>
</template>
