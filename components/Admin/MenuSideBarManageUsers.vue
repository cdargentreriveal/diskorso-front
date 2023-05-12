<script lang="ts" setup>
import { Category } from '~~/types/Categories'
import { createdPromenade } from '~~/utils/connected'
const config = useRuntimeConfig()
definePageMeta({
  layout: 'page',
})
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
async function submitCreatedPromenade() {
  const data = reactive({
    title: propsAdminMenuSideBar.title,
    slug: propsAdminMenuSideBar.slug,
    published: propsAdminMenuSideBar.published,
  })

  try {
    const response = await createdPromenade(config.public.baseURL, data)
    if (response.error) {
      displaySwal('Echec', `${response.message}`, 'error', 'ok')
    } else {
      displaySwal(
        'Promenade créee',
        `Votre promenade ${data.title} a bien été créée`,
        'success',
        'Ok'
      )
    }
  } catch (error) {
    displaySwal(
      'Erreur lors de la création',
      'Une erreur est survenue lors de la création de votre promenade. Veuillez réessayer plus tard.',
      'error',
      'Ok'
    )
  }
}

const propsAdminMenuSideBar = defineProps({
  title: {
    type: String,
    default: '',
  },
  slug: {
    type: String,
    default: '',
  },
  mainImage: {
    type: String,
    default: '',
  },
  summary: {
    type: String,
    default: '',
  },
  content: {
    type: Array,
    default: () => [],
  },
  published: {
    type: Boolean,
    default: false,
  },
  actionBtn: {
    type: Object,
    default() {
      return {}
    },
  },
})
</script>
<template>
  <div
    class="menu fixed right-0 top-0 h-[100vh] bg-white 2xl:w-[210px] xl:w-[11vw] border-l-1 border-slate-300 z-10"
  >
    <div class="menu-admin pt-[150px] pb-[25px] h-full">
      <div class="px-5 py-7 grow"></div>
      <div class="published px-5 pt-7 pb-[7px]">
        <button
          type="submit"
          class="published_btn xl:w-full 2xl:w-8/12 mx-auto text-center px-4 py-3 text-sm rounded-md text-white block"
          @click.prevent="submitCreatedPromenade"
        >
          <span class="font-semibold">Enregistrer</span>
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.menu-admin {
  display: flex;
  flex-direction: column;
}

.grow {
  flex-grow: 1;
}
.published_btn {
  background-color: #50d6b7;
}
sup {
  color: #f55a78;
}
</style>
