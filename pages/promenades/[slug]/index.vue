<!-- eslint-disable vue/no-v-html -->
<script setup lang="ts">
import { Promenade } from '@/types/Promenades'
import { useUserStore } from '~~/store/user'
import { usePromenadeStore } from '~~/store/promenade'
const user = useUserStore()
const PromnadeStore = usePromenadeStore()
definePageMeta({
  layout: 'page',
})
const route = useRoute()
const config = useRuntimeConfig()
// const { data: promenade } = useDiskorso<Promenade>(
//   `promenade/${route.params.slug}`
// )
const { data: promenade } = await useAsyncData<Promenade>('promenade', () =>
  $fetch(`${config.public.baseURL}/promenade/${route.params.slug}`)
)
function getPromenadeEdit() {
  PromnadeStore.setPromenade(promenade.value)
}
const mainImageSource = promenade.value?.main_image_source || ''
const url = new URL(mainImageSource)
const domaine = url.hostname
</script>

<template>
  <client-only>
    <div class="promenade_page -sm:overflow-hidden">
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
          v-if="promenade.main_image === ''"
          class="h-[55vh] w-full no-image"
        ></div>
        <div
          v-else
          class="promenade_page_banner h-[55vh] w-full bg-center bg-cover"
          :style="{
            backgroundImage: 'url(' + promenade.main_image + ')',
          }"
        ></div>
        <div
          v-if="promenade.main_image !== ''"
          class="text-right text-xs italic p-3"
        >
          source :
          <a :href="promenade.main_image_source" class="underline">{{
            domaine
          }}</a>
        </div>
        <div
          class="promenade_page_content w-8/12 mx-auto bg-white py-20 -mt-40 rounded-xl relative box-shaddow -2xl:w-10/12 -md:w-full -lg:py-15"
        >
          <div
            class="promenade_page_content_avatar w-[80px] h-[80px] rounded-full overflow-hidden absolute -top-10 left-17 -sm:left-10 border border-black border-2"
          >
            <NuxtLink :to="`/contributor/${promenade.user.username}`">
              <img
                v-if="promenade.user.picture === null"
                src="@/assets/images/avatar-dk.jpg"
                alt="image de profil"
              />
              <img v-else :src="promenade.user.picture" alt="image de profil" />
            </NuxtLink>
          </div>
          <div class="promenade_page_content_header px-20 -sm:px-10 xs">
            <div
              class="promenade_page_content_title 2xl:text-4xl font-bold xl:text-3xl -lg:text-2xl"
            >
              <h1>{{ promenade.title }}</h1>
            </div>
            <div
              class="promenade_page_content_created flex gap-2 italic text-sm py-4"
            >
              <p>Créee le : {{ getDate(promenade.createdAt) }}</p>
              <span>-</span>
              <NuxtLink :to="`/contributor/${promenade.user.username}`">
                <p>
                  par :
                  <span class="underline">{{ promenade.user.username }}</span>
                </p>
              </NuxtLink>
            </div>
            <div class="flex justify-between items-center">
              <div
                class="card-content-categories flex flex-wrap gap-4 py-5 -md:gap-2"
              >
                <div
                  v-for="(cat, index) in promenade.categories"
                  :key="index"
                  class="category"
                >
                  <NuxtLink :to="`/categorie/${cat.slug}`">
                    <button
                      :class="
                        cat.color +
                        ' category-btn px-5 py-2 rounded-full text-sm'
                      "
                    >
                      {{ cat.title }}
                    </button>
                  </NuxtLink>
                </div>
              </div>
              <div v-if="user.currentUser !== null">
                <div
                  class="edit-promenade flex items-center gap-2 text-xs border border-[gray-color] rounded-md p-2 gray-color"
                >
                  <span
                    ><img
                      src="@/assets/images/icons/menu-admin/create.svg"
                      alt="icone edition"
                  /></span>
                  <NuxtLink
                    :to="`/dashboard/editer-une-promenade/${promenade.slug}`"
                    @click="getPromenadeEdit"
                  >
                    <div
                      class="edit-promenade font-semibold text-center cursor-pointer"
                    >
                      Modifier ma promenade
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
            <p class="mt-5 text-sm italic gray-color">
              Description : {{ promenade.summary }}
            </p>
            <Separator />
          </div>
          <section class="promenade_page_content_details_transition">
            <!-- eslint-disable vue/no-v-html -->
            <div v-if="promenade && promenade.content">
              <div
                v-for="(blocsContent, i) in promenade.content"
                :key="i"
                class="px-20 py-5 -sm:px-5 -sm:py-5"
              >
                <div
                  v-if="blocsContent.type === 'transition'"
                  class="transition"
                >
                  <div v-html="blocsContent.content"></div>
                </div>
                <div
                  v-if="blocsContent.type === 'excerpt'"
                  class="extrait bg-slate-100 relative py-3 -2xl:text-sm"
                >
                  <div v-html="blocsContent.content"></div>
                  <div class="source text-xs italic text-right mb-3">
                    <span>source: </span>
                    <span class="underline">{{ blocsContent.source }}</span>
                  </div>
                </div>
                <div
                  v-if="blocsContent.type === 'image' && blocsContent.imageUrl"
                  class="image"
                >
                  <img
                    :src="blocsContent.imageUrl!"
                    alt=""
                    class="w-full rounded-xl"
                  />
                  <div class="text-right text-xs italic p-3">
                    source :
                    <span class="underline">{{ blocsContent.source }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!--eslint-enable-->
          </section>
        </div>
        <div class="w-8/12 mx-auto -sm:w-full">
          <div class="all-promenades mt-15">
            <div class="text-center">
              <Button
                text="Voir toutes les promenades"
                type="secondary"
                to="/promenades"
              />
            </div>
          </div>
        </div>
        <div class="2xl:w-8/12 mx-auto xl:w-10/12 -lg:w-11/12">
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
.extrait {
  &:after {
    content: '';
    position: absolute;
    height: 100%;
    width: 5rem;
    top: 0;
    background-color: rgba(241, 245, 249, var(--tw-bg-opacity));
    left: -5rem;
  }
  &:before {
    content: '';
    position: absolute;
    height: 100%;
    width: 5rem;
    top: 0;
    background-color: rgba(241, 245, 249, var(--tw-bg-opacity));
    right: -5rem;
  }
}
.no-image {
  background-image: url('@/assets/images/banner-diskorso-promenade-2.jpg');
  background-position: center;
  background-size: cover;
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
