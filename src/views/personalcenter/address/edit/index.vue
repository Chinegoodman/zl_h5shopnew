<template>
  <div class="edit">
    <div class="header">
      <p class="btn1" @click="deleted">删除收货地址</p>
      <img class="back" @click="goback" src="../../../../assets/imgs/follow/xiangqing@2x.png" alt />
      <span>编辑地址</span>
    </div>
    <div class="edit_address">
      <ul>
        <li>
          <span class="title1">收货人</span>
          <input type="text" v-model="editlist.name" />
        </li>
        <li>
          <span class="title1">手机号码</span>
          <input type="text" v-model="editlist.phone" />
        </li>
        <li class="clearfix">
          <span class="title1">所在地区</span>
          <div class="adgps">
            <select name="sheng" @change="ssqliandong(0)" v-model="selectdata.sheng">
              <!-- <option value="请选择">请选择</option> -->
              <option v-for="(item,index) in linkagedata.sheng" :key="index" :value="item">{{item.name}}</option>
            </select>
            <select name="shi" @change="ssqliandong(1)" v-model="selectdata.shi">
              <!-- <option value="请选择">请选择</option> -->
              <option v-for="(item,index) in linkagedata.shi" :key="index" :value="item">{{item.name}}</option>
            </select>
            <select name="qu" @change="ssqliandong(2)" v-model="selectdata.qu">
              <!-- <option value="请选择">请选择</option> -->
              <option v-for="(item,index) in linkagedata.qu" :key="index" :value="item">{{item.name}}</option>
            </select>
            <select name="street" v-model="selectdata.street">
              <!-- <option value="请选择">请选择</option> -->
              <option v-for="(item,index) in linkagedata.street" :key="index" :value="item">{{item.name}}</option>
            </select>
          </div>
        </li>
        <li>
          <span class="title1">详细地址</span>
          <input type="text" v-model="editlist.address" />
        </li>
      </ul>
      <div class="default">
        <span>
          设为默认地址<br>
          <span class="defaultts">提醒：每次下单会默认推荐使用该地址</span>
        </span>
        <p class="switch">
          <van-switch v-model="checked" size="0.5rem" inactive-color="white" active-color="rgb(106,215,107)" />
        </p>
      </div>
      <div class="btn" @click="btn">保存并使用</div>
      <div class="footer" v-if="city">
        <van-area :area-list="areaList" />
      </div>
    </div>
  </div>
</template>
<script>
import {
    //   AddressEdit,
    //   Area,
    //   Calendar,
    //   Checkbox,
    //   CheckboxGroup,
    //   CountDown,
    //   DatetimePicker,
    //   Dialog,
    //   DropdownItem,
    //   Form,
    //   Field,
    //   ImagePreview,
    //   Locale,
    //   Notify,
    //   Picker,
    //   Sku,
    //   SwipeCell,
    // ====项目中可能用到的===
    //  Uploader,
    // Tab,
    // Tabs,
    // List,
    // Lazyload,
    // Search
    // ====项目中可能用到的===
    Switch,
    Toast
    // Loading,
    // Swipe,
    // SwipeItem
} from 'vant'
  import {
    setsessionStorage,
    getsessionStorage
  } from "@/utils/index.js";
  export default {
    components: {
      vanToast : Toast,
      vanSwitch : Switch
    },
    data() {
      return {
        checked: 1,
        city: false,
        areaList: [],
        editlist: {},
        editid: "",
        adddefault: "",

        linkagedata: {
          sheng: [],
          shi: [],
          qu: [],
          street: [],
        },
        selectdata: {
          sheng: "",
          shi: "",
          qu: "",
          street: '',
        }
      };
    },
    created() {
      let that = this;
      let editdata = getsessionStorage("editdata");
      that.linkagedata.sheng = editdata.provinceLinkAge;
      that.linkagedata.shi = editdata.cityLinkAge;
      that.linkagedata.qu = editdata.areaLinkage;
      that.linkagedata.street = editdata.streetLinkage;

      that.selectdata.sheng = editdata.plink;
      that.selectdata.shi = editdata.clink;
      that.selectdata.qu = editdata.alink;
      that.selectdata.street = editdata.slink;

      that.editid = editdata.id;
      that.editlist.name = editdata.name;
      that.editlist.phone = editdata.phone;
      that.editlist.address = editdata.address;
      // that.adddefault= editdata.is_default;
      that.checked = editdata.is_default == 1 ? true : false;
    },
    computed: {},
    methods: {
      deleted() {
        // let editid = this.$route.params.editid;
        let that = this;
        let user = localStorage.getItem("user-info");
        let userj = JSON.parse(user);
        let userid = userj.userid;
        this.api.personalcenter
          .postdelete({
            id: that.editid,
            uid: userid
          })
          .then(res => {
            if (res.data.info == "请求执行成功") {
              alert("删除成功");
              this.$router.go(-1);
            }
          });
      },
      goback() {
        this.$router.go(-1);
      },
      checkcity() {
        this.city = true;
      },
      btn() {
        // let editid = this.editid;
        let that = this;
        let user = localStorage.getItem("user-info");
        let userj = JSON.parse(user);
        let userid = userj.userid;
        that.checked ? (that.adddefault = 1) : (that.adddefault = 2);
        this.api.personalcenter
          .postupdate({
            uid: userid,
            id: that.editid,
            name: this.editlist.name,
            phone: this.editlist.phone,
            // province: this.editlist.province,
            // city: this.editlist.city,
            // area: this.editlist.area,
            province: this.selectdata.sheng.name,
            city: this.selectdata.shi.name,
            area: this.selectdata.qu.name,
            street: this.selectdata.street.name,
            address: this.editlist.address,
            zipcode: 0,
            is_default: that.adddefault
          })
          .then(res => {
            if (res.data.code == 1) {
              that.$toast("修改成功");
              that.goback();
            }
          });
        console.log(this.checked);
      },
      // 省市区三级联动
      ssqliandong(type) {
        let that = this;
        // 省份变了
        if (type == 0) {
          // console.log(0);
          that.api.personalcenter
            .linkage({
              pid: that.selectdata.sheng.id
            })
            .then(res => {
              that.linkagedata.shi = res.data.data.list;
              that.selectdata.shi = "";
              that.selectdata.qu = "";
            })
        } else if (type == 1) {
          // 城市 变了
          // console.log(that.selectdata.shi);
          if (that.selectdata.shi != "" && that.selectdata.shi != undefined) {
            that.api.personalcenter
              .linkage({
                pid: that.selectdata.shi.id
              })
              .then(res => {
                that.linkagedata.qu = res.data.data.list;
                that.selectdata.qu = "";
              })
          }
        } else if (type == 2) {
          // 区 变了
          // console.log(that.selectdata.qu);
          if (that.selectdata.qu != "" && that.selectdata.qu != undefined) {
            that.api.personalcenter
              .linkage({
                pid: that.selectdata.qu.id
              })
              .then(res => {
                that.linkagedata.street = res.data.data.list;
                that.selectdata.street = "";
              })
          }
        } else if (type == -1) {
          // console.log(2);
          that.api.personalcenter
            .linkage({
              pid: 0
            })
            .then(res => {
              that.linkagedata.sheng = res.data.data.list;
            })
        }
      }
    },
    mounted() {
      // this.ssqliandong(-1);
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

<style lang='less' scoped>
  @import "./index.less";
</style>