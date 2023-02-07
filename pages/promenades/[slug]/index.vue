<template>
  <div class="promenade_page">
    <div class="promenade_page_banner h-[55vh] w-full"></div>
    <div
      class="promenade_page_content w-8/12 mx-auto bg-white py-20 -mt-40 rounded-xl relative box-shaddow"
    >
      <div
        class="promenade_page_content_avatar w-[80px] h-[80px] rounded-full overflow-hidden absolute -top-10 left-17"
      >
        <img src="@/assets/images/test-avatar.jpg" alt="avatar auteur" />
      </div>
      <div class="promenade_page_content_header px-20 pb-5">
        <div class="promenade_page_content_title text-3xl font-bold">
          <h1>La planète terre</h1>
        </div>
        <div
          class="promenade_page_content_created flex gap-2 italic text-sm py-4"
        >
          <p>Créee le : 01/05/2023</p>
          <span>-</span>
          <p>par : Florian Bridoux</p>
        </div>
        <div class="btns-categories py-4">
          <div class="flex items-center">
            <button
              class="category-btn px-6 py-3 mx-2 rounded-full text-xs cat-purple uppercase"
            >
              Histoire
            </button>
            <button
              class="category-btn px-6 py-3 mx-2 rounded-full text-xs cat-orange uppercase"
            >
              Science
            </button>
            <button
              class="category-btn px-6 py-3 mx-2 rounded-full text-xs cat-blue uppercase"
            >
              Société
            </button>
          </div>
        </div>
      </div>
      <div class="promenade_page_content_details_transition">
        <div class="px-20 py-10">
          <div
            class="promenade_page_content_details_transition_title text-2xl font-semi-bold py-4"
          >
            <h2>Définition</h2>
          </div>
          <div class="promenade_page_content_details_transition_text">
            <p>Ceci est une transition créee par le créateur de la promenade</p>
          </div>
        </div>
      </div>
      <div class="promenade_page_content_details_extrait">
        <div class="px-20 py-10">
          <div
            class="promenade_page_content_details_extrait_title text-2xl font-semi-bold py-4"
          >
            <h2>Titre de l'extrait</h2>
          </div>
          <div class="promenade_page_content_details_extrait_text">
            <p>Ceci est un extrait intégré par le créateur à la promenade</p>
          </div>
        </div>
      </div>
      <div class="promenade_page_content_details_image">
        <div class="px-20 py-10 rounded-md overflow-hidden">
          <img src="@/assets/images/test-banner-card.jpg" alt="" />
          <p class="py-4 text-right">Crédit : @unsplash</p>
        </div>
      </div>
    </div>
    <div class="w-8/12 mx-auto">
      <CtaLogin />
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
    &_details {
      &_extrait {
        background-color: #f8f8f8;
      }
    }
  }
}
</style>
