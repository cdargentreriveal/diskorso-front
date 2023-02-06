<script lang="ts" setup>
const propsBtn = defineProps({
  text: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'md',
  },
  to: {
    type: [String, Object],
    default: undefined,
  },
  href: {
    type: String,
    default: undefined,
  },
})
// state:styles
const defaultStyle = `
  cursor-pointer
  border transition-color duration-300
  focus:outline-none focus:ring-1 focus:ring-offset-1 focus:dark:ring-offset-gray-50 focus:dark:ring-gray-400 focus:ring-gray-600/[0.6] focus:ring-offset-gray-800/[0.6]
  flex items-center justify-center font-semibold
`
const styles = reactive<{
  [key: string]: string
}>({
  none: '',
  primary: 'bg-primary-500 hover:bg-primary-400 border-primary-500',
  secondary: 'cursor-pointer',
  opposite:
    'text-white bg-gray-800 hover:bg-white hover:text-gray-800 hover:border-gray-900 dark:text-gray-800 dark:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:border-white',
})
const sizes = reactive<{
  [key: string]: string
}>({
  lg: 'h-13 px-6 text-lg rounded-lg',
  md: 'h-10 px-3 text-base rounded',
  sm: 'h-9 px-3 text-sm rounded',
  xs: 'h-6 px-4 text-xs rounded',
})
// state
const selectedStyle = computed(() =>
  propsBtn.type in styles ? styles[propsBtn.type] : styles.primary
)
const selectedSize = computed(() => sizes[propsBtn.size] || sizes.lg)
// methods
const onClick = (event: MouseEvent) => {
  const router = useRouter()
  if (props.to) {
    router.push(props.to)
  }
  if (!props.href) {
    event.preventDefault()
  }
}
</script>

<template>
  <NuxtLink
    v-if="type === 'primary'"
    tag="a"
    :to="to"
    :class="`${defaultStyle} ${selectedStyle} ${selectedSize}`"
  >
    <slot>{{ text }}</slot>
  </NuxtLink>
  <NuxtLink
    v-else-if="type === 'secondary'"
    tag="a"
    :to="to"
    :class="`${selectedStyle} ${selectedSize}`"
  >
    <div
      class="cursor-pointer inline-flex justify-center items-center my-10 border border-black rounded-full px-8 hover:bg-gray-300 py-4"
    >
      <div class="link uppercase">
        <slot>{{ text }}</slot>
      </div>
      <span>
        <img
          src="@/assets/images/icons/arrow-right-black.svg"
          alt="fleche droite noire"
          class="pl-3"
        />
      </span>
    </div>
  </NuxtLink>
  <a
    v-else
    :class="`${defaultStyle} ${selectedStyle} ${selectedSize}`"
    :href="href"
    @click="onClick"
  >
    <slot>{{ text }}</slot>
  </a>
</template>
