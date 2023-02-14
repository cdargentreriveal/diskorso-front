<script lang="ts" setup>
definePageMeta({
  layout: 'userconnected',
})
</script>

<template>
  <div class="menu fixed left-0 top-[200px] h-[100vh] bg-white w-[250px]">
    <div class="menu-admin">
      <ul>
        <li class="p-8">Tutoriel</li>
        <li class="p-8">Mes promenades</li>
        <li class="p-8">Créer une promenade</li>
      </ul>
    </div>
  </div>
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
