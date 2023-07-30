<script lang="ts" setup>
definePageMeta({
  layout: 'page',
})
</script>
<template>
  <div class="container mx-auto my-20 -md:px-5">
    <div class="flex items-center flex-wrap">
      <div class="about-content w-7/12 -md:w-full">
        <div class="w-9/12 mx-auto -md:w-full">
          <div class="about-title font-bold text-4xl uppercase -md:text-3xl">
            <h2>
              A propos de <br /><span class="font-normal purple-color"
                >Diskorso</span
              >
            </h2>
          </div>
          <div
            class="about-description mt-10 -md:w-full -md:text-sm md:text-sm xl:text-md 2xl:text-base"
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              faucibus ante vitae ipsum blandit, in porttitor ligula
              sollicitudin. Integer et justo sit amet neque aliquam tempus. Nam
              eget malesuada nisl. Phasellus volutpat a lacus in lacinia.
              Aliquam dictum eu erat et ornare. Phasellus elementum nunc feugiat
              ipsum feugiat, et sollicitudin lorem tincidunt. Praesent vel dui
              orci. Vestibulum ante ipsum primis in faucibus orci luctus et
              ultrices posuere cubilia curae; Donec varius neque et pharetra
              tempus. Nullam ut rutrum massa. Proin eu eros vitae quam euismod
              pretium non tincidunt nisl.
            </p>
            <p class="mt-5 mb-5 lg:mb-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              faucibus ante vitae ipsum blandit, in porttitor ligula
              sollicitudin. Integer et justo sit amet neque aliquam tempus. Nam
              eget malesuada nisl. Phasellus volutpat a lacus in lacinia.
              Aliquam dictum eu erat et ornare. Phasellus elementum nunc feugiat
              ipsum feugiat, et sollicitudin lorem tincidunt. Praesent vel dui
              orci. Vestibulum ante ipsum primis in faucibus orci luctus et
              ultrices posuere cubilia curae; Donec varius neque et pharetra
              tempus. Nullam ut rutrum massa. Proin eu eros vitae quam euismod
              pretium non tincidunt nisl.
            </p>
            <Button
              text="voir les promenades"
              type="secondary"
              to="/promenades"
            />
          </div>
        </div>
      </div>
      <div class="about-card w-5/12 -md:w-full flex justify-center">
        <img
          src="@/assets/images/diskorso-line.svg"
          alt="exemple de promenade numérique"
        />
      </div>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped></style>
