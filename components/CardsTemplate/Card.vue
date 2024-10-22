<template>
  <div class="card">
    <NuxtLink :to="`/promenades/${promenade.slug}`">
      <div class="card-image -sm:h-[180px] 2xl:h-[240px] md:h-[200px]">
        <img
          v-if="promenade.main_image === ''"
          class="w-full h-full"
          src="../../assets/images/banner-diskorso-promenade.jpg"
          :alt="promenade.title"
        />

        <img
          v-else
          class="w-full h-full"
          :src="promenade.main_image"
          :alt="promenade.title"
        />
      </div>
    </NuxtLink>
    <div class="card-content xl:p-5 2xl:p-8 -lg:p-5">
      <div
        class="card-content-title font-bold xl:text-xl 2xl:text-2xl my-1 h-[64px] -sm:text-xl"
      >
        <h2>{{ promenade.title }}</h2>
      </div>
      <div class="card-content-date text-sm gray-color mt-2 -sm:text-xs">
        Créée le : {{ getDate(promenade.publishedAt) }}
      </div>
      <div class="card-content-categories flex flex-wrap gap-4 py-5 -md:gap-2">
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
      <p
        v-if="promenade.summary"
        class="text-sm gray-color card-content-description h-[60px]"
      >
        {{
          promenade.summary
            .slice(0, 150)
            .replace(/(<([^>]+)>)/gi, ' ')
            .replace(/\s+/g, ' ') + '...'
        }}
      </p>
      <div class="card-content-bottom pt-8 pb-2">
        <div class="flex items-center">
          <div class="card-content-author w-1/2">
            <NuxtLink :to="`/contributor/${promenade.user.username}`">
              <div class="flex gap-3 items-center">
                <div
                  class="card-content-avatar w-1/5 rounded-full overflow-hidden border border-black h-[45px] w-[45px]"
                >
                  <img
                    v-if="promenade.user.picture === null"
                    src="@/assets/images/avatar-dk.jpg"
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
              <button class="font-semibold underline text-sm -sm:text-xs">
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
</script>

<style lang="scss" scoped>
.card {
  &-image {
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
