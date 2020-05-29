<!-- 组件说明 -->
<template>
    <div class="loginwrap">
        <div @click="goback" class="topbtn"><img src="@/assets/imgs/icons/sp-pic-fanh@2x.png" alt="返回"></div>
        <img class="logo" src="./../../assets/logo.png" alt="" srcset="">
        <p class="name">抓周</p>
        <div class="bottom">
            <div class="btnbox clearfix">
                <!-- <div class="btnli red" @click="$toast('想得美,H5没有一键登录')">一键登录</div> -->
                <div class="btnli loginregist" @click="pageto('regist')">登录/注册</div>
                <!-- <div class="forgetpw" @click="pageto('resetpw')">忘记密码?</div> -->
            </div>
            <!-- 第三方登录 -->
            <!-- <div class="threelogin">
                <ul>
                    <li @click="threelogin('微信')">
                        <img src="http://playback.17biyi.com/df523c64f873156a5b4433390c5458bb" alt="">
                    </li>
                    <li @click="threelogin('QQ')">
                        <img src="http://playback.17biyi.com/df523c64f873156a5b4433390c5458bb" alt="">
                    </li>
                    <li @click="threelogin('微博')">
                        <img src="http://playback.17biyi.com/df523c64f873156a5b4433390c5458bb" alt="">
                    </li>
                </ul>
            </div> -->
            <p class="powerby">Power by 助力文化 co.,Ltd</p>
        </div>
    </div>
</template>

<script>
    //import x from ''
    export default {
        metaInfo: {
          title: '抓周直播电商平台 - 黄金购物价格_今日黄金价格_最新黄金价格_黄金价格走势_24小时走势_历史走势_走势分析图_国际黄金价格_上交所_美元走势_美女直播_电商直播', // set a title
          meta: [{                 // set meta
            name: 'keywords',
            content: '黄金价格实时走势中心,黄金价格,今日黄金价格,最新黄金价格,黄金价格走势,24小时走势,历史走势,走势分析图,国际黄金价格,上交所,美女直播,电商直播'
          },{
            name:'description',
            content:'中国黄金投资网(中国黄金网)专业提供黄金价格,中国黄金,黄金期货,黄金投资,黄金交易所,金价,黄金公司,黄金网站,黄金开户,纸黄金,黄金外汇实时图形行情资讯及实时行情服务!'
          }],
          // link: [{                 // set link
          //   rel: 'asstes',
          //   href: 'https://assets-cdn.github.com/' 
          // }]
        },
        components: {

        },
        data () {
            return {
                username:'',//帐号
                password:'',//密码
            };
        },
        computed: {

        },
        methods: {
            // 返回上一页
            goback(){
                this.$router.go(-1);
            },
            // // 初期的demo登录
            // login(){
            //     let that = this;
            //     if(that.username == 'admin' && that.password == 123){
            //         let user={
            //             isLogin: true,
            //             username: '小庞',
            //             token: 154566525,
            //             userid: 67,
            //         }
            //         that.$store.commit('saveuserdata',user);
            //         that.$router.push({ name: "shopindex" });
            //     } else {
            //         that.$toast('账号或密码错误，请重试')
            //     }
            // },
            // 页面跳转
            pageto(routername){
                this.$router.push({name:routername});
            },
            // 三方登陆
            threelogin(key){
                let that = this;
                switch(key){
                    case "微信":
                        that.$toast('微信登录')
                        return;
                    case "QQ":
                        that.$toast('QQ登录')
                        return;
                    case "微博":
                        that.$toast('微博登录')
                        return;
                }
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
//@import url()
    .loginwrap{
        position: relative;
        .logo{
            width: 1.68rem;
            height: 1.68rem;
            margin: 0 auto 0.3rem;
            padding-top: 28.3%;
        }
        .name{
            font-size: 0.38rem;
            color: rgba(219,49,42,1);
            line-height: 0.53rem;
            text-align: center;
        }
        .bottom{
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            .btnbox{
                margin-bottom: 0.35rem;
                .btnli{
                    width: 6.24rem;
                    height: 0.94rem;
                    line-height: calc(0.94rem - 2px);
                    color: rgba(219,49,42,1);
                    box-sizing: border-box;
                    border: 1px solid rgba(219,49,42,1);
                    font-size: 0.32rem;
                    border-radius: 0.08rem;
                    text-align: center;
                    margin: 0 auto;
                    border-radius: 0.6rem;
                    cursor: pointer;
                    &.red{
                        background-image: linear-gradient(to right, #FF2013, #FF5223);
                        box-shadow: 0px 0.02rem 0.16rem 0px rgba(255, 55, 27, 0.36);
                        color:#fff;
                        margin-bottom:0.3rem;
                    }
                    &.loginregist{
                        margin-bottom: 0.25rem;
                    }
                }
                .forgetpw{
                    float: right;
                    margin-right: 0.5rem;
                    color: rgba(136,136,136,1);
                    font-size: 0.26rem;
                    line-height: 0.37rem;
                }
            }

            .threelogin{
                ul{
                    display: flex;
                    justify-content: space-around;
                    width:4.5rem;
                    margin:0 auto;
                    li{
                        width: 0.98rem;
                        height: 0.98rem;
                        border-radius: 50%;
                        border: 1px solid  rgba(151,151,151,1);
                        position: relative;
                        img{
                            width:0.5rem;
                            height:0.5rem;
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            transform:translate(-50%,-50%);
                        }
                    }
                }
            }
            .powerby{
                color: rgba(155,155,155,1);
                font-size: 0.2rem;
                text-align: center;
                line-height: 0.65rem;
            }
        }


        .old{
            padding: 5px;
            background-color: #ccc;
            border:1px solid #000;
            position: fixed;
            left: 50%;
            top: 50%;
            transform:translate(-50%,-50%);
        }
    }

// 顶部返回按钮
.topbtn{
    position: absolute;
    width: 0.64rem;
    height: 0.64rem;
    left: 0.23rem;
    top: 0.55rem;
    border-radius: 50%;
    overflow: hidden;
    z-index: 400;
    cursor: pointer;
    img{
        width: 100%;
        height: 100%;
    }
}
</style>

<style lang='less'>
//@import url()

</style>