<script setup lang="ts">
import { IMenuItem } from "../../types/MenuItems";
const menus = computed((): IMenuItem[] => [
  {
    type: "link",
    text: "Accueil",
    route: { name: "index" },
  },
  {
    type: "link",
    text: "Les Promenades",
    route: { name: "promenades" },
  },
  {
    type: "button",
    text: "Connexion",
    route: { name: "login" },
  },
]);
</script>

<template>
  <div class="relative hidden lg:flex items-center ml-auto lg:px-20 py-6">
    <nav
      class="text-lg leading-6 font-semibold text-gray-600 dark:text-gray-300"
      role="navigation"
    >
      <ul class="flex items-center space-x-20">
        <li v-for="(item, i) in menus" :key="i">
          <Anchor
            v-if="item.type === 'link'"
            :to="item.route ? item.route : undefined"
            :href="item.href ? item.href : undefined"
            class="hover:no-underline hover:text-slate-900 hover:dark:text-white capitalize"
            >{{ item.text }}
          </Anchor>
          <Button
            v-else-if="item.type === 'button'"
            :text="item.text"
            size="xs"
            class="font-extrabold capitalize"
            :to="item.route ? item.route : undefined"
            :href="item.href ? item.href : undefined"
          />
        </li>
      </ul>
    </nav>
  </div>
</template>
