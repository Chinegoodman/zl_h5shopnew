<!-- 组件说明 -->
<template>
    <!-- <div class="uploadfile">
    </div> -->
    <div class="wrap" @click.stop="wrapclickfn">
        <template v-for="(item,index) in defaultfileslist">
            <div class="prod-box-img" v-if="index+1<=uploaddatainit.maxnumber" :key="index" @click.stop="wrapclickfn">
                <img :src="item" v-if="uploaddatainit.filetype=='1'||uploaddatainit.filetype=='1.all' || uploaddatainit.filetype=='1.nogif' || uploaddatainit.filetype=='1.gif'">
                <video v-if="uploaddatainit.filetype=='3'" :src="item" controls="controls" autoplay="autoplay" loop>
                    您的浏览器不支持video标签 或 上传的视频文件不支持播放
                </video>
                <div class="notmedia_show" @click="opencheck(item)"
                    v-if="uploaddatainit.filetype!='1' && uploaddatainit.filetype!='1.all'&& uploaddatainit.filetype!='1.nogif'&& uploaddatainit.filetype!='1.gif' && uploaddatainit.filetype!='3'">
                    <div class="_txtov2"><div class="a">查看打开源文件</div></div>
                    <p class="_txtov1">上传成功</p>
                </div>
                <i class="fa fa-times pic-close" aria-hidden="true" @click.stop="closepic(index)"></i>
            </div>
        </template>
        <div class="upload-full" v-if="defaultfileslist.length<uploaddatainit.maxnumber" @click.stop="wrapclickfn">
            <i class="fa fa-arrow-circle-up"></i>
            <!-- <span class="imgtips">文件上传的最大数量为：{{uploaddatainit.maxnumber}}</span> -->
            <input v-if="uploaddatainit.issingle" type="file" @change="upfiles" :accept="file_accept">
            <input v-if="!uploaddatainit.issingle" type="file" @change="upfiles" :accept="file_accept" multiple>
        </div>
    </div>
</template>

<script>
//import x from ''
import { wcsUpload } from "wcs-js-sdk";
export default {
  name: "uploadfile",
  // name: "uploadfilewangsu",
  components: {},
  props: {
    canedit: {
      type: Boolean,
      value: true,
    },
    uploaddatainit: {
      type: Object,
      value: {
        upfileslist: [], //默认回显的文件列表
        maxnumber: 1, //最大的文件数量
        issingle: true, //默认单文件上传
        imgSize: [], //图片尺寸
        filetype: "1", //默认为常用图片类型
        getwangsu_token_prams:1,//云存储的存储目录
      },
    },
    defaultfileslist: {
      type: Array,
      value: [],
    },
    liindex: {
      type: Number,
      value: -1,
    },
    // getwangsu_token_prams: {
    //   type: String,
    //   value: "",
    // },
  },
  data() {
    return {
      wangsu_token: "",
    };
  },
  computed: {
    file_accept: function() {
      switch (this.uploaddatainit.filetype) {
        //'1':图片（只要常用的图片类型:image/gif,image/jp2,image/jpeg,image/png）
        case "1":
          return "image/gif,image/jp2,image/jpeg,image/png,image/bmp,image/x-png,image/pjpeg";
          break;
        //'1.all':图片 (所有)
        case "1.all":
          return "image/gif,image/jp2,image/jpeg,image/png,image/vnd.dwg,image/vnd.dxf,image/vnd.svf,image/tiff,image/bmp,image/x-png,image/pjpeg";
          break;
        //'1.nogif':图片 (除了 gif图片)
        case "1.nogif":
          return "image/jp2,image/jpeg,image/png,image/vnd.dwg,image/vnd.dxf,image/vnd.svf,image/tiff,image/bmp,image/x-png,image/pjpeg";
          break;
        //'1.gif':只要gif图
        case "1.gif":
          return "image/gif";
          break;
        // '2':音频
        case "2":
          return "audio/3gpp,audio/ac3,audio/basic,audio/mpeg,audio/mp4,audio/ogg,application/ogg";
          break;
        // '3':视频
        case "3":
          return "video/3gpp,video/mpeg,video/mp4,video/mpeg,application/ogg";
          break;
        // '4':zip文件
        case "4":
          return "application/zip";
          break;
        // '5':办公文件 MS 及 wps
        case "5":
          return "wps application/msword,application/msword,application/vnd.ms-project,application/pdf,application/vnd.ms-powerpoint,application/rtf,text/rtf,text/plain,application/vnd.ms-works,application/xhtml+xml,application/vnd.ms-excel,text/xml, application/xml";
          break;
        // '6':html css js相关
        case "6":
          return "text/xml,application/xml,application/xhtml+xml,text/html,text/css";
          break;
        case "7":
          return "svga";
          break;

        default:
          return "*";
          break;
      }
    },
  },
  methods: {
    wrapclickfn() {
      if (!this.canedit) {
        debugger;
        this.$toast("点击编辑按钮后,再进行后续操作");
        return;
      }
    },
    opencheck(filedata) {
      let zs = this;
      this.$emit("_opencheck", { filedata, liindex: zs.liindex });
    },
    // 上传文件
    upfiles(e) {
      let that = this;
      let zs = this;
      let files_arr = e.target.files;
      for (let index = 0; index < files_arr.length; index++) {
        if (index + zs.defaultfileslist.length < zs.uploaddatainit.maxnumber) {
          let file = files_arr[index];
          let filefullname = files_arr[index].name;
          let filename = filefullname.substring(
            0,
            filefullname.lastIndexOf(".")
          );
          let file_lasttag = filefullname.substring(
            filefullname.lastIndexOf(".") + 1,
            filefullname.length
          );
          if (zs.uploaddatainit.filetype == 7 && file_lasttag != "svga") {
            zs.$toast("请上传svga格式的动画文件");
            e.target.value = ""; //置空input的值
            return;
          }
          if (
            zs.uploaddatainit.filetype == "1" ||
            zs.uploaddatainit.filetype == "1.all" ||
            zs.uploaddatainit.filetype == "1.nogif" ||
            zs.uploaddatainit.filetype == "1.gif"
          ) {
            // 图片尺寸判断
            // let file = files_arr[index];
            let reader = new FileReader();
            reader.onload = function(theFile) {
              var image = new Image();
              image.onload = function() {
                let width = image.width;
                let height = image.height;
                let ifstatus = false;
                zs.uploaddatainit.imgSize.forEach(item => {
                  if (!ifstatus && width == item.w && height == item.h) {
                    ifstatus=true;
                    that.$toast("图片尺寸符合规定，正在上传");
                    let wh = {width,height};
                    that.wangsu_uploadfn(file, file_lasttag, e,wh);
                    return;
                  } else if (!ifstatus && item.w == 0 && item.h == 0) {
                    ifstatus=true;
                    that.$toast("图片尺寸符合规定，正在上传");

                    that.wangsu_uploadfn(file, file_lasttag, e);
                    return;
                  } else if (ifstatus && width != item.w || !ifstatus && height != item.h) {
                    ifstatus=false;
                    that.$toast("请按图片尺寸提示上传图片");
                    e.target.value = ""; //置空input的值
                    return false;
                  }
                });
              };
              image.src = theFile.target.result;
            };
            reader.readAsDataURL(file);
          } else {
            that.wangsu_uploadfn(file, file_lasttag, e);
          }
        } else {
          zs.$toast(
            `达到上传文件的数量上限(${
              zs.uploaddatainit.maxnumber
            }个)\n后续文件不会上传`
          );
          e.target.value = ""; //置空input的值
        }
      }
    },
    // 网宿 api 官方 上传
    wangsu_uploadfn(file, file_lasttag, eventapi,wh) {
      let zs = this;
      // // 时间戳文件名
      const file_name =
        new Date().getTime() +
        Math.floor(Math.random() * 150) +
        "." +
        file_lasttag;
      zs.$toast.loading({
        message:'准备上传中。。',
        duration:0,
        forbidClick:true,
      })
      zs.api.wangsuapi
        .getwangsu_token({
          type: zs.uploaddatainit.getwangsu_token_prams,
          imageKey:file_name
        })
        .then(res => {
          zs.$toast.clear();
          if (res.data.code == 1) {
            zs.wangsu_token = res.data.data.token;
            // file // 要上传的文件
            // token // 后台服务器获取的token
            // uploadUrl // 网宿云存储分配的上传地址
            let extraConfig = {
              timeout: 0, //超时时间, 默认为0 超时错误可以重试上传
              concurrentRequestLimit: 3, //并发数,默认为3。注：浏览器对连接的请求资源是有限的, 比如Chrome的请求资源是6, 所以会有这样的情况, 如果并发数写10, 虽然发起了10个请求, 但是只有6个真正在上传
              retryCount: 0, //上传重试, 默认为0
            };
            // console.log(file);
            let uploadUrl = res.data.data.uploadDomain;
            // let uploadUrl = "http://zhuli.up28.v1.wcsapi.com";
            let uploadObj = wcsUpload(
              file,
              zs.wangsu_token,
              uploadUrl,
              extraConfig
            );
            uploadObj.putFile();
            uploadObj.onError = error => {
              // console.log(error);
              zs.$toast(error.message);
            };
            uploadObj.onComplete = res2 => {
              // console.log(res2);
              // console.log(res.data.data.imageDomain+'/'+res.data.data.fileDirectory+'/' + file_name);
              zs.defaultfileslist.push(
                res.data.data.imageDomain+'/'+res.data.data.fileDirectory+'/' + file_name
              );
              eventapi.target.value = ""; //置空input的值
              zs.upfileslistchange(wh);
              zs.$toast('上传成功');
            };
          } else {
            zs.$toast(res.data.info);
            return;
          }
        });
    },
    // 删除文件
    closepic(index) {
      if (!this.canedit) {
        this.$toast("点击编辑按钮后,再进行后续操作");
        return;
      }
      this.defaultfileslist.splice(index, 1);
      this.upfileslistchange();
    },
    upfileslistchange(wh) {
      let zs = this;
      // console.log(zs.uploaddatainit.issingle);
      // console.log(zs.defaultfileslist.length<=zs.uploaddatainit.maxnumber);

      if (!zs.uploaddatainit.issingle) {
        if (zs.defaultfileslist.length <= zs.uploaddatainit.maxnumber) {
          zs.$emit(
            "_upfileslistchange",
            zs.defaultfileslist.slice(0, zs.uploaddatainit.maxnumber),
            zs.liindex == -1 ? "" : zs.liindex,
            wh
          );
          // zs.$forceUpdate();
        } else {
          return;
        }
      } else {
        zs.$emit(
          "_upfileslistchange",
          zs.defaultfileslist,
          zs.liindex == -1 ? "" : zs.liindex,
          wh
        );
        // zs.$forceUpdate();
      }
    },
  },
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
};
</script>


<style lang='less' scoped>
.wrap {
  position: relative;
  width: 100%;
  height: 75px;

  .upload-img {
    width: 740px;
    height: auto;
    background-color: #fff;
  }

  .prod-box-img {
    display: inline-block;
    position: relative;
    width: 75px;
    height: 75px;
    margin: 0 2px;
    // background-color: #999;
    border-radius: 5px;
    overflow: hidden;
    .notmedia_show {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
      ._txtov2 {
        padding: 0 10px;
        text-align: center;
      }
      ._txtov1 {
        padding: 0 10px;
        text-align: center;
      }
    }
  }

  .upload-full {
    display: inline-block;
    position: relative;
    width: 75px;
    height: 75px;
    vertical-align: top;
    background-color: #999;
    border-radius: 5px;
  }

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    object-fit: contain;
    background-color: rgba(204, 204, 204, 0.5);
  }

  video {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -9;
    object-fit: contain;
    background-color: rgba(204, 204, 204, 0.5);
  }

  input {
    width: 74px;
    height: 78px;
    opacity: 0;
    cursor: pointer;
    z-index: 9999;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 5px;
  }

  p.tips {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    font-size: 12px;
    color: #fff;
    vertical-align: middle;
    height: 79px;
    line-height: 79px;

    &.status {
      padding: 2px 1px;
      box-sizing: border-box;
      color: red;
      line-height: normal;
    }
  }

  i {
    display: block;
    // z-index: 999;
    font-size: 20px;
    // margin-top: 29px;
    // margin-left: 28px;
    color: #000;
    cursor: pointer;
    // box-shadow: 0 0 2px rgba(45, 212, 11, 0.836);
    &.fa-arrow-circle-up {
      position: absolute;
      left: 50%;
      top: 50%;
      margin: 0;
      transform: translate(-50%, -50%);
    }
  }

  .pic-close {
    position: absolute;
    top: 5px;
    right: 5px;
  }
}
</style>