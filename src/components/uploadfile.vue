<!-- 组件说明 -->
<template>
    <!-- <div class="uploadfile">
    </div> -->
    <div class="list-pic clearfix">
        <div class="pic-box" v-for="(img,index) in uploaddatainit.upimglist" :key="index">
            <img :src="img">
            <div class="close" @click="closepic(index)">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAMAAAANmfvwAAAAgVBMVEUAAAAAAAAAAAAAAADLy8twcHAEBATc3Nw1NTUAAAAAAAAAAAAAAAAAAAAAAADq6uo7OzsAAAAAAAARERExMTEAAAAAAAAAAAAAAAAAAADu7u7m5ubU1NSRkZEoKCgAAAD39/fy8vLg4ODCwsK1tbWysrKbm5tpaWlFRUUAAAD///9w0OKeAAAAKnRSTlOAAH1a06SB4Y95MSwfEAvskEFnhI13dVtRUO/o2rOLaPf05M7FxLehlD/qRgFtAAABC0lEQVQ4y5WU2XYCIRBES4jJDLNkNpeoMfvG/39gwNjUDEY53kfOPUA13WBGarPuFkoturWpZ4RKqRUCSpcnSrVCxKqaKkWOE/JirLT4l5YKjYgfUQqcpfhTqvy8klcHReMC2islhB6BWwilU7QIu5e5rGe77XfYBrXUdG+tPTrNnbWfUucaBsKNOIMz7jNZNnjg+UcnmxhO6BA53tgMXH3CEpGzdXs0IEsoxI7djA2oqYLm2SmPmCg8SLJILh7UgWSv7h6SnddlaByyZJKdoQ3v4euxByLH8AF6bzQh1xcfgM8ohncYS4+bYf42hPq8f/RshmRLpRsz3d7JIWnTo5Ye2PTYX/F5pL+gX/VBFV0tTS2RAAAAAElFTkSuQmCC">
            </div>
        </div>
        <div class="picupbox" v-if="uploaddatainit.upimglist.length<uploaddatainit.maxnumber">
            <img src="data:image/png;base64,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">
            <input type="file" @change="upimgs">
        </div>
    </div>
</template>

<script>
    //import x from ''
    export default {
        name:'uploadfile',
        components: {

        },
        props:{
            uploaddatainit:{
                type:Object,
                value:{
                    upimglist:[],
                    maxnumber:1,
                },
            },
        },
        data () {
            return {

            };
        },
        computed: {

        },
        methods: {
            // 上传图片
            upimgs(e) {
                let that = this;
                // 时间戳文件名
                const aliyunFileKey = new Date().getTime() + Math.floor(Math.random() * 150) + '.png';
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
                // OSS路径
                let FileController = 'https://zjlwhtestshimingrenzheng.oss-cn-shanghai.aliyuncs.com';
                // XMLHttpRequest 对象
                var xhr = new XMLHttpRequest();
                xhr.open("post", FileController, true);
                // 发送请求
                xhr.send(formFile);
                // 图片返回路径
                let urlRes = 'http://zhulitest.izhuazhou.cn/'
                // readyState == 4 为请求完成，status == 200为请求陈宫返回的状态
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        that.uploaddatainit.upimglist.push(urlRes + aliyunFileKey);
                        that.upimglistchange();
                    }
                }
            },
            // 删除图片
            closepic(index) {
                this.uploaddatainit.upimglist.splice(index, 1);
                this.upimglistchange();
            },
            upimglistchange(){
                this.$emit('_upimglistchange',this.uploaddatainit.upimglist);
            }
        },
        mounted() {

        },
        beforeCreate() {}, //生命周期 - 创建之前
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() {}, //生命周期 - 销毁之前
        destroyed() {}, //生命周期 - 销毁完成
        activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>

<style lang='less' scoped>
    .pic-box{
        float:left;
        width:1.68rem;
        height:1.68rem;
        margin-right:0.9rem;
        margin-bottom:0.3rem;
        position:relative;
        box-sizing:border-box;
        border:1px dashed #B9B9B9;
        img{
            width:100%;
            height:100%;
            object-fit:contain;
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
</style>

<style lang='less'>
//@import url()

</style>