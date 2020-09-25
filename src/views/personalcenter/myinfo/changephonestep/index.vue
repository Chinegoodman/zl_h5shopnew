<template>
  <div class="password">
    <div class="header">
      <img class="back" @click="goback" src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>更换手机号码</span> 
    </div>
    <div class="w-password">
        <form name="ofrom">
            <ul>
                <li><input type="text" name="input_password" :disabled="isAble" v-model="newphone" placeholder="请输入新的手机号" /></li>
                <li>
                    <input type="text"  v-model="code" name="input_code" value="" placeholder="请输入验证码" />
                    <span class="code"  @click="dingxiangsdk">{{btncodetext}}</span>
                </li>
            </ul>
            <div class="ding-xiang-code" ref="dingxiangcode"></div>
            <span :class="{'save' : true,'saved' : btnstatusnew==true}" @click="savefrom" >确定</span>
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
            btnstatusnew : false,
            return_token : '',
            isAble : true
        }
    },
    mounted(){
        let that = this;
    },
    watch:{
        newphone(newName){
            let that = this;
            if(newName != '' && newName != undefined && that.code != '' && that.checkPhone() == true){
                console.log('监听1');
                that.btnstatusnew = true;
            }else{
                that.btnstatusnew = false;
            }   
        },
        code(newName){
            let that = this;
            if(newName != '' && newName != undefined && that.newphone != ''){
                console.log('监听2');
                that.btnstatusnew = true;
            }else{
                that.btnstatusnew = false;
            }
        }
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
        //手机号验证
        checkPhone(){ 
            let that = this;
            if(!that.newphone)return;
            if(!(/^1[3456789]\d{9}$/.test(that.newphone))){ 
                that.$toast("手机号码有误，请重填");
                this.btnstatusaboutnewphone = false;
                return false; 
            }else{
                // this.loginbtned_state = true;
                return true;
            } 
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
                mobile: that.newphone,
                type : 3,
                token : that.return_token
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
                        that.btncodetext = "重新获取("+--time+")";
                        that.isAble = false;

                    }, 1000);
                    setTimeout(function(){
                        that.btncodetext = "重新获取验证码"
                        that.btncodestatus = true;
                        that.isAble = true; 
                        clearInterval(settimer);
                    }, 60000);
            }
        },
        // //验证-验证码正确与否
        // savepasswordmsg(){
        //     let that  = this;
        //     if(that.newphone == undefined || that.newphone == ''){
        //         that.$toast('手机号不能为空');
        //         return;
        //     }
        //     if(that.code == undefined || that.code == ''){
        //         that.$toast('验证码不能为空');
        //         return;
        //     }
        //     this.api.login
        //     .verifycaptcha_new({
        //         mobile: that.newphone,
        //         verificationCode: that.code
        //     })
        //     .then(res => {
        //         console.log(res);
        //         if(res.data.code==1){
        //            //提交 
        //            that.savefrom();
        //         }else{
        //             that.$toast(res.data.info);
        //         }
        //     });
        // },
        //修改密码提交
        savefrom(){
            let that = this;
            if(that.newphone == undefined || that.newphone == ''){
                that.$toast('手机号不能为空');
                return;
            }
            if(that.code == undefined || that.code == ''){
                that.$toast('验证码不能为空');
                return;
            }
            this.api.login
            .savephone_new({
                userId : that.$store.state.nerUser.userid,
                mobile: that.newphone,
                verificationCode : that.code
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
                    cursor: pointer;
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
            cursor: pointer;
        }

        .saved{
            background:rgba(255,189,4,1);
        }
    }
}    
</style>


