<!-- 组件说明 -->
<template>
    <!-- 下载弹层 -->
    <div class="openappbtnsbox" v-if="covertype=='downloadcovershow'">
        <div class="box-cover" @click="closeappbtnsbox" ></div>
        <div class="box-content">
            <div class="pt_box">
                <span>
                <img src="@/assets/logo.png" alt="聚美金品">
            </span>
                <p>请登录聚美金品APP操作</p>
            </div>
            <div class="btn_box">
                <a class="openappbtn" :href="link_url_open" target="_blank">启动APP</a>
                <a class="openappbtn" :href="link_url_download==1?'https://apk.izhuazhou.cn/zsapk/zz_zs.apk':'https://apps.apple.com/cn/app/id1487579824'" target="_blank" ref="startdowm">下载APP</a>
            </div>
        </div>
    </div>
</template>

<script>
    //import x from ''
    export default {
        name:'nodata',
        props:{
            covertype:{
                type:String,
                value:'downloadcovershow'//默认搜索结果页
            },
            link_url_download:{
                type : Number,
                value : 1
            },
            link_url_open: {
                type : String,
                value : 'link_url_open'
            },
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
            closeappbtnsbox(){
                this.$emit('closeappbtnsboxclick');
            }
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
.openappbtnsbox {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    .box-cover {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .75);
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 99;
    }
    .box-content {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 6.06rem;
        padding: 0.5rem 0.2rem;
        text-align: center;
        color: #000;
        background-color: #fff;
        border-radius: 0.2rem;
        display: flex;
        justify-content: space-around;
        box-shadow: 0 0 0 0.02rem #fff;
        z-index: 100;
        flex-wrap: wrap;
        cursor: pointer;
        border: 1px solid #dadada;
    }
    p {
        width: 100%;
        padding-bottom: 0.4rem;
        font-size: 0.28rem;
    }
    .pt_box span {
        display: block;
        width: .86rem;
        height: .86rem;
        margin: 0 auto;
    }

    .pt_box img {
        width: 100%;
        ;
    }

    .pt_box p {
        font-size: .28rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(31, 31, 31, 1);
        margin-top: .3rem;
    }
    .pt-box-shopdown p {
        margin-top: 0;
    }
    
    .btn_box {
        padding: .53rem .65em 0;
    }
    
    .btn_box_shopdown {
        padding-top: .5rem;
    }
    
    .btn_box a {
        display: inline-block;
        width: 2.3rem;
        height: .7rem;
        line-height: .7rem;
        background: rgba(255, 255, 255, 1);
        color: rgba(255, 189, 4, 1);
        font-size: .32rem;
        font-family: PingFang SC;
        font-weight: 500;
        border-radius: .35rem;
        border: 1px solid rgba(255, 189, 4, 1);
        cursor: pointer;
    }
    
    .btn_box a:last-child {
        margin-left: .3rem;
        background: rgba(255, 189, 4, 1);
        color: rgba(255, 255, 255, 1);
        border: 1px solid rgba(255, 189, 4, 1);
    }
}
</style>

<style lang='less'>
//@import url()

</style>