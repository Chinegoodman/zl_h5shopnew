<!-- 组件说明 -->
<template>
    <div class="topbanner">
        <img src="@/assets/imgs/follow/xiangqing@2x.png" alt="聚美金品" style="transform:rotate(180deg);" @click="goback">
        <p>{{title}}</p>
    </div>
</template>

<script>
    //import x from ''
    export default {
        components: {

        },
        props:{
            title:{
                type:String,
                default:'title',
            }
        },
        data () {
            return {

            };
        },
        computed: {

        },
        methods: {
            goback(){
                this.$router.go(-1);
            }
        },
        mounted() {

        },
        beforeCreate() {}, //生命周期 - 创建之前
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() {}, //生命周期 - 销毁之前
        destroyed() {}, //生命周期 - 销毁完成
        activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>

<style lang='less' scoped>
    .topbanner{
        padding: 0.25rem 0.3rem;
        height: 0.37rem;
        line-height: 0.37rem;
        position: relative;
        &>img{
            position: absolute;
            left: 0.3rem;
            top:0.25rem;
            height: 0.37rem;
            width:0.2rem;
        }
        p{
            text-align: center;
            color: rgba(51, 51, 51, 1);
            font-size: 0.34rem;
            line-height: 0.37rem;
            font-weight: bold;
        }
    }
</style>

<style lang='less'>
//@import url()

</style>