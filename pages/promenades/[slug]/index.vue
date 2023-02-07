<template>
  <div class="promenade_page">
    <div class="promenade_page_banner h-[55vh] w-full"></div>
    <div
      class="promenade_page_content w-8/12 mx-auto bg-white -mt-40 rounded-xl p-20 relative box-shaddow"
    >
      <div
        class="promenade_page_content_avatar w-[80px] h-[80px] rounded-full overflow-hidden absolute -top-10 left-17"
      >
        <img src="@/assets/images/test-avatar.jpg" alt="avatar auteur" />
      </div>
      <div class="promenade_page_content_title text-3xl font-bold">
        <h1>La planète terre</h1>
      </div>
      <div
        class="promenade_page_content_created flex gap-2 italic text-sm py-4"
      >
        <p>Crée le : 01/05/2023</p>
        <span>-</span>
        <p>par: Florian Bridoux</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'page',
})

const route = useRoute()
/* route.params = { slug: 'toto' } */
</script>

<style lang="scss" scoped>
.promenade_page {
  &_banner {
    background-image: url('@/assets/images/test-banner-card.jpg');
    background-size: cover;
  }
  &_content {
  }
}
</style>
