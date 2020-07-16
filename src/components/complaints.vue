<!-- 组件说明 -->
<template>
    <div class="complaints">
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
                <div class="pic-box" v-for="(img,index) in upimglist" :key="index">
                    <img :src="img" alt="">
                    <div class="close" @click="closepic(index)">
                        <img src="../assets/imgs/icons/scpzsc.png" alt="">
                    </div>
                </div>
                <div class="picupbox" v-if="upimglist.length<6">
                    <img src="../assets/imgs/personal/scpz.png" alt="">
                    <input type="file" @change="upimgs">
                </div>
            </div>
        </div>
        <div class="bottom-btn" @click="save">提交</div>
        <div class="successtc" v-if="successshow">
            <div class="successtc-inner">
                <div class="icon"><img src="../assets/imgs/icons/tstjcg.png" alt=""></div>
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
        props :[
            "_livingToComplaintsFlag"
        ],
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
            };
        },
        computed: {},
        methods: {
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
                        clearInterval(that.timer);
                        that.goback();
                    }
                }, 1000);
            },
            // 提交投诉
            save() {
                let that = this;
                if (this.type !== "" && this.context != "") {
                    this.api.personalcenter.osstoken({
                            type: this.type,
                            context: this.context,
                            images: this.upimglist,
                            userId: this.$store.state.user.userid,
                            source: "2"
                        })
                        .then(res => {
                            if(res.data.code==1){
                                 if(this._livingToComplaintsFlag){
                                    that.shutLivingComplaintShell();
                                }else{
                                    this.successshow = true;
                                    this.getCode();
                                }
                            }else{
                                this.$toast(res.data.info);
                            }
                        });
                } else if (this.type == "") {
                    this.$toast("请选择类型")
                } else if (this.context == "") {
                    this.$toast("请告诉我们您的意见")
                }
            },
            goback() {
                this.$router.go(-1);
            },
            //关闭直播页投诉弹层
            shutLivingComplaintShell(){
                this.$emit('_closeComplaintsShellShow');
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
</style>
<style lang="less" scoped>
    .complaints {
        background-color: #F7F7F7;
    }
    .complaints{
        background-color:#F7F7F7;
        font-family:PingFang-SC-Medium;
        color:#1F1F1F;
        padding-bottom:1rem;
    }
    .complaints-type{
        background-color:#fff;
        min-height:2.56rem;
        padding:0.3rem 0.2rem;
        margin-bottom:0.2rem;
        padding-bottom:0.1rem;
        .type-tit{
            font-size:0.26rem;
            padding-bottom:0.3rem;
        }
        .type-list{
            .list-box{
                width: 2.23rem;
                font-size:0.26rem;
                padding:0.17rem 0rem;
                text-align:center;
                border-radius:0.08rem;
                background-color:#EBEBE9;
                float:left;
                color:#757575;
                margin-right:0.2rem;
                margin-bottom:0.2rem;
            }
            .list-box:nth-child(3n){
                margin-right:0;
            }
            .listboxactive{
                background-color:rgba(255,189,4,0.2);
                color:#FFBD04;
            }
        }
    }
    .complaints-text{
        background-color:#fff;
        min-height:2.42rem;
        padding:0.3rem 0.2rem;
        textarea{
            width:100%;
            border:none;
            color:#757575;
            font-size:0.26rem;
            line-height:0.38rem;
            height:2rem;
        }
    }
    .complaints-pic{
        background-color:#fff;
        padding:0.3rem 0.2rem;
        margin:0.2rem 0;
        padding-bottom:0;
        .type-tit{
            font-size:0.26rem;
            padding-bottom:0.3rem;
        }
        .pic-box{
            float:left;
            width:1.68rem;
            height:1.68rem;
            margin-right:0.9rem;
            margin-bottom:0.3rem;
            position:relative;
            img{
                width:100%;
                height:100%;
            }
            .close{
                width:0.3rem;
                height:0.3rem;
                position: absolute;
                top:-0.15rem;
                right: -0.15rem; 
            }
        }
        .pic-box:nth-child(3n){
            margin-right:0;
        }
        .picupbox{
            width:1.68rem;
            height:1.68rem;
            float:left;
            margin-bottom:0.3rem;
            position:relative;
            img{
                width:100%;
                height:100%;
            }
            input{
                display:block;
                position:absolute;
                top:0;
                left:0;
                width:1.68rem;
                height:1.68rem;
                opacity: 0;
            }
        }
    }
    .bottom-btn{
        background-color:#FFBD04;
        box-shadow:0px 5px 16px 0px rgba(255,189,4,0.36);
        color:#fff;
        width:3.2rem;
        height:0.7rem;
        text-align:center;
        line-height:0.7rem;
        margin:0 auto;
        margin-top:1.93rem;
        border-radius:2rem;
        cursor: pointer;
    }
    .successtc{
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        z-index: 100;
        left: 0;
        .successtc-inner{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 0.5rem 0rem;
            border-radius: 0.12rem;
            width: 4.94rem;
            text-align:center;
            .icon{
            width:0.59rem;
            height:0.59rem;
            margin:0 auto;
            margin-bottom:0.3rem;
            img{
                width:100%;
                height:100%;
            } 
            }
            .text{
                font-size:0.26rem;
                color:#1F1F1F;
                line-height:0.38rem;
            }
            .count{
                color:#FFBD04;
                font-size:0.26rem;
            }
        }
    }
</style>