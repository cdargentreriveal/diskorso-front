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
</script>

<template>
  <AdminMenu />
  <div class="container mx-auto">
    <AdminTitle
      title-black="Mes"
      title-purple="promenades"
      action-btn="Créer une promenade"
    />
  </div>
</template>
<style scoped lang="scss">
.action-button {
  background-color: var(--purple-color);
}
</style>
