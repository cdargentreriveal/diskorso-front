<template>
  <div class="heroHeader relative">
    <div
      class="container mx-auto flex items-center justify-center h-full relative"
    >
      <div class="heroHeader-line absolute w-full left-1/2">
        <img
          src="@/assets/images/diskorso-line-2.svg"
          alt="ligne design diskorso"
          class="mx-auto"
        />
      </div>
      <div class="heroHeader-title text-center uppercase relative blur-lg">
        <h1>
          <span class="font-bold">Plateforme Collaborative</span> <br />
          <span class="title-el"
            >De <em class="font-italic">Promenades</em> numériques</span
          >
        </h1>
        <button
          class="heroHeader-button rounded-full px-10 py-4 uppercase"
          @click="scrollTo"
        >
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
    <div class="heroHeader-image absolute w-full">
      <div class="container mx-auto">
        <img
          class="mx-auto"
          src="@/assets/images/diskorso-people.svg"
          alt="illustration groupe de personne "
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    scrollTo() {
      const element = document.getElementById('about')
      element.scrollIntoView({ behavior: 'smooth' })
    },
  },
}
</script>

<style lang="scss" scoped>
.heroHeader {
  height: 80vh;
  background-color: var(--purple-color);
  animation: mymove 25s infinite ease-in-out;
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
    margin-top: 0;
    bottom: -0.7vw;
  }
  &-line {
    top: -8em;
    transform: translateX(-50%);
  }
}
.title-el {
  color: #e8deff;
}
em {
  text-transform: capitalize;
}
@keyframes mymove {
  0% {
    background-color: var(--purple-color);
  }
  25% {
    background-color: rgb(255, 73, 112);
  }
  75% {
    background-color: rgb(244, 116, 24);
  }
  100% {
    background-color: var(--purple-color);
  }
}
</style>
