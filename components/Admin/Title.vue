<template>
  <div class="w-9/12 mx-auto pt-[150px]">
    <div class="pt-7 flex items-center justify-between">
      <div class="title uppercase font-bold xl:text-xl -lg:text-2xl">
        <h2>
          {{ titleBlack }}
          <span class="font-medium purple-color">{{ titlePurple }}</span>
        </h2>
      </div>
      <!--       <button
        v-if="JSON.stringify(category) !== '{}'"
        :class="`category-btn px-5 py-3 mx-8 rounded-full relative text-sm ${category?.color} uppercase`"
      >
        {{ category?.title }}
        <div class="close absolute top-0 -right-5">✕</div>
      </button> -->
      <div v-if="data.length > 0" class="data px-4 py-3 text-sm">
        <span v-for="(item, i) in data" :key="i"
          ><span class="text-base font-bold number mr-1">{{
            item.number
          }}</span>
          <span>{{ item.value }}</span></span
        >
      </div>
      <div
        v-if="actionBtn.length > 1"
        class="px-4 py-3 text-sm rounded-md text-white relative w-[200px]"
        :class="actionBtn.length > 0 ? 'action-button ' : 'link-button '"
      >
        <div class="w-full p-1">
          <div>
            <div class="dropdown">
              <button
                type="button"
                class="flex items-center mx-auto"
                @click="toggleMenu()"
              >
                {{ selectedOption }}
                <svg
                  :class="btnActionsOpen ? 'rotate' : ''"
                  class="-mr-1 ml-2 h-5 w-5 arrow"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <div
                v-if="btnActionsOpen"
                class="divide-y divide-slate-300 absolute z-50 top-full py-2 left-0 mt-2 bg-white rounded-md shadow-lg w-48 ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <li
                  v-for="(item, i) in actionBtn"
                  :key="i"
                  class="flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  :class="item.action"
                  role="menuitem"
                  @click.prevent="selectOption(item.action)"
                >
                  <span>{{ item.action }}</span>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <NuxtLink
          :to="'/' + propsAdminTitle.route"
          class="px-4 py-3 text-sm rounded-md text-white lg:text-xs"
          :class="actionBtn.length > 1 ? 'action-button ' : 'link-button '"
        >
          {{ actionBtn[0].action }}
        </NuxtLink>
      </div>
    </div>
    <Separator />
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['myEvent'])
const selectedOption = ref('Actions')
const btnActionsOpen = ref(false)
const toggleMenu = () => {
  btnActionsOpen.value = !btnActionsOpen.value
}
const selectOption = (option: string) => {
  selectedOption.value = option
  btnActionsOpen.value = !btnActionsOpen.value
  const value = option === 'Publier'
  emit('myEvent', value)
}
const propsAdminTitle = defineProps({
  titleBlack: {
    type: String,
    default: '',
  },
  titlePurple: {
    type: String,
    default: '',
  },
  selectedOption: {
    type: String,
    default: 'publier',
  },

  data: {
    type: Object,
    default() {
      return {}
    },
  },
  route: {
    type: String,
    default: '',
  },
  actionBtn: {
    type: Object,
    default() {
      return {}
    },
  },
  category: {
    type: Object,
    default() {
      return {}
    },
  },
})
</script>

<style scoped lang="scss">
.action-button {
  background-color: var(--blue-color);
}
.link-button {
  background-color: var(--purple-color);
}
.number {
  color: var(--purple-color);
}
.rotate {
  transform: translateY(-0.1rem) rotate(-180deg);
}
.dropdown .Actif {
  color: #50d6b7;
  &:after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 5rem;
    background-color: #50d6b7;
    margin-left: 8px;
  }
}
.dropdown .Bannir {
  color: #fbb369;
  &:after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 5rem;
    background-color: #fbb369;
    margin-left: 8px;
  }
}
.dropdown .Supprimer {
  color: #f55a78;
  &:after {
    content: '';
    width: 12px;
    height: 12px;
    background-image: url('@/assets/images/icons/corbeille.svg');
    background-repeat: no-repeat;
    background-size: contain;
    margin-left: 8px;
  }
}
</style>
