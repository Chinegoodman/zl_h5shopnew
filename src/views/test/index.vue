<!-- 组件说明 -->
<template>
  <div class="testwrap">
    这是测试页面 自动打包
    <hr />
    query{{ this.$route.query }} <br />
    params{{ this.$route.params }} <br />
    <uploadfile
        :canedit="true"
        :uploaddatainit="uploaddatainit"
        :defaultfileslist="defaultfileslist"
        @_upfileslistchange="upfileslistchange"
    ></uploadfile>

    <div class="levelwarp">
        <div class="herder_line"></div>
        <div class="centerdom">
            <p>level 12</p>
        </div>
        <div class="centerdom">
            <p>level 13</p>
        </div>
        <div class="centerdom">
            <p>level 14</p>
        </div>
        <div class="centerdom">
            <p>level 15</p>90
        </div>
        <div class="footer_line"></div>
    </div>

    <button @click="agorartcleaveCall">离开频道</button>
  </div>
</template>

<script>
// import uploadfile from "@/components/uploadfile_multiple.vue";

// Agora Web SDK NG
// https://agoraio-community.github.io/AgoraWebSDK-NG/docs/zh-CN/setup
import AgoraRTC from "agora-rtc-sdk";
// import AgoraRTC from "agora-rtc-sdk-ng";
// const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

export default {
  components: {
    // uploadfile,
  },
  data() {
    return {
      uploaddatainit: {
        upfileslist: [],
        maxnumber: 5,
        issingle: false, //除了图片之外的资源设置为true(单文件上传模式)
        imgSize: [
          {
            w: "",
            h: "",
          },
        ],
        // filetype
        //'1':图片（只要常用的图片类型:image/gif,image/jp2,image/jpeg,image/png）
        //'1.all':图片 (所有)
        // '2':音频
        // '3':视频
        // '4':zip文件
        // '5':办公文件 MS 及 wps
        // '6':html css js相关
        filetype: "1",
        getwangsu_token_prams: 1, //云存储的存储目录
      },
      defaultfileslist: [],

      //   agoraRTC开始
      agorartc: {
        // 用来放置本地客户端
        client: null,
        // 用来放置本地音视频频轨道对象
        localAudioTrack: null,
        localVideoTrack: null,
      },
      agoraoptions: {
        // 这里需要替换成你自己项目的 APP ID
        appId: "a85084bad559490da05eb0bd7fd0addc",
        // 目标频道名
        channel: "demo_channel_name",
        // 如果你的项目开启了 Token 鉴权，这里填写生成的 Token 值
        token: null,
      },

      agorauid: "", //频道内每个用户的UID是唯一的。 Agora 自动分配一个 UID 并在 join 的结果中返回
      //   agoraRTC结束
    };
  },
  computed: {},
  methods: {
    upfileslistchange(listdata) {
      console.log(listdata);
      this.defaultfileslist = listdata;
    },
    getuserlevelquities() {
      let zs = this;
      let userId = zs.$store.state.user.userid
        ? zs.$store.state.user.userid
        : "";
      this.api.test
        .userlevelequities({
          userId,
        })
        .then(res => {
          if (res.data.code == 1) {
            zs.$toast(res.data.info);
          } else {
            zs.$toast(res.data.info);
          }
        });
    },
    // // 1 创建本地客户端  agoraRTC初始化
    // agoraRTCinit() {
    //   this.agorartc.client = AgoraRTC.createClient({
    //     mode: "rtc",
    //     codec: "h264",
    //   });
    //   this.agorartcjoin(); //加入目标频道
    //   this.agorartcpublish(); //创建并发布本地音视频轨道
    // },
    // // 2 加入目标频道
    // agorartcjoin() {
    //   console.log("2加入目标频道");
    //   let zs = this;

    //   this.agorauid = async () => {
    //     // await playerContainer.remove();
    //     this.agorauid = await this.agorartc.client.join(
    //       zs.agoraoptions.appId,
    //       zs.agoraoptions.channel,
    //       zs.agoraoptions.token,
    //       null
    //     );
    //   };
    //   //   this.agorauid = await this.agorartc.client.join(
    //   //     zs.agoraoptions.appId,
    //   //     zs.agoraoptions.channel,
    //   //     zs.agoraoptions.token,
    //   //     null
    //   //   );
    // },
    // // 3 创建并发布本地音视频轨道
    // agorartcpublish() {
    //   console.log("3创建并发布本地音视频轨道");
    //   // 通过采集麦克风创建本地音频轨道对象
    //   //   this.agorartc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    //   this.agorartc.localAudioTrack = async () => {
    //     await AgoraRTC.createMicrophoneAudioTrack();
    //   };
    //   // 通过采集摄像头创建本地视频轨道对象
    //   //   this.agorartc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    //   this.agorartc.localVideoTrack = async () => {
    //     await AgoraRTC.createCameraVideoTrack();
    //   };
    //   // 将这些音视频轨道对象发布到频道中
    //   //   await this.agorartc.client.publish([
    //   //     this.agorartc.localAudioTrack,
    //   //     this.agorartc.localVideoTrack,
    //   //   ]);
    //   //   console.log("publish success!");
    //   async () => {
    //     await this.agorartc.client.publish([
    //       this.agorartc.localAudioTrack,
    //       this.agorartc.localVideoTrack,
    //     ]);
    //     console.log("publish success!");
    //   };
    // //   console.log(this.agorartc.localAudioTrack);
    // //   console.log(this.agorartc.localVideoTrack);

    //   this.agorartcclientonpublished(); //订阅远端用户
    //   this.agorartcclientonunpublished(); //监听 远端用户取消发布/远端用户离开了频道 的事件
    // },
    // //4 订阅远端用户
    // agorartcclientonpublished() {
    //   console.log("4订阅远端用户");
    //   this.agorartc.client.on("user-published", async (user, mediaType) => {
    //     // 开始订阅远端用户
    //     // await this.agorartc.client.subscribe(user);
    //     async () => {
    //       await this.agorartc.client.subscribe(user);
    //     };
    //     console.log("订阅远端用户subscribe success");
    //     if (mediaType === "video" || mediaType === "all") {
    //       // 当订阅完成后，就可以从 `user` 中获取远端视频轨道对象了
    //       const remoteVideoTrack = user.videoTrack;
    //       // 动态插入一个 DIV 节点作为播放远端视频轨道的容器
    //       const playerContainer = document.createElement("div");
    //       // 给这个 DIV 节点指定一个 ID，这里指定的是远端用户的 UID
    //       playerContainer.id = user.uid;
    //       playerContainer.style.width = "640px";
    //       playerContainer.style.height = "480px";
    //       document.body.append(playerContainer);
    //       // 订阅完成，播放远端音视频
    //       // 让 SDK 在这个节点下创建相应的播放器播放远端视频
    //       remoteVideoTrack.play(playerContainer);
    //     }
    //     if (mediaType === "audio" || mediaType === "all") {
    //       // 当订阅完成后，就可以从 `user` 中获取远端音视频轨道对象了
    //       const remoteAudioTrack = user.audioTrack;
    //       // 播放音频因为不会有画面，不需要提供 DOM 元素的信息
    //       remoteAudioTrack.play();
    //     }
    //   });
    // },
    // //4.4 监听 远端用户取消发布/远端用户离开了频道 的事件
    // agorartcclientonunpublished() {
    //   console.log("4.4监听远端用户取消发布/远端用户离开了频道 的事件");
    //   this.agorartc.client.on("user-unpublished", user => {
    //     // 获取刚刚动态创建的 DIV 节点
    //     const playerContainer = document.getElementById(user.uid);
    //     // 销毁这个节点
    //     async () => {
    //       await playerContainer.remove();
    //     };
    //   });
    // },
    // //5 离开频道
    // agorartcleaveCall() {
    //   console.log("5离开频道");
    //   // 销毁本地音视频轨道
    //   this.agorartc.localAudioTrack.close();
    //   this.agorartc.localVideoTrack.close();

    //   // 遍历远端用户
    //   this.agorartc.client.remoteUsers.forEach(user => {
    //     // 销毁动态创建的 DIV 节点
    //     const playerContainer = document.getElementById(user.uid);
    //     playerContainer && playerContainer.remove();
    //   });

    //   // 离开频道
    //   this.agorartc.client.leave();
    // },
    // 1.初始化客户端
    agoraRTCinit() {
      this.rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });
      this.rtc.client.init(
        this.agoraoptions.appId,
        function() {
          console.log("init success");
        },
        err => {
          console.error(err);
        }
      );
    },
    // 2.设置用户角色
    setClientRole(){
      // The value of role can be "host" or "audience".
      let role = "host";
      this.rtc.client.setClientRole(role); 
    },
    // 3.1观众
    // 3.1.1观众加入频道
    audiencejoin(){
      // Join a channel
      let zs = this;
      this.rtc.client.join(this.agoraoptions.token ? this.agoraoptions.token : null, this.agoraoptions.channel, this.agoraoptions.uid ? +this.agoraoptions.uid : null, function (uid) {
          console.log("join channel: " + this.agoraoptions.channel + " success, uid: " + uid);
          zs.rtc.params.uid = uid;
        }, function(err) {
          console.error("client join failed", err)
      })
    },
    // 3.2主播
    // 3.2.1主播 创建本地流
    createlocalStream(){
      let zs = this;
      zs.rtc.localStream = AgoraRTC.createStream({
        streamID: zs.rtc.params.uid,
        audio: true,
        video: true,
        screen: false,
      })
    },
    // 3.2.2主播 初始化本地流
    streaminit(){
      let zs = this;
      zs.rtc.localStream.init(function () {
        console.log("init local stream success");
        // play stream with html element id "local_stream"
        zs.rtc.localStream.play("local_stream");
      }, function (err) {
        console.error("init local stream failed ", err);
      });
    },
    // 3.2.2主播 发布本地流
    clientpublish(){
      let zs = this;
      zs.rtc.client.publish(zs.rtc.localStream, function (err) {
        console.log("publish failed");
        console.error(err);
      })
    },
  },
  mounted() {
    this.agoraRTCinit();
    // this.getuserlevelquities();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang="less" scoped>
//@import url()
</style>

<style lang="less">
//@import url()
</style>
