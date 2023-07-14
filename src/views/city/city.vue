<template>
    <div class="city top-page">
        <div class="top">
            <form action="/">
                <van-search v-model="searchValue" placeholder="城市 / 区域 / 位置" shape="round" show-action
                    @cancel="cancelClick" />
            </form>
            <van-tabs v-model:active="tabActive" color="var(--primary-color)">
                <template v-for="(value, key, index) in allCities" :key="key">
                    <van-tab :title="value.title" :name="key"></van-tab>
                </template>
            </van-tabs>
        </div>
        <div class="content">
            <template v-for="(value, key, index) in allCities">
                <city-group v-show="tabActive === key" :group-data="value"></city-group>
            </template>
        </div>
    </div>
</template>


<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
// import { getCityAll } from "@/service/index"
import useCityStore from "@/stores/modules/city.js"
import { storeToRefs } from 'pinia';
import CityGroup from "./cpns/city-group.vue"

const router = useRouter();
const searchValue = ref('');
const cancelClick = () => {
    router.back();
}
const tabActive = ref();

// 请求城市的数据
// const allCity = ref({});
// getCityAll().then(res => {
//     allCity.value = res.data;
// })

// 从 store 中获取数据
const cityStore = useCityStore();
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)

//获取选中标签后的数据
const currentGroup = computed(() => (allCities.value[tabActive.value]))

</script>


<style lang="less" scoped>
.city {
    // .top {
    //     position: fixed;
    //     top: 0;
    //     left: 0;
    //     right: 0;

    // }
    // .content{
    //     margin-top: 98px;
    // }

    .top{
        position: relative;
        z-index: 9;
    }

    // 局部滚动方案
    .content {
        height: calc(100vh - 98px);
        overflow-y: auto;
    }
}
</style>