<!-- 组件说明 -->
<template>
    <!-- 微信引导下载 -->
    <div class="browsertc" v-if="weixincovertype=='weixincovershow'">
        <div class="browsertcvoer"></div>
        <div class="browsertcinner clearfix">
            <div class="browserleft">
                <img src="@/assets/logo.png" alt="">
            </div>
            <div class="browserright">
                <div class="browserrighttit">链接打不开?</div>
                <div class="browserrighttxt">请点击右上角…</div>
                <div class="browserrighttxt">请选择在”浏览器”中打开</div>
            </div>
            <div class="browserzs">
                <img src="@/assets/imgs/icons/jtfx.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    //import x from ''
    export default {
        name:'weixincover',
        props:{
            weixincovertype:{
                type:String,
                value:'weixincovershow'//默认搜索结果页
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
@import url('./../assets/css/common.less');
.browsertc {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 10001;
    cursor: pointer;
}

.browsertcvoer{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .75);
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10002;
}
.browsertc .browsertcinner {
    position: absolute;
    background-color: #fff;
    margin: 0rem 0.3rem;
    padding: 0.52rem 0.8rem;
    border-radius: 0.1rem;
    height: 1.6rem;
    z-index: 10003;
}

.browsertc .browsertcinner>div {
    float: left;
}

.browsertc .browsertcinner .browserleft {
    width: 1.54rem;
    height: 1.32rem;
    margin-right: 0.38rem;
}

.browsertc .browsertcinner .browserleft img {
    width: 100%;
    height: 100%;
}

.browsertc .browsertcinner .browserright .browserrighttit {
    font-size: 0.36rem;
    font-weight: 500;
    padding-bottom: 0.2rem;
}

.browsertc .browsertcinner .browserright .browserrighttxt {
    font-size: 0.28rem;
}

.browsertc .browsertcinner .browserzs {
    width: 1.4rem;
    height: 1.15rem;
    position: absolute;
    right: 0.13rem;
    top: 0.16rem;
}

.browsertc .browsertcinner .browserzs img {
    width: 100%;
    height: 100%;
}
</style>

<style lang='less'>
//@import url()

</style>