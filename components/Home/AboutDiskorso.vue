<template>
  <section id="about" class="about relative">
    <div
      class="diskorso-line-car absolute xl:w-1/2 2xl:w-auto xl:-top-5 -sm:-top-15 -xl:mx-5 -xl:w-full md:left-3/12 md:-top-5"
    >
      <img
        src="@/assets/images/diskorso-line-card.svg"
        alt="ligne design"
        class="mx-auto md:w-7/12"
      />
    </div>
    <div class="container mx-auto my-20">
      <div class="flex items-center flex-wrap">
        <div class="about-content w-1/2 -md:w-full">
          <div class="w-9/12 mx-auto -md:w-full">
            <div class="about-title font-bold text-4xl uppercase -md:text-3xl">
              <h2>
                Pourquoi <br /><span class="font-normal purple-color"
                  >Diskorso ?</span
                >
              </h2>
            </div>
            <div
              class="about-description mt-10 -md:w-full -md:text-sm md:text-sm xl:text-base"
            >
              <p>
                Diskorso est une plateforme collaborative permettant de mettre
                en relation les contributeurs, qui confectionneraient un nouveau
                document constitué d’extraits de pages existantes (une
                promenade), et d’autre part le grand public souhaitant
                s’informer sur un sujet et qui trouverait dans ces promenades un
                contenu adapté selon le niveau de détails, de vulgarisation…
              </p>
              <Button
                text="Voir les promenades"
                type="secondary"
                to="/promenades"
              />
            </div>
          </div>
        </div>
        <div class="about-card w-1/2 -md:w-full flex justify-center">
          <img
            src="@/assets/images/card-home.png"
            alt="exemple de promenade numérique"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about {
  overflow: hidden;
}
.diskorso-line-car {
  right: -2rem;
  z-index: -1;
}
</style>
