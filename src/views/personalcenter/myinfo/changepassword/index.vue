<template>
  <div class="password">
    <div class="header">
      <img class="back" @click="goback" src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>修改密码</span> 
    </div>
    <div class="w-password">
        <div class="top">
            <p>为了您的账号安全，本次操作需要短信确认，验证码将发送至：<span>{{phone}}</span></p>
        </div>
        <form name="ofrom" autocomplete="off">
            <ul>
                <li>
                    <input type="text" v-model="code" :disabled="isAble"  autocomplete="off" name="input_code" placeholder="获取验证码" />
                    <span class="code" @click="dingxiangsdk" href="code">{{btncodetext}}</span>
                </li>
                <li><input type="password" name="input_password" v-model="password" autocomplete="off" placeholder="密码长度8-32位，须包含数字、字母、符号于少2种" /></li>
            </ul>
            <div class="ding-xiang-code" ref="dingxiangcode"></div>
            <span :class="{'save': true,'saved': btncodestatus}" @click="savefrom">确定</span>
        </form>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            phone : '',
            code : '',
            password : '',
            btncodestatus : false,
            btncodetext : '验证码',
            return_token : '',
            isAble : true
        }
    },
    mounted(){
        var that = this;
        that.phone = that.$route.query.phone;
    },
    watch:{
        code(newval){
            let that = this;
            if(newval != '' && newval != undefined && that.password != ''){
                that.btncodestatus = true;
            }else{
                that.btncodestatus = false;
            }
        },
        password(newName){
            let that = this;
            if(newName != '' && newName != undefined && that.code != ''){
                that.btncodestatus = true;
            }else{
                that.btncodestatus = false;
            }
        }
    },
    methods:{
        goback() {
            this.$router.go(-1);
        },
        // 地址管理页
        gotoaddresspage() {
            this.$router.push({ name: "personalcenteraddress" });
        },
        //引入顶象验证sdk
        dingxiangsdk(){
            let that = this;
            let dingxiangcode = that.$refs.dingxiangcode;
            var myCaptcha = _dx.Captcha(dingxiangcode, {
                //appId，在控制台中“应用管理”或“应用配置”模块获取
                appId: '14eb88949244fad2a3da49cab8dd2b9b', 
                type: 'basic', // <-- 指定为"基础类型"，此参数可省略
                style: 'popup', // 可省略
                width: 300, // 可省略
                success: function (token) {
                    that.return_token = token;
                    setTimeout(function(){
                    myCaptcha.hide();
                    //获取验证码
                    that.codeButton();
                    },200);
                }
            })
            myCaptcha.reload();
            myCaptcha.show();
        },  
        //获取验证码
        getcode(){
            var that = this;
            this.api.login
            .captcha({
                mobile: that.phone,
                type : 5,
                token : that.return_token
            })
            .then(data => {
            // console.log(data);
                that.$toast(data.data.info);
            });
        },
        codeButton(){
            let that  = this;
            that.getcode(); 
            let time = 60;
            let settimer = setInterval(function(){
                    that.btncodetext = "重新获取("+--time+")";
                    that.isAble = false;
                }, 1000);
                setTimeout(function(){
                    that.btncodetext = "重新获取验证码"
                    that.btncodestatus = true; 
                    that.isAble = true;
                    clearInterval(settimer);
                }, 60000);
            
        },
        //验证密码
        checkpassword(){
            let that = this;
            var ab = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{8,32}$/;
            if(ab.test(that.password) == false){
                that.$toast("密码不符合设置规则!");
                return false;
            }
            that.btncodestatus = true;
            return true;
        },
        //修改密码提交
        savefrom(){
            let that = this;
            if(that.code == undefined || that.code == ''){
                that.$toast('验证码不能为空');
                return;
            }
            if(that.password == undefined || that.password == ''){
                that.$toast('密码不能为空');
                return;
            }

            if(that.checkpassword(that.password) != true){
                that.$toast('密码不符合规则');
                return;
            }
            this.api.login
            .savepassword_new({
                userId : that.$store.state.nerUser.userid,
                verificationCode: that.code,
                password : that.password,
                token : that.return_token
            }).then(res => {
                if(res.data.code === 1){
                    that.$toast('修改成功');
                    that.$router.go(-1);
                }
            })
            
        }
    },
    beforeCreate() {
        document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
    },
    beforeDestroy() {
        document.querySelector('body').setAttribute('style', '')
    },
}
</script>
<style lang="less" scope>
.password{
    .header {
        width: 7.5rem;
        background: white;
        text-align: center;
        position: fixed;
        z-index: 100;
        cursor: pointer;
        img {
            transform: rotate(180deg);
            width: 0.2rem;
            height: 0.35rem;
            display: block;
            padding: 0.4rem 0;
            margin-left: 0.46rem;
            cursor: pointer;
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
    .w-password{
        background-color: #f6f6f6;
        min-height: 100vh;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(31,31,31,1);
        overflow-y: hidden;
        .top{
            font-size: .28rem;
            padding: 1.8rem .55rem .3rem; 
            span{
                color: rgba(255, 189, 4, 1);
            }
        }
        ul{
            padding: 0 .2rem;
            li{
                position: relative;
                input{
                    display: block;
                    width: 6.7rem;
                    height: 1rem;
                    padding: 0 .2rem;
                    outline: none;
                    border : none;
                    font-size: .3rem;
                    border-bottom: 1px solid rgba(215,215,215,1);
                    background: transparent;
                }
                input::-webkit-placeholder{
                    font-size: .3rem;
                    color: rgba(31, 31, 31, 1);
                }
                p{
                    margin: .2rem 0 0 .2rem;
                }
                .code{
                    font-size: .3rem;
                    position: absolute;
                    right : .2rem;
                    top : 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
                    color: rgba(255,189,4,1);
                }
            }
        }
        .save{
            display: block;
            width:3.2rem;
            height: .7rem;
            line-height: .7rem;
            text-align: center;
            border-radius : .38rem;
            background:rgba(235,235,233,1);
            font-size: .32rem;
            font-family:PingFang SC;
            font-weight:500;
            margin : 1.46rem auto 0;
            cursor: pointer;
        }
        .saved{
            background:rgba(255,189,4,1);
            color:rgba(255,255,255,1);
        }
    }
}    
</style>


