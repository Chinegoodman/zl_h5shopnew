<!-- 组件说明 -->
<template>
  <div class="videoswrapout">
    <!-- 直播中、、、 -->
    <div v-if="livingendstatus" class="videoswrap"  @click.capture="videoplay" :style="{height:windowInnerHeight}">
      <div class="video" :style="{height:windowInnerHeight}">
        <div id="videodom" :style='{background : "url(" + zhibojianaddcode_bg_cover + ") no-repeat center center;backgroundSize: cover"}'></div>
      </div>
      <!-- video之外的部分 -->
      <div class="video-content" :class="{havebgpic:!hasStartstatus}" :style="{height:windowInnerHeight}">
        <!-- 店主名称与关闭 -->
        
        <div class="content-top">
          <div class="clearfix">
            <div class="dzname clearfix" @click.stop="returnfn">
              <div class="dznamepic" @click.stop="follow(false)">
                <img v-if="livinglidata.faceUrl" :src="livinglidata.faceUrl" alt="抓周" />
              </div>
              <div class="dznamemass">
                <div class="nametit _txtov1">{{livinglidata.name}}</div>
                <div class="looknum">
                  <span class="_txtov1" v-if="livinglidata.count>0">{{livinglidata.count}}人在观看</span>
                </div>
              </div>
              <div class="dznamegz" @click.stop="follow(false)">
                <img src="./../../../assets/imgs/living/details/attention.png"></div>
              <!-- <div class="dznamegz" v-if="livinglidata.is_attention==3 || livinglidata.is_attention== null" @click.stop="follow(false)">关注</div>
              <div class="dznamegz" v-if="livinglidata.is_attention==1 || livinglidata.is_attention== 2" @click.stop="follow(true)">已关注</div> -->
            </div>
            <!-- <div class="close" @click.stop="$router.go(-1);">
              <img src="./../../../assets/imgs/living/details/cuohao.png" alt="抓周" />
            </div> -->
            
            <div class="complaints">
              <img src="./../../../assets/imgs/living/details/complaints.png" alt="抓周" />
            </div>
            <div class="dznameid" @click.stop="returnfn">
              <span>ID:{{livinglidata.liveId}}</span>
            </div>
            <!-- <div class="close" @click.stop="$router.go(-1);">
              <img src="./../../../assets/imgs/living/details/close.png" alt="抓周" />
            </div> -->
          </div>
          <!-- <div class="dznameid" @click.stop="returnfn">ID:{{livinglidata.liveId}}</div> -->
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
                    <!-- <img src="./../../../assets/imgs/living/details/living_gonggao.png" alt /> -->
                    <p class="name">系统公告：</p>
                    <p class="notice">请文明发言，禁止发布违法违规内容；购买直播推荐产品请确认您拍下的链接描述与实际商品一致；切勿相信线下直接转账等非通过本平台结算的交易方式，谨防上当受骗！</p>
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
            <p class="chatinp" @click.stop="openappfn">你想说点什么。。。</p>
            <!-- <p class="chatinp" @click="imiptshowstatus=true">你想说点什么。。。</p> -->
            <div class="service" @click.stop="openappfn">
              <div class="servicepic">
                <img src="./../../../assets/logo.png">
              </div>
              <div class="servicebtn">
                <img src="./../../../assets/imgs/living/details/service.png">
              </div>
            </div>
            <div class="chatsp" @click.stop="openappfn">
            <!-- <div class="chatsp"  @click.stop="goodschoosestatus=true"> -->
            </div>
            <div class="chatgd" @click.stop="openappfn">
              <img src="./../../../assets/imgs/living/details/gengduo.png" alt />
            </div>
            <div class="chatxin" @click.stop="openappfn">
              <!-- <div class="licknum">666</div> -->
              <div class="chatxinicon">
                <img src="./../../../assets/imgs/living/details/like.png" alt />
              </div>
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
        <div v-if="false" @click="hlrtipsstatus=true" class="hlrtipsbtn">红利人 > </div>
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
        <!-- <span class="title">总观看人数</span> -->
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

    <!-- <div class="loading" v-if="openapptips">正在拉起本地app</div> -->

    <div class="videoerrdom" v-if="!canplaythroughstatus&&reloadtimes==0">
      直播正在加载中。。。
    </div>
    <div class="videoerrdom" v-if="!canplaythroughstatus&&reloadtimes>=1">
      主播可能已停止直播或网络不稳定，刷新页面试试
    </div>

    <!-- 浏览器下载及拉起 start-->
     <div class="openappbtnsbox-w" v-if="openappbtns" @click="openappbtns=false">
      <div class="openappbtnsbox">
        <div class="box_con03">
          <div class="pt_box">
            <span>
                <img src="./../../../assets/imgs/living/controls/zhuzhou_logo.png" alt="抓周">
            </span>
            <p>请登录抓周APP操作</p>
          </div>
          <div class="btn_box">
            <a class="openappbtn" :href="downloadappurl" target="_blank">下载APP</a>
            <a class="openappbtn" :href="lunchupappurl" target="_blank">启动APP</a>
          </div>
        </div>  
      </div>
    </div>  
    

    <!-- 微信打开 start-->
      <div class="openappbtnsbox-w" v-if="wxtipsstatus">
        <div class="openappbtnsbox openappbtnsbox_zbfx">
          <span class="jtfx-white"><img src="./img/jtfx-white.png" alt=""></span>
          <div class="box_con01">
              <div class="pt_box">
                <span>
                    <img src="./../../../assets/imgs/living/controls/zhuzhou_logo.png" alt="抓周">
                </span>
                <div class="con01_in" v-if="guilddownloadtype_show">
                  <p class="b">链接直播打不开</p>
                  <p>请点击右上角“···”，选择在“浏览器”中打开</p>
                  <div class="btn_box btn-box-wx">
                    <a class="openappbtn" href="https://a.app.qq.com/o/simple.jsp?pkgname=com.shop.zhualive" target="_blank">下载抓周APP</a>
                    <a class="openappbtn" target="_blank" @click="openappletcode" v-if="false">抓周小程序查看</a>
                  </div>
                </div>
                <div class="con01_code" v-if="appletcode_show">
                  <div class="applet"><img src="./img/applets-code.png" alt=""></div>
                  <p class="b">长按识别小程序码</p>
                  <p>若无法长按扫码</p>
                  <p>请截屏保存图片微信识别二维码</p>
                  <span class="close_box_w" @click="close_openappbtnsbox">
                    <img src="./img/close_box_w.png" alt="">
                  </span>
                </div>
              </div>
            </div>
       </div>
    </div>      
    <!-- 微信打开 end-->

    <!-- 直播加密 start-->
     <div class="openappbtnsbox-w" v-if="zhibojianaddcode">
      <div class="openappbtnsbox openappbtnsbox_zbjm" @click="open_openappbtnsbox_zbjm">
        <div class="box_con04">
          <div class="pt_box">
            <p>加密直播间</p>
            <span class="t">请输入邀请码</span>
            <div class="input_area">
              <input type="text" />
              <input type="text" />
              <input type="text" />
              <input type="text" />
            </div>
          </div>
          <div class="btn_box">
            <a class="openappbtn"  target="_blank">取消</a>
            <a class="openappbtn"  target="_blank">确认</a>
          </div>
        </div>  
      </div>
    </div>  
    <!-- 直播加密 end-->


  </div>
</template>

<script>
  // import livingdetailsshare from "./../../../../node_modules/yxfh5living/livingsharepage.js";
  import livingdetailsshare from "./js/index_share-es6.js";
  export default livingdetailsshare;
</script>

<style lang='less' scoped>
@import url("./css/index.less");
</style>

<style lang='less'>
.videoswrapout {
  .browsertc {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    // display: none;
    z-index: 1000;
  }

  .browsertc .browsertcinner {
    position: relative;
    background-color: #fff;
    margin: 0rem 0.3rem;
    padding: 0.52rem 0.8rem;
    border-radius: 0.1rem;
  }

  .browsertc .browsertcinner > div {
    float: left;
  }

  .browsertc .browsertcinner .browserleft {
    width: 1.54rem;
    height: 1.32rem;
    margin-right: 0.38rem;
  }

  .browsertc .browsertcinner .browserleft img {
    width: 100%;
    height: 100%;
  }

  .browsertc .browsertcinner .browserright .browserrighttit {
    font-size: 0.36rem;
    font-weight: 500;
    padding-bottom: 0.2rem;
  }

  .browsertc .browsertcinner .browserright .browserrighttxt {
    font-size: 0.28rem;
  }

  .browsertc .browsertcinner .browserzs {
    width: 1.4rem;
    height: 1.15rem;
    position: absolute;
    right: 0.13rem;
    top: 0.16rem;
  }

  .browsertc .browsertcinner .browserzs img {
    width: 100%;
    height: 100%;
  }

  .loading {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    color: #000;
    border-radius: 5px;
    box-shadow: 0 0 0 1px #000;
    padding: 5px 30px;
    font-size: 13px;
    display: none;
  }


  .videoerrdom{
    position: fixed;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    width:6rem;
    padding:0.3rem 0.2rem;
    text-align:center;
    color:#000;
    // background-color:#ccc;
    // background-color:#a1b7b4;
    background-color:#fff;
    border-radius:0.2rem;
    z-index: 100;
  }
  .pt_box {
    span{
      display: block;
      width: .86rem;
      height: .86rem;
      margin: 0 auto;
      img{
          width: 100%;;
      }  
    }
    p{
        font-size: .28rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(31,31,31,1);
        margin-top: .3rem;
    }
  }
  .btn_box{
      padding: .53rem .65em 0;
      a{
          display: inline-block;
          width: 2.3rem;
          height: .7rem;
          line-height: .7rem;
          background:rgba(255,255,255,1);
          color:rgba(255,189,4,1);
          font-size: .32rem;
          font-family:PingFang SC;
          font-weight:500;
          border-radius: .35rem;
          border:1px solid rgba(255,189,4,1);
      }
      a:last-child{
         margin-left: .3rem;
         background:rgba(255,189,4,1);
         color:rgba(255,255,255,1);
         border:1px solid rgba(255,189,4,1);
      }
  }

  .btn-box-wx{
    a{
      display: block;
      width: 3.0rem;
      margin : 0 auto;
    }
     a:last-child{
       margin: .33rem auto 0;
     }
    

  }

  .openappbtnsbox-w{
    position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: calc(100%);
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 100;
  }
  .openappbtnsbox{
    position: fixed;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    width:6.06rem;
    padding:0.5rem 0.2rem;
    text-align:center;
    color:#000;
    background-color:#fff;
    // background-color:#a1b7b4;
    border-radius:0.2rem;
    display:flex;
    justify-content: space-around;
    // box-shadow:0 0 0 0.02rem #a1b7b4;
    box-shadow:0 0 0 0.02rem #fff;
    z-index: 101;
    flex-wrap:wrap;
    &>p{
      width:100%;
      padding-bottom:0.4rem;
      font-size:0.28rem;
    }
    .openappbtn{
      cursor: pointer;
      // box-shadow:0 0 0 0.02rem #a1b7b4;
      // background-color:#a1b7b4;
      // background-color:#fff;
      // padding:0.1rem 0.2rem;
      // border-radius:0.1rem;
      // color:#fff;
      // background:linear-gradient(83deg,rgba(255,32,19,1),rgba(255,82,35,1));
      // box-shadow:0px 0.05rem 0.16rem 0px rgba(255,189,4,1);
      // box-shadow:0px 0.01rem 0.05rem 0px rgba(255,189,4,1);
    }
  }
  .openappbtnsbox_zbfx{
    background: none;
    box-shadow:none;
    width :7.5rem;
    top : 0rem;
    transform: translate(-50%, 0);
    .jtfx-white{
      display: block;
      width : 1.88rem;
      height : 1.27rem;
      position: absolute;
      right: .56rem;
      top : .23rem;
      img{
        width : 100%;
      }
    }
    .con01_in{
      margin-top : .61rem;
    }
    .pt_box{
      margin-top : 1.41rem;
      span{
        width : 1.1rem;
        height :1.1rem;
      }
    }
    .pt_box p{
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(255,255,255,1);
    }
    .pt_box p.b{
      font-size : .3rem;
      font-weight:800;
    }

    .btn-box-wx{
      padding-top : 1.41rem;
      a{
        width : 3rem;
        height: .7rem;
        line-height : .7rem;
        background:rgba(255,215,59,1);
        border-radius: .35rem;
        font-size : .26rem;
        color:rgba(31,31,31,1);
      }
      a:nth-child(2){
        background:rgba(255,255,255,1);
      }
      
    }

    .con01_code{
      width : 5.5rem;
      background:rgba(255,255,255,1);
      margin : .43rem auto 0;
      border-radius: .2rem;
      padding-bottom : .5rem;
      .applet{
        width :3.12rem;
        height : 3.12rem;
        margin : 0 auto;
        padding: .5rem 0 .45rem;
        img{
          width : 100%;
        }
      }
      p{
        ont-size: .26rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(117,117,117,1);
        margin-top : .15rem;
      }
      p.b{
        font-size: .32rem;
        font-weight:bold;
      }

      .close_box_w{
        display: block;
        width: .76rem;
        height : .76rem;
        position: absolute;
        bottom : -.66rem;
        left: 50%;;
        transform: translate(-50%, 0);
        img{
          width :100%;
        }
      }
    }

  }
  .openappbtnsbox_zbjm{
    font-family:PingFang SC;
    font-weight:500;
    padding: 0.5rem .02rem;
    .box_con04{
      .pt_box{
        p{
          margin-top:0;
        }
      }
      .t{
        display: block;
        width : 100%;
        height: .39rem;
        color:rgba(255,189,4,1);
        margin-top : .2rem;
      }
      .input_area{
        margin-top : .2rem;
        input{
          outline : none;
          width : .8rem;
          height : .8rem;
          border: 1px solid rgba(153,153,153,1);
          margin-right: .3rem;
        }
        input:last-child{
          margin-right: 0;
        }
      }
      .btn_box{
        padding-top : .3rem;
      }
      
    }
  }
}
</style>