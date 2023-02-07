<template>
  <section class="cta_login">
    <div class="container mx-auto">
      <div class="cta_login-content py-25 my-15 text-white text-center">
        <div
          class="justify-center cta_login-content-title font-bold text-4xl uppercase relative inline-block -md:text-3xl"
        >
          <h3>
            Créateur de <br />
            <span class="font-medium">promenades</span>
          </h3>
          <div
            class="hand absolute top-0 -right-[7rem] -md:-right-10 -md:-top-21"
          >
            <img src="@/assets/images/icons/hand-two.png" alt="" />
          </div>
        </div>
        <div
          class="cta_login-content-description text-center w-1/2 -md:w-full -md:px-5 -md:text-sm mx-auto pt-5"
        >
          <p>
            Créez dès à présent votre promenade de manière collaborative en vous
            inscrivant gratuitement ou en vous connectant sur notre plateforme !
          </p>
          <div class="w-1/2 mx-auto pt-10">
            <ul class="flex justify-center items-center">
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
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { IMenuItem } from '@/types/MenuItems'
const menus = computed((): IMenuItem[] => [
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
</script>

<style lang="scss" scoped>
.cta_login {
  &-content {
    background-color: #186662;
  }
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
.hand {
}
</style>
