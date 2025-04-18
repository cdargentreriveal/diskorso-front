<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { BtnAdminPage } from '@/types/AdminTitlePage'
import { useExtractStore } from '~~/store/extracts'
import { ExtractFetched } from '~~/types/Extracts'
import { usePromenadeStore } from '~~/store/promenade'
const promenadesStore = usePromenadeStore()
definePageMeta({
  layout: 'admin',
  middleware: ['is-logged'],
})

const extractsStore = useExtractStore()

const datasTitle = computed((): BtnAdminPage[] => [
  {
    type: 'link',
    titleBlack: 'Mes',
    titlePurple: 'Extraits',
    actionBtn: [{ action: 'Créer un extrait' }],
    route: { name: 'dashboard/creer-un-extrait' },
  },
])

const numberOfExtractToDisplay = ref(9)

const totalExtracts = computed(() => extractsStore.extracts_from_db.length || 0)

interface ExtractWithModal extends ExtractFetched {
  showModal: boolean
}

// Ici on utilise directement extracts_from_db dans paginatedExtracts
const filteredExtracts = computed(() =>
  extractsStore.extracts_from_db.map((extract) => ({
    ...extract,
    showModal: false,
  }))
)

const totalPages = computed(() =>
  Math.ceil(totalExtracts.value / numberOfExtractToDisplay.value)
)

const paginationPageCurrent = ref(1)

const paginatedExtracts = computed(() => {
  const start =
    (paginationPageCurrent.value - 1) * numberOfExtractToDisplay.value
  const end = start + numberOfExtractToDisplay.value
  return filteredExtracts.value.slice(start, end)
})

onMounted(async () => {
  await extractsStore.loadExtractsFromLocalStorage()
})

// Fonctions pour la pagination
const next = () => {
  if (paginationPageCurrent.value < totalPages.value) {
    paginationPageCurrent.value++
  }
}

const previous = () => {
  if (paginationPageCurrent.value > 1) {
    paginationPageCurrent.value--
  }
}

const first = () => {
  paginationPageCurrent.value = 1
}

const last = () => {
  paginationPageCurrent.value = totalPages.value
}

// Fonction pour supprimer tous les extraits
const deleteAllExtracts = () => {
  extractsStore.removeAllExtract() // Supprimer tous les extraits de Pinia
}
</script>
<template>
  <!-- <div
    v-if="Loading"
    class="loading fixed bg-slate-600/[0.9] h-full w-full left-0 top-0 z-15 flex items-center justify-center"
  >
    <div>
      <div class="loader"></div>
      <div class="text-white mt-5 text-lg">Chargement des extraits</div>
    </div>
  </div> -->
  <AdminMenu />
  <div class="container mx-auto">
    <AdminTitle
      v-if="datasTitle[0].type === 'link'"
      :title-black="datasTitle[0].titleBlack"
      :title-purple="datasTitle[0].titlePurple"
      :action-btn="datasTitle[0].actionBtn"
      :route="datasTitle[0].route.name"
    />

    <AdminCatsFilter page="extraits" />

    <DisplayPromenadesSearchSectionConnected locate="mes-extraits" />
    <div
      v-if="promenadesStore.creationTitlePromenade"
      class="container_promenade w-9/12 switch-btn mb-10 flex items-center text-xs mx-auto my-4"
    >
      <nuxt-link :to="`/dashboard/creer-une-promenade`"
        ><button
          class="bg-lime-600 py-2 px-4 ml-2 rounded-full font-bold text-white"
        >
          Revenir à la création de la promenade
        </button></nuxt-link
      >
    </div>
    <div
      v-if="promenadesStore.selectPromenade"
      class="container_promenade w-9/12 switch-btn mb-10 flex items-center text-xs mx-auto my-4"
    >
      <nuxt-link
        :to="`/dashboard/editer-une-promenade/${promenadesStore.selectPromenade.title}`"
        ><button
          class="bg-lime-600 py-2 px-4 ml-2 rounded-full font-bold text-white"
        >
          Revenir à la modification de la promenade
        </button></nuxt-link
      >
    </div>
    <div
      v-if="extractsStore.extracts.length > 0"
      class="container_promenade w-9/12 switch-btn mb-4 flex items-center text-xs mx-auto -mt-4"
    >
      <button
        class="bg-gray gray-color py-2 px-4 ml-2 rounded-full"
        @click="deleteAllExtracts()"
      >
        <span class="red-color mr-2">✕</span>
        <span>Tout déselectionner</span>
      </button>
    </div>

    <!-- <button
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-auto flex items-center flex-wrap mb-8 h-8 px-3 text-xs rounded"
      role="menuitem"
    >
      <span>Tout supprimer</span>
    </button> -->
    <div
      class="container_promenade w-9/12 mx-auto flex items-center flex-wrap mb-8"
    >
      <div
        v-for="(extract, index) in paginatedExtracts"
        :key="index"
        class="w-4/12 p-2 h-full"
      >
        <AdminCardTemplateExtrait :extract="extract" class="h-full" />
      </div>
    </div>
    <div class="py-5 w-9/12 mx-auto flex flex-wrap mb-10">
      <AdminPagination
        v-if="totalExtracts !== null"
        :first="first"
        :previous="previous"
        :next="next"
        :last="last"
        :total-promenade="+totalExtracts"
        :totalpage="+totalPages"
        :pagination-page-current="paginationPageCurrent"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.action-button {
  background-color: var(--purple-color);
}
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
</style>
