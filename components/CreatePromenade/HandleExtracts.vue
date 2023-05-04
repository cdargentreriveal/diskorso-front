<script lang="ts" setup>
import { useExtractStore } from '~~/store/extracts'
import { usePromenadeStore } from '~~/store/promenade'
const extractsStore = useExtractStore()
const PromenadeStore = usePromenadeStore()

const test = ref()
// function addExcerptBlock(content: string, id: number, index: number): void {
//   if (excerptCount.value < 4) {
//     // Vérifier si l'extrait est déjà présent
//     const existingExcerpt = items.value.find(
//       (item) => item.type === 'excerpt' && item.id === id,
//       (isExcerptAdded.value[id] = true)
//     )
//     if (existingExcerpt) {
//       return
//     }

//     // Ajouter l'extrait s'il n'est pas déjà présent
//     items.value.push({
//       type: 'excerpt',
//       id,
//       index,
//       content,
//       key: generateUniqueId(),
//     })
//     excerptCount.value++
// }
// }
function addExcerptBlock(content: string, id: number, index: number): void {
  if (PromenadeStore.excerptCount < 4) {
    // Vérifier si l'extrait est déjà présent
    nextTick(() => {
      const existingExcerpt = PromenadeStore.items.find(
        (item) => item.type === 'excerpt' && item.id === id
      )
      if (!existingExcerpt) {
        // Ajouter l'extrait s'il n'est pas déjà présent
        PromenadeStore.pushItem({
          type: 'excerpt',
          id,
          index,
          content,
          key: generateUniqueId(),
        })
        PromenadeStore.incrementCount('excerpt')
      } else {
        PromenadeStore.removeExtractid(id)
      }
    })
  }
}

// const items = ref<ExcerptItem[]>([])
function sendToPinia(extract: number) {
  extractsStore.removeExtract(extract)
  localStorage.removeItem(`extract_${extract}_isChecked`) // remove the extract if the checkbox is unchecked
}
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
          class="extraits_item bg-white rounded mb-5 p-5 relative"
        >
          <div
            class="closed absolute top-5 right-5 text-xs cursor-pointer"
            @click="sendToPinia(extract.id)"
          >
            ✕
          </div>
          <div class="extraits_item_title text-sm font-semibold mb-3">
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
              <ModalBase :show="extract.showModal ?? false">
                <div class="relative">
                  <div
                    class="closed absolute top-8 right-8 text-lg cursor-pointer"
                    @click="toggle(extract)"
                  >
                    ✕
                  </div>
                  <div class="p-12 divide-y">
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
              {{ PromenadeStore.addExtractid(extract.id) }}
              {{ PromenadeStore.removeExtractid(extract.id) }}
              <div
                :class="{
                  'cursor-not-allowed disabled':
                    PromenadeStore.excerptCount === 4 /* ||
                    PromenadeStore.addExtractid(extract.id) */,
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
.cats {
  font-size: 11px;
}
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
