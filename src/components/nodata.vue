<!-- 组件说明 -->
<template>
    <div class='nodata'>
        <!-- 没有搜索到数据 -->
        <div class="searchnodata" v-if="pagetype=='searchdata'">
            <div class="nodataimg">
                <img src="../assets/imgs/icons/ddkby.png" alt="">
            </div>
            <div class="nodatatext">
                非常抱歉，没有找到相关宝贝呦~~
            </div>
        </div>
        <!-- 没有分类 -->
        <div class="classifynodata" v-if="pagetype=='classifydata'">
            <div class="nodataimg">
                <img src="../assets/imgs/icons/flkby.png" alt="">
            </div>
            <div class="nodatatext">
                新品上架中，敬请期待哟~
            </div>
        </div>
        <!-- 订单搜索无数据 -->
        <div class="ordernodata" v-if="pagetype=='orderdata'">
            <div class="nodataimg">
                <img src="../assets/imgs/icons/ddkby.png" alt="">
            </div>
            <div class="nodatatext">
                哎呀，您还没有当前类型的订单呦~~
            </div>
        </div>
        <!-- 订单搜索无数据/首页搜索无数据 -->
        <div class="discountshopnodata" v-if="pagetype=='discountshop'">
            <div class="nodataimg">
                <img src="../assets/imgs/icons/ddkby.png" alt="">
            </div>
            <div class="nodatatext">
                哎呀，您暂时还没有当前类型的商品呦~~
            </div>
        </div>
        <!-- 优惠券搜索无数据-->
        <div class="discountuindexnodata" v-if="pagetype=='discountindex'">
            <div class="nodataimg">
                <img src="../assets/imgs/icons/ddkby.png" alt="">
            </div>
            <div class="nodatatext">
                优惠券已经暂时发放完毕啦~ 
            </div>
        </div>
        <!-- 我的优惠券搜索无数据-->
        <div class="mydiscountnodata" v-if="pagetype=='mydiscount'">
            <div class="nodataimg">
                <img src="../assets/imgs/icons/ddkby.png" alt="">
            </div>
            <div class="nodatatext">
                你还未领取优惠券，去优惠中心看看~   
            </div>
        </div>
        <!-- 我的收藏列表无数据-->
        <div class="mybrowsenodata" v-if="pagetype=='mybrowse'">
            <div class="nodataimg">
                <img src="../assets/imgs/icons/ddkby.png" alt="">
            </div>
            <div class="nodatatext">
                你还没有收藏过任何商品，赶紧去逛逛吧~   
            </div>
        </div>
        <!-- 详情页无网络或者接口异常时的提示-->
        <div class="mybrowsenodata prodetails_nodata" v-if="pagetype=='prodetails_nodata'">
            <div class="nodataimg prodetails_nodata">
                <img src="../assets/imgs/icons/404.png" alt="404">
            </div>
            <div class="nodatatext">
                您的网络不太给力哦</br>
                没网的日子，好！空！虚！
            </div>
            <p class="btn" @click="reloadpage">重试</p>
        </div>
    </div>
</template>

<script>
    //import x from ''
    export default {
        name:'nodata',
        props:{
            pagetype:{
                type:String,
                value:'searchdata'//默认搜索结果页
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
            reloadpage(){
                this.$emit('_reloadpage')
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
.nodata{
    background-color:#F7F7F7;
    height: calc(100%);
    .nodataimg{
        width:4.54rem;
        margin:0 auto;
        padding-top:2.01rem;
        margin-bottom:0.9rem;
        img{
            width:100%;
            height:auto;
        }
    }
    .nodatatext{
        color:#757575;
        font-size:0.26rem;
        text-align:center;
    }
    .classifynodata{
        .nodataimg{
            width:3.22rem;
            padding-top:1.82rem;
        }
    }
    .mybrowsenodata.prodetails_nodata{
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        .nodataimg.prodetails_nodata{
            margin: 0 auto;
            padding: 0 0 0.82rem;
        }
        p.btn{
            cursor: pointer;
            background-color: rgba(255, 189, 4, 1);
            color: rgba(255, 255, 255, 1);
            font-size: 0.317rem;
            border-radius: 0.35rem;
            height: 0.7rem;
            line-height: 0.7rem;
            width: 2.3rem;
            text-align:center;
            margin:0.45rem auto 0;
        }
    }
}
</style>

<style lang='less'>
//@import url()

</style>