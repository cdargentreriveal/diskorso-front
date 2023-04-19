<script lang="ts" setup>
import { useExtractStore } from '~~/store/extracts'
const extractsStore = useExtractStore()
const excerptCount = ref<number>(0)

const props = defineProps({
  addExcerptBlock: {
    type: Function,
    required: true,
  },
  isExcerptAdded: {
    type: Array,
    required: true,
  },
})

// const items = ref<ExcerptItem[]>([])

const toggle = (extract: any): boolean => {
  extract.showModal = !extract.showModal
  return extract.showModal
}
</script>

<template>
  <div class="w-4/12 relative">
    <div class="extraits w-11/12 text-xs mb-3 sticky top-[22%]">
      <div class="mb-6 flex items-center justify-between">
        <div class="underline mx-3">
          <NuxtLink to="/dashboard/mes-extraits">Accéder aux extraits</NuxtLink>
        </div>
        <div class="underline mx-3">
          <NuxtLink to="/dashboard/creer-un-extrait"
            >+ Créer un extrait</NuxtLink
          >
        </div>
      </div>
      <div
        v-if="extractsStore.extracts.length < 1"
        class="empty-extract h-[50vh] flex items-center justify-center border-dashed border border-slate-400 text-slate-400"
      >
        <div>Pas d'extraits sélectionnés</div>
      </div>
      <div v-else class="h-[53vh] overflow-auto">
        <div
          v-for="(extract, index) in extractsStore.extracts"
          :key="index"
          class="extraits_item bg-white rounded mb-5 p-5"
        >
          <div class="extraits_item_title text-sm font-semibold mb-2">
            <h3>{{ extract.name }}</h3>
          </div>
          <div class="extraits_item_cats flex gap-2 flex-wrap">
            <div
              v-for="(cat, indexCat) in extract.categories"
              :key="indexCat"
              class="cats category-btn px-4 py-2 rounded-full inline mb-1"
              :class="cat.color"
            >
              {{ cat.title }}
            </div>
          </div>
          <div class="extraits_item_text my-3">
            <!-- eslint-disable vue/no-v-html -->
            <p v-html="extract.content"></p>
            <!--eslint-enable-->
          </div>
          <div class="btns mt-4">
            <div class="flex items-center justify-between">
              <div
                class="extraits_view underline font-semibold"
                @click="toggle(extract)"
              >
                Voir l'extrait
              </div>
              <ModalBase :show="extract.showModal">
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
                      <a :href="extract.source" target="_blank">{{
                        extract.source
                      }}</a>
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
                        @click="toggle(extract)"
                      >
                        Fermer
                      </button>
                    </div>
                  </div>
                </div>
              </ModalBase>
              <div
                :class="{
                  'cursor-not-allowed disabled':
                    excerptCount === 4 || isExcerptAdded[extract.id],
                }"
                class="btn_add_extrait extrait_btn px-3 py-2 rounded text-white"
                @click="addExcerptBlock(extract.content, extract.id, index)"
              >
                <button>Ajouter l'extrait</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.extrait_btn {
  background-color: var(--purple-color);
}
.extraits_view:hover {
  cursor: pointer;
}
.btn_add_extrait.disabled {
  background-color: rgb(209 213 219);
}
</style>
