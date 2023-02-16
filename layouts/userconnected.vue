<template>
  <div>
    <slot name="app-before" />
    <div id="app-before"></div>
    <div class="flex flex-col min-h-screen">
      <slot name="header">
        <ConnectedNavBar />
      </slot>
      <div class="w-full">
        <slot />
      </div>
      <slot name="footer"> </slot>
    </div>
    <slot name="app-after" />
    <div id="app-after"></div>
  </div>
</template>
