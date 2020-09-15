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

    <div id="video" v-if="stream_video_status">
      <div :id="'remote_video_panel_'+streamid" class="video-view">
        <div :id="'remote_video_'+streamid" class="video-placeholder">
        </div>
        <div :id="'remote_video_info_'+streamid" class="video-profile" :class="{show:streamvideoprofilestatus,hide:!streamvideoprofilestatus}">
        </div>
        <div :id="'video_autoplay_'+streamid" class="autoplay-fallback" :class="{hide:autoplaybuttonifhide}">
        </div>
      </div>
    </div>

    <button @click="agora_start('抓周')">开播</button>
    <button @click="agora_close('抓周')">关播</button>
    <!-- <button @click="agorartcleaveCall">离开频道</button> -->
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
        channel: this.$store.state.user.userid.toString(),
        // 如果你的项目开启了 Token 鉴权，这里填写生成的 Token 值
        token: null,
        uid:Number(this.$store.state.user.userid)
      },

      agorauid: "", //频道内每个用户的UID是唯一的。 Agora 自动分配一个 UID 并在 join 的结果中返回
      //   agoraRTC结束

      rtc:{
        client:{},
        params:{
          id:''
        }
      },

      stream_video_status:false,
      streamid:'',
      streamvideoprofilestatus:false,
      autoplaybuttonifhide:true,

      livingroomdata:'',
    };
  },
  computed: {},
  methods: {
    // 关播操作
    agora_close(){
      this.$toast('关播操作。。。')
    },
    // 开播操作
    agora_start(typename){
      let zs = this;
      if(!zs.ifanchor(typename)){
        zs.$toast(`登陆用户非${typename}的认证主播`);
        return
      }
      zs.createlive();
    },
    // 创建直播间
    createlive(typename){
      let zs = this;
      this.api.anchor.createlive({
        uid:zs.$store.state.user.userid,
        type:typename=='秀场'?2:typename=='电台'?3:1,
        cover:'https://xc.file.zhulihr.cn/pre/online-retailers/complaint/1600159219864.png',
        name:'psf测试',//直播名称
        notice:'psf测试公告',
        password:'',
        skuIds:'',
      }).then(res=>{
        if(res.data.code==1){
          zs.livingroomdata=res.data.data;

          zs.agoraoptions.token =res.data.data.swToken;
          let liveId='';
          liveId =res.data.data.id;
          zs.agoraRTCinit();
          let state = 1;//直播状态 0:停播，1:开播, 2: 创建未开播
          zs.changeLiveState(liveId,state);
        }else{
          zs.$toast(res.data.info);
        }
      })
    },
    // 修改直播间状态
    changeLiveState(liveId,state){
      let zs = this;
      this.api.anchor.changeLiveState({
        liveId,
        state
      }).then(res=>{
        if(res.data.code==1){
          zs.$toast(res.data.info);
        }else{
          zs.$toast(res.data.info);
        }
      })
    },
    // 是否是主播身份？
    ifanchor(name){
      let zs = this;
      switch (name) {
        case '抓周':
          if(zs.$store.state.user.userdata.anchorPermissions.indexOf(1)>-1){
            return true;
          }else{
            return false;
          }
          // break;
        case '秀场':
          if(zs.$store.state.user.userdata.anchorPermissions.indexOf(2)>-1){
            return true;
          }else{
            return false
          }
          // break;
        case '电台':
          if(zs.$store.state.user.userdata.anchorPermissions.indexOf(1)>-1){
            return true;
          }else{
            return false
          }
          // break;
        default:
          break;
      }
    },
    // 文件上传
    upfileslistchange(listdata) {
      switch (key) {
        case value:
          
          break;
      
        default:
          break;
      }
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
    // 1.初始化客户端
    agoraRTCinit() {
      let zs = this;
      this.rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });
      this.rtc.client.init(
        this.agoraoptions.appId,
        function() {
          console.log("init success");
          zs.setClientRole();
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
      this.createlocalStream();
      this.streaminit();
    },
    // 3.1观众
    // 3.1.1观众加入频道
    audiencejoin(){
      // Join a channel
      let zs = this;
      this.rtc.client.join(this.agoraoptions.token ? this.agoraoptions.token : null, this.agoraoptions.channel, this.agoraoptions.uid ? +this.agoraoptions.uid : null, function (uid) {
      // this.rtc.client.join(this.agoraoptions.token ? this.agoraoptions.token : null, this.agoraoptions.channel, this.agoraoptions.uid ? +this.agoraoptions.uid : null, function (uid) {
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

        zs.clientpublish();
      }, function (err) {
        console.error("init local stream failed ", err);
        zs.$toast(err.info);
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
    // 4.1订阅远端流
    streamadded(){
      let zs = this;
      zs.rtc.client.on("stream-added", function (evt) {  
        var remoteStream = evt.stream;
        var id = remoteStream.getId();
        if (id !== zs.rtc.params.uid) {
          zs.rtc.client.subscribe(remoteStream, function (err) {
            console.log("stream subscribe failed", err);
          })
        }
        console.log('stream-added remote-uid: ', id);
      });
    },
    // 4.2订阅成功后播放远端流
    remotestreamplay(){
      let zs = this;
      zs.rtc.client.on("stream-subscribed", function (evt) {
        var remoteStream = evt.stream;
        var id = remoteStream.getId();
        // Add a view for the remote stream.
        zs.addView(id);
        // Play the remote stream.
        remoteStream.play("remote_video_" + id);
        console.log('stream-subscribed remote-uid: ', id);
      })
    },
    // 5.监听远端流被移除时（例如远端用户调用了 Stream.unpublish）， 停止播放该流并移除它的画面
    streamremoved(){
      let zs = this;
      zs.rtc.client.on("stream-removed", function (evt) {
        var remoteStream = evt.stream;
        var id = remoteStream.getId();
        // Stop playing the remote stream.
        remoteStream.stop("remote_video_" + id);
        // Remove the view of the remote stream. 
        zs.removeView(id);
        console.log('stream-removed remote-uid: ', id);
      })
    },

    // 6.离开频道 （用户？）
    selfleave(){
      let zs = this;
      zs.rtc.client.leave(function () {
        // Stop playing the local stream
        zs.rtc.localStream.stop();
        // Close the local stream
        zs.rtc.localStream.close();
        // Stop playing the remote streams and remove the views
        while (zs.rtc.remoteStreams.length > 0) {
          var stream = zs.rtc.remoteStreams.shift();
          var id = stream.getId();
          stream.stop();
          zs.removeView(id);
        }
        console.log("client leaves channel success");
      }, function (err) {
        console.log("channel leave failed");
        console.error(err);
      })
    },


    // 开始直播
    addView(id,show){
      console.log(`开始直播${id}`);
      let zs = this;
      zs.streamid= id;
      if(show){
        zs.streamvideoprofilestatus=true;
      }

    },
    // 结束直播
    removeView(id){
      console.log(`结束直播${id}`);
      let zs = this;
      zs.streamid= id;
    },

    

  },
  mounted() {
    // this.agoraRTCinit();
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
