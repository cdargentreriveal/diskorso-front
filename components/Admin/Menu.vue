<template>
  <div class="menu fixed left-0 top-0 h-[100vh] bg-white w-[250px] box-shaddow">
    <div class="menu-admin pt-[160px] pb-[15px] h-full">
      <ul class="divide-y divide-slate-300">
        <li class="px-5 py-7 flex items-center gap-2 text-sm">
          <span
            ><img src="@/assets/images/icons/menu-admin/eye.svg" alt=""
          /></span>
          <span>Tutoriel</span>
        </li>
        <NuxtLink to="/admin" class="px-5 py-7 flex items-center gap-2 text-sm">
          <span
            ><img src="@/assets/images/icons/menu-admin/promenade.svg" alt=""
          /></span>
          <span>Mes promenades</span>
        </NuxtLink>
        <NuxtLink
          to="/admin/creer-une-promenade"
          class="px-5 py-7 flex items-center gap-2 text-sm"
        >
          <span
            ><img src="@/assets/images/icons/menu-admin/create.svg" alt=""
          /></span>
          <span>Créer une promenade</span>
        </NuxtLink>
        <li class="px-5 py-7 flex items-center gap-2 text-sm">
          <span
            ><img src="@/assets/images/icons/menu-admin/extrait.svg" alt=""
          /></span>
          <span>Mes extraits</span>
        </li>
      </ul>
      <ul class="divide-y divide-slate-300">
        <li class="px-5 py-7 flex items-center gap-2 text-sm">
          <span
            ><img src="@/assets/images/icons/menu-admin/compte.svg" alt=""
          /></span>
          <span>Mon compte</span>
        </li>
        <li class="px-5 py-7 flex items-center gap-2 text-sm">
          <span
            ><img src="@/assets/images/icons/menu-admin/deconnexion.svg" alt=""
          /></span>
          <span>Déconnexion</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.router-link-active {
  color: var(--purple-color);
  img {
    filter: invert(30%) sepia(100%) saturate(2878%) hue-rotate(230deg)
      brightness(110%) contrast(100%);
  }
}

.menu-admin {
  display: flex;
  flex-direction: column;
}
a {
  cursor: pointer;
  color: var(--gray-color);
  &:hover {
    color: var(--purple-color);
    img {
      filter: invert(30%) sepia(100%) saturate(2878%) hue-rotate(230deg)
        brightness(110%) contrast(100%);
    }
  }
}

ul:first-child {
  flex-grow: 1;
}
</style>
