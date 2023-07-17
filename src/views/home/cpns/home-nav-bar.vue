<template>
    <div class="nav-bar">
        <van-icon name="like" />
        <div class="title">唯多旅途</div>
        <van-icon name="like" />
    </div>
</template>

<script setup>

</script>


<style lang="less" scoped>
.home {
    .nav-bar {
        margin-bottom: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 46px;
        border-bottom: solid 1px rgb(232, 209, 180);

        .title {
            border-radius: 20px;
            background-color: gray;
            padding: 10px;
            margin: 10px;
            color: rgb(237, 232, 159);
            font-size: 24px;
            font-weight: 400;
            font-family:"华文琥珀";
            text-shadow: 1px 1px 2px black;
        }
    }
}
</style>