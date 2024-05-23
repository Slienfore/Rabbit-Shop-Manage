<script setup lang="ts">
import {} from "vue";
import LayoutNav from "./components/LayoutNav.vue";
import LayoutHeader from "./components/LayoutHeader.vue";
import LayoutFooter from "./components/LayoutFooter.vue";
import LayoutFixed from "./components/LayoutFixed.vue";
</script>

<template>
  <LayoutFixed />

  <LayoutNav />

  <LayoutHeader />

  <RouterView />

  <LayoutFooter />
</template>

<style scoped></style>
