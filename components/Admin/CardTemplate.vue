<script lang="ts" setup>
import { PropType } from 'vue'
import { Promenade } from '~~/types/Promenades'
import { usePromenadeStore } from '~~/store/promenade'
import { deletedPromenade } from '~~/utils/connected'
const PromnadeStore = usePromenadeStore()
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
      'Une erreur est survenue lors de la suppression de votre promenade. Veuillez réessayer plus tard.',
      'error',
      'Ok'
    )
  }
}
function test() {
  PromnadeStore.setPromenade(propsCard.promenade)
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
  <div class="card rounded-md overflow-hidden bg-white box-shaddow h-full">
    <NuxtLink :to="`/promenades/${promenade.slug}`">
      <div class="card-image relative">
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
        <div
          v-if="!promenade.published"
          class="draft absolute top-0 text-white right-0 text-xs p-2 flex items-center"
        >
          <img
            src="@/assets/images/icons/eye-off.svg"
            alt="icone oeil caché"
            class="w-[15px] mr-2"
          />
          <span>En brouillon</span>
        </div>
        <div
          class="date absolute bottom-0 right-0 bg-white card-content-date text-xs gray-color text-xs p-3"
        >
          Crée le : {{ getDate(promenade.createdAt) }}
        </div>
      </div>
    </NuxtLink>
    <div class="card-content p-6">
      <div class="card-content-title font-bold text-xl my-1 h-[56px]">
        <h2>{{ promenade.title }}</h2>
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
      <p class="text-xs gray-color card-content-description h-[32px]">
        {{ promenade.summary }}
      </p>
      <hr class="my-6" />
      <div class="card-content-bottom pb-2">
        <div class="flex items-center justify-between">
          <div class="card-content-author w-7/12">
            <div
              v-if="!promenade.published"
              class="text-black right-0 text-xs flex items-center bg-white underline gap-2"
            >
              <div class="w-[17px]">
                <img
                  src="@/assets/images/icons/menu-admin/eye.svg"
                  alt=""
                  class="w-full"
                />
              </div>
              <span>Publier maintenant </span>
            </div>
            <div
              v-else
              class="text-black right-0 text-xs flex items-center bg-white underline gap-2"
            >
              <div class="w-[17px]">
                <img
                  src="@/assets/images/icons/menu-admin/eye.svg"
                  alt=""
                  class="w-full"
                />
              </div>
              <span>Mettre en brouillon </span>
            </div>
          </div>
          <div
            class="card-content-link text-right text-xs w-5/12 flex gap-2 underline items-center red-color cursor-pointer"
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
        <hr class="my-6" />
        <div class="test" @click="test">test</div>
        <div class="w-7/12 mx-auto">
          <NuxtLink
            :to="`/dashboard/editer-une-promenade/${promenade.slug}`"
            @click="test"
          >
            <div
              class="edit-promenade font-semibold text-xs text-center border border-black rounded-md p-2 cursor-pointer"
            >
              Modifier
            </div>
          </NuxtLink>
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
.date {
  border-radius: 0.5rem 0 0 0;
}
.card {
  &-image {
    height: 180px;
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
