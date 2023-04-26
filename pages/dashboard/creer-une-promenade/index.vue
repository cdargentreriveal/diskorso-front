<script lang="ts" setup>
import { BtnAdminPage } from '@/types/AdminTitlePage'
import { usePromenadeStore } from '~~/store/promenade'
const PromenadeStore = usePromenadeStore()

definePageMeta({
  layout: 'admin',
  middleware: ['is-logged'],
})

const datasTitle = computed((): BtnAdminPage[] => [
  {
    type: 'button',
    titleBlack: 'Créer une',
    titlePurple: 'promenade',
    actionBtn: [{ action: 'Voir tutoriel' }],
    route: { name: 'dashboard/tutoriel' },
  },
])

function addImageInput(): void {
  if (PromenadeStore.imageCount < 4) {
    PromenadeStore.pushItem({
      type: 'image',
      file: null,
      imageUrl: null,
      key: generateUniqueId(),
    })
    PromenadeStore.incrementCount('image')
  }
}

function addTransitionInput(): void {
  if (PromenadeStore.transitionCount < 10) {
    PromenadeStore.pushItem({
      type: 'transition',
      content: '',
      key: generateUniqueId(),
    })
    PromenadeStore.incrementCount('transition')
  }
}
</script>

<template>
  <AdminMenu />
  <div class="container mx-auto">
    <AdminTitle
      v-if="datasTitle[0].type === 'button'"
      :title-black="datasTitle[0].titleBlack"
      :title-purple="datasTitle[0].titlePurple"
      :data="datasTitle[0].data"
      :action-btn="datasTitle[0].actionBtn"
      :route="datasTitle[0].route.name"
    />
    <div class="container_promenade w-9/12 mx-auto flex gap-8">
      <CreatePromenadeHandleExtracts />

      <div class="w-8/12 relative">
        <CreatePromenadeTitle />
        <CreatePromenadeMainImage />
        <CreatePromenadeDescription />
        <CreatePromenadeDisplayPromenade />

        <!-- bloc encart vide pour stipuler qu'il faut ajouter un élément -->
        <div class="promenade_bloc_empty text-center mt-10 mb-[120px]">
          <div
            class="promenade_bloc_empty_el p-8 border-dashed border border-slate-300 text-slate-300"
          >
            Ajouter un extrait, une transition ou une image
          </div>
        </div>

        <!-- bouton ajouter une image et / ou une transition -->
        <div class="promenade_btns fixed bottom-0 left-0 py-8 w-full">
          <div class="promenade_btns_add container mx-auto">
            <div class="flex gap-12 justify-end items-center w-9/12 mx-auto">
              <div
                class="promenade_btn_image px-4 py-3 text-sm rounded text-white"
                :class="
                  PromenadeStore.imageCount === 4
                    ? 'cursor-not-allowed disabled'
                    : ''
                "
                @click="addImageInput"
              >
                <button
                  :class="
                    PromenadeStore.imageCount === 4 ? 'cursor-not-allowed' : ''
                  "
                >
                  Ajouter une image
                </button>
              </div>
              <div
                class="promenade_btn_transition px-4 py-3 text-sm rounded text-white"
                @click="addTransitionInput"
              >
                <button>Ajouter une transition</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AdminMenuSideBar />
</template>
<style scoped lang="scss">
.action-button {
  background-color: var(--purple-color);
}

.promenade_btns {
  background-color: #f8f8f8;
}
.promenade_btn_image {
  background-color: var(--blue-color);
}
.promenade_btn_image.disabled,
.btn_add_extrait.disabled {
  background-color: rgb(209 213 219);
}
.promenade_btn_transition,
.extrait_btn {
  background-color: var(--purple-color);
}

.extraits_view:hover {
  cursor: pointer;
}
.bloc-drag {
  height: calc(100% - 87px);
}
</style>
