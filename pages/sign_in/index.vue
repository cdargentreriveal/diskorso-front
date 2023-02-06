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
            S'inscrire <br />
            <span class="font-medium">sur Diskorso</span>
          </h2>
        </div>
        <form action="" class="my-8">
          <div class="flex items-center gap-4">
            <div class="w-1/2">
              <input
                type="text"
                value=""
                placeholder="Nom"
                class="rounded-md border border-gray w-full p-4 my-2"
              />
            </div>
            <div class="w-1/2">
              <input
                type="text"
                value=""
                placeholder="Prénom"
                class="rounded-md border border-gray w-full p-4 my-2"
              />
            </div>
          </div>
          <input
            type="text"
            value=""
            placeholder="Username"
            class="rounded-md border border-gray w-full p-4 my-2"
          />
          <input
            type="mail"
            value=""
            placeholder="Email"
            class="rounded-md border border-gray w-full p-4 my-2"
          />
          <input
            type="password"
            value=""
            placeholder="Mot de passe"
            class="rounded-md border border-gray w-full p-4 my-2"
          />
          <button
            type="submit"
            class="py-4 px-8 my-4 btn-submit rounded-md font-semibold w-full"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.btn-submit {
  background-color: #d9f028;
}
</style>
