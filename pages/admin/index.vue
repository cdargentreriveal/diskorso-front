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
    <div class="w-4/12 mx-auto my-10 -md:w-full">
      <div class="py-8 text-center">
        <div class="title uppercase font-bold text-4xl -md:text-3xl">
          <h2>
            Admin<br />
            <span class="font-medium">de Diskorso</span>
          </h2>
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
