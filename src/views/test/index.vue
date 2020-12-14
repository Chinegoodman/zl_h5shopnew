<!-- 组件说明 -->
<template>
  <div class="testwrap">
    测试页面
    <hr />
    query{{ this.$route.query }} <br />
    params{{ this.$route.params }} <br />
    <!-- <uploadfile :defaultfileslist="defaultfileslist" :uploaddatainit="uploaddatainit" @_upfileslistchange="upfileslistchange"></uploadfile> -->
    <uploadfile
      :canedit="true"
      :uploaddatainit="uploaddatainit"
      :defaultfileslist="defaultfileslist"
      @_upfileslistchange="upfileslistchange"
    ></uploadfile>
  </div>
</template>

<script>
// import uploadfile from "@/components/uploadfile_multiple.vue";
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
    };
  },
  computed: {},
  methods: {
    upfileslistchange(listdata) {
      console.log(listdata);
      this.defaultfileslist = listdata;
    },
    // 登录 用户 获取 等级信息
    getuserlevelquities() {
      let zs = this;
      let userId = zs.$store.state.user.userid
        ? zs.$store.state.user.userid
        : "";
      if (!userId) return;
      this.api.test
        .userlevelequities({
          userId,
        })
        .then((res) => {
          if (res.data.code == 1) {
            zs.$toast(res.data.info);
          } else {
            zs.$toast(res.data.info);
          }
        });
    },
    // token 权限验证体系 接口 本地express api 模拟测试 403  token过期
    expressapi_tokenapifn() {
      let zs = this;
      this.api.test
        .expressapi_tokenapi({
        })
        .then((res) => {
          console.log(res);
        });
    },
    // token 权限验证体系 接口 本地express api 模拟测试  200  token正常
    expressapi_tokenapifn2() {
      let zs = this;
      this.api.test
        .expressapi_tokenapi2({
        })
        .then((res) => {
          console.log(res);
        });
    },
  },
  mounted() {
    // this.getuserlevelquities();
    // this.expressapi_tokenapifn();
    this.expressapi_tokenapifn2();
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
