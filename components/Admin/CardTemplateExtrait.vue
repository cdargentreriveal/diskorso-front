<script lang="ts" setup>
import { PropType } from 'vue'
import { ExtractFetched } from '~~/types/Extracts'

const propsCard = defineProps({
  extract: {
    type: Object as PropType<ExtractFetched>,
    default: null,
  },
})
</script>

<template>
  <div class="card-extrait rounded-md overflow-hidden bg-white box-shaddow">
    <div class="card-content p-6">
      <!-- Rounded switch -->
      <div class="switch-btn mb-4 flex items-center text-xs justify-end">
        <div class="mr-2 visible">Mettre en avant</div>
        <label class="switch">
          <input type="checkbox" />
          <span class="slider round"></span>
        </label>
      </div>
      <hr class="my-6" />
      <div class="card-content-title font-bold text-xl my-1 mb-3">
        <h2>{{ extract.name }}</h2>
      </div>
      <div class="card-content-categories flex gap-4 py-5">
        <div
          v-for="(cat, index) in extract.categories"
          :key="index"
          class="category"
        >
          <NuxtLink :to="`/categorie/${cat.slug}`">
            <button
              :class="`${cat.color} category-btn px-5 py-2 rounded-full text-xs`"
            >
              {{ cat.title }}
            </button>
          </NuxtLink>
        </div>
      </div>
      <p class="text-xs gray-color card-content-description">
        {{ extract.description }}
      </p>
      <div class="card-content-view text-xs mt-5">
        <div class="flex items-center justify-between">
          <div class="card-content-number flex items-center">
            <div class="card-content-number-list flex items-center">
              <div
                class="rounded-full bg-amber-600 h-[25px] w-[25px] border border-white"
              ></div>
              <div
                class="rounded-full bg-red-600 h-[25px] w-[25px] border border-white -ml-3"
              ></div>
            </div>
            <div class="card-content-number-check ml-1">+6</div>
          </div>
          <div class="card-content-view-btn underline">Voir l'extrait ></div>
        </div>
      </div>
      <hr class="my-6" />
      <div class="card-content-bottom pb-2">
        <div class="flex items-center justify-between">
          <div class="card-content-author w-1/2">
            <div
              class="edit-promenade font-semibold text-xs text-center border border-black rounded-md p-2 cursor-pointer"
            >
              Modifier
            </div>
            <!--             <NuxtLink
              :to="`/contributor/${
                promenade.user.username + '_' + promenade.user.id
              }`"
            >
              <div class="flex gap-3 items-center">
                <div
                  class="card-content-avatar w-1/5 rounded-full overflow-hidden border border-black h-[45px] w-[45px]"
                >
                  <img :src="promenade.user.picture" alt="avatar" />
                </div>
                <div class="card-content-author gray-color text-xs italic">
                  par :
                  <span class="underline">{{ promenade.user.username }}</span>
                </div>
              </div>
            </NuxtLink> -->
          </div>
          <div
            class="card-content-link text-right text-xs w-1/2 flex gap-2 underline items-center red-color"
          >
            <div class="delete ml-auto w-[12px] cursor-pointer">
              <img
                src="@/assets/images/icons/corbeille.svg"
                alt=""
                class="w-full"
              />
            </div>
            <span>Supprimer</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 35px;
  height: 20px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 12px;
  width: 12px;
  left: 3px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(16px);
  -ms-transform: translateX(16px);
  transform: translateX(16px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
