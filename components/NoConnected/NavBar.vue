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
  <div class="navbar">
    <div class="w-full mx-auto py-3 text-center top-banner relative z-10">
      <p
        class="top-banner-text font-bold uppercase -sm:w-9/12 -sm:text-sm xs-w"
      >
        Plateforme collaborative de
        <span class="purple-color">partage de connaissances</span>
      </p>
    </div>
    <div class="main-nav w-full top-12 left-0 right-0 z-10 px-4">
      <div class="container mx-auto -sm:py-12 py-10 relative">
        <nav role="navigation" class="flex items-center">
          <div class="w-1/2">
            <div class="logo -sm:w-[120px] w-[130px]">
              <NuxtLink to="/">
                <img
                  src="@/assets/images/logos/diskorso-logo-white-2.svg"
                  alt="logo diskorso"
                />
              </NuxtLink>
            </div>
          </div>

          <div class="w-1/2 md:w-10/12">
            <div v-if="windowWidth > 768">
              <ul class="flex justify-end items-center">
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
            </div>
            <!-- Menu burger mobile -->
            <div v-else>
              <div
                class="menu-burger menu-burger-line text-right"
                @click="displayMobileMenu"
              >
                <span>Menu</span>
              </div>
              <div
                v-if="menuOpen === true"
                class="menu-burger-open fixed left-0 bg-[#e8deff] w-full h-full"
              >
                <div
                  class="closed absolute right-4 top-10"
                  @click="displayMobileMenu"
                >
                  Fermer
                </div>
                <ul class="py-10 text-xl mt-15 text-black">
                  <li v-for="(item, i) in menus" :key="i" class="py-3 btn">
                    <Anchor
                      v-if="item.type === 'link'"
                      :to="item.route ? item.route : undefined"
                      :href="item.href ? item.href : undefined"
                      class="hover:no-underline mx-3 underline underline-offset-5"
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
                <img
                  src="@/assets/images/diskorso-people.svg"
                  alt="ligne design diskorso"
                  class="mx-auto w-full absolute bottom-[2.5rem] left-0 people"
                />
              </div>
            </div>
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
.people {
  transform: scale(2);
}
.btn {
  &:nth-child(2) {
    margin-bottom: 1.5rem;
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
  ul li {
    color: white !important;
  }
  .menu-burger-line {
    color: white;
  }
}

.menu-burger {
  &-line {
    cursor: pointer;
  }
  .logo {
    filter: invert(1);
  }
  &-open {
    top: -100%;
    z-index: 100;
    animation: menuOpen 0.7s ease-in-out forwards;
    & ul li {
      color: black !important;
    }
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
