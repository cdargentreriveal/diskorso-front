<script lang="ts" setup>
import { useUserStore } from '~~/store/user'
const user = useUserStore()
</script>

<template>
  <div>
    <slot name="app-before" />
    <div id="app-before"></div>
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
      <slot name="footer"> </slot>
    </div>
    <slot name="app-after" />
    <div id="app-after"></div>
    <Footer />
  </div>
</template>
