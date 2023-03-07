<script lang="ts" setup>
import { useUserStore } from '~~/store/user'

const user = useUserStore()

definePageMeta({
  layout: 'userconnected',
})
onMounted(() => {
  const body = document.querySelector('body')
  if (body) {
    body.style.backgroundColor = '#F8F8F8'
  }
})
onBeforeUnmount(() => {
  const body = document.querySelector('body')
  if (body) {
    body.style.backgroundColor = ''
  }
})
</script>

<template>
  <AdminMenu />

  <div class="container mx-auto">
    {{ user.currentUser?.email }}
    <AdminTitle
      title-black="Mes"
      title-purple="promenades"
      action-btn="Créer une promenade"
    />
    {{ user.currentUser?.email }}
  </div>
</template>
<style scoped lang="scss">
.action-button {
  background-color: var(--purple-color);
}
</style>
