<script lang="ts" setup>
const searchTag = ref('')
</script>

<template>
  <div class="search-bar-container w-full">
    <div
      class="search-bar mt-5 mb-5 flex items-center w-9/12 -xl:w-10/12 -sm:w-full mx-auto h-[50px]"
    >
      <div class="search-bar-input w-full h-full">
        <input
          v-model="searchTag"
          type="search"
          placeholder="Rentrer un mot clé pour lancer la recherche..."
          class="py-4 px-8 w-full h-full border-gray border text-sm italic"
          @keyup.enter="searchTag.length >= 3 && searchByTag(searchTag)"
        />
      </div>
      <div
        v-if="searchTag === '' || searchTag.length < 3"
        :class="
          searchTag === '' || searchTag.length < 3
            ? 'disabled search-bar-button text-white text-sm h-full'
            : ''
        "
      >
        <button class="px-8 w-full h-full uppercase">
          <span class="flex items-center">Rechercher</span>
        </button>
      </div>
      <div v-else class="search-bar-button text-white text-sm h-full">
        <NuxtLink :to="`#`">
          <button class="px-8 w-full h-full uppercase">
            <span class="flex items-center">Rechercher</span>
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-bar-input input {
  border-radius: 9999px 0px 0px 9999px;
  color: var(--gray-color);
  &:focus {
    outline: none;
  }
}
.search-bar-button button {
  background-color: var(--blue-color);
  border-radius: 0px 9999px 9999px 0px;
  border: none;
  & :before {
    content: '';
    height: 20px;
    width: 20px;
    background-image: url('@/assets/images/icons/Icon-search.svg');
    display: inline-block;
    margin-right: 0.5rem;
  }
}
.search-bar-button {
  a {
    display: inline-block;
    height: 100%;
    border-radius: 0 9999px 9999px 0;
  }
  & :hover {
    background-color: #4e8ca5;
  }
}
.disabled {
  pointer-events: none;
  button {
    cursor: not-allowed;
    background-color: var(--gray-light-color);
  }
}
</style>
