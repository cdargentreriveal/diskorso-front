<template>
  <div class="card rounded bg-white box-shaddow">
    <div class="card-image">
      <img class="w-full" src="@/assets/images/test-img-card.jpg" :alt="alt" />
    </div>
    <div class="card-content p-5">
      <div class="card-content-title font-bold text-2xl my-1">
        <h2>{{ title }}</h2>
      </div>
      <div class="card-content-date text-sm gray-color">
        Crée le : {{ date }}
      </div>
      <div class="card-content-categories flex gap-4 py-5">
        <div v-for="cat in categories" :key="cat" class="category">
          <button
            :class="cat.color + ' category-btn px-5 py-2 rounded-full text-xs'"
          >
            {{ cat.categoryName }}
          </button>
        </div>
      </div>
      <p class="text-sm gray-color py-2">{{ text }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  image: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  date: {
    type: String,
    default: '',
  },
  categories: {
    type: Array,
    default() {
      return []
    },
  },
  text: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'md',
  },
  to: {
    type: [String, Object],
    default: undefined,
  },
})
</script>

<style lang="scss" scoped>
.card {
  &-image {
    height: 240px;
    width: 100%;
    overflow: hidden;
    & img {
      object-fit: cover;
    }
  }
  &-content {
    &-date {
      font-style: italic;
    }
  }
}
</style>
