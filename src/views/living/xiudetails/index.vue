<!-- 组件说明 -->
<template>
  <div class="videoswrapout">
    <!-- 直播中、、、 -->
    <div v-if="livingendstatus" class="videoswrap"  @click.capture="videoplay" :style="{height:windowInnerHeight}">
      <div class="video" :style="{height:windowInnerHeight}">
        <div id="videodom"></div>
      </div>
      <!-- video之外的部分 -->
      <div class="video-content" :style="{height:windowInnerHeight}">
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
                  <span class="_txtov1" v-if="livinglidata.realCount!=''">ID:{{livinglidata.virtualId}}</span>
                </div>
              </div>
              <div :class="{'dznamegz':true,'dznamegzed' : attention_flag===0}" v-if="attention_flag===0" @click.stop="follow(false)">
                关注
                <!-- <img src="./../../../assets/imgs/living/details/attention.png"> -->
              </div>
              <div class="dznamegz" v-if="attention_flag && attention_flag===1" @click.stop="follow(true)">取消关注</div>
            </div>
            <div class="dznameid" @click.stop="shellDanChangClick">
              <span>{{watchcount}}</span>
            </div>
            <div class="fens-list">
              <ul v-if="topgiftList && topgiftList.length > 0">
                <li v-for="(item,index) in topgiftList" :key="index" @click="getBasicUserInfo(item.liveId,null,item.userId)">
                  <span>
                    <img :src="item.avatar?item.avatar:'./../../../assets/imgs/living/xiudetails/xiuproduct.png'" alt="">
                  </span>
                </li>
              </ul>
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
        <!-- 大礼物start-->
        <div :class="{'biggiftnotice' : true, 'bigLiStyleGift' : bigLiStyleGiftFlag,'bigLiStyleNone' : bigLiStyleNoneFlag}" ref="bigGiftBoxElement">
          <span class="_txtov1 nm">{{bigGiftMsgone.sendUserInfo.name}}</span>
          赠送给
          <span class="_txtov1 nm">{{bigGiftMsgone.giftContent.receiveName}}</span>
          {{bigGiftMsgone.giftContent.giftName}}
          <span class="gf">
            <img :src="bigGiftMsgone.giftContent.giftIcon" alt />
          </span> 
        </div>
        <!-- 大礼物end-->
        <!-- 直播消息  聊天输入部分-->
        <div class="content-bottom">
          <!-- 消息列表 -->
          <!-- <div class="bottomchat" v-show="timgroupstatus" ref="msgboxscroll"> -->
          <div class="bottomchat" ref="msgboxscroll">
            <div class="msgboxwrapouter" ref="msgboxwrap">
              <div class="msgboxwrap">
                <div class="msgbox clearfix">
                    <!-- <img src="./../../../assets/imgs/living/details/tongzhi.png" alt /> -->
                    <!-- <img src="./../../../assets/imgs/living/details/living_gonggao.png" alt /> -->
                    <p class="name">系统公告：</p>
                    <p class="xitong">直播内容和评论中严禁出现低俗表演、着装暴露、血腥惊悚等画面，严禁炒作炫富、辱骂他人、宣扬迷信、讨论政治话题等行为，如有违反，将给与禁播或封停账号的处罚。直播中严禁诱导未成年人打赏，如发现应及时制止，否则将封禁直播。管理员24小时在线巡查，且实时接收用户举报</p>
                </div>
              </div>
              <!-- 直播消息  礼物展示部分start-->
              <!-- 小礼物start-->
              <div ref="giftwrapbox" class="giftshowbox" >
                  <ul :class="{'gift' : true,'liStyleGift' : liStyleGift_active_one,'liStyleNone' : liStyleNoneone}" v-show="giftmsgone" ref="giftelmentone">
                      <li>
                          <span class="im"><img  :src="giftmsgone.sendUserInfo.icon" alt="抓周" /></span>
                          <div class="txt">
                            <h3>{{giftmsgone.sendUserInfo.name}}</h3>
                            <span>送出{{giftmsgone.giftContent.giftName}}</span>
                          </div>
                          <span class="giftic">
                            <img :src="giftmsgone.giftContent.giftIcon">
                          </span>
                          <span :class="{'giftnum': true,'gift_icon' : giftNumFlag01}">
                            <span class="numflag">X</span>
                            <span class="num">{{giftcountall_one}}</span>
                          </span>
                        </li>
                  </ul>
                  <ul :class="{'gift' : true,'liStyleGift02' : liStyleGift_active_tow,'liStyleNone02' : liStyleNonetow}" v-show="giftmsgtwo" ref="giftelmenttow">
                      <li>
                          <span class="im"><img  :src="giftmsgtwo.sendUserInfo.icon" alt="抓周" /></span>
                          <div class="txt">
                            <h3>{{giftmsgtwo.sendUserInfo.name}}</h3>
                            <span>送出{{giftmsgtwo.giftContent.giftName}}</span>
                          </div>
                          <span class="giftic">
                            <img :src="giftmsgtwo.giftContent.giftIcon">
                          </span>
                          <span :class="{'giftnum':true,'gift_icon02':giftNumFlag02}">
                            <span class="numflag">X</span>
                            <span class="num">{{giftcountall_two}}</span>
                          </span>
                        </li>
                  </ul>
              </div>
              <!-- 小礼物end-->
              <!-- 商品讲解及新上架 start-->
              <div class="shop-instruction">
                <div class="pull-shop" v-if="newAddGoodSale.skuIDString || newAddGoodSaleMore">
                  <div class="tit">主播刚刚上架了商品</div>
                  <div class="con" v-if="newAddGoodSale.skuIDString">
                     <span class="lt">
                        <img :src="newAddGoodSale.subText" alt />
                      </span>
                      <div class="rt">
                        <span class="t">{{newAddGoodSale.text}}</span>
                        <span class="price">{{newAddGoodSale.price}}</span>
                        <span class="toguild" @click.stop="goodsListShell" >去看看</span>
                      </div>
                  </div>
                  <div class="con-more" v-if="newAddGoodSaleMore">
                    <p>主播添加了多件直播商品，快来看看是否有您心仪的商品吧</p>
                    <span class="toguild" @click.stop="goodsListShell">去看看</span>
                  </div>
                  <span class="shut" @click.stop="newAddGoodSale.skuIDString?newAddGoodSale.skuIDString=false:newAddGoodSaleMore=false" >
                    <img src="./../../../assets/imgs/living/xiudetails/tsgb.png" alt />
                  </span>
                </div>
                <div class="instruction-shop" v-if="showGoodSale && showGoodSale.liveId" @click="showGoodSale.skuId">
                  <span class="im">
                    <img :src="showGoodSale.specsImage" alt />
                  </span>
                  <span class="state"><img src="./../../../assets/imgs/living/xiudetails/jjz.png" alt /></span>
                  <span class="t">{{showGoodSale.number}}</span>
                </div>
              </div>  
              <!-- 商品讲解及新上架 end-->
              <!-- 直播消息 会员进入动画 start-->
              <div class="vip-level-anim-box" v-if="levelMsgobj.sendUserInfo.level">
                <div :class="{'anim-box-one': true,'liStyleLevelone' : liStyleLevel_active_one,'liStyleLevelOneNone' : liStyleLevelOneNone}" ref="levelElementanim">
                  <span class="lv">
                    <viplevel :lv_num="levelMsgobj.sendUserInfo.level?levelMsgobj.sendUserInfo.level:'01'"></viplevel>
                  </span>
                  <span class="vipicon" v-if="levelMsgobj.sendUserInfo.isVip">
                    <img class="vip-pic" :src="levelMsgobj.sendUserInfo.icon" alt="等级" v-if="1" />
                  </span>
                  <span class="nickname">{{levelMsgobj.sendUserInfo.name}}</span>
                  <span>开着</span>
                  <span class="zoujia-text">{{levelMsgobj.sendUserInfo.carname}}</span>
                  <span>进入直播间</span>
                  <span class="zoujia-icon">
                    <img class="vip-pic" :src="levelMsgobj.sendUserInfo.carurl" alt="等级" v-if="1" />
                  </span>
                </div>
              </div>
              <!-- 直播消息 会员进入动画 end-->
              <!-- 直播消息  礼物展示部分 end-->
              <div class="msgboxwrap" v-for="(item,index) in messageList" :key="index">
                <div class="msgbox clearfix" @click="shutUp_Kickout(item.talkinguid)">
                    <!-- <p class="name" v-if="!item.comename">{{item.name}}：</p> -->
                    <p>
                      <span class="lv" v-if="item.level > 0">
                        <viplevel :lv_num="item.level?item.level:'01'"></viplevel>
                      </span>
                      <img class="vip-pic" src="./../../../assets/imgs/personal/zhubo.png" alt="等级" v-if="item.level==-2" />
                      <span v-if="item.level==-1"></span>
                      <img class="vip-pic" src="./../../../assets/imgs/personal/vipLevel8.png" alt="等级" v-if="item.level==-1" />
                      <span :class="{'user-naem':true,'user-naem-zhubo': item.level==-2 || item.level==-1}" v-else>{{item.comename}}</span>
                      {{item.msgtxt}}
                      <span class="gift-detail" v-if="item.giftdetail">{{item.giftdetail}}</span>
                    </p>
                </div>
              </div>
            </div>
          </div>
          <!-- 聊天输入部分 -->
          <div class="chattalk clearfix">
            <p class="chatinp" @click="imiptshowstatus=true">说点啥</p>
            <!-- <div class="service">
              <div class="servicepic">
                <img src="./../../../assets/logo.png">
              </div>
              <div class="servicebtn">
                <img src="./../../../assets/imgs/living/details/service.png">
              </div>
            </div> -->
           
            
            
            <div class="close" @click.stop="returnprevpage">
              <img src="./../../../assets/imgs/living/details/close.png" alt="抓周" />
            </div>
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
            <div class="chatsp"  @click.stop="goodsListShell">
              <!-- <div class="chatsptxt">商品</div> -->
            </div>
          </div>
        </div>

        
        <div class="imiptshowmb"  @click.stop="imiptshowstatus=false" v-if="imiptshowstatus" :style="{height:windowInnerHeight}">
          <div class="imiptshow" @click.stop="returnfn">
            <input type="text" autofocus="autofocus" v-model="timtxt" @keyup.enter="txtpost" />
            <p @click.stop="txtpost" style="cursor:pointer;">发送</p>
          </div>
        </div>

        <!-- 主播上架的商品 -->
        <div class="goodsboxmb" @click.stop="goodschoosestatus=false" v-if="goodschoosestatus" :style="{height:windowInnerHeight}">
          <div class="goodsbox" @click.stop="returnfn">
            <p class="headtitle">全部商品<span v-if="goodsList.length">({{goodsList.length}})</span></p>
            <ul>
              <li class="clearfix" v-for="(item,index) in goodsList" :key="index">
                <!-- <img :src="item.goods_image" alt="抓周" @click.stop="gotodetails(item.sku_id)"/> -->
                <img :src="item.specsImage" alt="抓周" />
                <div class="details">
                  <p class="name">{{item.goodsTitle}}</p>
                  <p class="guige"><span>{{item.price.toFixed(2)}}</span><span class="sale-num">已售56件</span></p>
                  <!-- <div class="btn red" @click.stop="goodadd(item.skuId,item.goods_brand_id)">立即购买</div> -->
                  <div class="btn red" @click="opendownload">立即购买</div>
                  <!-- <div class="btn gray">已添加</div> -->
                </div>
              </li>
              <li class="nogood" v-if="goodsList==null||goodsList.length==0">
                主播暂未添加商品
              </li>
            </ul>
            <span class="closeshell" @click.stop="goodschoosestatus=false"></span>
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
        <!-- <div class="hlrtipsbtn member" @click="gotovippage">
          <img src="./../../../assets/imgs/living/details/member.png" alt="抓周" />
        </div> -->
      </div>

    </div>
    <!-- 直播结束、、 -->
    <div v-else class="livingendwrap" :style="{backgroundImage:'url('+livinglidata.cover+')'}">
       <div class="livingendinner"> </div>
        <div class="close" @click.stop="$router.go(-1)">
          <img src="./../../../assets/imgs/living/details/cuohao.png" alt />
        </div>
        <div class="innercom">
          <img class="faceurl" :src="livinglidata.faceUrl" alt="抓周">
          <p class="name">{{livinglidata.nickName}}</p>
          <div class="enddata">
            <p>直播已结束</p>
            <span class="number">{{watchcount}}</span>
            <span class="title">总观看人数</span>
          </div>
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
    <!-- 投诉建议弹层start -->
    <div class="complaints living-complaints" v-if="complaintsShellShow">
        <div class="complaints-cover" @click="closeComplaintsShellShow" ></div>
        <div class="complaints-content">
            <complaints :_livingToComplaintsFlag="livingToComplaintsFlag" @_closeComplaintsShellShow="closeComplaintsShellShow"></complaints>
        </div>
    </div>
    <!-- 投诉建议弹层end -->
    <!-- 更多弹层start -->
    <div class="moreboxfixed" v-if="moreboxshellstate">
      <div class="moreboxcover" @click="closeMoreClick"></div>
      <div class="moreboxcontent">
        <ul>
          <li @click.stop="goToXiuChangDetailShare">
            <img src="./../../../assets/imgs/living/xiudetails/fx.png" alt />
            <span class="t" >分享</span>
          </li>
          <li @click.stop="openComplaintsShell">
            <img src="./../../../assets/imgs/living/xiudetails/ts.png" alt />
            <span class="t">投诉</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 更多弹层end -->
    <!-- 单场榜单弹层start -->
    <div class="shelldanchang" v-if="shelldanchangstate" >
      <div class="danchangcover" @click="closeDanChangClick"></div>
      <div class="danchangcontent">
        <div class="tit">
           <van-tabs v-model="active">
            <van-tab
              :title="tit.category_name"
              v-for="(tit, index) in titlist"
              :key="index"
            >
              <div class="tab-title" slot="title" @click="titleclick(tit.tabindex)" >{{tit.category_name}}</div>
            </van-tab>
          </van-tabs> 
        </div>
          <div class="list-wrap" v-show="list_datatype==0">
            <van-list
            class="list"
            v-model="listloading"
            :finished="listfinished"
            :finished-text="finished_text"
            :error.sync="vanerror"
            error-text="请求失败，点击重新加载"
            :offset="10">
              <div class="li"
                    v-for="(item,index) in onlinesList"
                    :key="index"
                    :id="item.liveId"
              >
                <span class="hd">
                  <img :src="item.avatar" alt />
                </span>
                <div class="rt">
                  <span class="tit">{{item.nickName}}</span>
                  <span class="lv">
                    <viplevel :lv_num="item.level?item.level:'01'"></viplevel>
                  </span>
                </div>
              </div>
              </van-list>
            </div>
            <div class="list-wrap list-wrap-bang" v-show="list_datatype==1">
              <van-list
              class="list"
              v-model="listloading_ben"
              :finished="listfinished_ben"
              :finished-text="finished_text_ben"
              :error.sync="vanerror_ben"
              error-text="请求失败，点击重新加载"
              :offset="10">
                <div class="li"
                      v-for="(item,index) in topListByList"
                      :key="index"
                      :id="item.userId"
                >
                  <span class="hd">
                    <img :src="item.avatar" alt />
                  </span>
                  <div class="rt">
                    <span class="tit">{{item.nickName}}</span>
                     <span class="lv">
                      <viplevel :lv_num="item.level?item.level:'01'"></viplevel>
                    </span>
                    <span class="num">{{item.count}}</span>
                  </div>
                </div>
                </van-list>
              <div class="mybenbang">
                <div class="li" v-for="(item,index) in topListByList" :key="index" :id="item.userId" v-if="item.userId == $store.state.user.userid">
                 <span class="hd">
                    <img :src="item.avatar" alt />
                  </span>
                  <div class="rt">
                    <span class="tit">{{item.nickName}}</span>
                     <span class="lv">{{item.level}}
                      <viplevel :lv_num="item.level?item.level:'01'"></viplevel>
                    </span>
                    <span class="num">{{item.count}}</span>
                  </div>
                  <span class="sendgift" @click="opendownload">送礼</span>
                </div>  
              </div>  
            </div>  
      </div>
    </div>
    <!-- 单场榜单end -->
    <!-- 主播已静音start -->
    <div class="mute-box" v-if="anchormuteflag">
      <span class="im">
        <img src="./../../../assets/imgs/living/xiudetails/jingyin.png" alt />
      </span>
      <span class="t">
        主播已静音
      </span>
    </div>
    <!-- 主播已静音end -->

    <!-- 主播个人消息弹层start -->
    <div class="box-anchormsg" v-if="anchormsgshowstate">
      <div class="anchormsg-cover" @click="closeAnchormsgshell"></div>
      <div class="anchormsg-content">
        <span class="im">
          <img :src="fensAndAttention.headPortrait" alt />
        </span>
        <div class="msg">
          <span class="t">{{fensAndAttention.nickName}}</span>
          <span class="lv">
            <viplevel :lv_num="fensAndAttention.level?fensAndAttention.level:'01'"></viplevel>
          </span>
        </div>
        <div class="msgid">
          <span class="id">ID:{{fensAndAttention.virtualId}}</span>
          <span class="fz" @click="copyCurrentId(fensAndAttention.virtualId)" ><img src="./../../../assets/imgs/living/xiudetails/fz.png" alt /></span>
        </div>
        <div class="instruction">{{fensAndAttention.introduction}}</div>
        <div class="fs-gz">
          <div class="fs">
            <span class="n">{{fensAndAttention.fansTotal}}</span>
            <span class="t">粉丝</span>
          </div>
          <div class="gz">
            <span class="n">{{fensAndAttention.focusTotal}}</span>
            <span class="t">关注</span>
          </div>
        </div> 
        <div class="btm" v-if="isAnchorFlag">
          <span class="g" v-if="attention_flag===0" @click.stop="follow(false)">+关注</span>
          <span class="g" v-if="attention_flag===1" @click.stop="follow(true)">取消关注</span>
          <span class="c" @click="opentalkchanel">@TA</span>
          <span class="hm" @click="opendownload" >送礼</span>
        </div>
      </div>
    </div>
    <downloadandopenapp :covertype="covertypedata" @closeappbtnsboxclick="shutappbtnsbox"  :link_url_download="linkurldownload"  :link_url_open="linkurlopen" v-if="downloadcovershow"></downloadandopenapp>
    <!-- 主播个人消息弹层end -->
  </div>

</template>

<script>
  // import livingdetails from "./../../../../node_modules/yxfh5living/livingpage.js";
  import livingdetails from "./js/livingpage-es6.js";
  export default livingdetails;

</script>
<style lang='less' scoped>
@import url("./css/index.less");
</style>

<style lang='less'>

    .danchangcontent .tit .van-tabs{
      width : 100%;
    }
    .danchangcontent .tit .van-tabs--line .van-tabs__wrap{
      height: .88rem;
    }
    .danchangcontent .tit  .van-tab{
      // height: .5rem;
      // line-height : .5rem;
      font-size: .34rem;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(31,31,31,1);
    }
    .danchangcontent .tit .van-tab--active{
      color:rgba(255,189,79,1);
    }
    .danchangcontent .tit .van-tabs__line{
      background:rgba(255,189,4,1);
    }
    .danchangcontent .van-toast--html, .van-toast--text{
      z-index: 11000 !important;
    }

    .videoswrapout .openappbtnsbox{
      z-index: 10500;
    }
    


</style>