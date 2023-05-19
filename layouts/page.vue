<script lang="ts" setup>
import { useUserStore } from '~~/store/user'
const user = useUserStore()
const intro = ref(true)
onMounted(() => {
  setTimeout(() => {
    intro.value = false
  }, 2500)
})
</script>

<template>
  <div>
    <div
      v-if="intro"
      class="intro fixed w-full h-full bg-white top-0 left-0 z-50 flex justify-center items-center"
    >
      <div>
        <div class="loader"></div>
        <div class="-md:text-sm text-xl font-bold">Bienvenue sur Diskorso</div>
      </div>
    </div>
    <div class="flex flex-col min-h-screen">
      <slot v-if="user.currentUser === null" name="header">
        <NoConnectedNavBar />
      </slot>
      <slot v-else name="header">
        <ConnectedNavBar />
      </slot>
      <div class="w-full">
        <slot />
      </div>
    </div>
    <Footer v-if="$route.path.indexOf('dashboard') === -1" />
  </div>
</template>
<style scoped lang="scss">
.intro {
  opacity: 1;
  animation: fade-in 0.5s ease-in-out 2s forwards;
}

@keyframes fade-in {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
