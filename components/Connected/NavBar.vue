<script lang="ts">
import { useUserStore } from '~~/store/user'
import { IMenuItem } from '~~/types/MenuItems'
export default {
  setup() {
    const menuOpen = ref(false)
    const windowWidth = ref(process.client ? window.innerWidth : 0)
    const user = useUserStore()

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
        type: 'link',
        text: 'Mon Dashboard',
        route: { name: 'dashboard' },
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
      user,
      menus,
      menuOpen,
      windowWidth,
      displayMobileMenu,
    }
  },
}
</script>

<template>
  <div
    class="navbar w-full top-0 left-0 z-20"
    :class="$route.path.indexOf('dashboard') === -1 ? '' : 'fixed'"
  >
    <div class="w-full mx-auto py-3 text-center top-banner relative">
      <p class="top-banner-text font-bold uppercase -sm:w-9/12 -sm:text-sm">
        La plateforme collaborative
        <span class="purple-color">100% gratuite</span>
      </p>
    </div>
    <div
      class="main-nav w-full top-12 left-0 right-0"
      :class="
        $route.path.indexOf('dashboard') === -1
          ? ''
          : 'bg-white z-10 border-b-1 border-slate-300'
      "
    >
      <div
        class="container mx-auto relative"
        :class="$route.path.indexOf('dashboard') === -1 ? 'py-10' : 'py-5'"
      >
        <nav role="navigation" class="flex items-center mx-5">
          <div class="w-1/2">
            <div class="logo w-[130px]">
              <NuxtLink to="/">
                <img
                  src="@/assets/images/logos/diskorso-logo-white-2.svg"
                  alt="logo diskorso"
                />
              </NuxtLink>
            </div>
          </div>
          <!-- <client-only> -->
          <div class="w-1/2">
            <ul
              v-if="windowWidth > 768"
              class="flex justify-end items-center gap-4"
            >
              <li v-for="(item, i) in menus" :key="i">
                <Anchor
                  v-if="item.type === 'link'"
                  :to="item.route ? item.route : undefined"
                  :href="item.href ? item.href : undefined"
                  class="hover:no-underline mx-4"
                  >{{ item.text }}
                </Anchor>
                <Button
                  v-else-if="item.type === 'button'"
                  :text="item.text"
                  size="xs"
                  :class="item.text + ' font-bold p-5 capitalize mx-7 '"
                  :to="item.route ? item.route : undefined"
                  :href="item.href ? item.href : undefined"
                />
              </li>
              <nuxt-link to="/dashboard/account">
                <li class="user_connected ml-3">
                  <span class="purple-color font-semibold">{{
                    user.currentUser?.username
                  }}</span>
                </li>
              </nuxt-link>
              <li
                class="rounded-full overflow-hidden border border-black h-[45px] w-[45px]"
              >
                <nuxt-link to="/dashboard/account">
                  <img
                    v-if="user.currentUser?.picture === null"
                    src="@/assets/images/test-avatar.jpg"
                    alt="Photo de profil"
                  />
                  <img
                    v-else
                    :src="user.currentUser?.picture"
                    alt="Photo de profil"
                  />
                </nuxt-link>
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
              </div>
            </div>
          </div>
          <!-- </client-only> -->
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
  .user_connected .purple-color {
    color: #e8deff;
  }
  .main-nav {
    position: absolute;
  }
  .logo {
    filter: invert(0);
  }
  ul li {
    color: white;
  }
  .menu-burger-line {
    color: white;
  }
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
