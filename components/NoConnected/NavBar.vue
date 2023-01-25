<script setup lang="ts">
import { IMenuItem } from '../../types/MenuItems'
const menus = computed((): IMenuItem[] => [
  {
    type: 'link',
    text: 'Accueil',
    route: { name: 'index' },
  },
  {
    type: 'link',
    text: 'Les Promenades',
    route: { name: 'promenades' },
  },
  {
    type: 'button',
    text: 'Connexion',
    route: { name: 'login' },
  },
  {
    type: 'button',
    text: 'Inscription',
    route: { name: 'index' },
  },
])
</script>

<template>
  <div class="w-full mx-auto py-3 text-center top-banner relative z-10">
    <p class="top-banner-text font-bold uppercase">
      La plateforme collaborative
      <span class="purple-color">100% gratuite</span>
    </p>
  </div>
  <div class="absolute w-full top-10 left-0 right-0 z-10">
    <div class="container mx-auto py-10">
      <nav role="navigation" class="flex items-center">
        <div class="w-1/2">
          <div class="logo">
            <img
              src="@/assets/images/logos/diskorso-logo-white.svg"
              alt="logo diskorso"
            />
          </div>
        </div>
        <div class="w-1/2">
          <ul class="flex justify-end gap-16 text-white items-center">
            <li v-for="(item, i) in menus" :key="i">
              <Anchor
                v-if="item.type === 'link'"
                :to="item.route ? item.route : undefined"
                :href="item.href ? item.href : undefined"
                class="hover:no-underline"
                >{{ item.text }}
              </Anchor>
              <Button
                v-else-if="item.type === 'button'"
                :text="item.text"
                size="xs"
                class="font-bold p-5 capitalize"
                :to="item.route ? item.route : undefined"
                :href="item.href ? item.href : undefined"
              />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.top-banner {
  background-color: white;
  &-text {
    display: inline-block;
    padding: 0 1rem 0 1rem;
    border-left: 2px solid black;
    border-right: 2px solid black;
  }
}
</style>
