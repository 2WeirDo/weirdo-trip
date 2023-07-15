<template>
    <div class="home" ref="homeRef">
        <HomeNavBar />
        <div class="banner">
            <img src="@/assets/img/home/banner.webp" alt="">
        </div>
        <HomeSearchBox />
        <HomeCategories />
        <div class="search-bar" v-if="isShowSearchBar">
            <SearchBar />
        </div>
        <HomeContent />
    </div>
</template>

<!-- 为了在app.vue使用keep-alive -->
<script>
export default { name: "home" };
</script>

<script setup>
import { watch, computed, ref, onActivated} from "vue";
import HomeNavBar from "./cpns/home-nav-bar.vue"
import HomeSearchBox from "./cpns/home-search-box.vue"
import HomeCategories from "./cpns/home-categories.vue";
import HomeContent from "./cpns/home-content.vue";
import useHomeStore from '@/stores/modules/home';
import SearchBar from '@/components/search-bar/search-bar.vue'
import useScroll from "@/hooks/useScroll"


// 发送网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
homeStore.fetchHouselistData()

// useScroll(() => {
//     homeStore.fetchHouselistData();
// }); 

// 这里根据hooks中的useScroll判断是否到达底部, 到达则发送网络请求
const homeRef = ref()
const { isReachBottom, scrollTop } = useScroll(homeRef)
watch(isReachBottom, (newValue) => {
    if (newValue) {
        homeStore.fetchHouselistData().then(() => {
            // async 默认返回 promise
            isReachBottom.value = false
        })
    }
})

// 搜索框显示与否
// const {scrollTop} = useScroll();
// const isShowSearchBar = ref(false)
// watch(scrollTop, (newTop) => {
//   isShowSearchBar.value = newTop > 360
// })

// 定义的可响应式数据, 依赖另外一个可响应式的数据, 那么可以使用计算函数(computed)

const isShowSearchBar = computed(() => {
    return scrollTop.value >= 360
})

// 从home跳转时, 保留原来的位置
onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value
  })
})


</script>
 
<style lang="less" scoped>
.home {
    padding-bottom: 60px;
    box-sizing: border-box;
    height: 100vh;
    overflow-y: auto;
}

.banner {
    img {
        width: 100%;
    }
}

.search-bar {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
}
</style>