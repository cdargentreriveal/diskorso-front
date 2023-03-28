<script lang="ts" setup>
import { PropType } from 'vue'
import { ExtractFetched } from '~~/types/Extracts'

const propsCard = defineProps({
  extract: {
    type: Object as PropType<ExtractFetched>,
    default: null,
  },
})
onMounted(() => {
  const descriptionCard = document.querySelectorAll('.card-content-description')
  if (descriptionCard) {
    descriptionCard.forEach((element) => {
      const shortDescription = element.textContent?.substring(0, 170) ?? ''
      element.textContent = shortDescription + '...'
    })
  }
})
</script>

<template>
  <div class="card-extrait rounded-md overflow-hidden bg-white box-shaddow">
    <div class="card-content p-6">
      <div class="card-content-title font-bold text-xl my-1 mb-3">
        <h2>{{ extract.name }}</h2>
      </div>
      <div class="card-content-categories flex gap-4 py-5">
        <div
          v-for="(cat, index) in extract.categories"
          :key="index"
          class="category"
        >
          <NuxtLink :to="`/categorie/${cat.slug}`">
            <button
              :class="`${cat.color} category-btn px-5 py-2 rounded-full text-xs`"
            >
              {{ cat.title }}
            </button>
          </NuxtLink>
        </div>
      </div>
      <p class="text-xs gray-color card-content-description">
        {{ extract.description }}
      </p>
      <div class="card-content-view text-xs mt-5">
        <div class="flex items-center justify-between">
          <div class="card-content-number flex items-center">
            <div class="card-content-number-list flex items-center">
              <div
                class="rounded-full bg-amber-600 h-[25px] w-[25px] border border-white"
              ></div>
              <div
                class="rounded-full bg-red-600 h-[25px] w-[25px] border border-white -ml-3"
              ></div>
            </div>
            <div class="card-content-number-check ml-1">+6</div>
          </div>
          <div class="card-content-view-btn underline">Voir l'extrait ></div>
        </div>
      </div>
      <hr class="my-6" />
      <div class="card-content-bottom pb-2">
        <div class="flex items-center justify-between">
          <div class="card-content-author w-1/2">
            <div
              class="edit-promenade font-semibold text-xs text-center border border-black rounded-md p-2 cursor-pointer"
            >
              Modifier
            </div>
            <!--             <NuxtLink
              :to="`/contributor/${
                promenade.user.username + '_' + promenade.user.id
              }`"
            >
              <div class="flex gap-3 items-center">
                <div
                  class="card-content-avatar w-1/5 rounded-full overflow-hidden border border-black h-[45px] w-[45px]"
                >
                  <img :src="promenade.user.picture" alt="avatar" />
                </div>
                <div class="card-content-author gray-color text-xs italic">
                  par :
                  <span class="underline">{{ promenade.user.username }}</span>
                </div>
              </div>
            </NuxtLink> -->
          </div>
          <div
            class="card-content-link text-right text-xs w-1/2 flex gap-2 underline items-center red-color"
          >
            <div class="delete ml-auto w-[12px] cursor-pointer">
              <img
                src="@/assets/images/icons/corbeille.svg"
                alt=""
                class="w-full"
              />
            </div>
            <span>Supprimer</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  &-image {
    height: 240px;
    width: 100%;
    overflow: hidden;
    & img {
      object-fit: cover;
    }
  }
  &-content {
    &-date {
      font-style: italic;
    }
  }
}
</style>
