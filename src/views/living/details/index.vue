<!-- 组件说明 -->
<template>
  <div class="videoswrapout">
    <!-- 直播中、、、 -->
    <div v-if="livingendstatus" class="videoswrap"  @click.capture="videoplay">
      <div class="video">
        <div id="videodom"></div>
      </div>
      <!-- video之外的部分 -->
      <div class="video-content">
        <!-- 店主名称与关闭 -->
        <div class="content-top">
          <div class="clearfix">
            <div class="dzname clearfix" @click.stop="returnfn">
              <div class="dznamepic">
                <img v-if="livinglidata.face_url" :src="livinglidata.face_url" alt="抓周" />
              </div>
              <div class="dzguankan">
                <img src="./../../../assets/imgs/living/details/quite.png" alt />
              </div>
              <div class="dznamemass">
                <div class="nametit _txtov1">{{livinglidata.nickname}}</div>
                <div class="looknum">
                  <span class="_txtov1" v-if="livinglidata.realcount!=''">{{livinglidata.realcount}}人在观看</span>
                </div>
              </div>
              <div class="dznamegz" v-if="livinglidata.is_attention==3 || livinglidata.is_attention== null" @click.stop="follow(false)">
                <img src="./../../../assets/imgs/living/details/attention.png">
              </div>
              <div class="dznamegz" v-if="livinglidata.is_attention==1 || livinglidata.is_attention== 2" @click.stop="follow(true)">已关注</div>
            </div>
            <div class="complaints">
              <img src="./../../../assets/imgs/living/details/complaints.png" alt="抓周" />
            </div>
            <div class="dznameid" @click.stop="returnfn">
              <span>ID:{{livinglidata.id}}</span>
            </div>
            <div class="close" @click.stop="$router.go(-1);">
              <img src="./../../../assets/imgs/living/details/close.png" alt="抓周" />
            </div>
          </div>
        </div>
        <!-- 商品与任务 -->
        <div class="content-main clearfix">
          <!-- 商品部分 -->
          <div class="main-left clearfix" v-if="currentgood!='' && currentgood!=null && currentgood!=undefined">
          <!-- <div class="main-left clearfix" v-if="currentgood!='' && currentgood!=null && currentgood!=undefined" v-for="(item,index) in goodsList" :key="index"> -->
            <div class="videosp" @click.stop="gotodetails(currentgood.sku_id)">
              <img :src="currentgood.goods_image" alt="抓周" />
            </div>
            <div class="videospj" @click.stop="gotodetails(currentgood.sku_id)">

              <img src="./../../../assets/imgs/living/details/buy.png" alt="抓周" /></div>
            <!-- <div class="videosp" @click.stop="gotodetails(item.sku_id)">
              <img :src="item.goods_image" alt="抓周" />
            </div>
            <div class="videospj" @click.stop="gotodetails(item.sku_id)">立即购买</div> -->
          </div>
          <!-- 任务部分 -->
          <!-- <div class="main-right" v-if="false">
            <div class="renwbox">
              <div class="videorwpic">
                <img src="./../../../assets/imgs/living/details/renwu.png" alt />
              </div>
              <div class="renwutxt">未知任务</div>
            </div>
            <div class="renwbox">
              <div class="videorwpic">
                <img src="./../../../assets/imgs/living/details/renwu.png" alt />
              </div>
              <div class="renwutxt">未知任务</div>
            </div>
            <div class="renwbox">
              <div class="videorwpic">
                <img src="./../../../assets/imgs/living/details/renwu.png" alt />
              </div>
              <div class="renwutxt">未知任务</div>
            </div>
          </div> -->
        </div>
        <!-- 直播消息  聊天输入部分-->
        <div class="content-bottom">
          <!-- 消息列表 -->
          <div class="bottomchat" v-show="timgroupstatus" ref="msgboxscroll">
            <div class="msgboxwrapouter" ref="msgboxwrap">
              <div class="msgboxwrap">
                <div class="msgbox clearfix">
                    <!-- <img src="./../../../assets/imgs/living/details/tongzhi.png" alt /> -->
                    <img src="./../../../assets/imgs/living/details/living_gonggao.png" alt />
                    <p class="name">系统公告：</p>
                    <p>抓周是一个传递正能量的平台，请文明聊天，网警24小时在线巡查；禁止传播
                      黄、赌、毒、暴力、邪教、反党性质的内容产生，违者将封号处理。</p>
                </div>
              </div>
              <div class="msgboxwrap" v-for="(item,index) in messageList" :key="index">
                <div class="msgbox clearfix" @click="shutUp_Kickout(item.talkinguid)">
                    <img v-if="item.isvip==0" src="./../../../assets/imgs/living/details/jb1.png" alt />
                    <img v-else src="./../../../assets/imgs/living/details/tongzhi.png" alt />
                    <p class="name">{{item.name}}：</p>
                    <p>{{item.msgtxt}}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- 聊天输入部分 -->
          <div class="chattalk clearfix">
            <p class="chatinp" @click="imiptshowstatus=true">你想说点什么。。。</p>
            <div class="service">
              <div class="servicepic">
                <!-- <img src="./../../../assets/imgs/living/details/tongzhi.png"> -->
                <img src="./../../../assets/logo.png">
              </div>
              <div class="servicebtn">
                <img src="./../../../assets/imgs/living/details/service.png">
              </div>
            </div>
            <div class="chatsp"  @click.stop="goodschoosestatus=true">
              <!-- <div class="chatsptxt">商品</div> -->
            </div>
            <div class="chatgd">
              <img src="./../../../assets/imgs/living/details/gengduo.png" alt />
            </div>
            <div class="chatxin">
              <!-- <div class="licknum">666</div> -->
              <div class="chatxinicon">
                <img src="./../../../assets/imgs/living/details/like.png" alt />
              </div>
            </div>
          </div>
        </div>

        
        <div class="imiptshowmb"  @click.stop="imiptshowstatus=false" v-if="imiptshowstatus">
          <div class="imiptshow" @click.stop="returnfn">
            <input type="text" autofocus="autofocus" v-model="timtxt" @keyup.enter="txtpost" />
            <p @click.stop="txtpost" style="cursor:pointer;">发送</p>
          </div>
        </div>

        <!-- 主播上架的商品 -->
        <div class="goodsboxmb" @click.stop="goodschoosestatus=false" v-if="goodschoosestatus">
          <div class="goodsbox" @click.stop="returnfn">
            <p>直播界面</p>
            <ul>
              <li class="clearfix" v-for="(item,index) in goodsList" :key="index">
                <img :src="item.goods_image" alt="抓周" @click.stop="gotodetails(item.sku_id)"/>
                <div class="details">
                  <p class="name _txtov1">{{item.goods_title}}</p>
                  <p class="guige _txtov1">{{item.sku_id}}</p>
                  <div class="shop clearfix">
                    <img v-if="item.brand_logo" :src="item.brand_logo" alt="抓周">
                    <p>{{item.brand_name}}</p>
                  </div>
                  <div class="btn red" @click.stop="goodadd(item.sku_id,item.goods_brand_id)">加入购物车</div>
                  <!-- <div class="btn gray">已添加</div> -->
                </div>
              </li>
              <li class="nogood" v-if="goodsList==null||goodsList.length==0">
                主播暂未添加商品
              </li>
            </ul>
          </div>
        </div>

        <!-- 红利人 -->
        <div @click="hlrtipsstatus=true" class="hlrtipsbtn">
          <img src="./../../../assets/imgs/living/details/hlr.png" alt="抓周" />
        </div>
        <div class="hlrtipsmb" v-if="hlrtipsstatus">
          <div class="hlrtipscontainer">
            <img @click="hlrtipsstatus=false" src="@/assets/imgs/icons/scpzsc.png" alt="抓周，红利人">
            <div class="titlebox">
              <p>红利人说明</p>
            </div>
            <ul>
              <li>
                1.平台工厂上新日抓周用户进行抓抢，第一个付款成功抓到新品宝贝的用户，拥有该新品宝贝的全平台订单专属红利分享权。                            
              </li>
              <li>
                2.该新品宝贝每成交一笔订单，黄金、k金、镶嵌、钻石、宝石、玉石等珠宝类首饰，每单分享2元红利，白银类产品，每单分享1元红利。                            
              </li>
              <li>
                3.该订单属于定制类产品不能退货，取消订单即视为自动放弃专属红利分享权。                            
              </li>
              <li>
                4.未抢到专属红利分享权的用户，订单关闭后的2个小时内可取消订单，2个小时之后由于商品属于订制商品在制作中则不能取消订单。                            
              </li>
              <li>
                5.抓周用户会员抢到的专属红利分享权，黄金、k金、镶嵌、钻石、宝石、玉石等珠宝类首饰，每单分享5元红利，白银类产品，每单分享2元红利。
              </li>
            </ul>
          </div>
        </div>
        <!-- 会员权益 -->
        <div class="hlrtipsbtn member">
          <img src="./../../../assets/imgs/living/details/member.png" alt="抓周" />
        </div>
      </div>

    </div>
    <!-- 直播结束、、 -->
    <div v-else class="livingendwrap" :style="{backgroundImage:'url('+livinglidata.face_url+')'}">
      <div class="close" @click.stop="$router.go(-1);">
        <img src="./../../../assets/imgs/living/details/cuohao.png" alt />
      </div>
      <img class="faceurl" :src="livinglidata.face_url" alt="抓周">
      <p class="name">{{livinglidata.nickname}}</p>
      <div class="enddata">
        <p>直播已结束</p>
        <span class="number">{{livinglidata.nickname}}</span>
        <span class="title">总观看人数</span>
      </div>
      <p class="followbtn" @click.stop="follow(false)">关注主播</p>
    </div>
    <!-- 确认支付弹窗界面 -->
    <div v-if="confirmordermbstatus" class="confirmordermb" @click.stop="returnfn">
      <div class="confirmorder" @click.stop="returnfn">
        <img :src="confirmorderdata.imageUrl" alt="抓周">
        <p class="name _txtov1">{{confirmorderdata.goodsTitle}}</p>
        <span class="tips">{{confirmorderdata.specInfo}}</span>
        <div class="price_number clearfix">
          <p class="price"><span>￥</span>{{confirmorderdata.currPrice}}</p>
          <p class="number">库存1件(暂无此字段)</p>
        </div>
        <div class="btn" @click.stop="confirmorderclick(confirmorderdata)">立即付款</div>
        <img @click.stop="confirmordermbstatus=false" class="confirmordermbclosebtn" src="./../../../assets/imgs/living/details/cuohao.png" alt="抓周">
      </div>
    </div>
    <!-- 管理员权限弹窗 -->
    <div class="controlmb" v-if="livingendstatus&&controlstatus">
      <div class="close" @click.stop="controlstatus=controlstatus_2=false;controlstatus_1=true">
        <img src="./../../../assets/imgs/living/details/cuohao.png" alt />
      </div>
      <div class="control" v-if="controlstatus_1">
        <p>将“某某某”用户</p>
        <div class="btn" @click="controlstatus_1=false;controlstatus_2=true;">
          <img src="./../../../assets/imgs/living/controls/jy.png" alt="抓周">
          <span>禁言</span>
        </div>
        <div class="btn" @click="tichuzbj">
          <img src="./../../../assets/imgs/living/controls/tr.png" alt="抓周">
          <span>踢出直播间</span>
        </div>
      </div>

      <div class="control control2" v-if="controlstatus_2">
        <p>将“某某某”用户</p>
        <div class="btn">
          <span>禁言3分钟</span>
        </div>
        <div class="btn">
          <span>禁言10分钟</span>
        </div>
        <div class="btn">
          <span>直播间禁言</span>
        </div>
        <div class="btn">
          <span>取消禁言</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import livingdetails from "./../../../../node_modules/yxfh5living/livingpage.js";
  // import livingdetails from "./js/index.js";
  export default livingdetails;
</script>
<style lang='less' scoped>
@import url("./css/index.less");
</style>

<style lang='less'>
</style>