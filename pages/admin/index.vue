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
    <div class="w-9/12 mx-auto pt-[150px]">
      <div class="pt-8 flex items-center justify-between">
        <div class="title uppercase font-bold text-3xl -md:text-3xl">
          <h2>Mes <span class="font-medium purple-color">promenades</span></h2>
        </div>
        <div class="action-button px-4 py-3 text-sm rounded-md text-white">
          <button>
            <span></span>
            <span>Créer une promenade</span>
          </button>
        </div>
      </div>
      <Separator />
    </div>
  </div>
</template>
<style scoped lang="scss">
.action-button {
  background-color: var(--purple-color);
}
</style>
