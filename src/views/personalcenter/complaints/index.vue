<!-- 组件说明 -->
<template>
    <div class="wrap-complaints">
        <div class="header">
            <img class="back" @click="goback" src="./../../../assets/imgs/follow/xiangqing@2x.png" alt />
            <span>投诉建议</span>
        </div>
        <div class="line"></div>
        <complaints></complaints>
    </div>
</template>

<script>
    import complaints from './../../../components/complaints.vue'
    export default {
        components: {
            complaints
        },
        methods:{
            goback() {
                this.$router.go(-1);
            }
        }
    };
</script>
<style lang="less">
.wrap-complaints{
    .header {
        width: 7.5rem;
        border-bottom: 1px solid #DEDEDE;
        background: white;
        text-align: center;
        position: fixed;
        z-index: 100;

        img {
            transform: rotate(180deg);
            width: 0.2rem;
            height: 0.35rem;
            display: block;
            padding: 0.4rem 0;
            margin-left: 0.46rem;
        }

        span {
            position: absolute;
            top: 0.4rem;
            left: 50%;
            margin-left: -0.55rem;
            font-size: 0.34rem;
            color: #333333;
        }
    }
    .line{
        background-color:#F7F7F7;
        height: 1.35rem;
    }
}    
</style>
