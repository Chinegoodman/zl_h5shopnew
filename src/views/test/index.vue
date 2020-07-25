<!-- 组件说明 -->
<template>
    <div class='testwrap'>
        这是测试页面 自动打包
        <hr>
        query{{this.$route.query}} <br>
        params{{this.$route.params}} <br>
        <uploadfile :defaultfileslist="defaultfileslist" :uploaddatainit="uploaddatainit" @_upfileslistchange="upfileslistchange"></uploadfile>

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
    </div>
</template>

<script>
import uploadfile from "@/components/uploadfile_multiple.vue";
export default {
  components: {
    uploadfile,
  },
  data() {
    return {
      uploaddatainit: {
        // upfileslist:[],
        maxnumber: 4,
        issingle: false, //除了图片之外的资源建议设置为true(单文件上传模式)
        w: "",
        h: "",
        // filetype
        //'1':图片（只要常用的图片类型:image/gif,image/jp2,image/jpeg,image/png）
        //'1.all':图片 (所有)
        // '2':音频
        // '3':视频
        // '4':zip文件
        // '5':办公文件 MS 及 wps
        // '6':html css js相关
        filetype: "1",
      },
      defaultfileslist: [],
    };
  },
  computed: {},
  methods: {
    upfileslistchange(listdata) {
      console.log(listdata);
      // this.uploaddatainit.upfileslist = listdata;
    },
    getuserlevelquities(){
        let zs = this;
        let userId = zs.$store.state.user.userid?zs.$store.state.user.userid:'';
        this.api.test.userlevelequities({
            userId
        }).then(res=>{
          if(res.data.code==1){
            zs.$toast(res.data.info);
          }else{
            zs.$toast(res.data.info);
          }
        })
    }
  },
  mounted() {
      this.getuserlevelquities();
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

<style lang='less' scoped>
//@import url()
</style>

<style lang='less'>
//@import url()
</style>