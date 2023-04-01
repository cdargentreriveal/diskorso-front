<script lang="ts" setup>
import { useUserStore } from '~~/store/user'

const user = useUserStore()
onMounted(() => {
  const body = document.querySelector('body')
  if (body) {
    body.style.backgroundColor = '#F8F8F8'
  }
})
onBeforeUnmount(() => {
  const body = document.querySelector('body')
  if (body) {
    body.style.backgroundColor = ''
  }
})
</script>

<template>
  <div>
    <slot name="app-before" />
    <div id="app-before"></div>
    <div class="flex flex-col min-h-screen">
      <slot name="header">
        <ConnectedNavBar />
      </slot>
      <div class="w-full">
        <slot />
      </div>
      <slot name="footer"> </slot>
    </div>
    <slot name="app-after" />
    <div id="app-after"></div>
    <Footer v-if="$route.path.indexOf('dashboard') === -1" />
  </div>
</template>
