<!-- 组件说明 -->
<template>
    <div class="registwrap">
        
        <div @click="goback" v-if="step ==1" class="topbtn"><img src="@/assets/imgs/icons/back.png" alt="返回"></div>
        <div class="header" v-if="step ==2">
          <img class="back" @click="goback" src="../../assets/imgs/follow/xiangqing@2x.png" alt />
          <span>设置密码</span>
        </div>
        <div class="loggo_wrap" v-if="step==1">
          <div class="logo_img">
            <img src="@/assets/imgs/icons/logo.png" alt="返回">
          </div>
          <div class="tit">欢迎进入抓周</div>
          <div class="t">黄金源头市场</div>
        </div>
        <div class="content" v-if="logintype=='验证码登录'">
            <div class="step1" v-if="step==1">
                <div class="iptbox">
                    <span class="t">手机号</span>
                    <input type="text" v-model="phonenum" @blur="checkPhone" placeholder="请输入手机号">
                </div>
                <div class="iptbox">
                    <span class="t">验证码</span>
                    <input type="text" v-model="phonecode" placeholder="请输入验证码">
                    <span @click="dingxiangsdk" v-show="!gettingcodestatus" class="getcodebtn">获取验证码</span>
                    <span v-show="gettingcodestatus" class="getcodebtn">剩余 {{gettingcodestatustime}} S</span>
                </div>
                <div class="ding-xiang-code" ref="dingxiangcode"></div>
                <div :class="{'loginbtn' : true, 'loginbtned' : loginbtned_state}" @click="loginstart">开始</div>
                <div @click="logintypechange" class="toprightbtn">{{logintypechangetxt}}</div>
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
            <div class="iptbox">
                <span class="t">手机号</span>
                <input type="text" v-model="phonenum2" @blur="checkPhone_ii" placeholder="请输入手机号">
            </div>
            <div class="iptbox">
                <span class="t">密码</span>
                <input type="password" v-model="password" placeholder="请输入登录密码">
            </div>
            <div :class="{'loginbtn' : true, 'loginbtned' : loginbtned_state_ii}" @click="passwordlogin">登录</div>
            <div @click="logintypechange" class="toprightbtn">{{logintypechangetxt}}</div>
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
        <div class="bottom" v-if="false">
            <div class="threelogin" >
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
//import x from ''
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

      logintypechangetxt: "密码登录", //登录模式切换按钮的文字
      logintype: "验证码登录", // 默认为验证码登录，可切换为密码登陆

      gettingcodestatus: false, //正在获取验证码的状态
      gettingcodestatustime: 120, //获取验证码倒计时时间
      timer: "", //计时器

      setpassword: "", //设置密码
      setpassword2: "", //设置密码2
      loginbtned_state : false,
      loginbtned_state_ii : false,
      return_token : '', //顶象token存
      setpasswordBtnState : false //设置密码按钮状态
    };
  },
  computed: {},
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
    //mobile: that.phonenum2,
    // password: that.password,
    //密码登录手机号jianting
    phonenum2(newName){
      let that = this;
      if(newName != '' && newName != undefined && that.password != '' && that.checkPhone_ii() == true){
        that.loginbtned_state_ii = true;
      }else{
        that.loginbtned_state_ii = false;
      }
    },
    //密码登录密码监听
    password(newName){
      let that = this;
      if(newName != '' && newName != undefined && that.phonenum2 != ''){
        that.loginbtned_state_ii = true;
      }else{
        that.loginbtned_state_ii = false;
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
    //手机号验证-密码登录
    checkPhone_ii(){ 
      let that = this;
      // console.log('2999');
      if(!that.phonenum2)return;
      if(!(/^1[3456789]\d{9}$/.test(that.phonenum2))){ 
        that.$toast("手机号码有误，请重填");
        that.loginbtned_state_ii = false;
        return false; 
      }else{
        // that.loginbtned_state_ii = true;
        return true;
      } 
    },
    //密码组合验证
    checkPassword(value){
      let that = this;
      if(!(/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/.test(value))){
        that.$toast("密码组合不正确");
        return false; 
      }else{
         return true; 
      }
    },
    // 获取验证码事件
    getcode() {
      let that = this;
      this.gettingcodestatus = true;
      clearInterval(that.timer);
      that.timer = setInterval(() => {
        if (that.gettingcodestatustime > 1) {
          that.gettingcodestatustime--;
        } else {
          clearInterval(that.timer);
          that.gettingcodestatus = false;
          that.gettingcodestatustime = 120;
        }
      }, 1000);
      // console.log('that.return_token1986');
      // console.log(that.return_token);
      //获取验证码
      this.api.login
      .captcha({
        mobile: that.phonenum,
        type : 1,
        token : that.return_token
      })
      .then(data => {
        that.$toast(data.data.info);
      });
    },
    // 验证码方式 登录点击事件
    loginstart() {
      let that = this;
      if(!this.loginbtned_state)return;
      this.api.login
        .login({
          mobile: that.phonenum,
          loginType: 2,
          verificationCode: that.phonecode,
          client:'h5'
        })
        .then(data => {
          that.$toast(data.data.info);
          // debugger;
          if (data.data.code == 1) {
            console.log('data.data.data登录开始');
            console.log(data.data.data);
            let userdata = data.data.data;
            if (userdata.isSetPassword == 1) {
              // 已注册用户
              let user = {
                isLogin: true,
                token: userdata.zhouResultPojo.tokenSecret,
                userid: userdata.zhouResultPojo.id,
                timuserid: userdata.timPojo.userId,
                sig: userdata.timPojo.timSign
              };
              that.$store.commit("saveuserdata", user);
              that.getinfousermass(userdata.id,'shopindex');
              // that.$router.push({ name: "shopindex" });
            } else if (userdata.isSetPassword == 0) {
              // 未注册用户  即 新用户
              let user = {
                isLogin: true,
                token: userdata.zhouResultPojo?userdata.zhouResultPojo.tokenSecret:'',
                userid: userdata.zhouResultPojo?userdata.zhouResultPojo.id:'',
                timuserid: userdata.timPojo.userId,
                sig: userdata.timPojo.timSign
              };
              that.$store.commit("saveuserdata", user);
              that.getinfousermass(userdata.id,null);
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
          // client:'h5',
          loginType: 1
        })
        .then(data => {
          console.log(1986);
          that.$toast(data.data.info);
          // debugger;
          if (data.data.code == 1) {
            console.log(data.data.data);
            let userdata = data.data.data;
              let user = {
                token: userdata.zhouResultPojo?userdata.zhouResultPojo.tokenSecret:'',
                userid: userdata.zhouResultPojo?userdata.zhouResultPojo.id:'1',
                timuserid: userdata.timPojo.userId,
                sig: userdata.timPojo.timSign
              };
              that.$store.commit("saveuserdata", user);
              that.getinfousermass(userdata.id,'shopindex');
              that.getsetaddressitem(userdata.id);
          }
        });
    },
    
    //根据id获取用户信息
    getinfousermass(userId,routername) {
      let that = this;
      that.api.personalcenter
        .getinfouser_new({
          userId : userId
        })
        .then(res => {
          if(res.data.code==1){
            debugger;
            let resdata = res.data.data;
            let nerUser = {
                isLogin: true,
                username: resdata.nickName,
                userid: resdata.userId,
                phone: resdata.mobile,
                userdata : resdata,
                // token:resdata.token?resdata.token:'',
                token:that.$store.state.user.token?that.$store.state.user.token:'',
            }
            that.$store.commit("setNewUserDate", nerUser);
            //跳转到商城首页或不传routername让step等于2跳转密码设置页
            if(routername){
              that.$router.push({ name: routername });
            }
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
      if(that.setpassword2 != that.setpassword){
         that.$toast("两次输入密码不一致，请重新输入!");
         return;
      }
      if(!that.checkPassword(that.setpassword) || !that.checkPassword(that.setpassword2)){
        that.$toast("密码组合不正确");
        return;
      }
      this.api.login
        .userSetPassword({
          userId: that.$store.state.nerUser.userid,
          password: that.setpassword,
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
    height: 0.64rem;
    margin-top : .2rem;
    color: rgba(136, 136, 136, 1);
    text-align : center;
    cursor: pointer;
  }
  .content {
    margin-top: .58rem;
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
        border: none;
        // height: 1em;
        height: 0.37rem;
        line-height: 1em;
        color: 333;
        font-size: 0.28rem;
        padding-left: 0.24rem;
        float: left;
        width:3.85rem;
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
      margin-top: 1.3rem;
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

<style>  
  .ding-xiang-code .dx_captcha_basic_link{
    display: none;
  }
</style>
