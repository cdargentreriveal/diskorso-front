<template>
  <div
    class="menu fixed right-0 top-0 h-[100vh] bg-white w-[250px] box-shaddow"
  >
    <div class="menu-admin pt-[150px] pb-[25px] h-full">
      <div class="px-5 py-7">
        <div
          class="preview w-8/12 mx-auto text-center px-4 py-3 text-sm rounded-md border border-black"
        >
          <button>Previsualiser</button>
        </div>
        <Separator />
        <div class="categories">
          <div class="categories_title text-lg font-semibold mb-5">
            <h4>Categories<sup>*</sup></h4>
          </div>
          <div class="categories_list">
            <ul>
              <li>
                <input
                  id="scales"
                  type="checkbox"
                  name="scales"
                  class="my-4 mx-2 text-sm"
                  value="Société"
                /><label for="scales">Société</label>
              </li>
              <li>
                <input
                  id="scales"
                  type="checkbox"
                  name="scales"
                  class="my-4 mx-2 text-sm"
                  value="Histoire"
                /><label for="scales">Histoire</label>
              </li>
              <li>
                <input
                  id="scales"
                  type="checkbox"
                  name="scales"
                  class="my-4 mx-2 text-sm"
                  value="Science"
                /><label for="scales">Science</label>
              </li>
            </ul>
          </div>
        </div>
        <Separator />
        <div class="seo">
          <div class="seo_title text-lg font-semibold mb-5">
            <h4>SEO</h4>
          </div>
          <div class="seo_meta_title">
            <label class="font-medium">Meta title</label>
            <input
              type="text"
              name="scales"
              class="my-4 text-sm border border-slate-300 rounded w-full h-[30px]"
            />
          </div>
          <div class="seo_meta_description">
            <label class="font-medium">Meta description</label>
            <input
              type="text"
              name="scales"
              class="my-4 text-sm border border-slate-300 rounded w-full h-[70px]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.router-link-active {
  color: var(--purple-color);
  img {
    filter: invert(30%) sepia(100%) saturate(2878%) hue-rotate(230deg)
      brightness(110%) contrast(100%);
  }
}

.menu-admin {
  display: flex;
  flex-direction: column;
}
a {
  cursor: pointer;
  color: var(--gray-color);
  &:hover {
    color: var(--purple-color);
    img {
      filter: invert(30%) sepia(100%) saturate(2878%) hue-rotate(230deg)
        brightness(110%) contrast(100%);
    }
  }
}

ul:first-child {
  flex-grow: 1;
}
</style>
