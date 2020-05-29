<!-- 组件说明 -->
import { clearInterval } from 'timers';
<template>
    <div class="registwrap">
        
        <div @click="goback" class="topbtn"><img src="@/assets/imgs/icons/sp-pic-fanh@2x.png" alt="返回"></div>
        <!-- <div @click="logintypechange" class="toprightbtn">{{logintypechangetxt}}</div> -->

        <div class="content">
            <p class="title">重置密码</p>
            <div class="status">
                <div class="statusli" :class="{active:step==1}">
                    <span>1</span>
                    <p>验证手机号</p>
                </div>
                <div class="statusli" :class="{active:step==2}">
                    <span>2</span>
                    <p>重置密码</p>
                </div>
            </div>
            <div class="step1" v-if="step==1">
                <div class="iptbox">
                    <span>+86</span>
                    <input type="text" v-if="resetpassword" disabled v-model="phonenum" placeholder="请输入手机号">
                    <input type="text" v-if="!resetpassword" v-model="phonenum" placeholder="请输入手机号">
                </div>
                <div class="iptbox">
                    <input type="text" v-model="phonecode" placeholder="请输入验证码">
                    <span @click="getcode" v-show="!gettingcodestatus" class="getcodebtn">获取验证码</span>
                    <span v-show="gettingcodestatus" class="getcodebtn">剩余 {{gettingcodestatustime}} S</span>
                </div>
                <div class="loginbtn" @click="loginstart">开始</div>
            </div>
            <div class="step2" v-if="step==2">
                <div class="iptbox">
                    <input type="password" v-model="setpassword" placeholder="请输入密码">
                </div>
                <div class="iptbox">
                    <input type="password" v-model="setpassword2" placeholder="请输入密码">
                </div>
                <p>密码长度8-32位，须包含数字、字母、符号至少2种或以上元素。</p>
                <div class="setpassword" @click="setpasswordfn">确认提交</div>
            </div>
            <div class="bottom">
                <p class="powerby">Power by 助力文化 co.,Ltd</p>
            </div>
        </div>
    </div>
</template>

<script>
    //import x from ''
    export default {
        components: {

        },
        data () {
            return {
                // username:'',//帐号
                password:'',//密码

                step:1,//验证码登录默认为第一步===若为第一次登录即注册用户则会变为1让用户录入密码
                // phonenum:'',//手机号
                phonenum:'',//手机号 读取登录信息保存的手机号
                phonenum2:'',//手机号、、账号密码登录的手机号
                phonecode:'',//手机验证码

                logintypechangetxt:'切换密码登录', //登录模式切换按钮的文字
                logintype:'验证码登录',// 默认为验证码登录，可切换为密码登陆

                gettingcodestatus:false,//正在获取验证码的状态
                gettingcodestatustime:120,//获取验证码倒计时时间
                timer:'',//计时器

                setpassword:'',//设置密码
                setpassword2:'',//设置密码2

                resetpassword:true,//默认页面为重置密码页
            };
        },
        computed: {

        },
        methods: {
            goback(){
                this.$router.go(-1);
            },
            //账号密码 或 手机号及验证码  俩登录方式切换
            logintypechange(){
                let that = this;
                if(that.logintype=='验证码登录'){
                    that.logintypechangetxt = '切换验证码登录';
                    that.logintype = '密码登录';
                }else{
                    that.logintypechangetxt = '切换密码登录';
                    that.logintype = '验证码登录';
                }
                this.datareset();
            },
            // 数据及样式重置事件
            datareset(){
                this.password='';
                // this.phonenum='';
                // this.phonenum2='';
                this.phonecode='';
                this.step=1;
                this.setpassword='';
                this.setpassword2='';
            },
            // 获取验证码事件
            getcode(){
                let that = this;
                this.gettingcodestatus = true;
                clearInterval(that.timer);
                // debugger;
                that.timer = setInterval(() => {
                    if(that.gettingcodestatustime>1){
                        that.gettingcodestatustime--;
                    }else{
                        clearInterval(that.timer);
                        that.gettingcodestatus=false;
                        that.gettingcodestatustime=120;
                    }
                }, 1000);
                this.api.login.captcha({
                    phone: that.phonenum,
                    sign:'',
                    timeStamp:'',
                }).then(data=>{
                    // console.log(data);
                    that.$toast(data.data.info);
                })
                // this.phonecode='模拟填充';
            },
            // 验证码方式 登录点击事件
            loginstart(){
                let that = this;
                this.api.login.login({
                    phone:that.phonenum,
                    code:that.phonecode,
                    third_type:4,
                }).then(data=>{
                    // debugger;
                    if(data.data.info=="登陆成功"){
                        that.$toast('验证成功，请输入密码');
                        // console.log(data.data.data);
                        let userdata =data.data.data;
                        // 已注册用户
                        let user={
                            isLogin: true,
                            username: userdata.nickname,
                            token: userdata.tokenSecret,
                            userid: userdata.id,
                            sig: userdata.sig,
                            phone: userdata.phone,
                        }
                        that.$store.commit('saveuserdata',user);
                        // that.$router.push({ name: "shopindex" });
                        that.step =2;
                    }
                })
            },
            //账号密码方式 登陆点击事件
            passwordlogin(){
                let that = this;
                this.api.login.login({
                    phone:that.phonenum2,
                    password:that.password,
                    third_type:5,
                }).then(data=>{
                    that.$toast(data.data.info);
                    // debugger;
                    if(data.data.info=="登陆成功"){
                        console.log(data.data.data);
                        let userdata =data.data.data;
                        if(userdata.is_register ==2){
                            // 已注册用户
                            let user={
                                isLogin: true,
                                username: userdata.nickname,
                                token: userdata.tokenSecret,
                                userid: userdata.id,
                                sig: userdata.sig,
                                phone: userdata.phone,
                            }
                            that.$store.commit('saveuserdata',user);
                            that.$router.push({ name: "shopindex" });
                        }else if(userdata.is_register ==1){
                            let user={
                                isLogin: true,
                                username: userdata.nickname,
                                token: userdata.tokenSecret,
                                userid: userdata.id,
                                sig: userdata.sig,
                                phone: userdata.phone,
                            }
                            that.$store.commit('saveuserdata',user);
                            // 未注册用户  即 新用户
                            that.step=2;
                        }
                    }
                })
            },

            //如果为新用户时的设置密码事件
            setpasswordfn(){
                let that = this;
                this.api.login.change({
                    uid:that.$store.state.user.userid,
                    phone:that.$store.state.user.phone,
                    newPwd:that.setpassword,
                    confimPwd:that.setpassword2,
                    // confimPwd:11,
                }).then(data=>{
                    that.$toast(data.data.info);
                    if(data.data.info == "修改成功"){
                        that.$router.push({ name: "shopindex" });
                    }
                })
            }
        },
        mounted() {
            // debugger;
            this.phonenum = this.$store.state.user.phone;
            if(this.$store.state.user.phone==''){
                this.resetpassword = false;
            }else{
                this.resetpassword = true;
            }
        },
        beforeCreate() {}, //生命周期 - 创建之前
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {
            clearInterval(this.timer);
        }, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() {
            // clearInterval(this.timer);
        }, //生命周期 - 销毁之前
        destroyed() {}, //生命周期 - 销毁完成
        activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>

<style lang='less' scoped>
    .registwrap{
        position: relative;
        .toprightbtn{
            position: absolute;
            height: 0.64rem;
            right: 0.63rem;
            top: 0.55rem;
            color:rgba(136,136,136,1);
            z-index: 400;
            cursor: pointer;
        }
        .content{
            padding-top: 2rem;
            .title{
                text-align: center;
                color:rgba(51,51,51,1);
                font-size:0.56rem;
                line-height:0.74rem;
                margin-bottom:0.18rem;
                height:auto;
            }
            .status{
                display:flex;
                justify-content:center;
                margin-bottom: 0.74rem;
                .statusli{
                    padding:0 0.22rem;
                    &.active span,&.active p{
                        color: rgba(225,81,73,1);
                        border-color:rgba(225,81,73,1);
                    }
                    &.active p{
                        &::after{
                            content: '';
                            position: absolute;
                            left: 0;
                            bottom:-0.1rem;
                            height:0.04rem;
                            width:100%;
                            background-color:rgba(225,81,73,1);
                        }
                    }
                    span,p{
                        float:left;
                    }
                    span{
                        box-sizing: border-box;
                        height:0.28rem;
                        width: 0.28rem;
                        border-radius: 50%;
                        border: 1px solid rgba(155,155,155,1);
                        text-align: center;
                        line-height: calc(0.28rem -2px);
                        color: rgba(155,155,155,1);
                        font-size: 0.2rem;
                    }
                    p{
                        height:0.28rem;
                        line-height:0.28rem;
                        color: rgba(155,155,155,1);
                        font-size: 0.28rem;
                        margin-left: 0.14rem;
                        position: relative;
                    }
                }
            }
            .iptbox{
                background-color: rgba(246,246,246,1);
                border-radius: 0.089rem;
                padding: 0.33rem 0.47rem 0.33rem 0.28rem; 
                width: 6.24rem;
                // height: 0.78rem;
                box-sizing: border-box;
                margin: 0 auto 0.24rem;
                // font-size:0.28rem;
                font-size:0.37rem;
                line-height:0.37rem;
                height:calc(0.37rem + 0.66rem);
                position: relative;
                span{
                    float: left;
                    width: 0.77rem;
                    text-align: left;
                    color: rgba(51,51,51,1);
                    font-size: 0.32rem;
                    line-height: 0.37rem;
                    border-right: 1px solid rgba(210,210,210,1);
                    &.getcodebtn{
                        color: rgba(83,136,172,1);
                        border-right:none;
                        padding-left:0.43rem;
                        border-left: 1px solid rgba(210,210,210,1);
                        width:1.6rem;
                        cursor: pointer;
                        position: absolute;
                        right:0.47rem;
                        top:0.33rem;
                    }
                }
                input{
                    border:none;
                    height: 0.37rem;
                    line-height: 0.37rem;
                    background-color: rgba(246,246,246,1);
                    // color:rgba(206,206,206,1);
                    color:#000;
                    font-size: 0.28rem;
                    padding-left: 0.24rem;
                    float: left;
                    // width:3.65rem;
                    width:3rem;
                }
            }
            .loginbtn{
                width: 6.24rem;
                height: 0.98rem;
                margin: 0.46rem auto 0;
                line-height: 0.98rem;
                text-align: center;
                font-size: 0.32rem;
                color: rgba(255,255,255,1);
                // background-color: rgba(249,195,193,1);
                background-image: linear-gradient(to right, #FF2013, #FF5223);
                box-shadow: 0px 0.02rem 0.16rem 0px rgba(255, 55, 27, 0.36);
                border-radius: 0.6rem;
                cursor: pointer;
            }
            .step2{
                .iptbox{
                    background-color: rgba(246,246,246,1);
                    border-radius: 0.089rem;
                    padding: 0.33rem 0.47rem 0.33rem 0.28rem; 
                    width: 6.24rem;
                    // height: 0.78rem;
                    box-sizing: border-box;
                    margin: 0 auto 0.24rem;
                    // font-size:0.28rem;
                    font-size:0.37rem;
                    line-height:0.37rem;
                    height:calc(0.37rem + 0.66rem);
                    position: relative;
                    input{
                        border:none;
                        height: 0.37rem;
                        line-height: 0.37rem;
                        background-color: rgba(246,246,246,1);
                        // color:rgba(206,206,206,1);
                        color:#000;
                        font-size: 0.28rem;
                        // padding-left: 0.24rem;
                        // float: left;
                        // // width:3.65rem;
                        width:100%;
                    }
                }
                .setpassword{
                    width: 6.24rem;
                    height: 0.98rem;
                    margin: 0.46rem auto 0;
                    line-height: 0.98rem;
                    text-align: center;
                    font-size: 0.32rem;
                    color: rgba(255,255,255,1);
                    background-image: linear-gradient(to right, #FF2013, #FF5223);
                    box-shadow: 0px 0.02rem 0.16rem 0px rgba(255, 55, 27, 0.36);
                    border-radius: 0.6rem;
                    cursor: pointer;
                }
                &>p{
                    width: 6.32rem;
                    color: rgba(155,155,155,1);
                    line-height: 0.37rem;
                    font-size: 0.28rem;
                    margin: 0.12rem auto 0.4rem;
                }
            }
            .bottom{
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
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
</style>