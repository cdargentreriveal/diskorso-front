<template>
  <div class="heroHeader relative">
    <div
      class="container mx-auto flex items-center justify-center h-full relative"
    >
      <div class="heroHeader-line absolute 2xl:w-9/12 xl:w-[75vw] left-1/2">
        <img
          src="@/assets/images/diskorso-line-2.svg"
          alt="ligne design diskorso"
          class="mx-auto 2xl:-top-25 xl:-top-[11vh]"
        />
      </div>
      <div
        class="heroHeader-title text-center uppercase relative blur-lg text-white 2xl:text-6xl xl:text-5xl -mt-[1.75rem]"
      >
        <h1>
          <span class="font-bold">Plateforme Collaborative</span> <br />
          <span class="title-el"
            >De <em class="font-italic">Promenades</em> numériques</span
          >
        </h1>
        <button
          class="heroHeader-button rounded-full px-10 py-4 my-8 uppercase"
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
          class="mx-auto 2xl:w-auto xl:w-9/12"
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
  &-button {
    font-size: 0.25em;
    background-color: black;
  }
  &-image {
    margin-top: 0;
    bottom: -0.7vw;
  }
  &-line {
    transform: translateX(-50%);
    & img {
      position: relative;
    }
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
    background-color: rgb(245, 91, 122);
  }
  75% {
    background-color: #ff832b;
  }
  100% {
    background-color: var(--purple-color);
  }
}
</style>
