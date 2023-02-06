<script lang="ts" setup>
definePageMeta({
  layout: 'page',
})
</script>

<template>
  <div class="container mx-auto">
    <div class="w-4/12 mx-auto my-10 -md:w-full">
      <div class="py-8 text-center">
        <div class="title uppercase font-bold text-4xl -md:text-3xl">
          <h2>
            Se connecter <br />
            <span class="font-medium">sur Diskorso</span>
          </h2>
        </div>
        <form action="" class="my-8">
          <input
            type="mail"
            value=""
            placeholder="Email"
            class="rounded-md border border-gray w-full p-4 my-4"
          />
          <input
            type="password"
            value=""
            placeholder="Mot de passe"
            class="rounded-md border border-gray w-full p-4 my-4"
          />
          <button
            type="submit"
            class="py-4 px-8 my-4 btn-submit rounded-md text-white font-semibold w-full"
          >
            Se connecter
          </button>
        </form>
        <p class="text-left font-medium">
          Mot de passe perdu ?
          <a href="#" class="underline"> Recevoir un nouveau mot de passe</a>
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.btn-submit {
  background-color: #f55a78;
}
</style>
