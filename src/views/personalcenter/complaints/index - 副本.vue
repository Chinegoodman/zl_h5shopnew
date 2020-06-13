<!-- 组件说明 -->
<template>
    <div class="complaints">
        <div class="header">
            <img class="back" @click="goback" src="./../../../assets/imgs/follow/xiangqing@2x.png" alt />
            <span>投诉建议</span>
        </div>
        <div class="line"></div>
        <div class="complaints-type">
            <div class="type-tit">选择类型</div>
            <div class="type-list clearfix">
                <div class="list-box" @click="typeactive(list,index)" :class="isSelect==index?'listboxactive':''"
                    v-for="(list,index) in typelist" :key="index">{{list.name}}</div>
            </div>
        </div>
        <div class="complaints-text">
            <div class="list-text">
                <textarea name="" id="" cols="30" rows="10" v-model="context"
                    placeholder="对于我们APP、服务、使用体验等等，任何投诉或建议。都 可 以告知我们..."></textarea>
            </div>
        </div>
        <div class="complaints-pic">
            <div class="type-tit">上传凭证：</div>
            <div class="list-pic clearfix">
                <!-- <div class="pic-box" v-for="(img,index) in upimglist" :key="index">
                    <img :src="img" alt="">
                    <div class="close" @click="closepic(index)">
                        <img src="./../../../assets/imgs/icons/scpzsc.png" alt="">
                    </div>
                </div>
                <div class="picupbox" v-if="upimglist.length<6">
                    <img src="./../../../assets/imgs/personal/scpz.png" alt="">
                    <input type="file" @change="upimgs">
                </div> -->

                <uploadfile :defaultfileslist="defaultfileslist" :uploaddatainit="uploaddatainit" @_upfileslistchange="upfileslistchange"></uploadfile>
            </div>
        </div>
        <div class="bottom-btn" @click="save">提交</div>
        <div class="successtc" v-if="successshow">
            <div class="successtc-inner">
                <div class="icon"><img src="./../../../assets/imgs/icons/tstjcg.png" alt=""></div>
                <div class="text">提交成功</div>
                <div class="text">感谢您的反馈，我们将尽快处理</div>
                <div class="count">{{count}}s</div>
            </div>
        </div>
    </div>
</template>

<script>
    const OSS = require("ali-oss");
    export default {
        components: {},
        data() {
            return {
                count: '',
                show: true,
                typelist: [], //投诉类型
                context: "", //投诉内容
                upimglist: [], //图片列表
                isSelect: 10, //判断当前选中状态
                ossmassage: {},
                type: "", //投诉类型
                successshow: false,

                
                uploaddatainit:{
                    // upfileslist:[],
                    maxnumber:5,
                    issingle:false,//除了图片之外的资源建议设置为true(单文件上传模式)
                    w:'',
                    h:'',
                    // filetype
                    //'1':图片（只要常用的图片类型:image/gif,image/jp2,image/jpeg,image/png）
                    //'1.all':图片 (所有)
                    // '2':音频
                    // '3':视频
                    // '4':zip文件
                    // '5':办公文件 MS 及 wps
                    // '6':html css js相关
                    filetype:"1",
                },
                defaultfileslist:[],
            };
        },
        computed: {},
        methods: {
            upfileslistchange(listdata){
                console.log(listdata);
                this.defaultfileslist=listdata;
                // this.uploaddatainit.upfileslist = listdata;
            },
            //   获取建议类型
            complaintstype() {
                let that = this;
                that.api.personalcenter
                    .complaintstype({})
                    .then(res => {
                        that.typelist = res.data.data;
                    });
            },
            // 获取类型
            typeactive(item, index) {
                this.isSelect = index;
                this.type = item.id;
            },
            // 删除图片
            closepic(index) {
                this.upimglist.splice(index, 1);
            },
            // 获取osstoken
            ossmass() {
                this.api.personalcenter.osstoken({})
                    .then(res => {
                        this.ossmassage = res.data.data;
                    });
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
                    }
                }
            },
            // 倒计时3秒
            getCode() {
                let that = this;
                let TIME_COUNT = 3;
                that.count = TIME_COUNT;
                clearInterval(that.timer);
                that.timer = setInterval(() => {
                    if (that.count > 0 && that.count <= TIME_COUNT) {
                        that.count--;
                    } else {
                        that.successshow = false;
                        that.goback()
                        clearInterval(that.timer);
                    }
                }, 1000);
            },
            // 提交投诉
            save() {
                let zs = this;
                if (zs.type !== "" && zs.context != "") {
                    zs.api.personalcenter.osstoken({
                            type: zs.type,
                            context: zs.context,
                            // images: zs.upimglist,
                            images: zs.defaultfileslist,
                            userId: zs.$store.state.user.userid,
                            source: "2"
                        })
                        .then(res => {
                            zs.successshow = true;
                            zs.getCode();
                        });
                } else if (zs.type == "") {
                    zs.$toast("请选择类型")
                } else if (zs.context == "") {
                    zs.$toast("请告诉我们您的意见")
                }
            },
            goback() {
                this.$router.go(-1);
            }
        },
        mounted() {
            this.complaintstype();
            this.ossmass();
        },
        beforeCreate() {}, //生命周期 - 创建之前
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() {}, //生命周期 - 销毁之前
        destroyed() {}, //生命周期 - 销毁完成
        activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
    };
</script>
<style lang="less">
    body {
        background-color: #F7F7F7;
    }
    .complaints{
        .pic-box{
            margin-right: 0.7rem;
        }
    }
</style>
<style lang="less" scoped>
    @import "./css/index.less";

    .complaints {

        background-color: #F7F7F7;
    }
</style>