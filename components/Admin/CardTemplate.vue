<script lang="ts" setup>
import { PropType } from 'vue'
import { Promenade } from '~~/types/Promenades'
import { usePromenadeStore } from '~~/store/promenade'
import {
  deleteContentImagePromenade,
  deletedPromenade,
  publishPromenade,
  unPublishPromenade,
} from '~~/utils/connected'
import { ItemType } from '~~/types/CreatePromenade'
const PromnadeStore = usePromenadeStore()
const config = useRuntimeConfig()
const { $swal } = useNuxtApp()
const displaySwal = (
  title: string,
  text: string,
  icon: string,
  confirmButtonText: string,
  showCancelButton?: boolean
) => {
  $swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
    showCancelButton,
  })
}
function submitDeletedPromenade() {
  const data = {
    id: propsCard.promenade.id,
  }
  try {
    $swal
      .fire({
        title: 'Êtes-vous sûr?',
        text: 'La suppression de promenade est définitive!',
        icon: 'warning',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonColor: '#69B8D9',
        cancelButtonColor: '#F55A78',
        confirmButtonText: 'Oui, je supprime!',
        cancelButtonText: 'Annuler',
      })
      .then(async (result: any) => {
        if (result.isConfirmed) {
          if (propsCard.promenade.main_image !== '') {
            await PromnadeStore.addImageToDeleteArrayAllPromenade(
              propsCard.promenade.main_image
            )
          }
          propsCard.promenade.content.forEach((element: ItemType) => {
            if (element.type === 'image') {
              PromnadeStore.addImageToDeleteArrayAllPromenade(element.imageUrl!)
            }
          })
          const dataToDelete = reactive({
            imagesToDelete: PromnadeStore.imagesToDeleteAllPromenade,
          })
          await deleteContentImagePromenade(config.public.baseURL, dataToDelete)
          await deletedPromenade(config.public.baseURL, data)
          displaySwal(
            'Promenade supprimée',
            `Votre promenade a bien été supprimée`,
            'success',
            'Ok'
          )
          await refreshNuxtData()
        }
      })
  } catch (error) {
    displaySwal(
      'Erreur lors de la modification',
      'Une erreur est survenue lors de la suppression de votre promenade. Veuillez réessayer plus tard.',
      'error',
      'Ok'
    )
  }
}
async function submitPublishPromenade(id: number) {
  try {
    await publishPromenade(config.public.baseURL, id)
    displaySwal(
      'Promenade publiée',
      `Votre promenade a bien été publiée, elle est maintenant visible sur le site`,
      'success',
      'Ok'
    )
    await PromnadeStore.publishPromenade(id)
    await refreshNuxtData()
  } catch (error) {
    displaySwal(
      'Erreur lors de la modification',
      'Une erreur est survenue lors de la modification de votre promenade. Veuillez réessayer plus tard.',
      'error',
      'Ok'
    )
  }
}
async function submitUnpublishPromenade(id: number) {
  try {
    await unPublishPromenade(config.public.baseURL, id)
    displaySwal(
      'Promenade retirée',
      `Votre promenade a bien été retirée, elle est maintenant non visible sur le site`,
      'success',
      'Ok'
    )
    await refreshNuxtData()
    // TODO: vérifier l'action du store, changer dans le localstorage
    await PromnadeStore.publishPromenade(id)
  } catch (error) {
    displaySwal(
      'Erreur lors de la modification',
      'Une erreur est survenue lors de la modification de votre promenade. Veuillez réessayer plus tard.',
      'error',
      'Ok'
    )
  }
}
function getPromenadeEdit() {
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
    <NuxtLink :to="`/dashboard/promenades/${promenade.slug}`">
      <div
        class="card-image relative 2xl:h-[180px] xl:h-[150px]"
        :class="!promenade.published ? 'filter-gray' : ''"
      >
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
          class="draft absolute top-0 text-white right-0 text-xs p-2 flex items-center justify-center w-[136px]"
        >
          <img
            src="@/assets/images/icons/eye-off.svg"
            alt="icone oeil caché"
            class="w-[15px] mr-2"
          />
          <span>En brouillon</span>
        </div>
        <div
          v-else
          class="published absolute top-0 text-white right-0 text-xs p-2 flex items-center justify-center w-[136px]"
        >
          <img
            src="@/assets/images/icons/eye-white.svg"
            alt="icone oeil caché"
            class="w-[15px] mr-2"
          />
          <span>Publiée</span>
        </div>
        <div
          class="date absolute bottom-0 right-0 bg-white card-content-date text-xs gray-color text-xs p-3"
        >
          Créée le : {{ getDate(promenade.publishedAt) }}
        </div>
      </div>
    </NuxtLink>
    <div class="card-content p-6">
      <div
        class="card-content-title font-bold 2xl:text-xl xl:text-md my-1 2xl:h-[56px] xl:h-[50px]"
      >
        <h2>{{ promenade.title }}</h2>
      </div>
      <div class="card-content-categories flex gap-2 py-5">
        <div
          v-for="(cat, index) in promenade.categories"
          :key="index"
          class="category"
        >
          <NuxtLink :to="`/dashboard/mes-promenades/categorie/${cat.slug}`">
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
      <p
        v-if="promenade.summary"
        class="text-xs gray-color card-content-description h-[50px] flex items-center"
      >
        {{
          promenade.summary
            .slice(0, 150)
            .replace(/(<([^>]+)>)/gi, ' ')
            .replace(/\s+/g, ' ') + '...'
        }}
      </p>
      <hr class="my-6" />
      <div class="card-content-bottom pb-2">
        <div class="flex items-center justify-between">
          <div class="card-content-author w-7/12">
            <div
              v-if="!promenade.published"
              class="text-black right-0 text-xs flex items-center bg-white underline gap-2 cursor-pointer"
              @click.prevent="submitPublishPromenade(promenade.id)"
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
              class="text-black right-0 text-xs flex items-center bg-white underline gap-2 cursor-pointer"
              @click.prevent="submitUnpublishPromenade(promenade.id)"
            >
              <div class="w-[17px]">
                <img
                  src="@/assets/images/icons/eye-off-gray.svg"
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
        <div class="w-7/12 mx-auto">
          <NuxtLink
            :to="`/dashboard/editer-une-promenade/${promenade.slug}`"
            @click="getPromenadeEdit"
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
  background-color: var(--gray-color);
  border-radius: 0 0 0 0.5rem;
}
.filter-gray {
  filter: grayscale(1);
}
.published {
  background-color: var(--blue-color);
  border-radius: 0 0 0 0.5rem;
}
.date {
  border-radius: 0.5rem 0 0 0;
}
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
