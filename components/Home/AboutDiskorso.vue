<template>
  <section id="about" class="about relative">
    <div
      class="diskorso-line-car absolute xl:w-1/2 2xl:w-auto xl:-top-5 -sm:-top-15 -xl:mx-5 -lg:w-full -xl:left-6/12 md:-top-5"
    >
      <img
        src="@/assets/images/diskorso-line-card.svg"
        alt="ligne design"
        class="mx-auto"
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
              class="about-description mt-10 -md:w-full -md:text-sm md:text-sm xl:text-md 2xl:text-base"
            >
              <p>
                <span class="font-bold">Pour tous :</span> découvrir et
                apprendre, sur tous les sujets, à partir de sources
                sélectionnées et organisées par des passionnés.
              </p>
              <p class="mt-3 mb-3 lg:mb-0">
                <span class="font-bold"
                  >Pour les passionnés et les experts :</span
                >
                partager ses connaissances et son enthousiasme sans tout
                réinventer, en s'appuyant sur la richesse d'internet.
              </p>
              <Button text="En savoir plus" type="secondary" to="/a-propos" />
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
