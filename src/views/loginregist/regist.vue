<!-- 组件说明 -->
import { clearInterval } from 'timers';
<template>
    <div class="registwrap">
        
        <div @click="goback" class="topbtn"><img src="@/assets/imgs/icons/sp-pic-fanh@2x.png" alt="返回"></div>
        <div @click="logintypechange" class="toprightbtn">{{logintypechangetxt}}</div>

        <div class="content" v-if="logintype=='验证码登录'">
            <p class="title">手机号登录/注册</p>
            <div class="status">
                <div class="statusli" :class="{active:step==1}">
                    <span>1</span>
                    <p>输入手机号</p>
                </div>
                <div class="statusli" :class="{active:step==2}">
                    <span>2</span>
                    <p>设置密码</p>
                </div>
            </div>
            <div class="step1" v-if="step==1">
                <div class="iptbox">
                    <span>+86</span>
                    <input type="text" v-model="phonenum" placeholder="请输入手机号">
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
            <!-- <div class="bottom">
                <div class="threelogin">
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
                </div>
                <p class="powerby">Power by 助力文化 co.,Ltd</p>
            </div> -->
        </div>
        <div class="content content2" v-if="logintype=='密码登录'">
            <p class="title">密码登录</p>
            <div class="iptbox">
                <span>+86</span>
                <input type="text" v-model="phonenum2" placeholder="请输入手机号">
            </div>
            <div class="iptbox">
                <span>密码</span>
                <input type="password" v-model="password" placeholder="请输入登录密码">
            </div>
            <div class="loginbtn" @click="passwordlogin">登录</div>
            <!-- <div class="forgetpw" @click="logintypechange">忘记密码? 用验证码登录</div> -->
            <div class="forgetpw" @click="resetpassword">忘记密码?</div>
            <!-- <div class="bottom">
                <div class="threelogin">
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
                </div>
                <p class="powerby">Power by 助力文化 co.,Ltd</p>
            </div> -->
        </div>
        <!-- 第三方登录 -->
        <div class="bottom">
            <div class="threelogin" v-if="false">
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
            </div>
            <p class="powerby">Power by 助力文化 co.,Ltd</p>
        </div>
    </div>
</template>

<script>
import {checkdevice} from '@/utils/checkdevice'
export default {
  components: {},
  data() {
    return {
      // username:'',//帐号
      password: "", //密码

      step: 1, //验证码登录默认为第一步===若为第一次登录即注册用户则会变为1让用户录入密码
      phonenum: "", //手机号
      phonenum2: "", //手机号、、账号密码登录的手机号
      phonecode: "", //手机验证码

      logintypechangetxt: "切换密码登录", //登录模式切换按钮的文字
      logintype: "验证码登录", // 默认为验证码登录，可切换为密码登陆

      gettingcodestatus: false, //正在获取验证码的状态
      gettingcodestatustime: 120, //获取验证码倒计时时间
      timer: "", //计时器

      setpassword: "", //设置密码
      setpassword2: "", //设置密码2

      identifier:checkdevice(),//设备吗
      brand:checkdevice()=='pc'?'pc':'h5mobild',//品牌
      models:'h5',//机型
    };
  },
  computed: {},
  methods: {
    goback() {
      this.$router.go(-1);
    },
    // 之前的登录
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
    // 三方登陆
    threelogin(key) {
      let that = this;
      switch (key) {
        case "微信":
          that.$toast("微信登录");
          return;
        case "QQ":
          that.$toast("QQ登录");
          return;
        case "微博":
          that.$toast("微博登录");
          return;
      }
    },
    // 跳转到重置密码页面
    resetpassword(){
      this.$router.push({name:"resetpw"});
    },
    //账号密码 或 手机号及验证码  俩登录方式切换
    logintypechange() {
      let that = this;
      if (that.logintype == "验证码登录") {
        that.logintypechangetxt = "切换验证码登录";
        that.logintype = "密码登录";
      } else {
        that.logintypechangetxt = "切换密码登录";
        that.logintype = "验证码登录";
      }
      this.datareset();
    },
    // 数据及样式重置事件
    datareset() {
      this.password = "";
      this.phonenum = "";
      this.phonenum2 = "";
      this.phonecode = "";
      this.step = 1;
      this.setpassword = "";
      this.setpassword2 = "";
    },
    // 获取验证码事件
    getcode() {
      let that = this;
      this.gettingcodestatus = true;
      clearInterval(that.timer);
      // debugger;
      that.timer = setInterval(() => {
        if (that.gettingcodestatustime > 1) {
          that.gettingcodestatustime--;
        } else {
          clearInterval(that.timer);
          that.gettingcodestatus = false;
          that.gettingcodestatustime = 120;
        }
      }, 1000);
      this.api.login
        .captcha({
          phone: that.phonenum,
          sign: "",
          timeStamp: ""
        })
        .then(data => {
          // console.log(data);
          that.$toast(data.data.info);
        });
      // this.phonecode='模拟填充';
    },
    // 验证码方式 登录点击事件
    loginstart() {
      let that = this;
      this.api.login
        .login({
          mobile: that.phonenum,
          verificationCode: that.phonecode,
          client:'h5',
          loginType: 2,
          identifier:that.identifier,//设备吗
          brand:that.brand,//品牌
          models:that.models,//机型
        })
        .then(data => {
          that.$toast(data.data.info);
          // debugger;
          if (data.data.code == 1) {
            console.log(data.data.data);
            let userdata = data.data.data;
            if (userdata.isFirstLogin == 0) {
              // 已注册用户
              let user = {
                isLogin: true,
                username: '',
                token: userdata.tokenSecret,
                userid: userdata.id,
                sig: userdata.imSign,
                phone: that.phonenum,
                userdata: ''
              };
              that.getinfousermass(userdata.id,userdata.imSign,'shopindex');
              // that.$router.push({ name: "shopindex" });
            } else if (userdata.isFirstLogin == 1) {
              // 未注册用户  即 新用户
              let user = {
                isLogin: true,
                username: '',
                token: userdata.tokenSecret,
                userid: userdata.id,
                sig: userdata.imSign,
                phone: that.phonenum,
                userdata: ''
              };
              that.getinfousermass(userdata.id,userdata.imSign);
              that.step = 2;
            }
            that.getsetaddressitem(userdata.id);
          }
        });
    },

    //账号密码方式 登陆点击事件
    passwordlogin() {
      let that = this;
      this.api.login
        .login({
          mobile: that.phonenum2,
          password: that.password,
          client:'h5',
          loginType: 1,
          identifier:that.identifier,//设备吗
          brand:that.brand,//品牌
          models:that.models,//机型
        })
        .then(data => {
          that.$toast(data.data.info);
          // debugger;
          if (data.data.code == 1) {
            // console.log(data.data.data);
            let userdata = data.data.data;
            if (userdata.isFirstLogin == 0) {
              // 已注册用户
              let user = {
                isLogin: true,
                username: '',
                token: userdata.tokenSecret,
                userid: userdata.id,
                sig: userdata.imSign,
                phone: that.phonenum2,
                userdata: ''
              };
              that.getinfousermass(userdata.id,userdata.imSign,'shopindex');
              // that.$router.push({ name: "shopindex" });
            } else if (userdata.isFirstLogin == 1) {
              // 未注册用户  即 新用户
              let user = {
                isLogin: true,
                username: '',
                token: userdata.tokenSecret,
                userid: userdata.id,
                sig: userdata.imSign,
                phone: that.phonenum2,
                userdata: ''
              };
              that.getinfousermass(userdata.id,userdata.imSign);
              that.step = 2;
            }
            that.getsetaddressitem(userdata.id);
          }
        });
    },
    
    //根据id获取用户信息
    getinfousermass(userId,sig,routername) {
      let that = this;
      that.api.personalcenter
        .getinfouser({
          userId : userId
        })
        .then(res => {
          if(res.data.code==1){
            let resdata = res.data.data;
            let user = {
              isLogin: true,
              username: resdata.userInfo.nickname,
              token: resdata.userInfo.accessToken,
              userid: resdata.userInfo.id,
              sig: sig,
              phone: resdata.userInfo.phone,
              userdata: resdata
            };
            that.$store.commit("saveuserdata", user);
            that.$router.push({ name: routername });
          }
        });
    },
    // 获取默认地址 并存储到缓存
    getsetaddressitem(userid) {
        let list ='';
      this.api.personalcenter.postaddresslist({ uid: userid }).then(res => {
        // if (that.checked) {
        //   let list = res.data.data.list.filter(function(item, index) {
        //     return item.is_default === 1;
        //   });
        //   let add = res.data.data.list.map(function(item, index) {
        //     if (item.is_default === 1) {
        //       res.data.data.list.splice(index, 1);
        //     }
        //   });
        //   res.data.data.list.unshift(list[0]);
        // }
        // that.addresslist = res.data.data.list;
        let listarr = res.data.data.list.filter(function(item, index) {
            return item.is_default === 1;
        });
        if(listarr.length>0){
            list = listarr[0];
            window.sessionStorage.setItem("checkaddressitem", JSON.stringify(list));
        }else{
             window.sessionStorage.removeItem("checkaddressitem");
        }
      });
    },

    //如果为新用户时的设置密码事件
    setpasswordfn() {
      let that = this;
      // debugger;
      this.api.login
        .login({
          uid: that.$store.state.user.userid,
          phone: that.$store.state.user.phone,
          newPwd: that.setpassword,
          confimPwd: that.setpassword2
        })
        .then(data => {
          // debugger;
          that.$toast("提交密码成功");
          that.$router.push({ name: "shopindex" });
        });
    }
    // // 页面跳转
    // pageto(routername){
    //     this.$router.push({name:routername});
    // },
  },
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang='less' scoped>
.registwrap {
  position: relative;
  width: 7.5rem;
  margin: 0 auto;
  height: 100vh;
  overflow-y: scroll;
  .toprightbtn {
    position: absolute;
    height: 0.64rem;
    right: 0.63rem;
    top: 0.55rem;
    color: rgba(136, 136, 136, 1);
    z-index: 400;
    cursor: pointer;
  }
  .content {
    padding-top: 2rem;
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
      background-color: rgba(246, 246, 246, 1);
      border-radius: 0.089rem;
      padding: 0.33rem 0.47rem 0.33rem 0.28rem;
      width: 6.24rem;
      // height: 0.78rem;
      box-sizing: border-box;
      margin: 0 auto 0.24rem;
      // font-size:0.28rem;
      font-size: 0.37rem;
      line-height: 1em;
      height: calc(1em + 0.66rem);
      position: relative;
      span {
        float: left;
        width: 0.77rem;
        height:0.37rem;
        text-align: left;
        color: rgba(51, 51, 51, 1);
        font-size: 0.32rem;
        border-right: 1px solid rgba(210, 210, 210, 1);
        &.getcodebtn {
          color: rgba(83, 136, 172, 1);
          border-right: none;
          padding-left: 0.43rem;
          border-left: 1px solid rgba(210, 210, 210, 1);
          width: 1.6rem;
          cursor: pointer;
          position: absolute;
          right: 0.47rem;
          top: 0.33rem;
        }
      }
      input {
        border: none;
        // height: 1em;
        height: 0.37rem;
        line-height: 1em;
        background-color: rgba(246, 246, 246, 1);
        color: rgba(206, 206, 206, 1);
        font-size: 0.28rem;
        padding-left: 0.24rem;
        float: left;
        // width:3.65rem;
        width: 3rem;
      }
    }
    .loginbtn {
      width: 6.24rem;
      height: 0.94rem;
      margin: 0.46rem auto 0;
      line-height: 0.98rem;
      text-align: center;
      font-size: 0.32rem;
      color: rgba(255, 255, 255, 1);
      // background-color: rgba(249,195,193,1);
      background-image: linear-gradient(to right, #ff2013, #ff5223);
      box-shadow: 0px 0.02rem 0.16rem 0px rgba(255, 55, 27, 0.36);
      border-radius: 0.6rem;
      cursor: pointer;
    }
    .step2 {
      .iptbox {
        background-color: rgba(246, 246, 246, 1);
        border-radius: 0.089rem;
        padding: 0.33rem 0.47rem 0.33rem 0.28rem;
        width: 6.24rem;
        // height: 0.78rem;
        box-sizing: border-box;
        margin: 0 auto 0.24rem;
        // font-size:0.28rem;
        font-size: 0.37rem;
        line-height: 1em;
        height: calc(1em + 0.66rem);
        position: relative;
        input {
          border: none;
          height: 0.37rem;
          line-height: 0.37rem;;
          background-color: rgba(246, 246, 246, 1);
          color: rgba(206, 206, 206, 1);
          font-size: 0.28rem;
          // padding-left: 0.24rem;
          // float: left;
          // // width:3.65rem;
          width: 100%;
        }
      }
      .setpassword {
        width: 6.24rem;
        height: 0.98rem;
        margin: 0.46rem auto 0;
        line-height: 0.98rem;
        text-align: center;
        font-size: 0.32rem;
        color: rgba(255, 255, 255, 1);
        background-color: rgba(219, 49, 42, 1);
        border-radius: 0.08rem;
        cursor: pointer;
      }
      & > p {
        width: 6.32rem;
        color: rgba(155, 155, 155, 1);
        line-height: 0.37rem;
        font-size: 0.28rem;
        margin: 0.12rem auto 0.4rem;
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
  width: 0.64rem;
  height: 0.64rem;
  left: 0.23rem;
  top: 0.55rem;
  border-radius: 50%;
  overflow: hidden;
  z-index: 400;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
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