<template>
  <div
    class="heroHeader relative 2xl:h-[80vh] -md:h-[80vh] md:h-[50vh] lg:h-[75vh] xl:h-[80vh]"
  >
    <div
      class="container mx-auto flex items-center justify-center h-full relative"
    >
      <div
        class="heroHeader-line absolute 2xl:w-9/12 xl:w-[70vw] -sm:w-[90vh] left-1/2 md:w-full lg:w-[80vw]"
      >
        <img
          src="@/assets/images/diskorso-line-2.svg"
          alt="ligne design diskorso"
          class="mx-auto 2xl:-top-25 -2xl:-top-[10vh]"
        />
      </div>
      <div
        class="heroHeader-title text-center uppercase relative blur-lg text-white -sm:text-3xl 2xl:text-6xl xl:text-5xl -mt-[1.75rem] -sm:-mt-[0] md:text-3xl xl:"
      >
        <h1>
          <span class="font-bold">Plateforme Collaborative</span> <br />
          <span class="title-el -sm:text-2xl"
            >De <em class="font-italic">Promenades</em> numériques</span
          >
        </h1>
        <button
          class="heroHeader-button rounded-full px-10 py-4 -sm:text-sm md:text-lg my-10 uppercase"
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
    <div class="heroHeader-image absolute w-full -sm:w-[90vh] -sm:-left-10">
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
      if (process.client) {
        const element = document.getElementById('about')
        element.scrollIntoView({ behavior: 'smooth' })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.heroHeader {
  background-color: var(--purple-color);
  animation: mymove 25s infinite ease-in-out;
  &-button {
    background-color: black;
  }
  &-image {
    margin-top: 0;
    z-index: 5;
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
