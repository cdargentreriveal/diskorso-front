<script lang="ts" setup>
import { PropType } from 'vue'
import { ExtractFetched } from '~~/types/Extracts'
import { deletedExtract } from '~~/utils/connected/deletedExtract'

// const showModal = ref(false)
const showModal = useState<boolean>('showModal', () => false)
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

const propsCard = defineProps({
  extract: {
    type: Object as PropType<ExtractFetched>,
    default: null,
  },
  showModal: {
    type: Boolean,
    required: true,
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

async function submitDeletedExtract() {
  const data = {
    ids: [propsCard.extract.id],
  }

  try {
    await deletedExtract(config.public.baseURL, data)
    displaySwal('Extrait(s) supprimé(s)', ``, 'success', 'Ok')
    refreshNuxtData()
  } catch (error) {
    displaySwal(
      'Erreur lors de la modification',
      'Une erreur est survenue. Veuillez réessayer plus tard.',
      'error',
      'Ok'
    )
  }
}
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
          <button
            class="card-content-view-btn underline"
            @click="showModal = true"
          >
            Voir l'extrait >
          </button>
          <ModalBase :show="showModal">
            <div class="p-4 px-15 divide-y">
              <div>
                <div class="text-lg font-semibold my-8 text-slate-500">
                  {{ extract.name }}
                </div>
                <!-- eslint-disable vue/no-v-html -->
                <div
                  class="text-xs text-justify"
                  v-html="extract.content"
                ></div>
                <!--eslint-enable-->
                <div
                  class="text-xs italic font-semibold my-5 text-slate-500 text-right"
                >
                  {{ extract.source }}
                </div>
              </div>
              <div class="flex flex-col">
                <p
                  v-if="extract.used_in_article"
                  class="text-xs mt-5 font-semibold"
                >
                  Cet extrait apparaît dans les promenades suivantes :
                </p>
                <p v-else class="text-xs mt-5 font-semibold">
                  Extrait non encore utilisé
                </p>
                <div class="self-end">
                  <button
                    type="button"
                    class="w-100px bg-indigo-200 px-3 py-1 font-medium"
                    @click="showModal = false"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </ModalBase>
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
          </div>
          <div
            class="card-content-link text-right text-xs w-1/2 flex gap-2 underline items-center red-color cursor-pointer"
            @click.prevent="submitDeletedExtract"
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
