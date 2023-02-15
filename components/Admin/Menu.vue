<template>
  <div class="menu fixed left-0 top-0 h-[100vh] bg-white w-[280px] box-shaddow">
    <div class="menu-admin pt-[150px] pb-[25px] h-full">
      <ul class="divide-y divide-slate-300">
        <li class="p-8 flex items-center gap-2 text-sm">
          <span
            ><img src="@/assets/images/icons/menu-admin/eye.svg" alt=""
          /></span>
          <span>Tutoriel</span>
        </li>
        <li class="p-8 flex items-center gap-2 text-sm">
          <span
            ><img src="@/assets/images/icons/menu-admin/promenade.svg" alt=""
          /></span>
          <span>Mes promenades</span>
        </li>
        <li class="p-8 flex items-center gap-2 text-sm">
          <span
            ><img src="@/assets/images/icons/menu-admin/create.svg" alt=""
          /></span>
          <span>Créer une promenade</span>
        </li>
        <li class="p-8 flex items-center gap-2 text-sm">
          <span
            ><img src="@/assets/images/icons/menu-admin/extrait.svg" alt=""
          /></span>
          <span>Mes extraits</span>
        </li>
      </ul>
      <ul class="divide-y divide-slate-300">
        <li class="p-8 flex items-center gap-2 text-sm">
          <span
            ><img src="@/assets/images/icons/menu-admin/compte.svg" alt=""
          /></span>
          <span>Mon compte</span>
        </li>
        <li class="p-8 flex items-center gap-2 text-sm">
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
.menu-admin {
  display: flex;
  flex-direction: column;
}
li {
  cursor: pointer;
  color: var(--gray-color);
  & :hover {
    color: var(--purple-color);
  }
}
li img {
  color: var(--gray-color);
  & :hover {
    fill: var(--purple-color);
  }
}
ul:first-child {
  flex-grow: 1;
}
</style>
