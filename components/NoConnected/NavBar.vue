<script setup lang="ts">
import { IMenuItem } from '../../types/MenuItems'
const windowWidth = process.client && window.innerWidth
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
  <div class="navbar">
    <div class="w-full mx-auto py-3 text-center top-banner relative z-10">
      <p class="top-banner-text font-bold uppercase -sm:w-9/12 -sm:text-sm">
        La plateforme collaborative
        <span class="purple-color">100% gratuite</span>
      </p>
    </div>
    <div class="main-nav w-full top-12 left-0 right-0 z-10">
      <div class="container mx-auto py-10">
        <nav role="navigation" class="flex items-center -sm:mx-5">
          <div class="w-1/2">
            <div class="logo">
              <NuxtLink to="/">
                <img
                  src="@/assets/images/logos/diskorso-logo-white.svg"
                  alt="logo diskorso"
                />
              </NuxtLink>
            </div>
          </div>
          <div class="w-1/2">
            <ul v-if="windowWidth > 768" class="flex justify-end items-center">
              <li v-for="(item, i) in menus" :key="i">
                <Anchor
                  v-if="item.type === 'link'"
                  :to="item.route ? item.route : undefined"
                  :href="item.href ? item.href : undefined"
                  class="hover:no-underline mx-7"
                  >{{ item.text }}
                </Anchor>
                <Button
                  v-else-if="item.type === 'button'"
                  :text="item.text"
                  size="xs"
                  :class="item.text + ' font-bold p-5 capitalize mx-3 '"
                  :to="item.route ? item.route : undefined"
                  :href="item.href ? item.href : undefined"
                />
              </li>
            </ul>
            <div v-else class="burger text-right text-white">Menu</div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.top-banner {
  background-color: #e8deff;
  &-text {
    display: inline-block;
    padding: 0 1rem 0 1rem;
    border-left: 2px solid black;
    border-right: 2px solid black;
  }
}
.logo {
  filter: invert(1);
}
li .Connexion {
  background-color: white;
  color: black;
  border: 1px solid black;
}
li .Inscription {
  background-color: black;
  color: white;
  border: none;
}
.navbar-white {
  .top-banner {
    background-color: white;
  }
  .main-nav {
    position: absolute;
  }
  ul {
    color: white;
  }
  .logo {
    filter: invert(0);
  }
}
</style>
