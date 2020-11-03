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

    <div id="local_stream" style="height:400px;"></div>
    <!-- <div id="video" style="height:100px;background:#ccc;margin:5px auto;" v-if="false"> -->
    <div id="video" style="height:100px;background:#ccc;margin:5px auto;" v-if="stream_video_status">
      <div :id="'remote_video_panel_'+streamid" class="video-view">
        <div :id="'remote_video_'+streamid" class="video-placeholder">
        </div>
        <div :id="'remote_video_info_'+streamid" class="video-profile" :class="{show:streamvideoprofilestatus,hide:!streamvideoprofilestatus}">
        </div>
        <div :id="'video_autoplay_'+streamid" class="autoplay-fallback" :class="{hide:autoplaybuttonifhide}">
        </div>
      </div>
    </div>
    <!-- 电脑设备信息 -->
    <div class="dev_list" v-show="dev_list_status">
      <div class="voicedom">
        <strong>音频音频</strong>
        <ul>
          <li @click="selectedMicrophone_index=index" :class="{select:selectedMicrophone_index==index}" v-for="(item,index) in selectedMicrophoneArr" :key="index">设备名：{{item.label}}<br/>设备ID：{{item.deviceId}}<br/>设备组ID：{{item.groupId}}</li>
        </ul>
      </div>
      <div class="voicedom">
        <strong>视频设备</strong>
        <ul>
          <li @click="selectedCamera_index=index" :class="{select:selectedCamera_index==index}" v-for="(item,index) in selectedCameraArr" :key="index">设备名：{{item.label}}<br/>设备ID：{{item.deviceId}}<br/>设备组ID：{{item.groupId}}</li>
        </ul>
      </div>
    </div>
    <button @click="agora_devsearch();dev_list_status=true;">设备检测</button>
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
import { setTimeout } from 'timers';
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
        // appId: "a85084bad559490da05eb0bd7fd0addc",
        appId: "9b27bbc9b5624075809bfd4f98f3ab10",
        // 目标频道名
        channel: '',
        // 如果你的项目开启了 Token 鉴权，这里填写生成的 Token 值
        token: null,
        // uid:Number(this.$store.state.nerUser.userid)
        uid:'',

        liveStreamUrl:'',//直播推流到 网速 的流地址
      },

      agorauid: "", //频道内每个用户的UID是唯一的。 Agora 自动分配一个 UID 并在 join 的结果中返回
      //   agoraRTC结束

      rtc:{
        client:{},
        params:{
          id:''
        }
      },

      stream_video_status:true,
      streamid:'',
      streamvideoprofilestatus:false,
      autoplaybuttonifhide:true,

      livingroomdata:'',

      dev_list_status:false,//默认隐藏设备列表
      selectedMicrophoneArr:[],//麦克风==设备数组 
      selectedCameraArr:[],//摄像头==设备数组 
      selectedMicrophone_index:0,//麦克风 下标
      selectedCamera_index:0,//摄像头 下标
    };
  },
  computed: {},
  methods: {
    // 关播操作
    agora_close(){
      let zs = this;
      // this.$toast('关播操作。。。');
      this.changeLiveState(zs.livingroomdata.id,0);//直播状态 0:停播，1:开播, 2: 创建未开播
      this.selfleave();
    },
    // 开播操作
    agora_start(typename){
      let zs = this;
      if(!zs.dev_list_status){
        // 表示没有选择过设备
        zs.agora_devsearch();
      }
      if(!zs.ifanchor(typename)){
        zs.$toast(`登陆用户非${typename}的认证主播`);
        return
      }
      zs.createlive('秀场');
    },
    // 开播设备检测
    agora_devsearch(){
      let zs = this;
      AgoraRTC.getDevices(function(devices){
          var audioDevices = devices.filter(function(device){
              return device.kind === "audioinput";
          });
          var videoDevices = devices.filter(function(device){
              return device.kind === "videoinput";
          });
          zs.selectedMicrophoneArr=audioDevices;
          zs.selectedCameraArr=videoDevices;
          // var uid = Math.floor(Math.random()*10000);
          // var stream = AgoraRTC.createStream({
          //     streamID: uid,
          //     // Set audio to true if testing microphone
          //     audio: true,
          //     microphoneId: selectedMicrophoneId,
          //     // Set video to true if testing camera
          //     video: true,
          //     cameraId: selectedCameraId,
          //     screen: false
          // });

          // // Initialize the stream
          // stream.init(function(){
          //     stream.play("mic-test");
          //     // Print the audio level every 1000 ms
          //     setInterval(function(){
          //         console.log(`Local Stream Audio Level ${stream.getAudioLevel()}`);
          //     }, 1000);
          // })
      });
    },
    // 创建直播间
    createlive(typename){
      let zs = this;
      this.api.anchor.createlive({
        uid:zs.$store.state.nerUser.userid,
        type:typename=='秀场'?2:typename=='电台'?3:1,
        // cover:'https://xc.file.zhulihr.cn/pre/online-retailers/complaint/1600159219864.png',
        cover:'https://www.hxfycg.com/files/default/2019/08-14/172459b289b3153510.jpg',
        name:'psf测试',//直播名称
        notice:'psf测试de公告',
        password:'',
        skuIds:'',
      }).then(res=>{
        if(res.data.code==1){
          zs.livingroomdata=res.data.data;

          zs.agoraoptions.token =res.data.data.swToken;
          zs.agoraoptions.channel =res.data.data.id.toString();
          zs.agoraoptions.uid =Number(res.data.data.id);
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
          if(zs.$store.state.nerUser.userdata.anchorPermissions.indexOf(1)>-1){
            return true;
          }else{
            return false;
          }
          // break;
        case '秀场':
          if(zs.$store.state.nerUser.userdata.anchorPermissions.indexOf(2)>-1){
            return true;
          }else{
            return false
          }
          // break;
        case '电台':
          if(zs.$store.state.nerUser.userdata.anchorPermissions.indexOf(1)>-1){
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
      let userId = zs.$store.state.nerUser.userid
        ? zs.$store.state.nerUser.userid
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
      console.log('1.初始化客户端');
      let zs = this;
      this.rtc.client = AgoraRTC.createClient({
         mode: "live", //"live": 直播场景，有主播和观众两种用户角色主播可以收发语音/视频流 观众只能接收语音/视频，无法发送   "rtc": 通信场景，用于常见的一对一通话或群聊，频道中的任何用户可以自由说话
         codec: "h264"//codec 用于设置浏览器使用的编解码格式。如果你需要使用 Safari 12.1 及之前版本，将该参数设为 "h264"；其他情况我们推荐使用 "vp8"。
        //  不转码情况下，需要使用 AgoraRTC.createClient({mode: "live", codec: "h264"}) 模式。
      });
      this.rtc.client.init(
        zs.agoraoptions.appId,
        function() {
          console.log("init success");

          zs.setClientRole();//主播创建本地流
          zs.audiencejoin();//加入当前 声网 直播 组？吧

          zs.createlocalStream();//用户（主播）创建本地流
          zs.streaminit();//用户（主播）初始化本地流
        },
        err => {
          console.error(err);
        }
      );
    },
    // 2.设置用户角色
    setClientRole(){
      let zs = this;
      console.log('2.设置用户角色');
      // The value of role can be "host" or "audience".
      let role = "host";
      this.rtc.client.setClientRole(role); 
      // setTimeout(()=>{
      //   zs.clientpublish();
      // },5000)
    },
    // 3.1观众
    // 3.1.1观众加入频道
    audiencejoin(){
      console.log('3.1.1观众加入频道');
      // Join a channel
      let zs = this;
      // this.rtc.client.join(this.agoraoptions.token ? this.agoraoptions.token : null, this.agoraoptions.channel, this.agoraoptions.uid ? +this.agoraoptions.uid : null, function (uid) {
      this.rtc.client.join(zs.agoraoptions.token ? zs.agoraoptions.token : null, zs.agoraoptions.channel, zs.agoraoptions.uid ? Number(zs.agoraoptions.uid) : null, function (uid) {
          console.log("join channel: " + zs.agoraoptions.channel + " success, uid: " + uid);
        }, function(err) {
          console.error("client join failed", err)
      })
    },
    // 3.2主播
    // 3.2.1主播 创建本地流
    createlocalStream(){
      console.log('3.2.1主播 创建本地流');
      let zs = this;
      if(!zs.dev_list_status){
        // 表示没有选择过设备
        zs.rtc.localStream = AgoraRTC.createStream({
          // streamID: zs.rtc.params.uid,
          streamID: zs.agoraoptions.uid,
          audio: true,
          video: true,
          screen: false,
          // microphoneId: zs.selectedMicrophoneArr[zs.selectedMicrophone_index].deviceId,
          // cameraId: zs.selectedCameraArr[zs.selectedCamera_index].deviceId,
        })
      }else{
        zs.rtc.localStream = AgoraRTC.createStream({
          // streamID: zs.rtc.params.uid,
          streamID: zs.agoraoptions.uid,
          audio: true,
          video: true,
          screen: false,
          microphoneId: zs.selectedMicrophoneArr[zs.selectedMicrophone_index].deviceId,
          cameraId: zs.selectedCameraArr[zs.selectedCamera_index].deviceId,
        })
      }
    },
    // 3.2.2主播 初始化本地流
    streaminit(){
      console.log('3.2.2主播 初始化本地流');
      let zs = this;
      zs.rtc.localStream.init(function () {
        console.log("init local stream success");
        // play stream with html element id "local_stream"
        zs.rtc.localStream.play("local_stream");

        // 推流到 CDN
        zs.rtc.client.startLiveStreaming(zs.livingroomdata.liveStreamUrl, false);
        zs.$toast({
          message:'正在推送直播流..'
        })

        setTimeout(()=>{
          zs.clientpublish(); // 这个不执行 流就不往外推送了 TODO:得看看
        },0)
      }, function (err) {
        console.error("init local stream failed ", err);
        zs.$toast(err.info);
      });
    },
    // 3.2.3主播 发布本地流
    clientpublish(){
      console.log('3.2.3主播 发布本地流');
      let zs = this;
      zs.$toast.clear();
      zs.rtc.client.publish(zs.rtc.localStream, function (err) {
        console.log("publish failed");
        console.error(err);
      })
      // this.streamadded();
    },
    // 4.1订阅远端流
    streamadded(){
      console.log('4.1订阅远端流');
      let zs = this;
      zs.rtc.client.on("stream-added", function (evt) {  
        var remoteStream = evt.stream;
        var id = remoteStream.getId();
        // if (id !== zs.rtc.params.uid) {
        if (id !== zs.agoraoptions.uid) {
          zs.rtc.client.subscribe(remoteStream, function (err) {
            console.log("stream subscribe failed", err);
          })
        }
        console.log('stream-added remote-uid: ', id);
        zs.remotestreamplay();
      });
    },
    // 4.2订阅成功后播放远端流
    remotestreamplay(){
      console.log('4.2订阅成功后播放远端流');
      let zs = this;
      zs.rtc.client.on("stream-subscribed", function (evt) {
        var remoteStream = evt.stream;
        var id = remoteStream.getId();
        alert(id);
        // Add a view for the remote stream.
        zs.addView(id,true);
        // Play the remote stream.
        remoteStream.play("remote_video_" + id);
        console.log('stream-subscribed remote-uid: ', id);
      })
    },
    // 5.监听远端流被移除时（例如远端用户调用了 Stream.unpublish）， 停止播放该流并移除它的画面
    streamremoved(){
      console.log('5.监听远端流被移除');
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

    // 6.离开频道 （用户？ zhubo）
    selfleave(){
      console.log('6.离开频道');
      let zs = this;
      zs.rtc.client.leave(function () {
        // Stop playing the local stream
        zs.rtc.localStream.stop();
        // Close the local stream
        zs.rtc.localStream.close();
        // Stop playing the remote streams and remove the views
        
        // while (zs.rtc.remoteStreams.length > 0) {
        //   var stream = zs.rtc.remoteStreams.shift();
        //   var id = stream.getId();
        //   stream.stop();
        //   zs.removeView(id);
        // }
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
        zs.stream_video_status=true;
      }

    },
    // 结束直播
    removeView(id){
      console.log(`结束直播${id}`);
      let zs = this;
      // zs.streamid= id;
      
      zs.streamvideoprofilestatus=false;
      zs.stream_video_status=false;
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
.testwrap{
  padding-bottom: 2rem;
}
.dev_list{
  width: 100%;
  max-height: 300px;
  margin: 0 auto 15px;
  overflow: scroll;
  background-color: #ccc;
  color: rgb(245, 1, 1);
  .voicedom{
    strong{
      font-weight: bold;
      padding: 24px 0 0 24px;
      display: block;
    }
    ul{
      li{
        padding: 0 5px;
        margin: 5px auto;
        width: calc( 90% - 10px);
        box-sizing: border-box;
        border: 1px solid rgb(59, 7, 7);
        word-wrap: break-word;

        &.select{
          background-color: rgb(245, 1, 1);
          color: #fff;
        }
      }
    }
  }
}
</style>

<style lang="less">
//@import url()
</style>
