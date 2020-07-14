<template>
  <div class="myinfo">
    <div class="header">
      <img class="back" @click="goback" src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>我的资料</span>
    </div>
    <div class="w-info">
        <ul>
            <li>
                <div class="lt">头像</div>
                <div class="rt">
                    <img v-if="baseuserinfo.headPortrait" :src="baseuserinfo.headPortrait?baseuserinfo.headPortrait:'../../../assets/imgs/personal/mine_default.png'" alt="抓周" class="hd-face"/>
                </div>
                <div class="van-uploader-box">
                   <input type="file" class="upfile" @change="upimgs">
                </div>  
                <img class="gd"  src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
            </li>
            <li @click="changenickname">
                <div class="lt">昵称</div>
                <div class="rt">{{baseuserinfo.nickName}}</div>
                <img class="gd"  src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
            </li>
            <li>
                <div class="lt">ID</div>
                <div class="rt">{{baseuserinfo.userId}}</div>
            </li>
            <li>
                <div class="lt">所在地</div>
                <div class="rt">{{baseuserinfo.site}}</div>
                <!-- <img class="gd"  src="../../../../assets/imgs/follow/xiangqing@2x.png" alt /> -->
            </li>
            <li @click="gotosex">
                <div class="lt">性别</div>
                <div class="rt">{{baseuserinfo.gender===1?'男':'女'}}</div>
                <img class="gd"  src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
            </li>
            <li @click="gotobirthday">
                <div class="lt">出生年月</div>
                <div class="rt">{{baseuserinfo.birthday}}</div>
                <img class="gd"  src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
            </li>
            <li @click="gotointroduction">
                <div class="lt">我的介绍</div>
                <div class="rt">{{baseuserinfo.introduction}}</div>
                <img class="gd"  src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
            </li>
        </ul>
        <ul>
            <li @click="acountsafe">
                <div class="lt">主播实名认证</div>
                <img class="gd"  src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
            </li>
            <li>
                <div class="lt">实休店铺认证</div>
                <div class="rt">
                    <span class="hot">
                        <img  src="../../../../assets/imgs/personal/rm.png" alt />
                    </span>
                    线上开店不打洋
                </div>
                <img class="gd"  src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
            </li>
        </ul>    
        <ul>
            <li @click="gotoaddresspage">
                <div class="lt">收货地址</div>
                <img class="gd"  src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
            </li>
            <li @click="acountsafe">
                <div class="lt">账号安全</div>
                <div class="rt">修改登录密码，更换手机号</div>
                <img class="gd"  src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
            </li>
        </ul>
    </div>
    <!-- 修改出生年月start -->
    <div class="birthday_box" v-if="datatime_show">
        <div class="box-cover"></div>
        <div class="box-con">
            <van-datetime-picker
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            :formatter="formatter"
            @confirm="confirm_time"
            @cancel="cancel_time"
            />
        </div>
    </div>
    <!-- 修改出生年月end -->
    <!-- 修改性别start -->
    <div class="sex_box" v-if="sex_show">
        <div class="box-cover"></div>
        <div class="box-con">
            <van-picker 
            show-toolbar 
            :columns="columns" 
            :default-index="1" 
            @confirm="onConfirm"
            @cancel="onCancel" />
        </div>
    </div>
    <!-- 修改出生年月end -->
  </div>
</template>
<script>
import Vue from 'vue'
import {DatetimePicker} from 'vant'
import { Picker } from 'vant';
import 'vant/lib/index.css';
import {
  setsessionStorage,
  getsessionStorage
} from "@/utils/index.js";

Vue.use(DatetimePicker);
Vue.use(Picker);
export default {
    data(){
        return{
            baseuserinfo : {},
            upimglist :[],  //头像上传图片数组
            minDate: new Date(1500, 0, 1),
            maxDate: new Date(10000, 10, 1),
            currentDate: new Date(), //时间选择器当前时间
            datatime_show : false,
            sex_show : false,
            post_time : '', //发给后台的修改出生日期
            columns : ['男','女'], //性别选择器数据
            post_sex : '' //发给后台的修改性别数据
        }
    },
    mounted(){
        var that = this;
        that.getuseinfo();
    },
    methods:{
        //返回个人中心首页
        goback() {
            this.$router.go(-1);
        },
        // 地址管理页
        gotoaddresspage() {
            this.$router.push({ name: "personalcenteraddress" });
        },
        //跳转修改昵称页
        changenickname(){
            var that = this;
            that.$router.push({
                path : '/personalcenter/myinfo/nickname',
                query : {
                    nickname : that.baseuserinfo.nickName
                }
            });
        },
        //跳转账号安全首页
        acountsafe(){
            var that = this;
            that.$router.push({
                path : '/personalcenter/myinfo/acountsafe',
                query : {
                    phone : that.baseuserinfo.mobile
                }
            });
        },
        //跳转修改自我介绍
        gotointroduction(){
            var that = this;
            localStorage.setItem(
              "introduction",
              that.baseuserinfo.introduction
            );

            that.$router.push({
                path : '/personalcenter/myinfo/changeintroduction'
            });
        },
        //获取用户信息
        getuseinfo(){
            let that = this;
            that.api.personalcenter
            .getinfouser_new({
                userId : that.$store.state.user.userid
            })
            .then(res => {
                if(res.data.code === 1){
                    console.log('res');
                    console.log(res.data.data);
                    that.baseuserinfo = res.data.data;
                }
            })
            
        },
        // 上传图片
        upimgs(e) {
            let that = this;
            // 时间戳文件名
            const aliyunFileKey = new Date().getTime() + Math.floor(Math.random() * 150) + '.png';
            // OSS配置
            // let client = new OSS({
            //     endpoint: 'https://zjlwhtestshimingrenzheng.oss-cn-shanghai.aliyuncs.com',
            //     accessKeyId: 'LTAI4FmNE7xB2NTaeFxAxXTj',
            //     accessKeySecret: 'edI7UHgU0poiQhWnhej58nIqu3K3B2',
            //     key: aliyunFileKey,
            //     bucket: that.ossmassage.BUCKET_NAME,
            // });
            // FormData 对象
            let formFile = new FormData();
            // 其他参数
            formFile.append("OssAccessKeyId", 'LTAI4FmNE7xB2NTaeFxAxXTj');
            formFile.append("policy",
                'eyJleHBpcmF0aW9uIjoiMjIwMC0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ=='
            );
            formFile.append("signature", '5r4Zr1NwCEQjSUOm1xuWJkmqNSw=');
            formFile.append("accessKeySecret", 'edI7UHgU0poiQhWnhej58nIqu3K3B2');
            formFile.append("key", aliyunFileKey);
            formFile.append("success_action_status", '200');
            // 文件对象
            formFile.append("file", e.target.files[0]);
            // that.convertBase64UrlToBlob(formFile);
            // client.put(aliyunFileKey, formFile).then(results => {
            //     console.log(results);
            // }).catch(err => {
            //     console.log(err);
            // });
            // OSS路径
            let FileController = 'https://zjlwhtestshimingrenzheng.oss-cn-shanghai.aliyuncs.com';
            // XMLHttpRequest 对象
            var xhr = new XMLHttpRequest();
            xhr.open("post", FileController, true);
            // xhr.setRequestHeader('Content-Type','multipart/form-data');
            // 发送请求
            xhr.send(formFile);
            // 返回路径
            let urlRes = 'http://zhulitest.izhuazhou.cn/'
            // readyState == 4 为请求完成，status == 200为请求陈宫返回的状态
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    that.upimglist.push(urlRes + aliyunFileKey);
                    that.changefaceurl();
                }
            }
        },
        //修改上传头像
        changefaceurl(){
            let that = this;
            that.api.personalcenter
            .updateHeadPortrait({
                userId : that.$store.state.user.userid,
                headPortraitUrl :  that.upimglist[0]
            }).then(res => {
                that.getuseinfo();
            })
            
        },
        //打开修改出生日期弹层
        gotobirthday(){
            var that = this;
            that.datatime_show = true;
        },
        //初始化配置时间picker
        formatter(type, val) {
            if (type === 'year') {
                return `${val}年`;
            } 
            else if (type === 'month') {
                return `${val}月`;
            }
            return val;
        },
        //确认时间插件选定时间
        confirm_time(val){
            let that = this;
            let year = val.getFullYear();
            let month = val.getMonth() + 1;
            let day = val.getDate();
            if (month >= 1 && month <= 9) { month = `0${month}` }
            if(day >= 1 && day <= 9){ day = `0${day}` }
            this.className = 'timeClass'
            this.timeValue = `${year}-${month}-${day}`
            that.datatime_show = false; 
            that.post_time = this.timeValue;
            that.api.personalcenter
            .updateinfouser_new({
                userId : that.$store.state.user.userid,
                birthday :  that.post_time
            }).then(res => {
                if(res.data.code === 1){
                    that.datatime_show = false; 
                    that.getuseinfo();
                }else{
                    that.$toast(res.data.info);
                }
            })
        },
        //关闭时间插件弹层
        cancel_time(){
            let that = this;
            that.datatime_show = false; 
        },
         //打开修改性别弹层
        gotosex(){
            this.sex_show = true;
        },
        //确认性别
        onConfirm(val){
            var that = this;
            if(val == '男'){
                that.post_sex = 1;
            }else if(val == '女'){
                that.post_sex = 2;
            }
            that.api.personalcenter
            .updateinfouser_new({
                userId : that.$store.state.user.userid,
                gender :  that.post_sex
            }).then(res => {
                if(res.data.code === 1){
                    this.sex_show = false;
                    that.getuseinfo();
                }else{
                    that.$toast(res.data.info);
                }
            })
           
        },
        //取消性别
        onCancel(){
            this.sex_show = false;
        }
    }    
}
</script>

<style lang="less" scope>
.myinfo{
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
    .w-info{
        background-color: #f6f6f6;
        padding: 1.2rem 0 0;
        ul{
            margin-top: .2rem;
            padding: .2rem 0  0 .2rem;
            background: #fff;
            li{
                height : .98rem;
                position: relative;
                font-family:PingFang SC;
                font-weight:500;
                border-bottom: 1px solid rgba(215, 215, 215, 1);
                .lt,
                .rt{
                    display : inline-block;
                    line-height: .98rem;
                    .hot{
                        display : inline-block;
                        width : .22rem;
                        height : .30rem;
                        img{
                            width : 100%;
                            height : 100%;
                            vertical-align: middle;
                            margin-top : 0;
                        }
                    }
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
                    max-width: 4.51rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
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
    .birthday_box,
    .sex_box{
        width: 7.5rem;
        height: 5rem;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        border-top: 1px solid #ccc;
        z-index: 1000;
        .box-cover{
            position: fixed;
            left: 0 ;
            top: 0;
            right: 0;
            bottom:0;
            z-index: 998;
            background:rgba(0,0,0,.5); 
        }
        .box-con{
            height: 5rem;
            position: fixed;
            left: 0 ;
            right: 0;
            bottom:0;
            z-index: 999;
            background: #fff;
        }
    }
    .van-picker__cancel, .van-picker__confirm{
        color:rgba(31, 31, 31, 1);
        font-size : .28rem;
        font-family:PingFang SC;
        font-weight:500;
    }
}    
</style>


