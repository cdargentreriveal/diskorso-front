<template>
  <footer>
    <div class="footer text-white py-10 lg:px-5 2xl-px-0">
      <div class="container mx-auto -md:px-5 lg:text-sm 2xl:text-base">
        <div class="flex items-center -sm:block justify-between">
          <div class="w-4/12 -sm:w-full -sm:py-2 -sm:text-left">
            <span>Promenades numériques - Tous droits réservés - 2023</span>
          </div>
          <div
            class="w-3/12 text-center underline -sm:w-full -sm:py-2 -sm:text-left"
          >
            <NuxtLink to="/politique-des-donnees"
              ><span>Politique de protection des données</span></NuxtLink
            >
          </div>
          <div
            class="w-2/12 text-right underline -sm:w-full -sm:py-2 -sm:text-left"
          >
            <NuxtLink to="/mentions-legales"
              ><span>Mention légales</span></NuxtLink
            >
          </div>
          <div
            class="w-3/12 text-right -sm:w-full -sm:py-2 -sm:mt-5 -sm:text-left"
          >
            <span
              >Réalisé avec
              <img
                src="@/assets/images/icons/heart.svg"
                alt="icone coeur"
                class="inline-block mx-1"
              />
              par
              <a href="https://www.riveal.fr" target="_blank" class="underline"
                >Riveal</a
              ></span
            >
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script></script>

<style lang="scss" scoped>
.footer {
  background-color: black;
}
</style>
