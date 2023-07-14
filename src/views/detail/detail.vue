<template>
    <div class="detail top-page">
        <h2>detail: {{ $route.params.id }}</h2>
    </div>
</template>


<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();


</script>


<style lang="less" scoped>

</style>