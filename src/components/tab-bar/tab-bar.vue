<!-- 主页面下方的导航栏 -->
<template>
    <div class="tab-bar">
        <!-- 整段代码是根据vant组件库中tabbar的自定义图标中进行更改 -->
        <van-tabbar v-model="currentIndex" active-color="var(--primary-color)" route>
            <!-- active-color是组件库提供的属性 -->
            <template v-for="(item, index) in tabbarData">
                <!-- to属性直接提供路由的功能 -->
                <van-tabbar-item :to="item.path">
                    <span>{{ item.text }}</span>
                    <!-- 通过 icon 插槽自定义图标 -->
                    <template #icon="props">
                        <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
                        <img v-else :src="getAssetURL(item.imageActive)" alt="">
                    </template>
                </van-tabbar-item>
            </template>

        </van-tabbar>

    </div>
</template> 


<script setup>

import tabbarData from "@/assets/data/tabbar.js"
import { getAssetURL } from "@/utils/load_assets"
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
const currentIndex = ref(0);


// 监听路由改变时, 找到对应的索引, 设置currentIndex
const route = useRoute()
watch(route, (newRoute) => {
    const index = tabbarData.findIndex(item => item.path === newRoute.path)
    // 如果没有找到(就是-1) 就return
    if (index === -1) return
    currentIndex.value = index
})


</script>


<style lang="less" scoped>
.tab-bar {
    img {
        height: 22px;
    }

    // 局部更改, 只针对于.tabbar子元素生效
    --van-tabbar-item-font-size: 15px;
}
</style>