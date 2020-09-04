<!-- 组件说明 -->
<template>
  <div class="videoswrapout">
    <!-- 直播回放-->
    <div v-if="livingendstatus" class="videoswrap"  @click.stop="videoplay">
      <div :class="{'video':true,'video-in-wx': true}">
        <div id="videodom"></div>
      </div>
       <!-- video新增的上层播放按钮start -->
        <div class="videopalybtn" @click.stop="videoplay" v-if="defaultvideobtn">
          <img src="./../../../assets/imgs/living/xiudetails/play-btn.png" alt="">
        </div>
       <!-- video新增的上层播放按钮end -->
      <!-- video之外的部分 -->
      <div class="video-content">
        <!-- 店主名称与关闭 -->
        <div class="content-top">
          <div class="clearfix">
            <div class="dzname clearfix" @click.stop="returnfn">
              <div class="dznamepic" @click.stop="openanchormsgshell">
                <img v-if="livinglidata.faceUrl" :src="livinglidata.faceUrl" alt="抓周" />
              </div>
              <!-- <div class="dzguankan">
                <img src="./../../../assets/imgs/living/details/quite.png" alt />
              </div> -->
              <div class="dznamemass">
                <div class="nametit _txtov1">{{livinglidata.nickName}}</div>
                <div class="looknum">
                  <span class="_txtov1" v-if="livinglidata.realCount!=''">ID:{{livinglidata.id}}</span>
                </div>
              </div>
              <div :class="{'dznamegz':true,'dznamegzed' : attention_flag===0}" v-if="attention_flag===0" @click.stop="follow(false)">
                关注
                <!-- <img src="./../../../assets/imgs/living/details/attention.png"> -->
              </div>
              <div class="dznamegz" v-if="attention_flag && attention_flag===1" @click.stop="follow(true)">取消关注</div>
            </div>
            <div class="close" @click.stop="returnprevpage">
              <img src="./../../../assets/imgs/living/details/close.png" alt="抓周" />
            </div>
            <div class="dznameid" @click.stop="shellDanChangClick" v-if="false">
              <!-- <span>{{watchcount}}</span> -->
            </div>
            <div class="fens-list">
              <ul v-if="false">
                <li>
                  <span>
                    <img src="./../../../assets/imgs/living/xiudetails/xiuproduct.png" alt="">
                  </span>
                </li>
                <li>
                  <span>
                    <img src="./../../../assets/imgs/living/xiudetails/xiuproduct.png" alt="">
                  </span>
                </li>
                <li>
                  <span>
                    <img src="./../../../assets/imgs/living/xiudetails/xiuproduct.png" alt="">
                  </span>
                </li>
              </ul>
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
        </div>
        <!-- 直播消息  聊天输入部分-->
        <div class="content-bottom">
          <!-- 消息列表 -->
          <div class="bottomchat" v-show="1" ref="msgboxscroll">
            <div class="msgboxwrapouter" ref="msgboxwrap">
              <div class="msgboxwrap">
                <div class="msgbox clearfix">
                    <!-- <img src="./../../../assets/imgs/living/details/tongzhi.png" alt /> -->
                    <!-- <img src="./../../../assets/imgs/living/details/living_gonggao.png" alt /> -->
                    <p class="name">系统公告：</p>
                    <p class="xitong">直播内容和评论中严禁出现低俗表演、着装暴露、血腥惊悚等画面，严禁炒作炫富、辱骂他人、宣扬迷信、讨论政治话题等行为，如有违反，将给与禁播或封停账号的处罚。直播中严禁诱导未成年人打赏，如发现应及时制止，否则将封禁直播。管理员24小时在线巡查，且实时接收用户举报</p>
                </div>
              </div>
            </div>
          </div>
                    <!-- 聊天输入部分 -->
          <div class="chattalk clearfix">
            <p class="chatinp" @click.stop="opendownload">说点啥</p>
            <!-- <div class="service">
              <div class="servicepic">
                <img src="./../../../assets/logo.png">
              </div>
              <div class="servicebtn">
                <img src="./../../../assets/imgs/living/details/service.png">
              </div>
            </div> -->
            <div class="chatgd" @click.stop="moreClick">
              <img src="./../../../assets/imgs/living/details/gengduo.png" alt />
            </div>
            <div class="chatxin">
              <!-- <div class="licknum">666</div> -->
              <div class="chatxinicon" @click.stop="likeClick">
                <span class="praise-num" v-if="praiseCount">{{praiseCount}}</span>
                <img src="./../../../assets/imgs/living/details/like.png" alt />
                <canvas id="bubble"  width="90" height="300" class="like-fx" ></canvas>
              </div>
            </div>
            <div class="chatsp"  @click.stop="goodschoosestatus=true" v-if="false">
              <!-- <div class="chatsptxt">商品</div> -->
            </div>
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
        <div @click="hlrtipsstatus=true" class="hlrtipsbtn" v-if="false">
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
        <!-- <div class="hlrtipsbtn member" v-if="false">
          <img src="./../../../assets/imgs/living/details/member.png" alt="抓周" />
        </div> -->
      </div>
      <!-- 青少年说明start -->
      <div class="about-instruction">
          <h2>儿童/青少年使用须知</h2>
          <div class="instruction">
              抓周在未成年人的保护方面非常重视。为保护儿童和青少年个人信息的安全、身心健康，并提供更加丰富、多元的优质内容，我们涉及并开发了“儿童/青少年模式”。在该模式下，我们将挖掘和呈现更多的适合未成年人观看的优质内容，为监护人提供更丰富的管理手段，并严格的、积极的响应相关法律法规等规定，确保在该模式下我们让青少年得到更适合的内容。
          </div>
          <div class="zu">
              <p class="tit">1.共同守护儿童和青少年</p>
              <p class="t">1.1 未满14周岁的儿童 </p>
              <p class="in">如果您的孩子是未满14周岁的儿童，他/她使用抓周的正常模式，需要经过您的同意；如果您不同意他/她使用抓周的正常模式，请您为他/她设置“儿童/青少年模式”。</p>
              <p class="t">1.2 已满14周岁不满18周岁的未成年人</p>
              <p class="in">如果您的孩子是已满14周岁不满18周岁的未成年人，请您根据自主需要，选择为您的孩子设置“儿童/青少年”模式。</p>
              <p class="t">1.3 协助监护人更好地守护儿童和青少年</p>
              <p class="in">为帮助监护人控制未成年人管理使用时间，在儿童/青少年模式该模式下，每日22时至次日早6时期间无法使用抓周。</p>
              <p class="in">进入该模式后，系统将自动开启时间锁，时间锁默认设置为40分钟。单日使用时长超过触发时间，需要输入密码才可以继续使用。密码由您设置并掌握，确保您能有效引导孩子健康使用抓周。</p>
              <p class="in">您也可以进入“设置”功能内选择帮助自己的孩子打开或关闭青少年模式，实现对未成年人使用抓周的管理。</p>
          </div>
          <div class="zu">
              <p class="tit">2.保护儿童和青少年个人信息安全</p>
              <p class="in">我们采取严格的数据使用和访问制度，确保只有授权人员才可访问，并适时对数据和技术进行安全审计，确保该模式下的内容是合规、合法、健康、纯净的。</p>
          </div>
          <div class="zu">
              <p class="tit">3.保障儿童和青少年健康使用</p>
              <p class="in">我们会提供更多元与适合未成年人的优质作品，并会继续致力于对向未成年人推荐内容的质量审查和优化，让未成年人看到更多不同领域的优质内容，拓展未成年人的视野。</p>
          </div>
          <div class="zu">
              <p class="tit">4.退出儿童和青少年模式</p>
              <p class="in">如果您为您的孩子解除或退出“儿童/青少年模式”，使用者将可以使用抓周的全部功能，为保护儿童和青少年个人信息的安全、身心健康，请您慎重使用。</p>
              <p class="in">如果您有更宝贵的建议，或进行投诉，请通过tousu@zhulihr.com联系我们，我们在认真核查后，会根据您的建议或请求，在相关法律法规允许范围内进行修改，万分感谢。</p>
          </div>
      </div>
      <!-- 青少年说明 edn -->

    </div>
    <!-- 更多弹层start -->
    <div class="moreboxfixed" v-if="moreboxshellstate">
      <div class="moreboxcover" @click="closeMoreClick"></div>
      <div class="moreboxcontent">
        <ul>
          <!-- <li @click.stop="goToXiuChangDetailShare">
            <img src="./../../../assets/imgs/living/xiudetails/fx.png" alt />
            <span class="t" >分享</span>
          </li> -->
          <li @click.stop="openComplaintsShell">
            <img src="./../../../assets/imgs/living/xiudetails/ts.png" alt />
            <span class="t">举报</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 更多弹层end -->
     <downloadandopenapp :covertype="covertypedata" @closeappbtnsboxclick="shutappbtnsbox"  :link_url_download="linkurldownload"  :link_url_open="lunchupappurl" v-if="downloadcovershow"></downloadandopenapp>
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
  </div>
</template>

<script>
  import livingdetails from "./js/index-es6.js";
  export default livingdetails;
</script>
<style lang='less' scoped>
@import url("./css/index.less");
</style>

<style>
body{
  background: #763aff url("./../../../assets/imgs/icons/bg_body.png") no-repeat 0 0 ;
}
.xgplayer-skin-default .xgplayer-start{
  z-index: 1 !important;
  display: none !important;
}

</style>