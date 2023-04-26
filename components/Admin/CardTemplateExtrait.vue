<script lang="ts" setup>
import { PropType } from 'vue'
import { ExtractFetched } from '~~/types/Extracts'
import { deletedExtract } from '~~/utils/connected/deletedExtract'
import { useExtractStore } from '~~/store/extracts'

const extractsStore = useExtractStore()

// const showModal = ref(false)
// const showModal = useState<boolean>('showModal', () => false)
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
  toggle: {
    type: Function,
    required: true,
  },
})

interface ExtractWithModal extends ExtractFetched {
  showModal: boolean
}

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

const extractId = ref(propsCard.extract.id)
const isChecked = ref(
  localStorage.getItem(`extract_${extractId.value}_isChecked`) === 'true' ||
    false
)

function sendToPinia(extract: ExtractFetched) {
  isChecked.value = !isChecked.value
  const newExtract = { ...extract, showModal: false } // toggle the checked state

  if (isChecked.value) {
    extractsStore.addExtracts(newExtract)
    localStorage.setItem(`extract_${extractId.value}_isChecked`, 'true') // add the extract if the checkbox is checked
  } else {
    extractsStore.removeExtract(newExtract.id)
    localStorage.removeItem(`extract_${extractId.value}_isChecked`) // remove the extract if the checkbox is unchecked
  }
}

watch(extractId, (newVal, oldVal) => {
  if (process.client) {
    isChecked.value =
      localStorage.getItem(`extract_${newVal}_isChecked`) === 'true' || false
  }
})

let prevValue = extractsStore.tout_selectionner
watch(
  () => extractsStore.tout_selectionner,
  (newValue, oldValue) => {
    if (newValue === oldValue + 1) {
      // Compare avec la valeur précédente pour détecter l'incrémentation
      isChecked.value = false // Met à jour la valeur de isChecked
      localStorage.setItem(`extract_${extractId.value}_isChecked`, 'true')
    }
    localStorage.removeItem(`extract_${extractId.value}_isChecked`)
    prevValue = newValue // Met à jour la valeur précédente avec la valeur actuelle
  }
)
</script>

<template>
  <div class="card-extrait rounded-md overflow-hidden bg-white box-shaddow">
    <div class="card-content p-6">
      <!-- Rounded switch -->
      <div class="switch-btn mb-4 flex items-center text-xs justify-end">
        <div class="mr-2 visible">Sélectionner</div>
        <label class="switch">
          <input
            v-model="isChecked"
            type="checkbox"
            @click="sendToPinia(extract)"
          />

          <span class="slider round"></span>
        </label>
      </div>
      <hr class="my-6" />

      <span class="small text-slate-400">{{ getDate(extract.createdAt) }}</span>
      <div class="card-content-title font-bold text-lg my-1 mb-3 h-[50px]">
        <h2>{{ extract.name }}</h2>
      </div>
      <div class="card-content-categories flex py-5 gap-2">
        <div
          v-for="(cat, index) in extract.categories"
          :key="index"
          class="category"
        >
          <NuxtLink :to="`/dashboard/mes-extraits/categorie/${cat.slug}`">
            <button
              :class="`${cat.color} category-btn px-5 py-2 rounded-full text-xs w-full`"
            >
              {{ cat.title }}
            </button>
          </NuxtLink>
        </div>
      </div>
      <!-- eslint-disable vue/no-v-html -->
      <div
        class="text-xs gray-color card-content-description h-[55px] flex items-center"
        v-html="
          `${extract.content
            .slice(0, 150)
            .replace(/(<([^>]+)>)/gi, ' ')
            .replace(/\s+/g, ' ')}...`
        "
      ></div>
      <div class="card-content-view text-xs mt-5">
        <div class="flex items-center justify-between h-[30px]">
          <!-- <div v-if="extract.promenades.length !== 0"></div> -->
          <div
            v-if="extract.promenades.length !== 0"
            class="card-content-number flex items-center"
          >
            <div class="card-content-number-list flex items-center">
              <div
                v-for="(extractElement, index) in extract.promenades.slice(
                  0,
                  5
                )"
                :key="index"
                class="-ml-3"
              >
                <img
                  v-if="extractElement.main_image"
                  :src="extractElement.main_image"
                  alt=""
                  class="object-top h-[30px] w-[30px] rounded-full overflow-hidden border-2 border-white"
                />
                <img
                  v-else
                  src="@/assets/images/banner-diskorso-promenade.jpg"
                  alt=""
                  class="object-top h-[30px] w-[30px] rounded-full overflow-hidden border-2 border-white"
                />
              </div>
            </div>
            <div class="card-content-number-check ml-1">
              +{{ extract.promenades.length }}
            </div>
          </div>
          <div v-else>
            <span class="text-xs italic text-gray-400"
              >Extrait non utilisé</span
            >
          </div>
          <button class="card-content-view-btn underline" @click="toggle()">
            Voir l'extrait >
          </button>
          <ModalBase :show="showModal">
            <div class="relative">
              <div
                class="closed absolute top-8 right-8 text-lg cursor-pointer"
                @click="toggle()"
              >
                ✕
              </div>
              <div class="p-12 divide-y">
                <div>
                  <div class="text-lg font-semibold mb-8 text-slate-500">
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
                    <a :href="extract.source" target="_blank">{{
                      extract.source
                    }}</a>
                  </div>
                </div>
                <div class="flex flex-col">
                  <div v-if="extract.used_in_article">
                    <p class="text-xs mt-5 font-semibold">
                      Cet extrait apparaît dans les promenades suivantes :
                    </p>
                    <ul
                      class="list-decimal text-xs mt-4 ml-4 flex flex-col flex-wrap content-start h-[100px]"
                    >
                      <li
                        v-for="(promenade, i) in extract.promenades"
                        :key="i"
                        class="w-3/12 mr-2"
                      >
                        <nuxt-link :to="`/promenades/${promenade.slug}`">
                          <span
                            class="text-xs mt-4 inline-block underline underline-offset-2"
                          >
                            {{ promenade.title }}
                          </span></nuxt-link
                        >
                      </li>
                    </ul>
                  </div>
                  <p v-else class="text-xs mt-5 font-semibold">
                    Extrait non encore utilisé
                  </p>
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
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 35px;
  height: 20px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 12px;
  width: 12px;
  left: 3px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(16px);
  -ms-transform: translateX(16px);
  transform: translateX(16px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.small {
  font-size: 0.65rem;
  font-style: italic;
}
</style>
