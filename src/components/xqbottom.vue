<!-- 组件说明 -->
<template>
    <div class='bottombox'>
        <div class="bottomboxwrap" :class="{wukong:$route.query.appname == 'wukong'}" v-if="pagetype=='productdetails'">
            <div class="left" v-if="currentpagetype == 'livingpage'">
                <div class="li" v-if="!isAttention_status" @click="gotoshoucang(true)">
                    <img src="@/views/shop/productdetails/imgs/spxqsc.png" alt="聚美金品">
                    <!-- <p>收藏</p> -->
                </div>
                <div class="li" v-if="isAttention_status" @click="gotoshoucang(false)">
                    <img src="@/views/shop/productdetails/imgs/spxqysc.png" alt="聚美金品">
                    <!-- <p>收藏</p> -->
                </div>
            </div>
            <div class="left" v-if="currentpagetype != 'livingpage'">
                <div class="li" @click="gotodp" v-if="$route.query.appname == 'wukong'">
                    <img src="@/views/shop/productdetails/imgs/dpsy.png" alt="聚美金品">
                    <!-- <p>马甲包店铺</p> -->
                </div>
                <div class="li" @click="gotodp" v-if="$route.query.appname != 'wukong'">
                    <img src="@/views/shop/productdetails/imgs/spxqdp.png" alt="聚美金品">
                    <!-- <p>店铺</p> -->
                </div>
                <div class="li" @click="gotokefu" v-if="$route.query.appname != 'wukong' && serviceshow">
                    <img src="@/views/shop/productdetails/imgs/spxqkf.png" alt="聚美金品">
                    <!-- <p>客服</p> -->
                </div>
                <div class="li" v-if="!isAttention_status && $route.query.appname != 'wukong'" @click="gotoshoucang(true)">
                    <img src="@/views/shop/productdetails/imgs/spxqsc.png" alt="聚美金品">
                    <!-- <p>收藏</p> -->
                </div>
                <div class="li" v-if="isAttention_status && $route.query.appname != 'wukong'" @click="gotoshoucang(false)">
                    <img src="@/views/shop/productdetails/imgs/spxqysc.png" alt="聚美金品">
                    <!-- <p>收藏</p> -->
                </div>
                <div class="li" @click="gotoshopcart" v-if="$route.query.appname == 'wukong'"  >
                    <img src="@/views/shop/productdetails/imgs/spxqgwc.png" alt="">
                </div>
            </div>
            <div class="right" v-if="productoptionsselectdata.is_exist!=0">
                <p v-if="bottom_btncolor_data!=''" :style="appsetstyle" @click="openoptionsselect" class="addit">加入购物车</p>
                <p v-else @click="openoptionsselect" class="addit">加入购物车</p>
                <p @click="openoptionsselect" class="buyit">立即购买</p>
            </div>
            <div class="right" v-if="productoptionsselectdata.is_exist==0">
                <p @click="openoptionsselect" class="nomoregoods">选择的规格商品暂时无货</p>
            </div>
        </div>
        <div class="bottomboxwrap confirmorder" v-if="pagetype=='confirmorder'">
            <div class="left">
                <p>商品总价</p>
                <span class="sm">￥</span>
                <span>{{allprice.toFixed(2)}}</span>
            </div>
            <div class="right">
                <p @click="gopaypage" class="confirmorderbtn">立即付款</p>
            </div>
        </div>
    </div>
</template>

<script>
    //import x from ''
    export default {
        name:'xqbottom',
        props:{
            pagetype:{
                type:String,
                value:'productdetails'//默认详情页
            },
            allprice:{
                type:Number,
                value:0,
            },
            bottom_btncolor_data:{
                type:String,
                // value:'productdetails'//默认详情页
            },
            productoptionsselectdata:{
                type:Object,
            },
            isAttention_code:{
                type:Number,
                value:-1,
            },
            currentpagetype_data:{
                type:String,
                // value:'productdetails'//默认详情页
            },
            service:{
                type:Object,
            },
        },
        components: {

        },
        data () {
            return {
                appsetstyle:{
                    color:'',
                    background:'',
                    borderColor:'',
                },
                isAttention_status:false,
                currentpagetype:'',
                serviceshow:false,//当前页面版本小于 116 隐藏底部按钮客服
            };
        },
        watch:{
            bottom_btncolor_data(newval,oldval){
                this.appsetstyle = {
                    color:'#fff',
                    background:newval,
                    borderColor:newval,
                }
            },
            isAttention_code(newval,oldval){
                if(newval==1){
                    this.isAttention_status = true;
                }else{
                    this.isAttention_status = false;
                }
            },
            isAttention_code(newval,oldval){
                if(newval==1){
                    this.isAttention_status = true;
                }else{
                    this.isAttention_status = false;
                }
            },
            currentpagetype_data(newval,oldval){
                this.currentpagetype = newval;
            },
            service(newval,oldval){
                // ios
                if(Number(newval.version) <= 116 && newval.client == "iOS"){
                    this.serviceshow=false;
                }else if(Number(newval.version) > 116 && newval.client == "iOS"){
                    this.serviceshow=true;
                }
                // 安卓
                if(Number(newval.version) <= 130 && newval.client == "Android"){
                    this.serviceshow=false;
                }else if(Number(newval.version) > 130 && newval.client == "Android"){
                    this.serviceshow=true;
                }
                // this.currentpagetype = newval;
            }
        },
        computed: {

        },
        methods: {
            gopaypage(){
                this.$emit('_confirmorderfn');
                // this.$router.push({path:'/shop/paypage',query:{type: 'detailpage'}});
            },
            openoptionsselect(){
                this.$emit('_openoptionsselect')
            },
            // confirmorderfn(){
            //     this.$emit('_confirmorderfn');
            // },
            // 查看店铺
            gotodp(){
                this.$emit('_gotodp')
            },
            gotokefu(){
                this.$emit('_gotokefu')
            },
            gotoshopcart(){
                this.$emit('_gotoshopcart')
            },
            gotoshoucang(target_status){
                this.$emit('_gotoshoucang',target_status)
            },
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
.bottomboxwrap{
    position: fixed;
    z-index: 1;
    left: 50%;
    transform:translateX(-50%);
    bottom: 0;
    width: 7.5rem;
    height: 0.98rem;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0.14rem 0;
    display: flex;
    box-shadow: 0 0 1px 0 @bgcolor;
    .left{
        // position: absolute;
        // left: 0;
        // top:50%;
        // width: 1.9rem;
        display: flex;
        width: 2.5rem;
        justify-content: space-evenly;
        .li{
            cursor: pointer;
            // margin-top: 0.093rem;
            // margin: 0.093rem 0.08rem 0;
            padding-top: 0.07rem;
            img{
                // height: 0.37rem;
                // width: auto;
                // margin: 0 auto;
                height: 0.63rem;
                width: 0.53rem;
                margin: 0 auto;
            }
            p{
                font-size: 0.2rem;
                line-height: 1em;
                text-align: center;
                margin-top: 0.075rem
            }
        }
        .li:first-child{
            // margin-right: 0.45rem;
            // margin-left: 0.42rem;
            margin-left: 0.2rem
        }
    }
    .right{
        flex-grow:1;
        display: flex;
        justify-content: space-between;
        padding-right: 0.2rem;
        box-sizing: border-box;
        width: 5rem;
        &>p{
            cursor: pointer;
            // height: 0.76rem;
            border-radius: 0.39rem;
            // padding: 0 0.6rem;
            width:2.3rem;
            // width:2.2rem;
            box-sizing: border-box;
            // padding: 0 0.3rem;
            line-height: 0.7rem;
            text-align: center;
            font-size: 0.32rem;
            color: #fff;
            // box-shadow: 0px 0.05rem 0.16rem 0px rgba(255, 55, 27, 0.36);
            &.addit{
                // background-image: linear-gradient(to right,#FF5223 , #fa940f);
                border: 1px solid #FFBD04;
                color: #FFBD04;
            }
            &.buyit{
                // background-image: linear-gradient(to right, #FF2013, #FF5223);
                background-color: #FFBD04;
            }
            &.nomoregoods{
                // background:linear-gradient(90deg,rgba(226,99,33,1),rgba(254,216,180,1));
                background-color: #FFBD04;
                // width: 15em;
                width: 13em;
                margin: 0 auto;
                // background-image: linear-gradient(to right, #FF2013, #FF5223);
            }
        }
    }
    &.confirmorder{
        .left{
            width: 3.5rem;
            p{
                float: left;
                padding-left: 0.33rem;
                line-height: 0.76rem;
                height: 0.76rem;
                margin-right: 0.18rem;
                font-size: 0.28rem;
                color: rgba(51,51,51,1);
            }
            span{
                float: left;
                line-height: 0.76rem;
                height: 0.76rem;
                color: rgba(219,49,42,1);
                font-size: 0.32rem;
                &.sm{
                    font-size: .22rem;
                }
                float: left;
            }
        }
        .right{
            width: 4rem;
            display: block;
            padding-right: 0.25rem;
            .confirmorderbtn{
                background: rgba(255, 189, 4, 1);
                width: 1.6rem;
                height: .6rem;
                line-height: .6rem;
                font-size: .26rem;
                margin-top : .05rem;
                float: right;
            }
        }
    }
}
.bottomboxwrap.wukong{
    height: 1.2rem;
    padding: 0.22rem 0;
    .left{
        width: 2.03rem;
        padding-right: .3rem;
        justify-content: space-between;
        .li{
            padding-top: 0;
            img {
                display: block;
                width: .78rem;
                height: .74rem;
            }
        }
    }
    
    .right{
        width: 5.17rem;
        padding: 0.04rem .27rem 0.04rem 0;
        &>p{
            border-radius: 0;
            height: .7rem;
            &.addit{
                background-image: none;
                background-color: #fff;
                border-color: @wukong;;
                color: @wukong;
            }
            &.buyit{
                background-image: none;
                color: #fff;
                background-color: @wukong;
            }
        }
        .nomoregoods{
            background: rgba(14, 14, 14, 1);
        }
    }
}
</style>

<style lang='less'>
//@import url()

</style>
