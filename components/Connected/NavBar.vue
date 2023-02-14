<script lang="ts">
import { IMenuItem } from '../../types/MenuItems'
export default {
  setup() {
    const menuOpen = ref(false)
    const windowWidth = ref(process.client ? window.innerWidth : 0)
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
        route: { name: 'sign_in' },
      },
    ])

    const handleResize = () => {
      windowWidth.value = window.innerWidth
    }

    onMounted(() => {
      window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })

    const displayMobileMenu = () => {
      menuOpen.value = !menuOpen.value
    }

    return {
      menuOpen,
      windowWidth,
      menus,
      displayMobileMenu,
    }
  },
}
</script>

<template>
  <div class="navbar fixed w-full top-0 left-0 box-shaddow z-20">
    <div class="w-full mx-auto py-3 text-center top-banner relative">
      <p class="top-banner-text font-bold uppercase -sm:w-9/12 -sm:text-sm">
        La plateforme collaborative
        <span class="purple-color">100% gratuite</span>
      </p>
    </div>
    <div class="main-nav w-full top-12 left-0 right-0 bg-white z-10">
      <div class="container mx-auto py-10 relative">
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
          <client-only>
            <div class="w-1/2">
              <ul
                v-if="windowWidth > 768"
                class="flex justify-end items-center"
              >
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
              <!-- Menu burger mobile -->
              <div v-else class="menu-burger">
                <div
                  class="menu-burger-line text-right"
                  @click="displayMobileMenu"
                >
                  <span>Menu</span>
                </div>
                <div
                  v-if="menuOpen === true"
                  class="menu-burger-open fixed left-0 bg-white w-full h-full z-50"
                >
                  <div
                    class="closed absolute right-10 top-10"
                    @click="displayMobileMenu"
                  >
                    Fermer
                  </div>
                  <ul class="py-10 text-xl mt-15">
                    <li v-for="(item, i) in menus" :key="i" class="py-3">
                      <Anchor
                        v-if="item.type === 'link'"
                        :to="item.route ? item.route : undefined"
                        :href="item.href ? item.href : undefined"
                        class="hover:no-underline mx-3"
                        @click="menuOpen = false"
                        >{{ item.text }}
                      </Anchor>
                      <Button
                        v-if="item.type === 'button'"
                        :text="item.text"
                        size="xs"
                        :class="
                          item.text +
                          ' font-bold p-5 capitalize mx-3 -md:py-7 -md:text-base'
                        "
                        :to="item.route ? item.route : undefined"
                        :href="item.href ? item.href : undefined"
                        @click="menuOpen = false"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </client-only>
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
  .logo {
    filter: invert(0);
  }
  ul {
    color: white;
  }
  .menu-burger-line {
    color: white;
  }
}
.menu-burger li:nth-child(3) {
  padding-top: 2rem;
}
.menu-burger {
  & ul {
    cursor: pointer;
    color: black;
  }
  &-line {
    cursor: pointer;
  }
  &-open {
    top: -100%;
    animation: menuOpen 0.7s ease-in-out forwards;
  }
}
@keyframes menuOpen {
  from {
    top: -100%;
  }
  to {
    top: 0;
  }
}
</style>
