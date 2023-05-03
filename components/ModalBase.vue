<script setup lang="ts">
defineProps<{
  show: boolean
}>()

const alsoSharedState = useState('showModal')

function closeModal(event: any) {
  if (!event.target.closest('.modal-content')) {
    alsoSharedState.value = false
  }
}
</script>

<template>
  <!-- Render inside our `<div id="modals"></div>` in index.html -->
  <Teleport to="#modals">
    <!-- Show / hide the modal -->
    <div v-if="show" class="" @click="closeModal">
      <!-- The backdrop -->
      <div class="fixed inset-0 bg-gray-900 opacity-40"></div>

      <!-- Where the actual content goes -->
      <div
        class="fixed inset-0 flex items-center justify-center overflow-y-scroll modal"
      >
        <div class="bg-white text-black w-3/5 shadow-xl rounded-lg">
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.modal {
  max-height: 90vh;
  margin: auto;
}
</style>
