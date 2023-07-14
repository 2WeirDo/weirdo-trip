<template>
    <div class="tab-bar">
        <template v-for="(item, index) in tabbarData">
            <div 
                class="tab-bar-item" 
                :class="{ active : currentIndex === index }"
                @click="itemClick(item, index)"
            >
                <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
                <img v-else :src="getAssetURL(item.imageActive)" alt="">
                <span class="text">{{ item.text }}</span>
            </div>
        </template>
    </div>
</template> 


<script setup>

import tabbarData from "@/assets/data/tabbar.js"
import { getAssetURL } from "@/utils/load_assets"
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()
const currentIndex = ref(0);
const itemClick = (item, index) => {
    currentIndex.value = index;
    router.push(item.path);
}

</script>


<style lang="less" scoped>
.tab-bar {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    display: flex;
    border-top: solid 1px rgb(116, 110, 119);

    .tab-bar-item {
        flex: 1;
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;

        &.active{
            color: var(--primary-color);
        }

        img {
            width: 34px;
        }

        .text {
            font-size: 12px;
            margin-top: 2px;
        }
    }
}
</style>