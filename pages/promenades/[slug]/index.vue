<template>
  <client-only>
    <div
      v-if="filteredPromenades && filteredPromenades.length > 0"
      class="promenade_page"
    >
      <div
        class="promenade_page_banner h-[55vh] w-full"
        :style="{
          backgroundImage: 'url(' + filteredPromenades[0].main_image + ')',
        }"
      ></div>
      <div
        class="promenade_page_content w-8/12 mx-auto bg-white py-20 -mt-40 rounded-xl relative box-shaddow"
      >
        <div
          class="promenade_page_content_avatar w-[80px] h-[80px] rounded-full overflow-hidden absolute -top-10 left-17"
        >
          <img src="@/assets/images/test-avatar.jpg" alt="avatar auteur" />
        </div>
        <div class="promenade_page_content_header px-20">
          <div class="promenade_page_content_title text-4xl font-bold">
            <h1>{{ filteredPromenades[0].title }}</h1>
          </div>
          <div
            class="promenade_page_content_created flex gap-2 italic text-sm py-4"
          >
            <p>Créee le : 01/05/2023</p>
            <span>-</span>
            <p>par : {{ filteredPromenades[0].user.username }}</p>
          </div>
          <div class="card-content-categories flex gap-4 py-5">
            <div
              v-for="(cat, index) in filteredPromenades[0].categories"
              :key="index"
              class="category"
            >
              <button
                :class="
                  cat.color + ' category-btn px-5 py-2 rounded-full text-sm'"
              >
                {{ cat.title }}
              </button>
            </div>
          </div>
          <Separator />
        </div>
        <section class="promenade_page_content_details_transition">
          <div class="px-20 py-10" v-html="filteredPromenades[0].content"></div>
        </section>
        <div class="promenade_page_content_details_image">
          <div class="px-20 py-10">
            <img
              :src="filteredPromenades[0].main_image"
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
  </client-only>
</template>

<script lang="ts">
import { Promenade } from '@/types/Promenades'
export default {
  setup() {
    definePageMeta({
      layout: 'page',
    })
    const { data: promenades } = useFetch<Promenade[]>(
      'https://promenadesapi-production.up.railway.app/promenade/all'
    )
    const route = useRoute()
    const filteredPromenades = computed(() => {
      return (
        promenades &&
        promenades.value &&
        promenades.value.filter(
          (promenade: Promenade) => promenade.slug === route.params.slug
        )
      )
    })
    return {
      filteredPromenades,
    }
  },
}
</script>

<style lang="scss">
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
