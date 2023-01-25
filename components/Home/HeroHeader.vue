<template>
  <div class="heroHeader">
    <div
      class="container mx-auto flex items-center justify-center h-full relative"
    >
      <div class="heroHeader-line absolute w-full left-1/2">
        <img
          src="@/assets/images/diskorso-line.svg"
          alt="ligne design diskorso"
        />
      </div>
      <div class="heroHeader-title text-center uppercase relative">
        <h1>
          <span class="font-bold">Plateforme Collaborative</span> <br />
          <span class="title-el"
            >De <em class="font-italic">Promenades</em> numériques</span
          >
        </h1>
        <button class="heroHeader-button rounded-full px-10 py-4 uppercase">
          <span class="flex items-center gap-4">
            <span>Découvrir</span>
            <span
              ><img
                src="@/assets/images/icons/white-arrow.svg"
                alt="fleche blanche"
            /></span>
          </span>
        </button>
      </div>
    </div>
  </div>
  <div class="heroHeader-image">
    <div class="container mx-auto">
      <img
        class="mx-auto"
        src="@/assets/images/diskorso-people.svg"
        alt="illustration groupe de personne "
      />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.heroHeader {
  height: 80vh;
  background-color: var(--purple-color);
  &-title {
    color: white;
    font-size: 3.75em;
    margin-top: -1.75em;
  }
  &-button {
    font-size: 0.25em;
    background-color: black;
  }
  &-image {
    transform: translateY(-100%);
    margin-top: 0.75vw;
  }
  &-line {
    top: -6em;
    transform: translateX(-50%);
  }
}
.title-el {
  color: #e8deff;
}
em {
  text-transform: capitalize;
}
</style>
