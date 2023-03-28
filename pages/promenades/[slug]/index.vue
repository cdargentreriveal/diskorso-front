<!-- eslint-disable vue/no-v-html -->
<script setup lang="ts">
import { Promenade } from '@/types/Promenades'

definePageMeta({
  layout: 'page',
})
const route = useRoute()

const { data: promenade } = useDiskorso<Promenade>(
  `promenade/${route.params.slug}`
)
</script>

<template>
  <client-only>
    <div class="promenade_page">
      <div v-if="promenade === null">
        <div class="container mx-auto">
          <div class="h-[70vh] flex justify-center items-center">
            <div class="text-2xl">
              <div class="loader"></div>
              <p>Chargement de la promenade</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div
          v-if="promenade.main_image === 'string'"
          class="promenade_page_banner h-[55vh] w-full no-image"
        ></div>
        <div
          v-else
          class="promenade_page_banner h-[55vh] w-full"
          :style="{
            backgroundImage: 'url(' + promenade.main_image + ')',
          }"
        ></div>
        <div
          class="promenade_page_content w-8/12 mx-auto bg-white py-20 -mt-40 rounded-xl relative box-shaddow"
        >
          <div
            class="promenade_page_content_avatar w-[80px] h-[80px] rounded-full overflow-hidden absolute -top-10 left-17 border border-black border-2"
          >
            <NuxtLink
              :to="`/contributor/${
                promenade.user.username + '_' + promenade.userId
              }`"
            >
              <img :src="promenade.user.picture" alt="avatar auteur" />
            </NuxtLink>
          </div>
          <div class="promenade_page_content_header px-20">
            <div class="promenade_page_content_title text-4xl font-bold">
              <h1>{{ promenade.title }}</h1>
            </div>
            <div
              class="promenade_page_content_created flex gap-2 italic text-sm py-4"
            >
              <p>Créee le : {{ getDate(promenade.createdAt) }}</p>
              <span>-</span>
              <NuxtLink
                :to="`/contributor/${
                  promenade.user.username + '_' + promenade.userId
                }`"
              >
                <p>
                  par :
                  <span class="underline">{{ promenade.user.username }}</span>
                </p>
              </NuxtLink>
            </div>
            <div class="card-content-categories flex gap-4 py-5">
              <div
                v-for="(cat, index) in promenade.categories"
                :key="index"
                class="category"
              >
                <NuxtLink :to="`/categorie/${cat.slug}`">
                  <button
                    :class="
                      cat.color + ' category-btn px-5 py-2 rounded-full text-sm'
                    "
                  >
                    {{ cat.title }}
                  </button>
                </NuxtLink>
              </div>
            </div>
            <Separator />
          </div>
          <section class="promenade_page_content_details_transition">
            <!-- eslint-disable vue/no-v-html -->
            <div class="px-20 py-10" v-html="promenade.content"></div>
            <!--eslint-enable-->
          </section>
          <div class="promenade_page_content_details_image">
            <div class="px-20 py-10">
              <img
                :src="promenade.main_image"
                class="rounded-xl w-full"
                alt=""
              />
              <p class="py-4 text-right text-sm">Crédit : @unsplash</p>
            </div>
          </div>
        </div>
        <div class="w-8/12 mx-auto">
          <CtaLogin />
        </div>
      </div>
    </div>
  </client-only>
</template>

<style lang="scss">
.loader {
  animation: rotate 2s infinite;
  height: 50px;
  width: 50px;
  margin: 1rem auto;
}

.loader:before,
.loader:after {
  border-radius: 50%;
  content: '';
  display: block;
  height: 20px;
  width: 20px;
}
.loader:before {
  animation: ball1 2s infinite;
  background-color: var(--purple-color);
  box-shadow: 30px 0 0 var(--purple-color);
  margin-bottom: 10px;
}
.loader:after {
  animation: ball2 2s infinite;
  background-color: var(--purple-color);
  box-shadow: 30px 0 0 var(--purple-color);
}

@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg) scale(0.8);
    -moz-transform: rotate(0deg) scale(0.8);
  }
  50% {
    -webkit-transform: rotate(360deg) scale(1.2);
    -moz-transform: rotate(360deg) scale(1.2);
  }
  100% {
    -webkit-transform: rotate(720deg) scale(0.8);
    -moz-transform: rotate(720deg) scale(0.8);
  }
}

@keyframes ball1 {
  0% {
    box-shadow: 30px 0 0 var(--purple-color);
  }
  50% {
    box-shadow: 0 0 0 var(--purple-color);
    margin-bottom: 0;
    -webkit-transform: translate(15px, 15px);
    -moz-transform: translate(15px, 15px);
  }
  100% {
    box-shadow: 30px 0 0 var(--purple-color);
    margin-bottom: 10px;
  }
}

@keyframes ball2 {
  0% {
    box-shadow: 30px 0 0 var(--purple-color);
  }
  50% {
    box-shadow: 0 0 0 var(--purple-color);
    margin-top: -20px;
    -webkit-transform: translate(15px, 15px);
    -moz-transform: translate(15px, 15px);
  }
  100% {
    box-shadow: 30px 0 0 var(--purple-color);
    margin-top: 0;
  }
}

.no-image {
  background-image: url(../../../assets/images/diskorso-line-card.png);
}
.promenade_page {
  &_banner {
    background-size: cover;
    background-position: center;
  }
  &_content {
    &_created {
      color: var(--gray-color);
    }
    &_details {
      &_transition {
        color: var(--gray-color);
        & h2 {
          color: var(--gray-color);
          font-size: 1.5rem;
          font-weight: 600;
        }
        & p {
          margin: 1.5rem 0;
        }
        & article {
          margin: 1.5rem 0;
          padding-right: 1rem;
          /* background-color: #f8f8f8; */
          border-right: 2px solid var(--purple-color);
        }
      }
    }
  }
}
</style>
