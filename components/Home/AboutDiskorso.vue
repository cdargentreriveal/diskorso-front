<template>
  <section class="about relative">
    <div class="diskorso-line-car absolute">
      <img src="@/assets/images/diskorso-line-card.svg" alt="ligne design" />
    </div>
    <div class="container mx-auto my-20">
      <div class="flex items-center">
        <div class="about-content w-1/2">
          <div class="about-title font-bold">
            <h2>
              Pourquoi <br /><span class="font-normal purple-color"
                >Diskorso ?</span
              >
            </h2>
          </div>
          <div class="about-description mt-10 w-9/12">
            <p>
              Diskorso est une plateforme collaborative permettant de mettre en
              relation les contributeurs, qui confectionneraient un nouveau
              document constitué d’extraits de pages existantes (une promenade),
              et d’autre part le grand public souhaitant s’informer sur un sujet
              et qui trouverait dans ces promenades un contenu adapté selon le
              niveau de détails, de vulgarisation…
            </p>
            <Button
              text="Voir les promenades"
              type="secondary"
              to="/promenades"
            />
          </div>
        </div>
        <div class="about-card w-1/2 flex justify-center">
          <img
            src="@/assets/images/card-home.png"
            alt="exemple de promenade numérique"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.about {
  overflow: hidden;
  &-title {
    font-size: 2.7rem;
    line-height: 3.3rem;
  }
}
.diskorso-line-car {
  top: 0rem;
  right: -2rem;
  z-index: -1;
}
</style>
