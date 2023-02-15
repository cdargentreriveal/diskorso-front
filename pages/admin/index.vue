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
    <div class="w-8/12 mx-auto pt-[150px]">
      <div class="py-8">
        <div class="title uppercase font-bold text-3xl -md:text-3xl">
          <h2>Mes <span class="font-medium purple-color">promenades</span></h2>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.btn-submit {
  background-color: #f55a78;
}
</style>
