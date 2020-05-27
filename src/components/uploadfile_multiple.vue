<!-- 组件说明 -->
<template>
    <!-- <div class="uploadfile">
    </div> -->
    <div class="files-wrap clearfix">
        <template  v-for="(item,index) in uploaddatainit.upfileslist">
            <div class="pic-box" v-if="index+1<=uploaddatainit.maxnumber" :key="index">
                <img :src="item" v-if="uploaddatainit.filetype=='1'||uploaddatainit.filetype=='1.all'">
                <video v-if="uploaddatainit.filetype=='3'" :src="item" controls="controls">
                    您的浏览器不支持video标签 或 上传的视频文件不支持播放
                </video>
                <div class="notmedia_show" v-if="uploaddatainit.filetype!='1' && uploaddatainit.filetype!='1.all' && uploaddatainit.filetype!='3'">
                    <p class="_txtov2"><a :href="item" target="_blank">点击打开源文件</a></p>
                    <p class="_txtov1">文件{{index+1}}上传成功</p>
                </div>
                <div class="close" @click="closepic(index)">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAMAAAANmfvwAAAAgVBMVEUAAAAAAAAAAAAAAADLy8twcHAEBATc3Nw1NTUAAAAAAAAAAAAAAAAAAAAAAADq6uo7OzsAAAAAAAARERExMTEAAAAAAAAAAAAAAAAAAADu7u7m5ubU1NSRkZEoKCgAAAD39/fy8vLg4ODCwsK1tbWysrKbm5tpaWlFRUUAAAD///9w0OKeAAAAKnRSTlOAAH1a06SB4Y95MSwfEAvskEFnhI13dVtRUO/o2rOLaPf05M7FxLehlD/qRgFtAAABC0lEQVQ4y5WU2XYCIRBES4jJDLNkNpeoMfvG/39gwNjUDEY53kfOPUA13WBGarPuFkoturWpZ4RKqRUCSpcnSrVCxKqaKkWOE/JirLT4l5YKjYgfUQqcpfhTqvy8klcHReMC2islhB6BWwilU7QIu5e5rGe77XfYBrXUdG+tPTrNnbWfUucaBsKNOIMz7jNZNnjg+UcnmxhO6BA53tgMXH3CEpGzdXs0IEsoxI7djA2oqYLm2SmPmCg8SLJILh7UgWSv7h6SnddlaByyZJKdoQ3v4euxByLH8AF6bzQh1xcfgM8ohncYS4+bYf42hPq8f/RshmRLpRsz3d7JIWnTo5Ye2PTYX/F5pL+gX/VBFV0tTS2RAAAAAElFTkSuQmCC">
                </div>
            </div>
        </template>
        <div class="picupbox imgtips" v-if="uploaddatainit.upfileslist.length<uploaddatainit.maxnumber">
            <img class="imgtips" src="data:image/png;base64,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">
            <span class="imgtips">文件上传的最大数量为：{{uploaddatainit.maxnumber}}</span>
            <input v-if="uploaddatainit.issingle" type="file" @change="upfiles" :accept="file_accept">
            <input v-if="!uploaddatainit.issingle" type="file" @change="upfiles" :accept="file_accept" multiple>
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
                    upfileslist:[],//默认回显的文件列表
                    maxnumber:1,//最大的文件数量
                    issingle:true,//默认单文件上传
                    w:0,//图片宽度
                    h:0,//图片高度
                    filetype:"1",//默认为常用图片类型
                },
            },
        },
        data () {
            return {
            };
        },
        computed: {
            file_accept:function(){
                switch (this.uploaddatainit.filetype) {
                    //'1':图片（只要常用的图片类型:image/gif,image/jp2,image/jpeg,image/png）
                    case "1":
                        return "image/gif,image/jp2,image/jpeg,image/png,image/bmp,image/x-png,image/pjpeg"
                        break;
                    //'1.all':图片 (所有)
                    case "1.all":
                        return "image/gif,image/jp2,image/jpeg,image/png,image/vnd.dwg,image/vnd.dxf,image/vnd.svf,image/tiff,image/bmp,image/x-png,image/pjpeg"
                        break;
                    // '2':音频
                    case "2":
                        return "audio/3gpp,audio/ac3,audio/basic,audio/mpeg,audio/mp4,audio/ogg,application/ogg"
                        break;
                    // '3':视频
                    case "3":
                        return "video/3gpp,video/mpeg,video/mp4,video/mpeg,application/ogg"
                        break;
                    // '4':zip文件
                    case "4":
                        return "application/zip"
                        break;
                    // '5':办公文件 MS 及 wps
                    case "5":
                        return "wps application/msword,application/msword,application/vnd.ms-project,application/pdf,application/vnd.ms-powerpoint,application/rtf,text/rtf,text/plain,application/vnd.ms-works,application/xhtml+xml,application/vnd.ms-excel,text/xml, application/xml"
                        break;
                    // '6':html css js相关
                    case "6":
                        return "text/xml,application/xml,application/xhtml+xml,text/html,text/css"
                        break;
                
                    default:
                        return "*";
                        break;
                }
            },
        },
        methods: {
            // 上传文件
            upfiles(e) {
                let that = this;
                let zs = this;
                let files_arr = e.target.files;
                for (let index = 0; index < files_arr.length; index++) {
                    if(index+zs.uploaddatainit.upfileslist.length < zs.uploaddatainit.maxnumber){
                        let file = files_arr[index];
                        let filefullname =files_arr[index].name;
                        let filename =filefullname.substring(0,filefullname.lastIndexOf('.'));
                        let file_lasttag=filefullname.substring(filefullname.lastIndexOf('.')+1,filefullname.length);
                        if(zs.uploaddatainit.filetype=='1'||zs.uploaddatainit.filetype=='1.all'){
                            // 图片尺寸判断
                            // let file = files_arr[index];
                            let reader = new FileReader();
                            reader.onload = function (theFile) {
                                var image = new Image();
                                image.onload = function () {
                                    let width = image.width;
                                    let height = image.height;
                                    if (
                                    (width == zs.uploaddatainit.w && height == zs.uploaddatainit.h)
                                    ) {
                                        that.$toast("图片尺寸符合规定，正在上传");

                                        
                                        // 时间戳文件名
                                        const aliyunFileKey = new Date().getTime() + Math.floor(Math.random() * 150) + '.'+file_lasttag;
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
                                        formFile.append("file", file);
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
                                                that.uploaddatainit.upfileslist.push(urlRes + aliyunFileKey);
                                                e.target.value = "";//置空input的值
                                                that.upfileslistchange();
                                            }
                                        }
                                    }if(zs.uploaddatainit.w==0||zs.uploaddatainit.h==0){
                                        // 时间戳文件名
                                        const aliyunFileKey = new Date().getTime() + Math.floor(Math.random() * 150) + '.'+file_lasttag;
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
                                        formFile.append("file", file);
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
                                                that.uploaddatainit.upfileslist.push(urlRes + aliyunFileKey);
                                                e.target.value = "";//置空input的值
                                                that.upfileslistchange();
                                            }
                                        }
                                    } else {
                                        that.$toast("选择的图片尺寸应为：宽"+zs.uploaddatainit.w+"，* 高"+zs.uploaddatainit.h);
                                        e.target.value = "";//置空input的值
                                        return false;
                                    }
                                };
                                image.src = theFile.target.result;
                            };
                            reader.readAsDataURL(file);
                        }else{
                            // 时间戳文件名
                            const aliyunFileKey = new Date().getTime() + Math.floor(Math.random() * 150) + '.'+file_lasttag;
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
                            formFile.append("file", file);
                            // OSS路径
                            let FileController = 'https://zjlwhtestshimingrenzheng.oss-cn-shanghai.aliyuncs.com';
                            // XMLHttpRequest 对象
                            var xhr = new XMLHttpRequest();
                            xhr.open("post", FileController, true);
                            // 发送请求
                            xhr.send(formFile);
                            // 文件返回路径
                            let urlRes = 'http://zhulitest.izhuazhou.cn/'
                            // readyState == 4 为请求完成，status == 200为请求陈宫返回的状态
                            xhr.onreadystatechange = function () {
                                if (xhr.readyState == 4 && xhr.status == 200) {
                                    that.uploaddatainit.upfileslist.push(urlRes + aliyunFileKey);
                                    e.target.value = "";//置空input的值
                                    that.upfileslistchange();
                                }
                            }
                        }
                    }else{
                        zs.$toast(`达到上传文件的数量上限(${zs.uploaddatainit.maxnumber}个)\n后续文件不会上传`)
                        e.target.value = "";//置空input的值
                    }
                }
            },
            // 删除文件
            closepic(index) {
                this.uploaddatainit.upfileslist.splice(index, 1);
                this.upfileslistchange();
            },
            upfileslistchange(){
                let zs = this;
                // console.log(zs.uploaddatainit.issingle);
                // console.log(zs.uploaddatainit.upfileslist.length<=zs.uploaddatainit.maxnumber);
                
                if(!zs.uploaddatainit.issingle){
                    if(zs.uploaddatainit.upfileslist.length<=zs.uploaddatainit.maxnumber){
                        zs.$emit('_upfileslistchange',zs.uploaddatainit.upfileslist.slice(0,zs.uploaddatainit.maxnumber));
                        // zs.$forceUpdate();
                    }else{
                        return;
                    }
                }else{
                    zs.$emit('_upfileslistchange',zs.uploaddatainit.upfileslist);
                    // zs.$forceUpdate();
                }
            }
        },
        mounted() {

        },
        beforeCreate(){},
        beforeMount(){},
        beforeUpdate(){},
        updated(){},
        beforeDestroy(){},
        destroyed(){},
        activated(){},
    }
</script>

<style lang='less' scoped>
    .files-wrap{
        padding:0 0.3rem;
    }
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
        video{
            width:100%;
            height:100%;
        }
        .close{
            width:0.3rem;
            height:0.3rem;
            position: absolute;
            top:-0.15rem;
            right: -0.15rem; 
            cursor:pointer;
        }
        .notmedia_show{
            font-size:11px;
            p{
                text-align:center;
                padding-top:5px;
                &:first-child{
                    padding-top:28px;
                    a{
                        color:#ccc;
                    }
                }
            }
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
        cursor:pointer;

        position:relative;
        &::after{
            content:'点击上传';
            color:#000;
            font-size:11px;
            position:absolute;
            left:50%;
            // top:50%;
            top:35%;
            transform:translate(-50%,-50%);
        }
        &.imgtips{
            box-sizing:border-box;
            border:1px dashed #ccc;
        }
        img.imgtips{
            width:70%;
            height:70%;
            object-fit:contain;
            margin:0 auto;
        }
        span.imgtips{
            font-size:11px;
            display:block;
            padding:0 7px;
            text-align:center;
            margin-top:-8px;
        }
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
            cursor:pointer;
            z-index:1000;
        }
    }
</style>

<style lang='less'>
//@import url()

</style>