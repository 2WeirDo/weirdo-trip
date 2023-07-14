<template>
  <div class="app">
    <router-view></router-view>
    <tab-bar></tab-bar>
    <Loading />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import TabBar from "./components/tab-bar/tab-bar.vue"
import Loading from "./components/loading/loading.vue"
const route = useRoute();
</script>

<style scoped></style>
