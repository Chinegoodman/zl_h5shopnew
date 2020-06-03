<!-- 组件说明 -->
<template>
    <div class="complaints">
        <div class="header">
            <img class="back" @click="goback" src="./../../../assets/imgs/follow/xiangqing@2x.png" alt />
            <span>会员福利</span>
        </div>
        <div class="headerbj">
            <div class="head clearfix">
                <div class="headpicbox">
                    <div class="headpic">
                        <img :src="face_url" alt />
                    </div>
                    <div class="headicon" v-if="is_vip!=0">
                        <img src="./../../../assets/imgs/member/memberhg.png" alt />
                    </div>
                </div>
                <div class="membertit">
                    <div class="membertittop clearfix">
                        <div class="tit">{{username}}</div>
                        <div class="titicon" v-if="is_vip!=0">
                            <img src="./../../../assets/imgs/member/memberdj.png" alt />
                        </div>
                    </div>
                    <div class="memberdata" v-if="is_vip!=0">2020.12.12 <span>会员到期</span></div>
                    <div class="nomemberdata" v-if="is_vip==0">未开通</div>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="main-top">
                <img src="./../../../assets/imgs/member/membertit.png" alt />
            </div>
            <div class="main-list">
                <ul class="clearfix">
                    <li>
                        <div class="listpic">
                            <img src="./../../../assets/imgs/member/membertx.png" alt />
                        </div>
                        <div class="listtxt">专属头像</div>
                    </li>
                    <li>
                        <div class="listpic">
                            <img src="./../../../assets/imgs/member/membersf.png" alt />
                        </div>
                        <div class="listtxt">专属身份标志</div>
                    </li>
                    <li>
                        <div class="listpic">
                            <img src="./../../../assets/imgs/member/memberzbj.png" alt />
                        </div>
                        <div class="listtxt">间<br>欢迎特效</div>
                    </li>
                    <li>
                        <div class="listpic">
                            <img src="./../../../assets/imgs/member/memberdm.png" alt />
                        </div>
                        <div class="listtxt">间<br>弹幕畅聊</div>
                    </li>
                    <li>
                        <div class="listpic">
                            <img src="./../../../assets/imgs/member/memberkf.png" alt />
                        </div>
                        <div class="listtxt">专属客服</div>
                    </li>
                    <li>
                        <div class="listpic">
                            <img src="./../../../assets/imgs/member/memberyxfh.png" alt />
                        </div>
                        <div class="listtxt">商品优先发货</div>
                    </li>
                    <li>
                        <div class="listpic">
                            <img src="./../../../assets/imgs/member/memberfh.png" alt />
                        </div>
                        <div class="listtxt">高额度<br>红利分红</div>
                    </li>
                    <li>
                        <div class="listpic">
                            <img src="./../../../assets/imgs/member/memberqd.png" alt />
                        </div>
                        <div class="listtxt">敬请期待</div>
                    </li>
                </ul>
            </div>
            <div class="main-btn" v-if="is_vip!=0" @click="gotopaymoney">
                立即续费
            </div>
            <div class="main-btn" v-if="is_vip==0" @click="gotopaymoney">
                立即开通 ¥99/年 <span>¥299/年</span>
            </div>
        </div>
    </div>
</template>

<script>
    const OSS = require("ali-oss");
    export default {
        components: {},
        data() {
            return {
                is_vip:0,
                face_url:"",
                username:"",
            };
        },
        computed: {},
        methods: {
            goback() {
                this.$router.go(-1);
            },
            gotopaymoney(){
                this.$toast("暂未开通");
            }
        },
        mounted() {
            this.is_vip=this.$store.state.user.userdata.userInfo.is_vip;
            this.face_url=this.$store.state.user.userdata.userInfo.face_url;
            this.username=this.$store.state.user.username;
        },
        beforeCreate() {}, //生命周期 - 创建之前
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() {}, //生命周期 - 销毁之前
        destroyed() {}, //生命周期 - 销毁完成
        activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
    };
</script>
<style lang="less">
    body {
        background-color: #F7F7F7;
    }
</style>
<style lang="less" scoped>
    @import "./css/index.less";

    .complaints {

        background-color: #F7F7F7;
    }
</style>