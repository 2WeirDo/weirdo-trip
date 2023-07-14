<template>
    <div class="swipe">
        <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
            <!-- 轮播图 -->
            <template v-for="(item, index) in swipeData">
                <van-swipe-item class="item">
                    <img :src="item.url" alt="">
                </van-swipe-item>
            </template>
            <!-- 指示器 -->
            <template #indicator="{ active, total }">
                <div class="indicator">
                    <template v-for="(value, key, index) in swipeGroup" :key="key">
                        <span class="item" :class="{ active: swipeData[active]?.enumPictureCategory == key }">
                            <span class="text">{{ getName(value[0].title) }}</span>
                            <span class="count" v-if="swipeData[active]?.enumPictureCategory == key">
                                {{ getCategoryIndex(swipeData[active]) }}/{{ value.length }}
                            </span>
                        </span>   
                    </template>
                </div>
            </template> 
        </van-swipe>
    </div>
</template>


<script setup>

const props = defineProps({
    swipeData: {
        type: Array,
        default: () => []
    }
})

// 对数据进行转换
const swipeGroup = {}

// 思路一: 好理解, 两次循环
// for (const item of props.swipeData) {
//     swipeGroup[item.enumPictureCategory] = []
// }
// for (const item of props.swipeData) {
//     swipeGroup[item.enumPictureCategory].push(item);
// }
// console.log(swipeGroup)

// 思路二: 一次循环
for (const item of props.swipeData) {
  let valueArray = swipeGroup[item.enumPictureCategory]
  if (!valueArray) {
    valueArray = []
    swipeGroup[item.enumPictureCategory] = valueArray
  }
  valueArray.push(item)
}
 

// 定义转换数据的方法
const nameReg = /【(.*?)】/i
// 找到捕获组中间的东西 (惰性匹配)
const getName = (name) => {
  // return name.replace("：", "").replace("】", "").replace("【", "")
  const results = nameReg.exec(name)
  return results[1]
  // 数组第二个值就是捕获组的值
}

const getCategoryIndex = (item) => {
  const valueArray = swipeGroup[item.enumPictureCategory]
  return valueArray.findIndex(data => data === item) + 1
}

</script>

<style lang="less" scoped>
.swipe {
    .swipe-list {
        .item {
            img {
                width: 100%;
            }
        }

        .indicator {
            position: absolute;
            right: 5px;
            bottom: 5px;
            display: flex;
            padding: 2px 5px;
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            font-size: 12px;
            color: #fff;
            border-radius: 10px;
            background: rgba(0, 0, 0, 0.2);

            .item {
                margin: 0 3px;
                border-radius: 10px;
                &.active {
                    padding: 0 3px;
                    border-radius: 5px;
                    background-color: #fff;
                    color: #333;
                    
                }
            }
        }
    }
}
</style>