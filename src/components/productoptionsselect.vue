<!-- 组件说明 -->
<template>
    <div v-show="productoptionsselectdata.status" class='productoptionsselect' :class="{jmjp:$route.query.appname == 'jmjp',livingpage:currentpagetype=='livingpage'}">
        <div @click="productoptionsselectclose" class="closebtn">
            <img src="./../assets/imgs/icons/spxqs-close.png" alt="" v-if="$route.query.appname=='jmjp'">
            <img src="./../assets/imgs/icons/spge-guanbi@2x.png" alt="" v-else>
        </div>
        <div class="top clearfix">
            <img :src="productoptionsselectdata.selectshow.img" alt="抓周">
            <!-- <div class="selectoptions" v-if="$route.query.isnewuser==1 || $route.query.isnewuser==0">
                <p class="price" v-if="$route.query.appname=='jmjp'"><span>￥</span>{{productoptionsselectdata.selectshow.price}}</p>
                <p class="price" v-if="$route.query.isnewuser==1">￥{{productoptionsselectdata.selectshow.price}}</p>
                <p class="price" v-if="$route.query.isnewuser==0">￥{{productoptionsselectdata.selectshow.marketPrice}}</p>
                <span>{{productoptionsselectdata.selectshow.optionstxt}}</span>
            </div> -->
            <div class="selectoptions">
                <p class="price" v-if="$route.query.appname=='jmjp'"><span>￥</span>{{productoptionsselectdata.selectshow.price}}</p>
                <p class="price">￥{{productoptionsselectdata.selectshow.price}}</p>
                <span>{{productoptionsselectdata.selectshow.optionstxt}}</span>
            </div>
        </div>
        <div class="optionwrap">
            <div class="option_scrollwrap">
                <div class="options_box" v-for="(item,index) in productoptionsselectdata.SpecGroup" :key="index">
                    <p class="title">{{item.name}}:</p>
                    <ul class="option_list clearfix">
                        <li @click="specs_select(index,itemin.specs_id,itemin.is_hide)" :class="{selected:itemin.is_default==1,noselect:itemin.is_hide==1}" v-for="(itemin,indexin) in item.childSpecs" :key="indexin">{{itemin.cname!=''?itemin.cname:'默认'}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="number clearfix" v-if="$route.query.frompage != 'newcomer'">
            <p class="title">购买数量:</p>
            <div class="number_wrap">
                <p :class="{grew:number==1}" @click="minus">-</p>
                <div class="input">{{number}}</div>
                <p @click="plus">+</p>
            </div>
        </div>
        <div style="display:none;" class="tips">
            <p class="title">说明:</p>
            <span>白富美分期 先享后付，0元带回家</span>
        </div>
        <div class="btns" v-show="productoptionsselectdata.is_exist!=0 && $route.query.frompage != 'newcomer'">
            <p v-if="bottom_btncolor_data!=''" :style="appsetstyle" @click="addit" class="addit">加入购物车</p>
            <p v-else @click="addit" class="addit">加入购物车</p>
            <p @click="buyit" class="buyit">立即购买</p>
        </div>
        <div class="btns newcomer" v-show="productoptionsselectdata.is_exist!=0 && $route.query.frompage == 'newcomer'">
            <p @click="buyit" class="buyit">确认</p>
        </div>
        <div class="btns" v-show="productoptionsselectdata.is_exist==0">
            <p class="nomoregoods">选择的规格商品暂时无货</p>
        </div>
    </div>
</template>

<script>
    //import x from ''
    export default {
        props:{
            productoptionsselectdata:{
                type:Object,
            },
            bottom_btncolor_data:{
                type:String,
                // value:'productdetails'//默认详情页
            },
            currentpagetype_data:{
                type:String,
                // value:'productdetails'//默认详情页
            },
        },
        components: {

        },
        data () {
            return {
                number:1,//默认数量为1
                optionlevel:this.productoptionsselectdata.SpecGroup.length,//
                // specs_selectdata:this.productoptionsselectdata.specs_id.split("_"),
                appsetstyle:{
                    color:'',
                    background:'',
                    borderColor:'',
                },
                currentpagetype:'',
            };
        },
        watch:{
            // number(newval,oldval){
            //     this.$emit('_buynumber',newval);
            // }
            bottom_btncolor_data(newval,oldval){
                this.appsetstyle = {
                    color:'#fff',
                    background:newval,
                    borderColor:newval,
                }
            },
            currentpagetype_data(newval,oldval){
                this.currentpagetype = newval;
            }
        },
        computed: {
        },
        methods: {
            productoptionsselectclose(){
                this.$emit('_productoptionsselectclose');
            },
            specs_select(level,specs_id,ishidevalue){
                let that = this;
                if(ishidevalue==1){
                    this.$toast('此规格不可选');
                    return;
                }
                this.$emit('_specs_select',level,specs_id,that.productoptionsselectdata.specs_id.split("_"));
            },
            addit(){
                this.numberchange();
                // 父级 去  对 是否确定好最终产品 及 对应价格 做判断
                this.$emit('_addit');
            },
            buyit(){
                this.numberchange();
                // 父级 去  对 是否确定好最终产品 及 对应价格 做判断
                this.$emit('_buyit');
            },
            minus(){
                let that = this;
                if(that.number==1){
                    return
                }else{
                    that.number--;
                }
            },
            plus(){
                this.number++;
            },
            numberchange(){
                this.$emit('_buynumber',this.number);
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
.productoptionsselect{
    position: fixed;
    left: 50%;
    transform:translateX(-50%);
    bottom: 0;
    z-index: 100;
    width: 7.5rem;
    // height: 9.5rem;
    background-color: #fff;
    z-index: 1000;
    .closebtn{
        cursor: pointer;
        position: absolute;
        right: 0.22rem;
        top: 0.27rem;
        color: rgba(151,151,151,1);
        text-align: center;
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        // line-height: 0.36rem;
        line-height: 0.4rem;
        font-size: 0.34rem;
        img{
            width:100%;
            height:100%;
        }
    }
    .top{
        padding: 0.27rem 0.25rem 0.31rem;
        border-bottom: 1px solid rgba(238,238,238,1);
        img{
            width: 1.94rem;
            height: 1.94rem;
            float: left;
            margin-right: 0.27rem;
            // box-shadow: 0 0 0.05rem #000;
            border-radius: 0.08rem;
            overflow: hidden;
        }
        .selectoptions{
            float: left;
            .price{
                font-size: 0.34rem;
                line-height: 0.45rem;
                color: #ff5b4f;
                margin-bottom: 0.08rem;
            }
            span{
                display: block;
                font-size: 0.24rem;
                line-height: 0.31rem;
                color: rgba(51,51,51,1);
            }
        }
    }
    .optionwrap{
        overflow: hidden;
        width: 7.5rem;
        // height: 2.75rem;
        height: 4.9rem;
        // background-color: greenyellow;
        background-color: #fff;
        padding-top: 0.23rem;
        padding-bottom: 0.65rem;
        padding-left: 0.25rem;
        box-sizing: border-box;
        .option_scrollwrap{
            width: 100%;
            height: 100%;
            // padding-right: 10px;
            overflow-x: hidden;
            overflow-y: scroll;
            .options_box{
                .title{
                    color: rgba(51,51,51,1);
                    font-size: 0.26rem;
                    line-height: 0.35rem;
                    height: 0.35rem;
                    margin-bottom: 0.24rem;
                }
                .option_list{
                    li{
                        cursor: pointer;
                        float: left;
                        border-radius: 0.06rem;
                        margin-bottom: 0.2rem;
                        padding: 0 0.2rem;
                        height: 0.56rem;
                        line-height: 0.56rem;
                        font-size: 0.26rem;
                        color: rgba(51,51,51,1);
                        border: 1px solid rgba(245,245,245,1);
                        margin-right: 0.2rem;
                        background-color: rgba(245,245,245,1);
                        &.selected{
                            // color: rgba(219,49,42,1);
                            // border: 1px solid rgba(219,49,42,1);
                            background-color: rgba(255,255,255,1);
                            border: 1px solid #FFBD04;
                            color: #FFBD04;
                            box-sizing: border-box;
                        }
                        &.noselect{
                            color: rgba(182,182,182,1);
                            border: 1px solid rgba(245,245,245,1);
                            background-color: rgba(245,245,245,1);
                            cursor: auto;
                        }
                    }
                }
            }
        }
    }
    .number{
        border-top: 1px solid rgba(238,238,238,1);
        border-bottom: 1px solid rgba(238,238,238,1);
        padding: 0.26rem 0.25rem;
        .title{
            float: left;
            // line-height: 1.08rem;
            line-height: 0.56rem;
            font-size: 0.28rem;
            color: rgba(51,51,51,1);
            // height: 1.08rem;
            height: 0.56rem;
        }
        .number_wrap{
            float: right;
            // padding-right: 0.22rem;
            display: flex;
            justify-content: space-between;
            flex-wrap: nowrap;
            // width: 1.92rem;
            .input{
                width: auto;
                outline: none;
                border: none;
                padding: 0 0.29rem;
                background-color: @bgcolor;
                color: rgba(51,51,51,1);
                font-size: 0.28rem;
                line-height: 0.56rem;
            }
            p{
                cursor: pointer;
                color: rgba(51,51,51,1);
                font-size: 0.42rem;
                line-height: 0.56rem;
                margin: 0 0.24rem;
                &.noselect{
                    color: rgba(199,199,199,1);
                    cursor: auto;
                }
                &.grew{
                    color: rgba(229, 229, 229, 1);
                }
            }
        }
    }
    .tips{
        padding: 0.38rem 0.25rem 0.75rem;
        border-bottom: 1px solid rgba(238,238,238,1);
        .title{
            line-height: 0.37rem;
            height: 0.37rem;
            font-size: 0.28rem;
            color: rgba(51,51,51,1);
        }
        span{
            color: rgba(153,153,153,1);
            font-size: 0.24rem;
            padding: 0 0.7rem;
            box-sizing: border-box;
            display: block;
        }
    }
    .btns{
        padding: 0.12rem 0.34rem;
        flex-grow:1;
        display: flex;
        justify-content: space-between;
        &>p{
            cursor: pointer;
            // height: 0.76rem;
            border-radius: 0.39rem;
            // padding: 0 0.6rem;
            width:3.2rem;
            // padding: 0 0.3rem;
            line-height: 0.78rem;
            text-align: center;
            font-size: 0.32rem;
            color: #fff;
            // box-shadow: 0px 0.05rem 0.16rem 0px rgba(255, 55, 27, 0.36);
            &.addit{
                // background-image: linear-gradient(to right,#FF5223 , #fa940f);
                border: 1px solid #FFBD04;
                color: #FFBD04;
                box-sizing: border-box;
            }
            &.buyit{
                // background-image: linear-gradient(to right, #FF2013, #FF5223);
                background-color: #FFBD04;
            }

            &.nomoregoods{
                // background:linear-gradient(90deg,rgba(226,99,33,1),rgba(254,216,180,1));
                background-color: #FFBD04;
                width: 15em;
                margin: 0 auto;
                // background-image: linear-gradient(to right, #FF2013, #FF5223);
            }
        }
    }
    .newcomer{
        .buyit{
            margin: 0 auto;
        }
    }
}
.productoptionsselect.jmjp,.productoptionsselect.jmjp.livingpage{
    .closebtn{
        width : .29rem;
        height: .29rem;
        top : .3rem;
        right :.25rem
    }
    .top{
        .selectoptions{
            float: left;
            margin-top: .29rem;
            .price{
                color: @jmjp_title;
                span{
                    display: inline-block;
                    color: @jmjp_title;
                    font-size: .24rem;
                }
            }
        }
        img{
            width : 1.8rem;
            height: 1.8rem;
            border-radius :0;
        }
    }

    .optionwrap{
        .option_scrollwrap{
            .options_box{
                .option_list{
                    li{
                        height: .5rem;
                        line-height: .5rem;
                        border-radius: 0;
                        border: 1px solid rgba(96,96,96,1);
                        background: none;
                        &.selected{
                            color: #fff;
                            background:rgba(96,96,96,1);
                        }
                    }
                }
            }
        }
    }
    .number{
        padding: .26rem 0.26rem  0.72rem;
        border-bottom : none;
        .title{
            color: @jmjp;
        }
        .number_wrap{
            border: 1px solid rgba(144,144,144,.5);
            height : .56rem;
            .input{
                background: none;
                border-width: 0 1px;
                border-color: rgba(144,144,144,.5);
                border-style: solid;
            }
            p{
                font-weight: bold;
                font-size: .38rem;
                height : .56rem;
                line-height: 1.3;
                display : block;
                font-style: normal;
            }
        }
    }
    .btns{
        padding: 0.16rem 0.95rem;
        &>p{
            width : 2.3rem;
            border-radius: 0;
            line-height : .7rem;
            &.addit{
                background-image: none;
                background-color: #fff;
                color: @jmjp;
                border-color: @jmjp;
            }
            &.buyit{
                background-image: none;
                color: #fff;
                background-color: @jmjp;
            }
        }
        .nomoregoods{
            width: 4rem;
            background-color: @jmjp;
        }
    }
}
.productoptionsselect.livingpage{
    position: fixed;
    left: 50%;
    transform:translateX(-50%);
    bottom: 0;
    z-index: 100;
    width: 7.5rem;
    // height: 9.5rem;
    background-color: #fff;
    z-index: 1000;
    .closebtn{
        cursor: pointer;
        position: absolute;
        right: 0.22rem;
        top: 0.27rem;
        color: rgba(151,151,151,1);
        text-align: center;
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        // line-height: 0.36rem;
        line-height: 0.4rem;
        font-size: 0.34rem;
        img{
            width:100%;
            height:100%;
        }
    }
    .top{
        padding: 0.3rem 0 0.3rem 0.25rem;
        border-bottom: 1px solid rgba(238,238,238,1);
        img{
            width: 1.7rem;
            height: 1.7rem;
            float: left;
            margin-right: 0.27rem;
            // box-shadow: 0 0 0.05rem #000;
            border-radius: 0.08rem;
        }
        .selectoptions{
            float: left;
            .price{
                font-size: 0.34rem;
                line-height: 0.45rem;
                color: @jmjp_old;
                margin-bottom: 0.08rem;
            }
            span{
                display: block;
                font-size: 0.24rem;
                line-height: 0.31rem;
                color: rgba(51,51,51,1);
            }
        }
    }
    .optionwrap{
        overflow: hidden;
        width: 7.5rem;
        // height: 2.75rem;
        // height: 4.9rem;
        height: 3.92rem;
        // background-color: greenyellow;
        background-color: #fff;
        padding: 0.3rem;
        padding-bottom: 0.14rem;
        box-sizing: border-box;
        .option_scrollwrap{
            width: 100%;
            height: 100%;
            // padding-right: 10px;
            overflow-x: hidden;
            overflow-y: scroll;
            .options_box{
                .title{
                    color: rgba(51,51,51,1);
                    font-size: 0.26rem;
                    line-height: 0.35rem;
                    height: 0.35rem;
                    margin-bottom: 0.24rem;
                }
                .option_list{
                    li{
                        cursor: pointer;
                        float: left;
                        border-radius: 0.06rem;
                        margin-bottom: 0.2rem;
                        padding: 0 0.2rem;
                        height: 0.56rem;
                        line-height: 0.56rem;
                        font-size: 0.26rem;
                        color: rgba(51,51,51,1);
                        border: 1px solid rgba(245,245,245,1);
                        margin-right: 0.2rem;
                        background-color: rgba(245,245,245,1);
                        &.selected{
                            color: @jmjp_old;
                            border: 1px solid @jmjp_old;
                            background-color: rgba(255,255,255,1);
                        }
                        &.noselect{
                            color: rgba(182,182,182,1);
                            border: 1px solid rgba(245,245,245,1);
                            background-color: rgba(245,245,245,1);
                            cursor: auto;
                        }
                    }
                }
            }
        }
    }


    .number{
        border-top: 1px solid rgba(238,238,238,1);
        // border-bottom: 1px solid rgba(238,238,238,1);
        // padding: 0.26rem 0.25rem;
        padding: 0.2rem 0.3rem;
        .title{
            float: left;
            // line-height: 1.08rem;
            line-height: 0.42rem;
            font-size: 0.28rem;
            color: rgba(51,51,51,1);
            // height: 1.08rem;
            height: 0.42rem;
        }
        .number_wrap{
            float: right;
            // padding-right: 0.22rem;
            display: flex;
            justify-content: space-between;
            flex-wrap: nowrap;
            // width: 1.92rem;
            .input{
                width: auto;
                outline: none;
                border: none;
                padding: 0 0.28rem;
                background-color: @bgcolor;
                color: rgba(51,51,51,1);
                font-size: 0.2rem;
                line-height: 0.42rem;
            }
            p{
                cursor: pointer;
                color: rgba(51,51,51,1);
                font-size: 0.40rem;
                line-height: 0.42rem;
                margin: 0 0.19rem;
                &.noselect{
                    color: rgba(199,199,199,1);
                    cursor: auto;
                }
                &.grew{
                    color: rgba(229, 229, 229, 1);
                }
            }
        }
    }
    .tips{
        padding: 0.38rem 0.25rem 0.75rem;
        border-bottom: 1px solid rgba(238,238,238,1);
        .title{
            line-height: 0.37rem;
            height: 0.37rem;
            font-size: 0.28rem;
            color: rgba(51,51,51,1);
        }
        span{
            color: rgba(153,153,153,1);
            font-size: 0.24rem;
            padding: 0 0.7rem;
            box-sizing: border-box;
            display: block;
        }
    }
    .btns{
        padding: 0.12rem 0.34rem;
        flex-grow:1;
        display: flex;
        justify-content: space-between;
        &>p{
            cursor: pointer;
            // height: 0.76rem;
            border-radius: 0.39rem;
            // padding: 0 0.6rem;
            width:3.2rem;
            // padding: 0 0.3rem;
            line-height: 0.78rem;
            text-align: center;
            font-size: 0.32rem;
            color: #fff;
            // box-shadow: 0px 0.025rem 0.1rem 0px @jmjp;
            &.addit{
                background-image: none;
                background-color: #fff;
                color: @jmjp_old;
            }
            &.buyit{
                background-image: none;
                color: #fff;
                background-color: @jmjp_old;
            }

            &.nomoregoods{
                background:linear-gradient(90deg,rgba(226,99,33,1),rgba(254,216,180,1));
                width: 15em;
                margin: 0 auto;
                background-image: linear-gradient(to right, #FF2013, #FF5223);
            }
        }
    }
}
</style>

<style lang='less'>
//@import url()

</style>