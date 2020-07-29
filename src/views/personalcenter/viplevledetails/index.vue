<template>
  <div class="viplevelwrap">
    <div class="header" v-if="$route.query.pagetype==1">
        <img class="back" @click="goback" src="./../../../assets/imgs/follow/xiangqing@2x.png" alt />
        <span>会员等级</span>
    </div>
    <div class="viplevlebox">
        <div class="section-top">
            <div class="top">
                <span class="im">
                    <img :src="faceUrl?faceUrl:default_img_head" alt />
                </span>
                <span class="sunshine"></span>
                <div class="msg">
                    <div class="tit">{{levelMsg.nikeName}}<span class="levelbox"><viplevel :lv_num="levelMsg.level?levelMsg.level:1"></viplevel></span></div>
                    <span class="ids">抓周号：{{levelMsg.virtualId}}</span>
                </div>
            </div>
            <div class="centers-sec">当前尊享值：<span>{{levelMsg.experience}}</span></div>
            <div class="progress" v-for="(item,index) in levelMsg.allLevel" :key="index" v-if="item.level ==levelMsg.level">
                <progress class="mypro" :value="levelMsg.experience" :max="item.endGrowthValue"></progress>
                <div class="proint-lt">
                    <div class="proint">
                        <span></span>
                    </div>
                    <span class="num">LV{{item.level}}</span>
                </div>
                <div class="proint-rt">
                    <div class="proint">
                        <span></span>
                    </div>
                    <span class="num">LV{{(Number(item.level) + 1)}}</span>
                </div>
            </div>
        </div>
        <div class="section-quanyi">
            <div class="title"><img src="../../../assets/imgs/personal/my-rights.png" alt /></div>
            <div class="tip">敬请期待，即将解锁</div>
        </div>
        <div class="section-change">
            <div class="title">
                <img src="../../../assets/imgs/personal/chengzhang.png" alt />
            </div>
            <div class="txt">
                <span class="t">一、什么是成长值</span>
                <p>成长值是根据用户在抓周APP上的账户信息、消费金额、活跃互动等方面的行为，综合算出的分值，分值每天更新。</p>
            </div>
            <div class="txt">
                <span class="t">二、成长值组成</span>
                <ul>
                    <li>
                        <span class="im"><img src="../../../assets/imgs/personal/viplevel-ic-xf.png" alt /></span>
                        <div class="rt">
                            <span class="t">消费</span>
                            <p>
                                您在抓周APP的消费行为，包括金额（实际支付     金额）、频次（天数）、充值、购买会员等，消费越多提升越多。 
                            </p>
                        </div>
                    </li>
                    <li>
                        <span class="im"><img src="../../../assets/imgs/personal/viplevel-ic-hy.png" alt /></span>
                        <div class="rt">
                            <span class="t">活跃</span>
                            <p>
                                您在抓周APP的登录、观看直播、转发分享以及使用抓周在线支付系统等行为，活跃越高分数值越高。 
                            </p>
                        </div>
                    </li>
                    <li>
                        <span class="im"><img src="../../../assets/imgs/personal/viplevel-ic-zh.png" alt /></span>
                        <div class="rt">
                            <span class="t">
                                账户
                            </span>
                            <p>
                                完善您的个人信息、实名认证以及手机验证、第三方账号的绑定等，账户资料越完善，获得的成长值越多。 
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="level-detail">
            <img src="../../../assets/imgs/personal/viplevel.png" alt />
        </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {DatetimePicker} from 'vant'
import { Picker } from 'vant';
import 'vant/lib/index.css';
import {
  setsessionStorage,
  getsessionStorage
} from "@/utils/index.js";
import viplevel from '@/components/viplevel.vue';

Vue.use(DatetimePicker);
Vue.use(Picker);
export default {
    data(){
       return {
           userId : '',
           levelMsg : {},
           default_img_head : require('../../../assets/imgs/icons/default-head.png')
       }
    },
    components:{
        viplevel
    },
    mounted(){
        var that = this;
        document.title = '会员等级';
        that.userId = that.$route.query.userId;
        // this.getUserLevelConfig();
        this.getUserLevelEquities();
    },
    methods:{
        //返回个人中心首页
        goback() {
            this.$router.go(-1);
        },
        //获取等级配置信息
        getUserLevelConfig(){
            let that = this;
            that.api.personalcenter
            .userLevelConfig({
                level : 1,
            }).then(res => {
               console.log('res');
               console.log(res);
               if(res.data.code == 1){
                //  that.levelMsg = res.data.data;
               }
            })
        },
        //用户等级权益
        getUserLevelEquities(){
            let that = this;
            that.api.personalcenter
            .userLevelEquities({
                userId : that.userId,
            }).then(res => {
            //    console.log('用户等级权益');
            //    console.log(res);
               if(res.data.code == 1){
                 that.levelMsg = res.data.data;
               }
            })
        }
    }    
}
</script>

<style lang="less" scope>
.viplevelwrap{
    background: url("../../../assets/imgs/personal/viplevel-tnbj.png") no-repeat 0 0;
    background-size: 7.5rem 3.59rem;
    .header {
        width: 7.5rem;
        text-align: center;
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
            transform: translateX(-50%);
            font-size: 0.34rem;
            color: #fff;
        }
    }
    .viplevlebox{
        padding: .3rem .2rem;
        color:rgba(31, 31, 31, 1);
        text-align: center;
        font-size : .58rem;
        font-family:PingFang SC;
        font-weight:500;
        .section-top{
            background: url("../../../assets/imgs/personal/viplevel-ic-kpbj.png") no-repeat 0 0;
            background-size: 7.1rem 3.87rem;
            min-height: 3.87rem;
            .top{
                display: flex;
                padding: .5rem .3rem .45rem;
                position : relative;
                .sunshine{
                    display: block;
                    width : .68rem;
                    height: .54rem;
                    background: url("../../../assets/imgs/personal/levelsun.png") no-repeat 0 0;
                    background-size: .68rem .54rem;
                    position: absolute;
                    left: .32rem;
                    top: .32rem;
                }
                .im{
                    display: block;
                    width: 1.02rem;
                    height: 1.02rem;
                    padding: .05rem;
                    border-radius:50%;
                    background: url("../../../assets/imgs/personal/level-hd.png") no-repeat 0 0;
                    background-size: 1.12rem 1.12rem;
                    overflow : hidden;
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                        border-radius:50%;
                    }
                }

                .msg{
                    padding-left: .18rem;
                    text-align: left;
                    font-weight:400;
                    display: flex;
                    flex-direction: column;
                    padding-top: .1rem;
                    .tit{
                        font-size: .28rem;
                        color:rgba(31,31,31,1);
                        display: inline-block;
                        .levelbox{
                            display: inline-block;
                            width: .94rem;
                            height: .34rem;
                            margin-left: .1rem
                        }
                    }
                    .ids{
                        display: inline-block;
                        font-size: .24rem;
                        color:rgba(117,117,117,1);
                        margin-top: .12rem;
                    }
                }
            }
            .centers-sec{
                font-size: .28rem;
                color:rgba(255,255,255,1);
                text-align: left;
                padding-left: .3rem;
                span{
                    display: inline-block;
                    font-size: .48rem;
                    font-weight:bold;
                    color:rgba(255,255,255,1);
                }
            }
            
            .progress{
                width: 100%;
                min-height: .5rem;
                position: relative;
                z-index: 5;
                .mypro{
                    display: block;
                    width: 6.5rem;
                    height: .05rem;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%);
                    z-index: 8;
                    background : navajowhite;
                }

                .mypro::-webkit-progress-bar{
                    background:rgba(255,255,255,.2)
                }
                .mypro::-webkit-progress-value {
                    background:rgba(255,255,255,1)
                }
                
                .proint-lt,
                .proint-rt{
                    display: block;
                    width: .55rem;
                    height: .55rem;
                    position: absolute;
                    left: .66rem;
                    top: 0.18rem;
                    display: flex;
                    flex-direction: column;
                    z-index: 10;
                }
                .proint-rt{
                    left: auto;
                    right: .5rem;
                }
                .proint span{
                    display: block;
                    width: .15rem;
                    height: .15rem;
                    margin: 0 auto;
                    background:rgba(255,255,255,1);
                    border-radius:50%;
                }
                .num{
                    display: block;
                    font-size: .24rem;
                    color:rgba(255,255,255,1);
                    margin-top: .08rem;
                }
            }
            
        }
        .section-quanyi{
            margin-top: .2rem;
            min-height: 2.1rem;
            font-family:PingFang-SC-Bold;
            font-size: .4rem;
            background: url("../../../assets/imgs/personal/viplevelcom01.png") no-repeat 0 0;
            background-size: 7.1rem 2.1rem;
            position: relative;
            .title{
               width: 2.21rem;
               height: .52rem;
               padding : .3rem 0 0 .3rem;
               img{
                   width : 100%;
                   height: 100%;
               }
            }
            .tip{
                font-size: .28rem;
                font-weight:500;
                color:rgba(117,117,117,1);
                margin : .45rem auto;
                text-align: center;
            }
             
        }
        .section-change{
            width: 7.1rem;
            background: url("../../../assets/imgs/personal/viplevelcom02.png") no-repeat left top;
            background-size: 7.1rem 10.45rem;
            font-family:PingFang SC;
            font-weight:500;
            .title{
                width: 5.45rem;
                height: .48rem;
                padding : .3rem 0 0 .3rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .txt{
                text-align: left;
                padding: 0 .3rem;
                .t{
                    font-size: .28rem;
                    font-weight:500;
                    color:rgba(31,31,31,1);
                }
                p{
                    padding-left: .55rem;
                    font-size: .24rem;
                    color:rgba(31,31,31,1);
                    line-height: .38rem;
                    
                }
                ul{
                    li{
                        position: relative;
                        padding : .3rem 0 0;
                        .im{
                          display: inline-block;
                           width: .56rem;
                           height: .56rem;
                           position: absolute;
                           left: .0rem;
                           top: .35rem;
                           img{
                               width : 100%;
                               height : 100%;
                           }
                        }
                        .rt{
                            font-weight:bold;
                            margin-left: .76rem;
                            padding-bottom : .3rem;
                            border-bottom : .01rem solid #D7D7D7;
                            .t{
                                display : block;
                                font-size: .24rem;
                                color: #1F1F1F;
                            }
                            p{
                                line-height: .38rem;
                                padding-left: 0;
                                margin-top: .1rem; 
                                color: #757575;
                            }
                        }
                    }
                    li:last-child .rt{
                        border-bottom : none;
                    }
                }
            }
        }
        .level-detail{
            img{
                width : 100%;
            }
        }
    }
}    
</style>


