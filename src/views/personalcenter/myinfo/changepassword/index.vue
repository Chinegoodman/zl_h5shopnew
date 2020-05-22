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
                    <input type="text" v-model="code" autocomplete="off" name="input_code" placeholder="获取验证码" />
                    <span class="code" @click="codeButton" href="code">{{btncodetext}}</span>
                </li>
                <li><input type="password" name="input_password" v-model="password" autocomplete="off" placeholder="密码长度8-32位，须包含数字、字母、符号于少2种" /></li>
            </ul>
            <span class="save" @click="savepasswordmsg">确定</span>
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
            btncodestatus : true,
            btncodetext : '验证码'
        }
    },
    mounted(){
        var that = this;
        that.phone = that.$route.query.phone;
    },
    methods:{
        goback() {
            this.$router.go(-1);
        },
        // 地址管理页
        gotoaddresspage() {
            this.$router.push({ name: "personalcenteraddress" });
        },
        //获取验证码
        getcode(){
            var that = this;
            this.api.login
            .captcha({
                phone: that.phone,
                sign: "",
                timeStamp: ""
            })
            .then(data => {
            // console.log(data);
                that.$toast(data.data.info);
            });
        },
        codeButton(){
            let that  = this;
             if(that.btncodestatus){
                that.getcode(); 
                that.btncodestatus = false; 
                let time = 60;
                let settimer = setInterval(function(){
                        that.btncodetext = "重新获取("+--time+")"
                    }, 1000);
                    setTimeout(function(){
                        that.btncodetext = "重新获取验证码"
                        that.btncodestatus = true; 
                        clearInterval(settimer);
                    }, 60000);
            }
        },
        //验证密码
        checkpassword(password){
            let that = this;
            var ab = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{8,32}$/;
            if(ab.test(password) == false){
                that.$toast("请正确填写手机号码!");
                return false;
            }
            return true;
        },
        //验证-验证码正确与否
        savepasswordmsg(){
            let that  = this;
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
            .verifycaptcha({
                phone: that.phone,
                code: that.code
            })
            .then(res => {
                console.log(res);
                if(res.data.code==1){
                   //提交 
                   that.savefrom();
                }else{
                    that.$toast('验证码不正确');
                }
            });
        },
        //修改密码提交
        savefrom(){
            console.log(7777);
            let that = this;
            this.api.login
            .savepassword({
                uid : that.$store.state.user.userid,
                phone: that.phone,
                newPwd : that.password,
                confimPwd : that.password
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
    .w-password{
        background-color: #f6f6f6;
        padding: 1.2rem 0 0;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(31,31,31,1);
        .top{
            font-size: .28rem;
            padding: .3rem .55rem; 
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
            background:rgba(255,189,4,1);
            font-size: .32rem;
            color:rgba(255,255,255,1);
            font-family:PingFang SC;
            font-weight:500;
            margin : 1.46rem auto 0;
        }
    }
}    
</style>


