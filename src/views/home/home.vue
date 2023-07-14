<template>
    <div class="home">
        <HomeNavBar />
        <div class="banner">
            <img src="@/assets/img/home/banner.webp" alt="">
        </div>
        <HomeSearchBox />
        <HomeCategories />
        <div class="search-bar" v-if="isShowSearchBar">
            <SearchBar/>
        </div>
        <HomeContent />
    </div>
</template>


<script setup>
import { watch, computed } from "vue";
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

const { isReachBottom } = useScroll()
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
const {scrollTop} = useScroll();
const isShowSearchBar = computed(() => {
  return scrollTop.value >= 360
})


</script>
 
<style lang="less" scoped>
.home {
    padding-bottom: 60px;
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