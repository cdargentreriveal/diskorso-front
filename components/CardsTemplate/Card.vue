<template>
  <div class="card rounded bg-white box-shaddow w-[32%] -md:w-full">
    <div class="card-image">
      <img class="w-full" src="@/assets/images/test-img-card.jpg" :alt="alt" />
    </div>
    <div class="card-content p-8">
      <div class="card-content-title font-bold text-2xl my-1">
        <h2>{{ title }}</h2>
      </div>
      <div class="card-content-date text-sm gray-color">
        Crée le : {{ date }}
      </div>
      <div class="card-content-categories flex gap-4 py-5">
        <div v-for="(cat, index) in categories" :key="index" class="category">
          <button
            :class="cat.color + ' category-btn px-5 py-2 rounded-full text-xs'"
          >
            {{ cat.categoryName }}
          </button>
        </div>
      </div>
      <p class="text-sm gray-color card-content-description">{{ text }}</p>
      <div class="card-content-bottom pt-8 pb-2">
        <div class="flex items-center">
          <div class="card-content-author w-1/2">
            <div class="flex gap-3 items-center">
              <div
                class="card-content-avatar w-1/5 rounded-full overflow-hidden border border-black"
              >
                <img src="@/assets/images/test-avatar.jpg" alt="avatar" />
              </div>
              <div class="card-content-author gray-color text-xs italic">
                par : {{ author[0].authorName }}
              </div>
            </div>
          </div>
          <div class="card-content-link text-right w-1/2">
            <button class="font-semibold underline text-sm">
              Lire la promenade >
            </button>
          </div>
        </div>
      </div>
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
  title: {
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
  author: {
    type: Array,
    default() {
      return []
    },
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
onMounted(() => {
  const descriptionCard = document.querySelectorAll('.card-content-description')
  if (descriptionCard) {
    descriptionCard.forEach((element) => {
      const shortDescription = element.textContent?.substring(0, 170) ?? ''
      element.textContent = shortDescription + '...'
    })
  }
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
