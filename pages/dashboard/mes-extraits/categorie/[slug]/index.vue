<script lang="ts" setup>
// ________________________________________________________________________________________
//* state
// ________________________________________________________________________________________
const numberOfPromenade = ref(3)
const config = useRuntimeConfig()
const route = useRoute()
const query = ref(
  `promenade/category/findLastPromenades/${route.params.slug}/${numberOfPromenade.value}`
)

const slug: string | any = route.params.slug

// ________________________________________________________________________________________
//* Methods pour mettre à jour promenades en fonction de la navigation
// ________________________________________________________________________________________
const url = computed(() => `${config.public.baseURL}/${query.value}`)
const { data: promenades, refresh } = useAsyncData<Promenade[]>(
  'promenades',
  async () => {
    const data = await $fetch<Promenade[]>(url.value)
    return data.sort((a, b) => b.id - a.id)
  }
)
</script>