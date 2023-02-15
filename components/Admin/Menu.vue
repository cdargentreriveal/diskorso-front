<template>
  <div class="menu fixed left-0 top-0 h-[100vh] bg-white w-[260px] box-shaddow">
    <div class="menu-admin pt-[150px] pb-[25px] h-full">
      <ul>
        <li class="p-8">Tutoriel</li>
        <li class="p-8">Mes promenades</li>
        <li class="p-8">Créer une promenade</li>
      </ul>
      <ul class="bottom-menu">
        <li class="px-8 py-4">Mon compte</li>
        <li class="px-8 py-4">Déconnexion</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.menu-admin {
  display: flex;
  flex-direction: column;
}

ul:first-child {
  flex-grow: 1;
}
</style>
