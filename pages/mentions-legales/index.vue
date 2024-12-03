<script lang="ts" setup>
definePageMeta({
  layout: 'page',
})
</script>
<template>
  <div class="container mx-auto my-20 -md:px-5">
    <div class="flex items-center flex-wrap">
      <div class="about-content w-7/12 -md:w-full">
        <div class="w-9/12 mx-auto -md:w-full">
          <div class="about-title font-bold text-4xl uppercase -md:text-3xl">
            <h2>
              Mentions Légales <br /><span class="font-normal purple-color"
                >de Diskorso</span
              >
            </h2>
          </div>
          <div
            class="about-description mt-10 -md:w-full -md:text-sm md:text-sm xl:text-md 2xl:text-base"
          >
            <p>
              L'idée de Diskorso a germé dans l'esprit de trois
              enseignants-chercheurs qui ont répondu à un appel à projet de la
              <span class="purple-color"
                ><a href="https://u-paris.fr/sciences/"
                  >Faculté des sciences de l'université Paris Cité</a
                >.</span
              >
              Le financement obtenu a permis la création du présent site par
              l'agence
              <span class="purple-color"
                ><a href="https://www.riveal.fr/">Riveal</a>.</span
              >
            </p>
            <p class="pt-8">
              L'utilisation de ce site est conditionnée à l'approbation de la
              <span class="purple-color"
                ><NuxtLink to="/charte-de-participation"
                  >charte de participation.
                </NuxtLink></span
              >
            </p>

            <h2 class="pt-12 pb-4 text-2xl">Coordonnées</h2>

            <ul>
              <li class="pt-4">Contact : contact@diskorso.org</li>
              <li class="pt-4">
                Université Paris Cité, établissement public à caractère
                scientifique, culturel et professionnel, dont le siège est situé
                au 85 boulevard Saint-Germain, 75006 Paris. Contact&nbsp;:
                <a href="https://u-paris.fr/contact/"
                  >https://u-paris.fr/contact/</a
                >.
              </li>
              <li class="pt-4">
                Faculté des sciences&nbsp;:
                <a href="https://u-paris.fr/sciences/"
                  >https://u-paris.fr/sciences/</a
                >.
              </li>
              <li class="pt-4">
                Agence Riveal&nbsp;:
                <a href="https://www.riveal.fr/">https://www.riveal.fr/</a>.
              </li>
              <li class="pt-4">
                Hébergement&nbsp;: Email: team@railway.com <br />Phone: (415)
                707-7675<br />
                Address: 548 Market St PMB 68956, San Francisco, California
                94104
              </li>
            </ul>
            <Button
              class="pt-12"
              text="voir les promenades"
              type="secondary"
              to="/promenades"
            />
          </div>
        </div>
      </div>
      <div class="about-card w-5/12 -md:w-full flex justify-center">
        <img
          src="@/assets/images/diskorso-line.svg"
          alt="exemple de promenade numérique"
        />
      </div>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped></style>
