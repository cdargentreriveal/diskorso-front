<script lang="ts" setup>
definePageMeta({
  layout: 'page',
})
</script>

<template>
  <div class="container mx-auto">
    <div class="btns-categories w-9/12 mx-auto">
      <div class="flex items-center justify-center">
        <button
          class="category-btn px-8 py-4 mx-2 rounded-full text-sm cat-purple uppercase"
        >
          Histoire
        </button>
        <button
          class="category-btn px-8 py-4 mx-2 rounded-full text-sm cat-orange uppercase"
        >
          Science
        </button>
        <button
          class="category-btn px-8 py-4 mx-2 rounded-full text-sm cat-blue uppercase"
        >
          Société
        </button>
      </div>
    </div>
    <div class="search-bar-container">
      <div
        class="search-bar mt-10 mb-18 flex items-center w-1/2 -xl:w-9/12 -sm:w-full mx-auto h-[50px]"
      >
        <div class="search-bar-input w-full h-full">
          <input
            type="search"
            value=""
            placeholder="Recherche par mots clés"
            class="py-4 px-8 w-full h-full border-gray border text-sm italic"
          />
        </div>
        <div class="search-bar-button text-white text-sm h-full">
          <button class="px-8 w-full h-full uppercase">
            <span class="flex items-center">Rechercher</span>
          </button>
        </div>
      </div>
    </div>
    <Separator />
    <div class="">
      <TitleSection title-black="Toutes les" title-purple="Promenades" />
    </div>
    <div class="flex mt-10 mb-20 gap-6 flex-wrap">
      <CardsTemplateCard
        image=""
        alt="coucou toi"
        title="La planète Terre"
        date="01/03/2023"
        :categories="[
          {
            categoryName: 'Histoire',
            color: 'cat-purple ',
          },
          {
            categoryName: 'Science',
            color: 'cat-orange ',
          },
          {
            categoryName: 'Société',
            color: 'cat-blue ',
          },
        ]"
        text="La Terre est la troisième planète par ordre d'éloignement
        au Soleil et la cinquième plus grande du Système solaire
        aussi bien par la masse que par le diamètre"
        :author="[
          {
            authorName: 'Florian Bridoux',
            authorAvatar: 'cat-purple ',
          },
        ]"
      />
    </div>
    <div class="py-5">
      <Pagination />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.search-bar-input input {
  border-radius: 9999px 0 0 9999px;
  color: var(--gray-color);
  &:focus {
    outline: none;
  }
}
.search-bar-button button {
  background-color: var(--blue-color);
  border-radius: 0 9999px 9999px 0;
  border: none;
  & :before {
    content: '';
    height: 20px;
    width: 20px;
    background-image: url('@/assets/images/icons/Icon-search.svg');
    display: inline-block;
    margin-right: 0.5rem;
  }
}
.search-bar-button {
  & :hover {
    background-color: #4e8ca5;
  }
}
fieldset {
  border: none;
}
</style>
