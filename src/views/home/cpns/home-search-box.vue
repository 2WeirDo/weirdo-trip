<template>
    <div class="search-box">
        <!-- 城市位置信息 -->
        <div class="location bottom-gray-line">
            <div class="city" @click="cityClick"><span>{{ currentCity.cityName }}</span></div>
            <div class="position" @click="positionClick">
                <span class="text">我的位置</span>
                <img src="@/assets/img/home/icon_location.png" alt="">
            </div>
        </div>
        <!-- 日期范围信息 -->
        <div class="section date-range bottom-gray-line" @click="showCalendar = true">
            <div class="start">
                <div class="date">
                    <span class="tip">入住</span>
                    <span class="time">{{ startDateStr }}</span>
                </div>
                <div class="stay">共 <strong>{{ stayCount }}</strong> 晚</div>
            </div>

            <div class="end">
                <div class="date">
                    <span class="tip">离店</span>
                    <span class="time">{{ endDateStr }}</span>
                </div>
            </div>
        </div>
        <van-calendar v-model:show="showCalendar" type="range" @confirm="onConfirm" color="var(--primary-color)" />

        <!-- 价格/人数选择 -->
        <div class="section price-counter bottom-gray-line">
            <div class="start">价格不限</div>
            <div class="end">人数不限</div>
        </div>
        <!-- 关键字 -->
        <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>

        <!-- 热门建议 -->
        <div class="section hot-suggests">
            <template v-for="(item, index) in hotSuggests" :key="index">
                <div class="item" @click="searchClick(item.tagText.text)"
                    :style="{ color: item.tagText.color, background: item.tagText.background.color }">
                    {{ item.tagText.text }}
                </div>
            </template>
        </div>

        <!-- 搜索按钮 -->
        <div class="search-btn section">
            <div class="btn" @click="searchClick()">开始搜索</div>
        </div>
    </div>
</template>


<script setup>
import useCityStore from '@/stores/modules/city';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { formatMonthDay, getDiffDays } from '@/utils/format_date'
import useHomeStore from "@/stores/modules/home"
import useMainStore from '@/stores/modules/main';

const router = useRouter();

// 位置/城市处理
const cityClick = () => {
    router.push("/city")
}

const positionClick = () => {
    navigator.geolocation.getCurrentPosition((res) => {
        console.log("获取位置成功:", res);
    }, err => {
        console.log("获取位置失败:", err);
    })
}

// 获取当前城市
const cityStore = useCityStore();
const { currentCity } = storeToRefs(cityStore);

// 日期范围的处理
const mainStore = useMainStore()
const { startDate, endDate } = storeToRefs(mainStore)

const startDateStr = computed(() => formatMonthDay(startDate.value))
const endDateStr = computed(() => formatMonthDay(endDate.value))
const stayCount = ref(getDiffDays(startDate.value, endDate.value))

// 显示日期选择
const showCalendar = ref(false);

const onConfirm = (value) => {
    const selectStartDate = value[0];
    const selectEndDate = value[1];
    mainStore.startDate = selectStartDate
    mainStore.endDate = selectEndDate
    stayCount.value = getDiffDays(selectStartDate, selectEndDate);
    // 隐藏日历
    showCalendar.value = false;
}

// 热门建议
const homeStore = useHomeStore()
const { hotSuggests } = storeToRefs(homeStore)

//搜索按钮
const searchClick = (value) => {
    router.push({
        path: "/search",
        query: {
            startDate: formatMonthDay(startDate.value),
            endDate: formatMonthDay(endDate.value),
            currentCity: value || currentCity.value.cityName
        }
    })
}

</script>


<style lang="less" scoped>
.location {
    display: flex;
    padding: 0 20px;
    align-items: center;
    height: 44px;

    .city {
        flex: 1;
        // padding-left: 20px;

        span {
            border-bottom: solid 1px darkgoldenrod;
        }
    }

    .position {

        width: 74px;
        display: flex;
        align-items: center;

        .text {
            position: relative;
            top: 1px;
            font-size: 12px;
        }

        img {
            margin-left: 5px;
            width: 18px;
            height: 18px;
        }
    }
}

.section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 20px;
    color: #999;
    height: 44px;

    .start {
        flex: 1;
        display: flex;
        height: 44px;
        align-items: center;
    }

    .end {
        min-width: 30%;
        padding-left: 20px;
    }

    .date {
        display: flex;
        flex-direction: column;

        .tip {
            font-size: 12px;
            color: #999;
        }

        .time {
            margin-top: 3px;
            color: #333;
            font-size: 15px;
            font-weight: 500;
        }
    }
}

.date-range {
    height: 44px;

    .stay {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #666;
    }
}

.price-counter {
    .start {
        border-right: 1px solid var(--line-color);
    }
}

.hot-suggests {
    margin: 10px 0;
    height: auto;

    .item {
        padding: 4px 8px;
        margin: 4px;
        border-radius: 14px;
        font-size: 12px;
        line-height: 1;
    }
}

.search-btn {
    .btn {
        width: 342px;
        height: 38px;
        max-height: 50px;
        font-weight: 500;
        font-size: 18px;
        line-height: 38px;
        text-align: center;
        border-radius: 20px;
        color: #fff;
        background-image: var(--theme-linear-gradient);
    }
}</style>