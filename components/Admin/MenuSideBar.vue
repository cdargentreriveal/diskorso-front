<template>
  <div
    class="menu fixed right-0 top-0 h-[100vh] bg-white w-[250px] box-shaddow"
  >
    <div class="menu-admin pt-[150px] pb-[25px] h-full">
      <div class="px-5 py-7 grow">
        <div
          class="preview w-8/12 mx-auto text-center px-4 py-3 text-sm rounded-md border border-black"
        >
          <button>Prévisualiser</button>
        </div>
        <Separator />
        <div class="categories">
          <div class="categories_title text-lg font-semibold mb-5">
            <h4>Categories<sup>*</sup></h4>
          </div>
          <div class="categories_list">
            <ul>
              <li class="flex my-2">
                <input
                  id="scales"
                  type="checkbox"
                  name="scales"
                  class="mx-2"
                  value="Histoire"
                /><label for="scales" class="text-sm">Histoire</label>
              </li>
              <li class="flex my-2">
                <input
                  id="scales"
                  type="checkbox"
                  name="scales"
                  class="mx-2"
                  value="Science"
                /><label for="scales" class="text-sm">Science</label>
              </li>
              <li class="flex my-2">
                <input
                  id="scales"
                  type="checkbox"
                  name="scales"
                  class="mx-2"
                  value="Société"
                /><label for="scales" class="text-sm">Société</label>
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
      <div class="published px-5 py-7">
        <div
          class="published_btn w-8/12 mx-auto text-center px-4 py-3 text-sm rounded-md text-white"
        >
          <button class="font-semibold">Enregistrer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.menu-admin {
  display: flex;
  flex-direction: column;
}

.grow {
  flex-grow: 1;
}
.published_btn {
  background-color: #50D6B7;
}
sup {
  color: #F55A78;
}
</style>
