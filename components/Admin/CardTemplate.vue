<script lang="ts" setup>
import { PropType } from 'vue'
import { Promenade } from '~~/types/Promenades'
import { deletedPromenade } from '~~/utils/connected'
const config = useRuntimeConfig()
const { $swal } = useNuxtApp()
const displaySwal = (
  title: string,
  text: string,
  icon: string,
  confirmButtonText: string
) => {
  $swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
  })
}
async function submitDeletedPromenade() {
  const data = {
    id: propsCard.promenade.id,
  }

  try {
    await deletedPromenade(config.public.baseURL, data)
    displaySwal(
      'Promenade supprimée',
      `Votre promenade a bien été supprimée`,
      'success',
      'Ok'
    )
    refreshNuxtData()
  } catch (error) {
    displaySwal(
      'Erreur lors de la modification',
      'Une erreur est survenue lors de la création de votre promenade. Veuillez réessayer plus tard.',
      'error',
      'Ok'
    )
  }
}
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

<template>
  <div
    class="card rounded-md overflow-hidden bg-white box-shaddow relative h-full"
  >
    <div
      v-if="!promenade.published"
      class="draft absolute top-0 text-white right-0 text-xs p-2 flex items-center"
    >
      <img
        src="@/assets/images/icons/eye-off.svg"
        alt="icone oeil caché"
        class="w-full mr-2"
      />
      <span>Brouillon</span>
    </div>
    <NuxtLink :to="`/promenades/${promenade.slug}`">
      <div class="card-image">
        <img
          v-if="promenade.main_image === ''"
          class="w-full h-full object-cover"
          src="../../assets/images/banner-diskorso-promenade.jpg"
          :alt="promenade.title"
        />

        <img
          v-else
          class="w-full h-full object-cover"
          :src="promenade.main_image"
          :alt="promenade.title"
        />
      </div>
    </NuxtLink>
    <div class="card-content p-6">
      <div class="card-content-title font-bold text-xl my-1">
        <h2>{{ promenade.title }}</h2>
      </div>
      <div class="card-content-date text-xs gray-color mt-2">
        Crée le : {{ getDate(promenade.createdAt) }}
      </div>
      <div class="card-content-categories flex gap-2 py-5">
        <div
          v-for="(cat, index) in promenade.categories"
          :key="index"
          class="category"
        >
          <NuxtLink :to="`/categorie/${cat.slug}`">
            <button
              :class="
                cat.color + ' category-btn px-4 py-2 rounded-full text-xs'
              "
            >
              {{ cat.title }}
            </button>
          </NuxtLink>
        </div>
      </div>
      <p class="text-xs gray-color card-content-description">
        {{ promenade.summary }}
      </p>
      <div class="card-content-bottom pt-8 pb-2">
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
            class="card-content-link text-right text-xs w-1/2 flex gap-2 underline items-center red-color cursor-pointer"
            @click.prevent="submitDeletedPromenade"
          >
            <div class="delete ml-auto w-[12px]">
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
.draft {
  background-color: var(--blue-color);
  border-radius: 0 0 0 0.5rem;
}
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
