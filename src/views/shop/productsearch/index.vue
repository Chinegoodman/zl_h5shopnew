<!-- 组件说明 -->
import { setTimeout } from 'timers';
<template>
  <div class="identitywrap">
    <router-link class="mianbao" :to="{name:'shopindex'}" tag="div">首页 > 实名认证</router-link>
    <div class="main-tit">
        <div class="main-titinnner">
            <span class="t">资料提交的注意事项</span>
            <span class="ic"><img src="./../../../assets/imgs/icons/zy.png" alt=""/></span>
        </div>
    </div>
    <div class="mainlistbox">
        <div class="row"><span for="">真实姓名：</span><input type="text" v-model="realname" placeholder="请输入你的真实姓名" id="name" class="inputval"></div>
        <div class="row"><span for="">身份证号：</span><input maxlength="18" type="text" v-model="identitynum" placeholder="请输入你的身份证号" id="Idnumber" class="inputval"></div>
    </div>
    <div class="mainpicidentity">
        <div class="identityin">
          <div class="identitytit">请上传你的身份证正面照</div>
          <div class="identitypic">
              <div class="inputimg">
                   <uploadfile
                    :canedit="true"
                    :uploaddatainit="uploaddatainit"
                    :defaultfileslist="upimglist_one"
                    @_upfileslistchange="upfileslistchange_one"
                ></uploadfile>
              </div>
          </div>
        </div>
         <div class="identityin">
          <div class="identitytxt">请上传你的身份证反面照</div>
          <div class="identitypicfm">
              <div class="inputimg">
                   <uploadfile
                    :canedit="true"
                    :uploaddatainit="uploaddatainit"
                    :defaultfileslist="upimglist_two"
                    @_upfileslistchange="upfileslistchange_two"
                ></uploadfile>
              </div>
          </div>
        </div>  
        <div class="submitbtn">
          <span  @click="submitclick">提交审核</span>
        </div>
    </div>

  </div>
</template>

<script>
//import x from ''
export default {
  components: {},
  data() {
    return {
      realname : '',
      identitynum : '',
      /*头像上传图片数组*/
      upimglist_one: [], //图片列表
      upimglist_two: [], 
      uploaddatainit: {
          upfileslist: [],
          maxnumber: 1,
          issingle: true, //除了图片之外的资源设置为true(单文件上传模式)
          imgSize: [
              {
                  w: '',
                  h: ''
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
          getwangsu_token_prams:1,//云存储的存储目录
      },

    };
  },
  computed: {},
  methods: {
    // 上传图片
        upfileslistchange_one(listdata, file_lasttag, e,wh){
            this.upimglist_one = listdata;
            console.log('this.upimglist_one01');
            console.log(this.upimglist_one.length);
            if(listdata.length === 0){
                this.upimglist_one = [];
                return;
            }
        },
        // 上传图片
        upfileslistchange_two(listdata, file_lasttag, e,wh){
            this.upimglist_two = listdata;
            console.log('listdata02');
            console.log(listdata.length);
            if(listdata.length === 0){
                this.upimglist_two = [];
                return;
            }
        },
        //提交审核
        submitclick(){
          let that = this;
          if(!that.realname){
            that.$toast('请填写姓名!');
            return;
          }
          if(!that.identitynum){
            that.$toast('请填写身份证号!');
            return;
          }

          if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(that.identitynum) === false) {
              that.$toast('身份证输入不合法!');
              return;
          }

          if(that.upimglist_one.length <= 0){
             that.$toast('请上传身份证正面!');
             return;
          }
          if(that.upimglist_two.length <= 0){
             that.$toast('请上传身份证反面!');
             return;
          }
          that.$toast('提交成功，将在5个工作日内完成审核!');
          setTimeout(function(){
             that.$router.push({ name: "shopindex" });
          },2500);
        }
  },
  created(){
    
  },
  mounted() {
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang='less' scoped>
@import url("index.less");
</style>

<style>
  body{
    background: #763aff url("./../../../assets/imgs/icons/bg_body.png") no-repeat 0 0 ;
  }
  .identitywrap{
    width : 1200px;
    margin : 0 auto;
  }
  .identitywrap .wrap,
  .identitywrap .wrap .upload-full,
  .identitywrap .wrap .upload-full input,
  .identitywrap .wrap .prod-box-img{
    width: 280px;
    height: 220px;
  }
  .identitywrap .wrap .prod-box-img img{
    width : 100%;
    height: 100%;
  }
</style>