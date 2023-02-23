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
    <div class="container_promenade w-9/12 mx-auto flex gap-8">
      <div class="w-4/12">Mes extraits</div>
      <div class="w-8/12">
        <div class="promenade_title font-semibold text-lg mb-8">
          <h2>Titre de la promenade<sup>*</sup></h2>
          <div class="my-2">
            <input
              type="text"
              name="scales"
              class="my-2 p-2 text-sm border border-slate-300 rounded w-full h-[40px]"
            />
          </div>
        </div>
        <div class="promenade_image font-semibold text-lg mb-8">
          <h2>Ajouter la photo mise en avant<sup>*</sup></h2>
          <div class="my-2">
            <input type="file" name="files" class="my-2 p-2 text-sm w-full" />
          </div>
        </div>
        <div class="promenade_description font-semibold text-lg mb-8">
          <div class="flex items-center justify-between">
            <h2>Ajouter une description<sup>*</sup></h2>
            <div class="max_words font-normal text-xs italic">110 mots max</div>
          </div>
          <textarea
            type="text"
            name="scales"
            class="my-2 p-2 text-sm border border-slate-300 rounded w-full"
          />
        </div>

        <!-- bloc encart vide pour stipuler qu'il faut ajouter un élément -->
        <div class="promenade_bloc_empty text-center mb-8">
          <div
            class="promenade_bloc_empty_el p-8 border-dashed border border-slate-300 text-slate-300"
          >
            Ajouter un extrait, une transition ou une image
          </div>
        </div>
      </div>
    </div>
  </div>
  <AdminMenuSideBar />
</template>
<style scoped lang="scss">
.action-button {
  background-color: var(--purple-color);
}
sup {
  color: #f55a78;
}
</style>
