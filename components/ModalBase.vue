<script setup lang="ts">
defineProps<{
  show: boolean
}>()
const route = useRouter()
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
      <div class="fixed inset-0 flex items-center justify-center">
        <div
          class="bg-white text-black shadow-xl rounded-lg modal"
          :class="
            route.currentRoute.value.name !==
              'dashboard-editer-une-promenade-slug' &&
            route.currentRoute.value.name !== 'dashboard-creer-une-promenade'
              ? 'w-7/12'
              : 'w-9/12 overflow-y-scroll'
          "
        >
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
