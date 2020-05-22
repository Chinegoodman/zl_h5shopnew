<!-- 组件说明 -->
<template>
    <div v-if="loadingstatus" class="loading">
        <img class="imggif" src="./../assets/imgs/icons/sp-loading@2x.png" alt="抓周">
        <span>{{loadingmsg}}</span>
    </div>
</template>

<script>
    //import x from ''
    export default {
        props:{
            loadingstatus:{
                type:Boolean,
                value:false
            },
            loadingmsg:{
                type:String,
                value:'正在加载'
            }
        },
        components: {

        },
        data () {
            return {

            };
        },
        computed: {

        },
        methods: {

        },
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>

<style lang='less' scoped>
//@import url()
.loading{
    width: 100%;
    padding: 0.26rem 0 0.33rem;
    // background-color: rgba(245,245,245,1);
    .imggif{
        animation: loadingrotate 1s linear infinite;
        margin: 0 auto;
    }
    span{
        display: block;
        text-align: center;
        color: rgba(165,165,165,1);
    }
}
.loading.havepaddingbottom{
    padding-bottom: 1.31rem;
}
@keyframes loadingrotate {
    from {
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
}
</style>

<style lang='less'>
//@import url()

</style>