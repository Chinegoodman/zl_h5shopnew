<template>
  <div class="password">
    <div class="header">
      <img class="back" @click="goback" src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>更换手机号码</span> 
    </div>
    <div class="w-password">
        <form name="ofrom">
            <ul>
                <li><input type="text" name="input_password" v-model="newphone" v-on:input="input_password($event)" placeholder="请输入新的手机号" /></li>
                <li>
                    <input type="text"  v-model="code"  v-on:input="input_code($event)" name="input_code" value="" placeholder="请输入验证码" />
                    <span class="code"  @click="codeButton">{{btncodetext}}</span>
                </li>
            </ul>
            <span :class="{'save' : true,'saved' : btnstatusaboutnewphone===true && btnstatusaboutcode === true}" @click="savepasswordmsg" >确定</span>
        </form>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            newphone : '',
            code : '',
            password : '',
            btncodestatus : true,
            btncodetext : '验证码',
            btnstatusaboutnewphone : false,
            btnstatusaboutcode : false
        }
    },
    mounted(){
        let that = this;
    },
    methods:{
        goback() {
            this.$router.go(-1);
        },
        //跳转账号安全首页
        gochangeacountsafe(){
            var that = this;
            that.$router.push({
                path : '/personalcenter/myinfo/acountsafe'
            });
        },
        input_password(){
            let that = this;
            if(that.newphone != ''){
                if(that.checkPhone(that.newphone)){
                    that.btnstatusaboutnewphone = true;
                }
            }
        },
        input_code(){
            let that = this;
            if(that.code != ''){
                that.btnstatusaboutcode = true;
            }
        },
        //手机号验证
        checkPhone(phone) {
            let that = this;
            //验证电话号码手机号码，包含至今所有号段? ?
            var ab = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (ab.test(phone) == false) {
                that.$toast("请正确填写手机号码!");
                return false;
            }
            return true;
        },
        //获取验证码
        getcode(){
            var that = this;
            this.api.login
            .captcha({
                phone: that.newphone,
                sign: "",
                timeStamp: ""
            })
            .then(data => {
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
        //验证-验证码正确与否
        savepasswordmsg(){
            let that  = this;
            if(that.newphone == undefined || that.newphone == ''){
                that.$toast('手机号不能为空');
                return;
            }
            if(that.code == undefined || that.code == ''){
                that.$toast('验证码不能为空');
                return;
            }
            this.api.login
            .verifycaptcha({
                phone: that.newphone,
                code: that.code
            })
            .then(res => {
                console.log(res);
                if(res.data.code==1){
                   //提交 
                   that.savefrom();
                }else{
                    that.$toast(res.data.info);
                }
            });
        },
        //修改密码提交
        savefrom(){
            let that = this;
            this.api.login
            .savephone({
                uid : that.$store.state.user.userid,
                phone: that.newphone,
                code : that.code
            }).then(res => {
                if(res.data.code === 1){
                    that.$toast('修改成功');
                    that.gochangeacountsafe();
                }else{
                    that.$toast(res.data.info);
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
            transform : translateX(-50%);
            font-size: 0.34rem;
            color: #333333;
        }
    }
    .w-password{
        height: 100vh;
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
        .save,
        .saved{
            display: block;
            width:3.2rem;
            height: .7rem;
            line-height: .7rem;
            text-align: center;
            border-radius : .38rem;
            background:rgba(235,235,233,1);
            font-size: .32rem;
            color:rgba(255,255,255,1);
            font-family:PingFang SC;
            font-weight:500;
            margin : 1.46rem auto 0;
        }

        .saved{
            background:rgba(255,189,4,1);
        }
    }
}    
</style>


