<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <transition
        :enter-active-class="route.meta.enterClass"
        :leave-active-class="route.meta.leaveClass"
    >
      <component :is="Component"/>
    </transition>
  </RouterView>
</template>

<style scoped>

</style>
