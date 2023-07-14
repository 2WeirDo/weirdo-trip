<template>
    <div class="detail top-page" ref="detailRef">
        <tab-control v-if="showTabControl" class="tabs" :titles="['描述', '设施', '房东', '评论', '须知', '地图']"
            @tabItemClick="tabClick" />
        <van-nav-bar title="旅途" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="main" v-if="mainPart" v-memo="[mainPart]">
            <!-- 只有mainPart发生改变才更新 -->
            <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
            <detail-infos :ref="getSectionRef" :top-infos="mainPart.topModule" />
            <detail-facility :ref="getSectionRef" :house-facility="mainPart.dynamicModule.facilityModule.houseFacility" />
            <detail-landlord :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule" />
            <detail-comment :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule" />
            <detail-notice :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules" />
            <detail-map :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule" />
            <detail-intro :price-intro="mainPart.introductionModule" />
        </div>
        <div class="footer">
            <img src="@/assets/img/detail/icon_ensure.png" alt="">
            <div class="text">唯多旅途, 让你巴适的板!</div>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { getDetailInfos } from "@/service";
import { computed, ref } from 'vue';
import DetailSwipe from './cpns/detail_01-swipe.vue'
import DetailInfos from './cpns/detail_02-infos.vue'
import DetailFacility from "./cpns/detail_03-facility.vue"
import DetailLandlord from "./cpns/detail_04-landlord.vue"
import DetailComment from "./cpns/detail_05-comment.vue"
import DetailNotice from "./cpns/detail_06-notice.vue"
import DetailMap from "./cpns/detail_07-map.vue"
import DetailIntro from "./cpns/detail_08-intro.vue"
import TabControl from "@/components/tab-control/tab-control.vue"
import useScroll from '@/hooks/useScroll'

const route = useRoute();
const router = useRouter();

const detailInfos = ref({})
const houseId = route.params.id;

const mainPart = computed(() => detailInfos?.value?.mainPart)

const onClickLeft = () => {
    router.back();
}

// 获取数据
getDetailInfos(houseId).then(res => {
    detailInfos.value = res.data
})

// tabControl的相关操作
const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
    return scrollTop.value >= 300
})
const sectionEls = []
const getSectionRef = (value) => {
    sectionEls.push(value.$el)
}
const tabClick = (index) => {
    let instance = sectionEls[index].offsetTop
    if (index !== 0) {
        instance = instance - 44
    }
    detailRef.value.scrollTo({
        top: instance,
        behavior: "smooth"
    })
}

// 点击相应tab如何让它滚动到正确的位置 (❗ 这段代码逻辑难)
// const sectionEls = ref({})
// const names = computed(() => {
//     return Object.keys(sectionEls.value)
// })
// const getSectionRef = (value) => {
//     const name = value.$el.getAttribute("name") // 组件的根元素的"name"属性值
//     sectionEls.value[name] = value.$el
// }
// const tabClick = (index) => {
//     const key = Object.keys(sectionEls.value)[index]
//     const el = sectionEls.value[key]
//     let instance = el.offsetTop // offsetTop拿到根元素相对于整个区域的偏移值
//     if (index !== 0) {
//         instance = instance - 44
//     }

//     // 滚动的位置
//     detailRef.value.scrollTo({
//         top: instance,  // 滚动的距离
//         behavior: "smooth"  // 平滑滚动
//     })
// }


</script>


<style lang="less" scoped>
.tabs {
    position: fixed;
    z-index: 9;
    left: 0;
    right: 0;
    top: 0;
}

.footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 120px;

    img {
        width: 123px;
    }

    .text {
        margin-top: 12px;
        font-size: 12px;
        color: #7688a7;
    }
}
</style>