<!-- 组件说明 -->
import { clearInterval } from 'timers';
<template>
    <div class="registwrap">
        <div class="header">
        <img class="back" @click="goback" src="@/assets/imgs/follow/xiangqing@2x.png" alt />
        <span>{{pagetitle}}</span>
    </div>
        <div class="content">
            <div class="step1" v-if="step==1">
                <div class="iptbox">
                    <span class="t">手机号</span>
                    <input type="text" v-model="phonenum" @blur="checkPhone" placeholder="请输入手机号">
                </div>
                <div class="iptbox">
                    <span class="t">验证码</span>
                    <input type="text" v-model="phonecode" :disabled="isAble" placeholder="请输入验证码9">
                    <span @click="dingxiangsdk" v-show="!gettingcodestatus" class="getcodebtn">获取验证码</span>
                    <span v-show="gettingcodestatus" class="getcodebtn">剩余 {{gettingcodestatustime}} S</span>
                </div>
                <div class="ding-xiang-code" ref="dingxiangcode"></div>
                <div :class="{'loginbtn' : true, 'loginbtned' : loginbtned_state}" @click="checkPhoneClick">开始</div>
            </div>
            <div class="step2" v-if="step==2">
                <div class="iptbox">
                    <span class="t">输入密码</span>
                    <input type="password" v-model="setpassword" placeholder="请输入密码">
                </div>
                <div class="iptbox">
                    <span class="t">确认密码</span>
                    <input type="password" v-model="setpassword2" placeholder="确认登录密码">
                </div>
                <p>密码长度8-32位，须包含数字、字母、符号至少2种</p>
                <div :class="{'setpassword':true,'setpassworded' : setpasswordBtnState }" @click="setpasswordfn">确认提交</div>
            </div>
            <div class="bottom" v-if="false">
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
                pagetitle : '忘记密码',
                password:'',//密码
                step:1,//验证码登录默认为第一步===若为第一次登录即注册用户则会变为1让用户录入密码
                // phonenum:'',//手机号
                phonenum:'',//手机号 读取登录信息保存的手机号
                phonenum2:'',//手机号、、账号密码登录的手机号
                phonecode:'',//手机验证码

                gettingcodestatus:false,//正在获取验证码的状态
                gettingcodestatustime:120,//获取验证码倒计时时间
                timer:'',//计时器
                setpassword:'',//设置密码
                setpassword2:'',//设置密码2
                resetpassword:true,//默认页面为重置密码页

                loginbtned_state : false, //登录按钮样式状态
                setpasswordBtnState : false, //设置密码按钮样式状态,
                isAble : true
            };
        },
        computed: {

        },
        watch : {
            phonenum(newName){
                let that = this;
                if(newName != '' && newName != undefined && that.phonecode != '' && that.checkPhone() == true){
                    console.log('that.phonecode');
                    console.log(that.phonecode);
                    this.loginbtned_state = true;
                }else{
                    this.loginbtned_state = false;
                }
            },
            phonecode(newName){
                let that = this;
                if(newName != '' && newName != undefined && that.phonenum != ''){
                    this.loginbtned_state = true;
                }else{
                    this.loginbtned_state = false;
                }
            },
            //设置密码密码监听
            setpassword(newName){
                let that = this;
                if(newName != '' && newName != undefined && that.setpassword2 != ''){
                    that.setpasswordBtnState = true;
                }else{
                    that.setpasswordBtnState = false;
                }
            },
            setpassword2(newName){
                let that = this;
                if(newName != '' && newName != undefined && that.setpassword != ''){
                    that.setpasswordBtnState = true;
                }else{
                    that.setpasswordBtnState = false;
                }
            }
        },
        methods: {
            goback(){
                this.$router.go(-1);
            },
            //手机号验证
            checkPhone(){ 
                let that = this;
                if(!that.phonenum)return;
                if(!(/^1[3456789]\d{9}$/.test(that.phonenum))){
                    that.$toast("手机号码有误，请重填");
                    this.loginbtned_state = false;
                    return false; 
                }else{
                    // this.loginbtned_state = true;
                    return true;
                } 
            },
            //密码组合验证
            checkPassword(value){
                let that = this;
                if(!(/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,32}$/.test(value))){
                    that.$toast("密码组合不正确");
                    return false; 
                }else{
                    return true; 
                }
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
            //引入顶象验证sdk
            dingxiangsdk(){
                let that = this;
                if(!that.phonenum || that.checkPhone() != true){
                    that.$toast("手机未填写或手机填写不正确，请重填");
                    return;
                }
                let dingxiangcode = that.$refs.dingxiangcode;
                var myCaptcha = _dx.Captcha(dingxiangcode, {
                    //appId，在控制台中“应用管理”或“应用配置”模块获取
                    appId: '14eb88949244fad2a3da49cab8dd2b9b', 
                    type: 'basic', // <-- 指定为"基础类型"，此参数可省略
                    style: 'popup', // 可省略
                    width: 300, // 可省略
                    success: function (token) {
                        console.log('token:', token)
                        that.return_token = token;
                        setTimeout(function(){
                        myCaptcha.hide();
                        //获取验证码
                        that.getcode();
                        },0);
                    }
                })
                myCaptcha.reload();
                myCaptcha.show();
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
                        that.isAble = false;
                    }else{
                        clearInterval(that.timer);
                        that.gettingcodestatus=false;
                        that.gettingcodestatustime=60;
                        that.isAble = true;
                    }
                }, 1000);
                this.api.login.captcha({
                    mobile: that.phonenum,
                    type : 7,
                    token : that.return_token
                }).then(data=>{
                    // console.log(data);
                    that.$toast(data.data.info);
                })
                // this.phonecode='模拟填充';
            },
            // 重校验手机号提交
            checkPhoneClick(){
                this.step = 2;
                this.pagetitle = '重置密码';
            },

            //设置密码事件
            setpasswordfn(){
              let that = this;

              if(that.setpassword2 != that.setpassword){
                that.$toast('两次密码不一致,请重新输入');
                return;
              }
              if(!this.checkPassword(that.setpassword)){
                return;
              }
              if(!this.checkPassword(that.setpassword2)){
                return;
              }
              this.api.login.userResetAccount({
                  mobile : that.phonenum,
                  password: that.setpassword,
                  verificationCode: that.phonecode
              }).then(data=>{
                  console.log('data.data.info重置密码');
                  console.log(data.data.info);
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
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() {
            clearInterval(this.timer);
        }, //生命周期 - 销毁之前
        destroyed() {}, //生命周期 - 销毁完成
        activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style lang='less' scoped>
.registwrap {
  position: relative;
  width: 7.5rem;
  margin: 0 auto;
  height: 100vh;
  overflow-y: scroll;
  .toprightbtn {
    height: 0.64rem;
    margin-top : .2rem;
    color: rgba(136, 136, 136, 1);
    text-align : center;
    cursor: pointer;
  }
  .content {
    padding-top: 2.05rem;
    .title {
      text-align: center;
      color: rgba(51, 51, 51, 1);
      font-size: 0.56rem;
      line-height: 0.74rem;
      height: auto;
      margin-bottom: 0.18rem;
    }
    .status {
      display: flex;
      justify-content: center;
      margin-bottom: 0.74rem;
      .statusli {
        padding: 0 0.22rem;
        &.active span,
        &.active p {
          color: rgba(225, 81, 73, 1);
          border-color: rgba(225, 81, 73, 1);
        }
        &.active p {
          &::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -0.1rem;
            height: 0.04rem;
            width: 100%;
            background-color: rgba(225, 81, 73, 1);
          }
        }
        span,
        p {
          float: left;
        }
        span {
          box-sizing: border-box;
          height: 0.28rem;
          width: 0.28rem;
          border-radius: 50%;
          border: 1px solid rgba(155, 155, 155, 1);
          text-align: center;
          line-height: calc(0.28rem -2px);
          color: rgba(155, 155, 155, 1);
          font-size: 0.2rem;
        }
        p {
          height: 0.28rem;
          line-height: 0.28rem;
          color: rgba(155, 155, 155, 1);
          font-size: 0.28rem;
          margin-left: 0.14rem;
          position: relative;
        }
      }
    }
    .iptbox {
      border-radius: 0.089rem;
      padding: 0.2rem 0;
      width: 5.68rem;
      // height: 0.78rem;
      box-sizing: border-box;
      margin: 0 0.91rem .52rem 0.91rem;
      // font-size:0.28rem;
      font-size: 0.37rem;
      line-height: 1em;
      height: calc(1em + 0.4rem);
      position: relative;
      border-bottom :.01rem solid rgba(215,215,215,1);
      .t{
        font-size: .3rem;
        font-weight:500;
        color:rgba(31,31,31,1);
        text-align: left;
      }
      span {
        float: left;
        width: 1.2rem;
        height:0.37rem;
        text-align: right;
        color: rgba(51, 51, 51, 1);
        font-size: 0.32rem;
        &.getcodebtn {
          width: 1.6rem;
          padding-left: 0.43rem;
          color:rgba(255,189,4,1);
          border-right: none;
          font-size: 0.24rem;
          cursor: pointer;
          position: absolute;
          right: 0.05rem;
          top: 0.2rem;
        }
      }
      input {
        width:3.85rem;
        border: none;
        height: 0.37rem;
        line-height: 1em;
        color: #333;
        font-size: 0.28rem;
        padding-left: 0.24rem;
        float: left;
        background: transparent;
        
      }

      input::placeholder {
        font-size: .24rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(191,191,191,1);
      }
    }
    .loginbtn {
      width: 5.68rem;
      height: 0.8rem;
      margin: 1.54rem auto 0;
      line-height: 0.8rem;
      text-align: center;
      font-size: 0.32rem;
      color:rgba(117,117,117,1);
      background:rgba(235,235,233,1);
      border-radius: 0.6rem;
      font-weight:bold;
      cursor: pointer;
    }
    .loginbtned{
      background:rgba(255,189,4,1);
      color : #fff;
    }
    .step2 {
      .iptbox {
        padding: 0.2rem 0 0.2rem;
        width: 5.68rem;
      // height: 0.78rem;
        box-sizing: border-box;
        margin: 0 0.91rem .52rem 0.91rem;
        border-bottom :.01rem solid rgba(215,215,215,1);
        font-size: 0.37rem;
        line-height: 1em;
        height: calc(1em + 0.4rem);
        position: relative;
        input {
          border: none;
          height: 0.37rem;
          line-height: 0.37rem;;
          color: rgba(206, 206, 206, 1);
          font-size: 0.28rem;
          // padding-left: 0.24rem;
          // float: left;
          // // width:3.65rem;
          width: 70%;
        }
      }

      .setpassword,
      .setpassworded{
        width: 5.68rem;
        height: 0.8rem;
        margin: 1.1rem auto 0;
        line-height: 0.8rem;
        text-align: center;
        font-size: 0.32rem;
        color:rgba(117,117,117,1);
        background:rgba(235,235,233,1);
        border-radius: 0.38rem;
        cursor: pointer;
      }
      & > p {
        width: 6.32rem;
        color: rgba(155, 155, 155, 1);
        line-height: 0.37rem;
        font-size: 0.24rem;
        margin: 0.12rem auto 0.4rem .91rem;
      }
      .setpassworded{
        background:rgba(255,189,4,1);
        color:rgba(255,255,255,1);
      }
    }
  }
  .bottom {
    position: absolute;
    bottom: 1rem;
    left: 0;
    width: 100%;
    .threelogin {
      ul {
        display: flex;
        justify-content: space-around;
        width: 4.5rem;
        margin: 0 auto;
        li {
          width: 0.98rem;
          height: 0.98rem;
          border-radius: 50%;
          border: 1px solid rgba(151, 151, 151, 1);
          position: relative;
          img {
            width: 0.5rem;
            height: 0.5rem;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
    .powerby {
      color: rgba(155, 155, 155, 1);
      font-size: 0.2rem;
      text-align: center;
      line-height: 0.65rem;
    }
  }
}

// 顶部返回按钮
.topbtn {
  position: absolute;
  width: 0.42rem;
  height: 0.42rem;
  left: 0.17rem;
  top: 0.55rem;
  border-radius: 50%;
  overflow: hidden;
  z-index: 400;
  cursor: pointer;
  img {
    width: auto;
    height: 100%;
  }
}

.loggo_wrap{
  padding-top : 1.89rem;
  font-family:PingFang SC;
  text-align : center;
  .logo_img{
    width : 1.24rem;
    height : 1.24rem;
    margin : 0 auto;
    img{
      width : auto;
      height : 100%;
    }
  }
  .tit{
    font-size: .34rem;
    font-weight:bold;
    color:rgba(31,31,31,1);
    margin-top : .55rem;
  }
  .t{
    font-size: .24rem;
    font-weight:500;
    color:rgba(191,191,191,1);
    margin-top : .2rem;
  }


}

.registwrap{
  .header {
      width: 7.5rem;
      border-bottom: 1px solid #DEDEDE;
      background: white;
      text-align: center;
      position: fixed;
      z-index: 100;

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
          margin-left: -0.55rem;
          font-size: 0.34rem;
          color: #333333;
      }
  }
}
.forgetpw {
  float: right;
  margin-right: 0.5rem;
  color: rgba(136, 136, 136, 1);
  font-size: 0.26rem;
  line-height: 0.37rem;
  margin-top: 0.25rem;
  cursor: pointer;
}
</style>

<style lang='less'>
</style>