<template>
  <div class="acountsafe">
    <div class="header">
      <img class="back" @click="goback" src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>账号安全</span>
    </div>
    <div class="w-acountsafe">
        <ul>
            <li @click="gochangepassword">
                <div class="lt">修改登录密码</div>
                <img class="gd"  src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
            </li>
             <li @click="gochangephone">
                <div class="lt">更换手机号</div>
                <div class="rt">{{phone}}</div>
                <img class="gd"  src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
            </li>
        </ul>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            phone : ''
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
        //跳转修改密码
        gochangepassword(){
            var that = this;
            that.$router.push({
                path : '/personalcenter/myinfo/changepassword',
                query : {
                    phone : that.phone
                }
            });
        },
        //跳转修改手机号
        gochangephone(){
            var that = this;
            that.$router.push({
                path : '/personalcenter/myinfo/changephone',
                query : {
                    phone : that.phone
                }
            });
        }
    },
    beforeCreate() {
        document.querySelector('body').setAttribute('style', 'background:#f6f6f6')
    },
    beforeDestroy() {
        document.querySelector('body').setAttribute('style', '')
    },
}
</script>
<style lang="less" scope>
.acountsafe{
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
        .save{
            display: inline-block;
            font-size: .26rem;
            color:rgba(31,31,31,1);
            font-family:PingFang SC;
            font-weight:500;
            position: absolute;
            top: 50%;
            right : .2rem;
            transform: translateY(-50%);
        }
    }
    .w-acountsafe{
        background-color: #f6f6f6;
        padding: 1.2rem 0 0;
         ul{
            margin-top: .2rem;
            padding: .2rem 0 0;
            li{
                height : .98rem;
                position: relative;
                font-family:PingFang SC;
                font-weight:500;
                background: #fff;
                margin-bottom: .2rem;
                padding-left: .2rem;
                cursor: pointer; 
                .lt,
                .rt{
                    display : inline-block;
                    line-height: .98rem;
                }
                .lt{
                    float: left;
                    padding-left: .05rem;
                    font-size: .3rem;

                }
                .rt{
                    float : right;
                    font-size: .28rem;
                    color:rgba(191,191,191,1);
                    text-align: right;
                    padding-right: .51rem;
                    img{
                        display: block;
                        width: .7rem;
                        height: .7rem;
                        border-radius: 50%;
                        margin-top: .15rem;
                    }
                }
                .upfile{
                    display: block;
                    width: .7rem;
                    height: .7rem;
                    position: absolute;
                    top : .15rem;
                    right : .51rem;
                    background: transparent;
                    opacity: 0;
                }
                .gd{
                    display: block;
                    width : .11rem;
                    height: .21rem;
                    position: absolute;
                    right : .2rem;
                    top : 50%;
                    transform: translateY(-50%);
                }
            }
            li:last-child{
                border-bottom: none;
            }
        }
    }
}    
</style>


