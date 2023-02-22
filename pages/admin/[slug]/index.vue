<script lang="ts" setup>
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
    <AdminTitle
      title-black="Créer une"
      title-purple="promenade"
      action-btn="Publier"
    />
  </div>
  <AdminMenuSideBar />
</template>
<style scoped lang="scss">
.action-button {
  background-color: var(--purple-color);
}
</style>
