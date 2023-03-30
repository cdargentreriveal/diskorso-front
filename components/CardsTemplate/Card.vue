<template>
  <div class="card">
    <NuxtLink :to="`/promenades/${promenade.slug}`">
      <div class="card-image">
        <img
          v-if="promenade.main_image === 'string'"
          class="w-full"
          src="../../assets/images/diskorso-line-card.png"
          :alt="promenade.title"
        />

        <img
          v-else
          class="w-full"
          :src="promenade.main_image"
          :alt="promenade.title"
        />
      </div>
    </NuxtLink>
    <div class="card-content p-8">
      <div class="card-content-title font-bold text-2xl my-1">
        <h2>{{ promenade.title }}</h2>
      </div>
      <div class="card-content-date text-sm gray-color">
        Crée le : {{ getDate(promenade.createdAt) }}
      </div>
      <div class="card-content-categories flex gap-4 py-5">
        <div
          v-for="(cat, index) in promenade.categories"
          :key="index"
          class="category"
        >
          <NuxtLink :to="`/categorie/${cat.slug}`">
            <button
              :class="
                cat.color + ' category-btn px-5 py-2 rounded-full text-xs'
              "
            >
              {{ cat.title }}
            </button>
          </NuxtLink>
        </div>
      </div>
      <p class="text-sm gray-color card-content-description">
        {{ promenade.summary }}
      </p>
      <div class="card-content-bottom pt-8 pb-2">
        <div class="flex items-center">
          <div class="card-content-author w-1/2">
            <NuxtLink
              :to="`/contributor/${
                promenade.user.username + '_' + promenade.user.id
              }`"
            >
              <div class="flex gap-3 items-center">
                <div
                  class="card-content-avatar w-1/5 rounded-full overflow-hidden border border-black h-[45px] w-[45px]"
                >
                  <img
                    v-if="promenade.user.picture === null"
                    src="@/assets/images/test-avatar.jpg"
                    alt="image de profil"
                  />
                  <img
                    v-else
                    :src="promenade.user.picture"
                    alt="image de profil"
                  />
                </div>
                <div class="card-content-author gray-color text-xs italic">
                  par :
                  <span class="underline">{{ promenade.user.username }}</span>
                </div>
              </div>
            </NuxtLink>
          </div>
          <div class="card-content-link text-right w-1/2">
            <NuxtLink :to="`/promenades/${promenade.slug}`">
              <button class="font-semibold underline text-sm">
                Lire la promenade >
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { Promenade } from '~~/types/Promenades'

const propsCard = defineProps({
  promenade: {
    type: Object as PropType<Promenade>,
    default: null,
  },
  size: {
    type: String,
    default: 'md',
  },
  to: {
    type: [String, Object],
    default: undefined,
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
