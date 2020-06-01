<!-- 组件说明 -->
<template>
    <div class="productdetailswrap" :class="{wukong:$route.query.appname == 'wukong'}" :style="noscrollstyle">
        <!-- <van-pull-refresh :head-height="refreshheight" loosing-text="松手就刷新啦" loading-text="loading" v-model="isLoading" @refresh="onRefresh"> -->
        <div class='productdetails' id="productdetails">
            <!-- <div @click="goback" :class="{show:$route.params.webtype!=0&&topbtnstatus==true}" class="topbtn"><img src="@/assets/imgs/icons/sp-pic-fanh@2x.png" alt="返回"></div> -->
            <div @click="goback" v-if="topbtnstatus" class="topbtn"><img src="@/assets/imgs/icons/sp-pic-fanh@2x.png" alt="抓周"></div>
            
            <!-- 轮播模块 -->
            <div class="tpswiperboxfather" :class="{fixed:tpswiperboxfather}" @click="topswiperclick">
                <div class="tpswiperbox">
                    <!-- <swiper ref="swiperdom" class="topswiper" v-if="goodsBannerdata.imgarr.length>0" :options="tpswiperOption">
                        <swiper-slide class="swiper-slide" v-if="goodsBannerdata.video">
                            <video
                            x5-video-orientation="portraint"
                            x-webkit-airplay="allow"
                            playsinline="true"
                            x5-video-player-fullscreen="false"
                            style="object-fit: contain; width: 100%; display: block;"
                            :poster="goodsBannerdata.imgarr[0].url"
                            webkit-playsinline="true"
                             @click="topswiperclick" @ended="videoended" class="videodom" :class="{show:videodomstatus}" ref="videodom" preload :src="goodsBannerdata.video"></video>
                        </swiper-slide>
                        <swiper-slide class="swiper-slide" v-for="(item,index) in goodsBannerdata.imgarr" :key="index">
                            <img @click="topswiperclick" class="swiperimg" :src="item.url"/>
                        </swiper-slide>
                        <swiper-slide class="swiper-slide tips">
                            <p>左拉跳转商品介绍啦</p>
                        </swiper-slide>
                        <div class="swiper-pagination"  slot="pagination" v-if="$route.query.appname != 'wukong'"></div>
                    </swiper> -->
                    <van-swipe ref="swiperdom" class="topswiper" :loop="false" indicator-color="#FFBD04" @change="topswiperonChange">
                        <van-swipe-item class="swiper-slide" v-if="goodsBannerdata.video">
                            <video
                            x5-video-orientation="portraint"
                            x-webkit-airplay="allow"
                            playsinline="true"
                            x5-video-player-fullscreen="false"
                            style="object-fit: contain; width: 100%; display: block;"
                            :poster="goodsBannerdata.imgarr[0].url"
                            webkit-playsinline="true"
                             @click="topswiperclick" @ended="videoended" class="videodom" :class="{show:videodomstatus}" ref="videodom" preload :src="goodsBannerdata.video"></video>
                        </van-swipe-item>
                        <van-swipe-item class="swiper-slide" v-for="(item,index) in goodsBannerdata.imgarr" :key="index">
                            <img @click="topswiperclick" class="swiperimg" :src="item.url"/>
                            <!-- <img @click="topswiperclick" class="swiperimg" v-lazy="item.url"/> -->
                        </van-swipe-item>
                        <van-swipe-item class="swiper-slide tips">
                            <p>左拉跳转商品介绍啦</p>
                        </van-swipe-item>
                    </van-swipe>
                    <div class="wukong_pagination" v-if="$route.query.appname == 'wukong'">
                        <span>{{currentimgIndex_wukong+1}}</span>/<span>{{swiperlength-1}}</span>
                    </div>  
                    <img v-if="goodsBannerdata.video" @click="videoplay" src="./../../../assets/imgs/icons/sp-pic-play@2x.png" alt="抓周" class="videobtn">
                </div>
            </div>
            <!-- 商品标题及价格 关注与取关取消关注 -->
            <div class="protitlebox borderf6">
                <div class="pricebox" v-if="$route.query.appname == 'wukong'">  
                    <div class="vipprice clearfix">
                        <p><span>￥</span>{{pagebaseInfo.member_price}}</p>
                        <!-- <img src="./../../../assets/imgs/icons/sp-viphuiy@2x.png" alt="抓周"> -->
                        <p class="originalprice">￥{{pagebaseInfo.price}}</p>
                    </div>
                    <!-- <div class="originalprice">￥{{pagebaseInfo.price}}</div> -->
                </div>
                <h1 class="title _txtov2">{{pagebaseInfo.goods_title}}</h1>
                <div class="pricebox" v-if="$route.query.appname != 'wukong'">
                    <div class="vipprice clearfix">
                        <p>￥{{pagebaseInfo.member_price}}</p>
                        <!-- <img src="./../../../assets/imgs/icons/sp-viphuiy@2x.png" alt="抓周"> -->
                        <p class="originalprice">￥{{pagebaseInfo.price}}</p>
                    </div>
                    <!-- <div class="originalprice">￥{{pagebaseInfo.price}}</div> -->
                    <div class="sellsnumber" v-if="$route.query.appname != 'wukong' && pagebaseInfo.goodsSalesQuantity!=0">销量&nbsp;{{pagebaseInfo.goodsSalesQuantity}}</div>
                </div>

                <div v-if="false" @click="followgoodsadd" class="followimg" v-show="pagebaseInfo.isAttention2Goods==0||pagebaseInfo.isAttention2Goods==-1">
                    <img src="./../../../assets/imgs/icons/sp-guanz@2x.png" alt="暂未关注">
                    <!-- <span>2367</span> -->
                </div>
                <div v-if="false" @click="followgoodsdelete" class="followimg red" v-show="pagebaseInfo.isAttention2Goods==1">
                    <img src="./../../../assets/imgs/icons/sp-yiguanz@2x.png" alt="已关注">
                    <span>已关注</span>
                </div>
                <div class="tipsbox" v-if="$route.query.appname != 'wukong'">
                    <p><img src="@/assets/imgs/icons/dppz.png" alt="大牌品质，工厂价格，个性定制，创意者秀"><span>大牌品质</span></p>
                    <p><img src="@/assets/imgs/icons/gcjg.png" alt="大牌品质，工厂价格，个性定制，创意者秀"><span>工厂价格</span></p>
                    <p><img src="@/assets/imgs/icons/gxdz.png" alt="大牌品质，工厂价格，个性定制，创意者秀"><span>个性定制</span></p>
                    <p><img src="@/assets/imgs/icons/cyzx.png" alt="大牌品质，工厂价格，个性定制，创意者秀"><span>创意者秀</span></p>
                </div>
            </div>
            <!-- (马甲包)规格模块 -->
            <div class="proguige borderf6 clearfix" v-if="$route.query.appname == 'wukong'">
                <div class="guige_in">
                    <p class="sm_title">规格</p>
                    <div class="selectbox">
                        <p class="_txtov1" @click="openoptionsselect" v-if="pagebaseInfo.specs_info">已选：{{pagebaseInfo.specs_info}}</p>
                        <div class="bottom">
                            <!-- <span class="_txtov1">{{pagebaseInfo.specs_info}}</span> -->
                            <span class="_txtov1">{{productoptionsselectdata.SpecGroup[0].childSpecs[0].cname!=''?productoptionsselectdata.SpecGroup[0].childSpecs[0].cname:'默认'}}</span>
                            <span class="bt_right _txtov1">共{{pagebaseInfo.totalSpecs}}种规格可选</span>
                        </div>
                        <img @click="openoptionsselect" class="selectpic" src="./../../../assets/imgs/icons/dd-gengd@2x.png" alt="珠宝规格选择">
                    </div>
                </div>
                <div class="child clearfix baojia" v-if="false">
                    <span class="sm_title">保价</span>
                    <span class="selectbox">
                        <span class="bj_price"><span>￥</span>{{pagebaseInfo.insured_price}}</span>
                    </span>
                </div>
            </div>
            <!-- 物流相关模块 -->
            <div class="transport borderf6">
                <div class="child clearfix peisong">
                    <p class="sm_title">送至</p>
                    <div class="selectbox" @click="addressclick">
                        <p>
                            <img src="./../../../assets/imgs/icons/dd-spxqdz.png" alt="配送" v-if="$route.query.appname == 'wukong'">
                            <img src="./../../../assets/imgs/icons/dd-shoujr-l@2x.png" alt="配送" v-if="$route.query.appname != 'wukong'">
                            <span class="_txtov1" v-show="appgive.addressdata.address!=''">{{appgive.addressdata.address}}</span>
                            <span v-show="appgive.addressdata.address==''">请选择或添加收货地址</span>
                        </p>
                        <!-- TODO:与UI确认是否展示  -->
                        <div v-if="false" class="bottom _txtov1">
                            23:00前下单，顺丰次日达
                        </div>
                        <img class="selectpic" src="./../../../assets/imgs/icons/dd-gengd@2x.png" alt="地址选择">
                    </div>
                </div>
                <div class="child clearfix zhongliang" v-if="false">
                    <p class="sm_title">重量</p>
                    <div class="selectbox">
                        <p>99.99kg（含包装）</p>
                        <div class="bottom _txtov1">
                            本品：99克，首饰盒100克，外包装本品：99克，首饰盒100克，外包装
                        </div>
                    </div>
                </div>
                <div class="child clearfix baojia" v-if="$route.query.appname != 'wukong' && false">
                    <p class="sm_title">保价</p>
                    <div class="selectbox">
                        <p>￥{{pagebaseInfo.insured_price}}</p>
                    </div>
                </div>
            </div>
            <!-- (非马甲包)规格模块 -->
            <div class="proguige borderf6 clearfix" v-if="$route.query.appname != 'wukong'">
                <p class="sm_title">规格</p>
                <div class="selectbox">
                    <p class="_txtov1" @click="openoptionsselect">已选:{{pagebaseInfo.specs_info}}</p>
                    <div class="bottom">
                        <!-- <span class="_txtov1">{{pagebaseInfo.specs_info}}</span> -->
                        <span class="_txtov1">{{productoptionsselectdata.SpecGroup[0].childSpecs[0].cname!=''?productoptionsselectdata.SpecGroup[0].childSpecs[0].cname:'默认'}}</span>
                        <span class="bt_right _txtov1">共{{pagebaseInfo.totalSpecs}}种规格可选</span>
                    </div>
                    <img @click="openoptionsselect" class="selectpic" src="./../../../assets/imgs/icons/dd-gengd@2x.png" alt="珠宝规格选择">
                </div>
            </div>
            <!-- TODO: 马甲包也给隐藏掉这个店主部分 -->
            <!-- 店主信息 -->
            <div class="shopowner borderf6" v-if="$route.query.appname == 'wukong'">
                <div class="title clearfix" v-if="false">
                    <img src="./../../../assets/imgs/icons/sp-dianz-icon@2x.png" alt="店主">
                    <span>店主信息</span>
                </div>
                <div @click="checkshop(shopdata.shopId,shopdata.userId)" class="contentbox">
                    <div class="top">
                        <img class="shopicon" :src="shopdata.face_url" :alt="shopdata.shopName" @error="defImg()">
                        <img v-show="false" class="shopliving" src="./../../../assets/imgs/icons/sp-zzzbo@2x.png" alt="直播">
                        <p class="shopname _txtov1">{{shopdata.shopName}}</p>
                        <div class="shoptags clearfix">
                            <div class="shoptagchild">
                                <img src="./../../../assets/imgs/icons/dzrz.png" alt="认证店铺">
                                <span>店铺认证</span>
                            </div>
                        </div>
                        <div class="intro_wrap">
                            <p class="sign" v-if="shopdata.introduction">店铺简介：{{shopdata.introduction}}</p>
                            <p class="sign" v-else>店铺简介：暂时没有店铺介绍哟~</p>
                        </div>
                        <div class="followimg none">
                            进店逛逛
                        </div>
                    </div>
                    <div class="bottom"  v-show="false">
                        <div class="child">
                            <span>粉丝</span>
                            <span class="show">{{shopdata.funNumber}}</span>
                        </div>
                        <div class="child" v-show="shopdata.is_anchor==1">
                            <span>商品</span>
                            <span class="show">{{shopdata.goodsNum}}</span>
                        </div>
                        <div class="child">
                            <span>获赞</span>
                            <span class="show">{{shopdata.praiseNumber}}</span>
                        </div>
                    </div>
                </div>
                <div v-show="false" class="haveatalk">
                    <div class="haveatalkbtn">
                        <img src="./../../../assets/imgs/icons/sp-dianz-talk@2x.png" alt="">
                        <span>跟他聊聊</span>
                    </div>
                </div>
            </div>
            <!-- 商品评价---宝贝评价 -->
            <div v-show="false" id="pro_evaluation" class="pro_evaluation borderf6">
                <div class="top">
                    <p class="title">宝贝评价(802)</p>
                    <a href="javascript:void(0)">查看全部 ></a>
                </div>
                <!-- 评价标签==可能会涉及到没有数据时的删除隐藏 -->
                <div class="tags clearfix">
                    <p>质量好(10)</p>
                    <p>价格便宜(7)</p>
                </div>
                <!-- 买家评价列表 -->
                <ul class="buyer_evaluation_box">
                    <li>
                        <div class="buyerdata clearfix">
                            <img src="./../../../assets/logo.png" alt="买家头像">
                            <p>买家昵称</p>
                        </div>
                        <div class="buyer_evaluation _txtov3">
                            包装严实，顺风快递速度很快，第二天就送到手了！手链很漂亮，是想要的！手提袋都很不错！
                        </div>
                    </li>
                    <li>
                        <div class="buyerdata clearfix">
                            <img src="./../../../assets/logo.png" alt="买家头像">
                            <p>买家昵称</p>
                        </div>
                        <div class="buyer_evaluation">
                            包装严实，顺风快递速度很快，第二天就送到手了！手链很漂亮，是想要的！手提袋都很不错！
                        </div>
                    </li>
                </ul>
                <!-- 买家晒图 -->
                <div class="smbox show clearfix">
                    <p class="title">买家秀 (802)</p>
                    <a href="javascript:void(0)">查看全部 ></a>
                    <div class="imgbox clearfix">
                        <div v-for="(item,index) in buyershowpic" :key="index" class="buyershowpic" :style="{background:'url('+item+')'}" style="backgroundSize:cover;"></div>
                    </div>
                </div>
                <!-- 资讯列表 -->
                <div class="smbox ask clearfix">
                    <p class="title">问大家(22)</p>
                    <a href="javascript:void(0)">查看全部 ></a>
                    <ul class="list">
                        <li class="clearfix">
                            <img src="./../../../assets/logo.png" alt="askicon">
                            <p class="_txtov1">是真黄金吗？</p>
                            <span>3个回答</span>
                        </li>
                        <li class="clearfix">
                            <img src="./../../../assets/logo.png" alt="askicon">
                            <p>是实体店吗？</p>
                            <span>6个回答</span>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 商品详情===数据可能为图片可能为富文本 -->
            <div id="product_detailsbox" class="product_detailsbox">
                <p class="title title_haveline">商品详情</p>
                <!-- 情况一：图片时 -->
                <!-- <div class="imgbox">
                    <img src="./../../../assets/logo.png" alt="抓周">
                </div> -->
                <!-- 情况二：富文本时 -->
                <div class="imgbox" v-html="pagebaseInfo.goods_desc">
                </div>
            </div>
            <!-- 价格说明 -->
            <div v-show="false" class="jgsm borderf6">
                <p class="title">价格说明</p>
                <div class="jgsm_li">
                    <p>划线价格</p>
                    <span>
                        商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，<i>并非原价</i>，仅供参考。
                    </span>
                </div>
                <div class="jgsm_li">
                    <p>未划线价格</p>
                    <span>
                        商品的<i>实时标价</i>，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。
                    </span>
                </div>
                <div class="jgsm_li">
                    <span>
                        商家详情页(含主图)以图片或文字形式标注的一口价、促销价、优惠价等价格可能是在使用优惠券、减满或特定优惠活动和时段等情形下的价格，具体请以结算页面的标价、优惠条件或活动规则为准。
                    </span>
                </div>
                <div class="jgsm_li">
                    <span>
                        此说明仅当出现价格比较时有效。若商家单独对划线价格进行说明的，以商家的表述为准。
                    </span>
                </div>
            </div>
            <!-- 推荐模块 -->
            <div v-show="false" class="recommendbox">
                <p class="title title_haveline">为您推荐</p>
                <div class="recommendlistwrap">
                    <!-- <van-list
                    class="recommendlist"
                    v-model="recommendlist_loading"
                    :finished="recommendlist_finished"
                    finished-text="暂无更多，敬请期待"
                    :error.sync="recommendlist_error"
                    error-text="请求失败，点击重新加载"
                    @load="recommendlist_onLoad"
                    >
                        <van-cell
                            v-for="item in recommendlist_list"
                            :key="item"
                            :title="item"
                        >
                            ddd
                        </van-cell>
                        <div class="recommendli" v-for="(item,index) in recommendlist_list" :key="index">
                            <img src="./../../../assets/logo.png" alt="珠宝商品">
                            <div class="recommendli_title clearfix">
                                <img src="./../../../assets/logo.png" alt="icon">
                                <h2 class="_txtov2 indent">美国进口莫桑石D色18K金莫桑钻石吊坠牛头款罗子美国进口莫桑石D色18K金莫桑钻石吊坠牛头款罗子</h2>
                            </div>
                            <div class="recommendli_pricebox clearfix">
                                <p>￥1159.99</p>
                                <span class="bytips">包邮</span>
                                <span class="zstips">赠</span>
                            </div>
                            <div class="recommendli_numberbox">
                                <span>658522条评论</span>
                                <span>100%好评</span>
                            </div>
                            <div class="recommendli_linksbox">
                                <div class="shop">周生生旗舰店</div>
                                <div class="details">详情</div>
                            </div>
                        </div>
                    </van-list> -->
                    
                    <!-- <div class="recommendli" v-for="(item,index) in 5" :key="index">
                        <img src="./../../../assets/logo.png" alt="珠宝商品">
                        <div class="recommendli_title clearfix">
                            <img src="./../../../assets/logo.png" alt="icon">
                            <h2 class="_txtov2 indent">美国进口莫桑石D色18K金莫桑钻石吊坠牛头款罗子美国进口莫桑石D色18K金莫桑钻石吊坠牛头款罗子</h2>
                        </div>
                        <div class="recommendli_pricebox clearfix">
                            <p>￥1159.99</p>
                            <span class="bytips">包邮</span>
                            <span class="zstips">赠</span>
                        </div>
                        <div class="recommendli_numberbox">
                            <span>658522条评论</span>
                            <span>100%好评</span>
                        </div>
                        <div class="recommendli_linksbox">
                            <div class="shop">周生生旗舰店</div>
                            <div class="details">详情</div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
        <!-- </van-pull-refresh> -->
        <!-- 顶部导航部分 -->
        <div class="topnav show" v-if="docscroToptype!=0">
            <div class="topnavcontent">
                <p @click="goAnchor('productdetails');docscroToptype=1;" :class="{show:docscroToptype==1}">商品</p>
                <p @click="goAnchor('product_detailsbox');docscroToptype=2;" :class="{show:docscroToptype==2}">详情</p>
                <!-- <p @click="goAnchor('pro_evaluation');docscroToptype=3;" :class="{show:docscroToptype==3}">评论</p> -->
            </div>
        </div>
        <!-- 地址选择跳转确认模块--> 
        <div class="addressconfirmmb" v-if="addressconfirmstatus"  @click.stop="addressconfirmstatus=false">
            <div class="addressconfirm" @click.stop="returnfn">
                <p>您还没有收货地址哦，赶快设置一下吧</p>
                <div class="btns">
                    <div class="cancel"  @click.stop="addressconfirmstatus=false">取消</div>
                    <div class="confirm"  @click.stop="addressclicktab">去设置</div>
                </div>
            </div>
        </div>
        <!-- loading模块 -->
        <!-- <bottomloading class="havepaddingbottom" :loadingstatus="true" :loadingmsg="'正在加载哦哦哦'"></bottomloading> -->
        <!-- 引入的底部模块 -->
        <xqbottom :currentpagetype_data="currentpagetype" :isAttention_code="pagebaseInfo.isAttention2Goods" :bottom_btncolor_data="bottom_btncolor" @_gotoshoucang="gotoshoucang" @_gotoshopcart='gotoshopcart' @_gotodp="checkshop(shopdata.shopId,shopdata.userId)" @_gotokefu='gotokefu' @_openoptionsselect='openoptionsselect' :pagetype="pagetypedata" :service="service" :productoptionsselectdata="productoptionsselectdata"></xqbottom>
        <productoptionsselect :currentpagetype_data="currentpagetype" :bottom_btncolor_data="bottom_btncolor" @_buynumber='buynumber' @_addit='addit' @_buyit='buyit' @_specs_select='specs_select' @_productoptionsselectclose='closeoptionsselect' :productoptionsselectdata="productoptionsselectdata"></productoptionsselect>
        <mengban :mengbanstatus="mengbanstatus" @mengbanclick="mengbanclose"></mengban>
        <van-loading class="optionsselectloading" v-show="loadingstatus" type="spinner" color="#1989fa" vertical />

        <nodata @_reloadpage="reloadpage" class="nodatadom" :pagetype="nodatapagetypedata" v-if="nodatashow"></nodata>
    </div>
</template>

<script>
    import {setsessionStorage,getsessionStorage,} from './../../../utils/index.js'
    import {jsCallService,jsCallStore,jsCallAddressManagerfn,jsCallOrderImmediatelyfn,jsCallShoppingCartfn,jsCallLogin,jsCallAnchorPoint} from './../../../utils/appjh.js'
    //import x from ''
    import buyershowbgpic from './../../../assets/logo.png'
    import xqbottom from './../../../components/xqbottom.vue'
    // import bottomloading from './../../../components/bottomloading.vue'
    import mengban from './../../../components/mengban.vue'
    import productoptionsselect from './../../../components/productoptionsselect.vue'
    import nodata from './../../../components/nodata.vue'
    import { checkdevice } from './../../../utils/checkdevice.js'
    import { smoothgoto } from '@/utils/smoothgoto'

    export default {
        metaInfo (){
            return {
                title: this.document_title, // set a title
                meta: [
                    {                 // set meta
                        name: 'keywords',
                        content: '黄金价格实时走势中心,黄金价格,今日黄金价格,最新黄金价格,黄金价格走势,24小时走势,历史走势,走势分析图,国际黄金价格,上交所,美女直播,电商直播'
                    },
                    {
                        name:'description',
                        content:'中国黄金投资网(中国黄金网)专业提供黄金价格,中国黄金,黄金期货,黄金投资,黄金交易所,金价,黄金公司,黄金网站,黄金开户,纸黄金,黄金外汇实时图形行情资讯及实时行情服务!'
                    }
                ],
            // link: [{                 // set link
            //   rel: 'asstes',
            //   href: 'https://assets-cdn.github.com/' 
            // }]
            };
        },
        // =======================

            // webtype:0 是App;1是H5

        // =======================

        name:'productdetails',
        components: {
            xqbottom,
            // bottomloading,
            mengban,
            productoptionsselect,
            nodata
        },
        data () {
            let that = this;
            return {
                document_title:'抓周直播电商平台 - 黄金购物价格_今日黄金价格_最新黄金价格_黄金价格走势_24小时走势_历史走势_走势分析图_国际黄金价格_上交所_美元走势_美女直播_电商直播',
                nodatapagetypedata:"prodetails_nodata",//nodata组件参数
                product_skuid:'',
                topbtnstatus:false,
                // // swiper默认配置
                // tpswiperOption:{
                //     //显示分页
                //     pagination: {
                //       el: '.swiper-pagination'
                //     },
                //     //设置点击箭头
                //     // navigation: {
                //     //   nextEl: '.swiper-button-next', 
                //     //   prevEl: '.swiper-button-prev'
                //     // },
                //     //自动轮播
                //     // autoplay: {
                //     //   delay: 4000,
                //     //   //当用户滑动图片后继续自动轮播
                //     //   disableOnInteraction: false,
                //     // },
                //     autoplay:false,
                //     //开启循环模式
                //     loop: false,

                //     //小手掌抓取滑动
                //     grabCursor: true,
                    
                //     on: {
                //         //滑动开始时回调函数
                //         slideChangeTransitionStart: function() {
                //         //滑动之后回调函数
                //         // slideChangeTransitionEnd: function() {
                //             // that.currentimgIndex = this.realIndex;  //获取轮播图片下标索引；这里有一个坑，之前网上找到的是用activeIndex，但后来网上说的是这个realIndex，原来activeIndex是swiper2.0的；而realIndex是swiper3.0的，（使用realIndex才实现了下标索引）
                //             that.currentimgIndex = this.activeIndex;  
                //             that.currentimgIndex_wukong = this.activeIndex;
                //             if(that.currentimgIndex_wukong >= that.swiperlength-1){
                //                 that.currentimgIndex_wukong = that.swiperlength-2;
                //             }
                //             // console.log(that.currentimgIndex);
                //             if(that.goodsBannerdata.video){
                //                 // 如果有视频
                //                 if(that.currentimgIndex==that.swiperlength-1){
                //                         // that.swiper.slideTo(that.swiperlength-2, 1000, false);
                //                         that.$refs.swiperdom.swipeTo(that.swiperlength-2, true);//是否跳过动画 true：是跳过动画 false：不跳过动画
                //                         that.tpswiperboxfather = false;
                //                         that.goAnchor('product_detailsbox');
                //                 }else if(that.currentimgIndex != 0){ 
                //                     that.videodomstatus = false;
                //                     let video = that.$refs.videodom;
                //                     video.pause();
                //                 }
                //             }else{
                //                 // 没有视频内容
                //                 if(that.currentimgIndex==that.swiperlength-1){
                //                         // that.swiper.slideTo(that.swiperlength-2, 1000, false);
                //                         that.$refs.swiperdom.swipeTo(that.swiperlength-2, true);//是否跳过动画 true：是跳过动画 false：不跳过动画
                //                         that.tpswiperboxfather = false;
                //                         that.goAnchor('product_detailsbox');
                //                 }else if(that.currentimgIndex != 0){ 
                //                     that.videodomstatus = false;
                //                 }
                //             }
                //         }
                //     },
                // },
                goodsBannerdata:{
                    video:'',
                    gif:'',
                    imgarr:[],
                },//轮播图数据
                videodomstatus:false,//视频节点默认隐藏不显示等待点击触发
                tpswiperboxfather:false,
                currentimgIndex:0,
                currentimgIndex_wukong : 0,
                swiperlength:0,
                pagebaseInfo:'',//页面基础信息


                buyershowpic:[
                    buyershowbgpic,buyershowbgpic,buyershowbgpic,buyershowbgpic,buyershowbgpic
                ],

                // 引入的底部模块==详情页对应的值即为 productdetails
                pagetypedata:'productdetails',
                // 蒙版状态：默认为false不显示
                mengbanstatus:false,
                // 规格选择模块默认数据
                productoptionsselectdata:{
                    is_exist:1,
                    status:false,
                    SpecGroup:[
                        {
                            childSpecs:[
                                {cname:''}
                            ]
                        }
                    ],
                    specs_id:'',
                    selectshow:{
                        img:'',
                        price:'',
                        optionstxt:'请选择商品规格尺码\(≧▽≦)/',
                    }
                },

                // 文档滚动位置类别
                // 顶部(商品)为1，详情为2，商品评论为3
                docscroToptype:0,//默认在顶部同时不显示顶部导航模块

                // 下拉刷新默认参数
                // count: 0,
                // isLoading: false,
                // refreshheight:10

                // recommendbox list数据  触底加载更多
                recommendlist_list: [],
                recommendlist_error: false,
                recommendlist_loading: false,
                recommendlist_finished: false,

                // 用户模块选择结果数据
                buyerselectdata:{
                    pagebaseInfo:this.pagebaseInfo,
                    price:'',
                    number:1,
                    option:[
                        // {
                        //     title:'',
                        //     value:'',
                        // }
                    ],
                    status:false,//是否选择好最终产品与价格
                    specs_id_pinjie:'',
                    skuId:'',
                    kezhong:'',
                },
                // curr
                // APP给的信息 或者 H5缓存获取的地址信息
                appgive:{
                    addressdata:{
                        address:'',
                        addressID:''
                    },
                    // userdata:{
                    //     userID:''
                    // }
                },
                // userID:this.$route.query.userid||'',
                userID:'',
                shopdata:{
                    shopId:null,
                    userId:null,
                },

                loadingstatus:false,
                
                // APP分享需要的数据
                sharedata:{
                    "skuID":'',
                    "title":'',
                    "cover":'',
                },
                // 地址选择确认模块状态 默认为 false
                addressconfirmstatus:false,

                gotobuystatus:false,//默认为 进入页面不会执行立即购买===选择地址进入页面拿到地址后立马执行 立即购买

                gotobuystatustimer1:'',
                gotobuystatustimer2:'',

                currentpagetype:'',//当前页面类型 livingpage 为直播间打开当前页
                service:{
                    "version": '116',
                    "client":''
                },//当前页面版本小于 116 隐藏底部按钮客服
                bottom_btncolor:'',//底部按钮的app给的颜色值  直播间放的详情页的UI变更需求
                default_img_detail: require('../../../assets/logo-gray.png'),
               
                // 规格选择时 停止底部页面滚动
                noscroll:{
                    iftrue:false,
                    scrollTop:0,
                },
                nodatashow:false,
            };
        },
        computed: {
            swiper() {
                return this.$refs.swiperdom.swiper
            },
            noscrollstyle(){
                let iftrue = this.noscroll.iftrue;
                let scrollTop=this.noscroll.scrollTop;
                if(iftrue){
                    return {
                        position:'fixed',
                        top:scrollTop==''?null:-scrollTop+'px'
                    }
                }else{
                    return {
                        position:'relative',
                        // top:scrollTop==''?null:-scrollTop+'px'
                    }
                }
            }
        },
        watch:{
        },
        methods: {
            // 重新加载页面
            reloadpage(){
                this.$router.go(0);
            },
            // 顶部轮播切换事件
            topswiperonChange(activeIndex){
                //滑动开始时回调函数
                let that = this;
                that.activeIndex = activeIndex
                // slideChangeTransitionStart: function() {
                //滑动之后回调函数
                // slideChangeTransitionEnd: function() {
                    // that.currentimgIndex = this.realIndex;  //获取轮播图片下标索引；这里有一个坑，之前网上找到的是用activeIndex，但后来网上说的是这个realIndex，原来activeIndex是swiper2.0的；而realIndex是swiper3.0的，（使用realIndex才实现了下标索引）
                    that.currentimgIndex = this.activeIndex;  
                    that.currentimgIndex_wukong = this.activeIndex;
                    if(that.currentimgIndex_wukong >= that.swiperlength-1){
                        that.currentimgIndex_wukong = that.swiperlength-2;
                    }
                    // console.log(that.currentimgIndex);
                    if(that.goodsBannerdata.video){
                        // 如果有视频
                        if(that.currentimgIndex==that.swiperlength-1){
                            // that.swiper.slideTo(that.swiperlength-2, 1000, false);
                            that.$refs.swiperdom.swipeTo(that.swiperlength-2, true);//是否跳过动画 true：是跳过动画 false：不跳过动画
                            that.tpswiperboxfather = false;
                            that.goAnchor('product_detailsbox');
                        }else if(that.currentimgIndex != 0){ 
                            that.videodomstatus = false;
                            let video = that.$refs.videodom;
                            video.pause();
                        }
                    }else{
                        // 没有视频内容
                        if(that.currentimgIndex==that.swiperlength-1){
                            // that.swiper.slideTo(that.swiperlength-2, 1000, false);
                            that.$refs.swiperdom.swipeTo(that.swiperlength-2, true);//是否跳过动画 true：是跳过动画 false：不跳过动画
                            that.tpswiperboxfather = false;
                            that.goAnchor('product_detailsbox');
                        }else if(that.currentimgIndex != 0){ 
                            that.videodomstatus = false;
                        }
                    }
                // }
            },
            defImg(){
                let img = event.srcElement;
                img.src = this.default_img_detail;
                img.onerror = null;
            },
            // 返回上一页
            goback(){
                var returnflag = getsessionStorage('returnflag');
                console.log();
                if(returnflag){
                    this.$router.push({
                        path:'/shop',
                        query : {
                            tab : this.$route.query.tab
                        }});
                }else{
                    this.$router.go(-1);
                }
            },
            // 蒙版事件
            mengbanclose(){
                let zs= this;
                this.mengbanstatus=false;
                this.productoptionsselectdata.status=false;
                this.noscroll.iftrue=false;
                // let dom = document.querySelector("#app > div.shopindexwrap > div");//改变路由信息了。层级变了 需要跟进
                let dom = document.querySelector("#app > div.productdetailswrap");
                // setTimeout(() => {
                //     dom.style.top = zs.noscroll.scrollTop;
                // }, 0);
                // console.log(dom);
                
                dom.style.visibility='hidden';
                setTimeout(() => {
                    console.log(zs.noscroll.scrollTop);
                    window.scrollBy(0, zs.noscroll.scrollTop);
                    dom.style.visibility='visible';
                }, 0);
            },
            mengbanopen(){
                this.mengbanstatus=true;
                // productdetailswrap
                // let H5dom = document.querySelector("#app");
                let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                console.log(scrollTop);
                this.noscroll={
                    iftrue:true,
                    scrollTop:scrollTop,
                }
            },
            // 展示规格选择模块
            openoptionsselect(){
                this.mengbanopen();
                this.productoptionsselectdata.status=true;
            },
            // 隐藏规格选择模块
            closeoptionsselect(){
                this.mengbanclose();
                this.productoptionsselectdata.status=false;
            },
            // 视频播放
            videoplay(){
                let that = this;
                this.swiper.slideTo(0, 300, false);
                that.videodomstatus = true;
                let video = that.$refs.videodom;
                video.play();
            },
            // 视频播放完毕事件
            videoended(){
                this.videodomstatus = false;
            },
            // 顶部swiper点击查看大图事件
            topswiperclick($event){
                if($event.target.className  == 'swiperimg' || $event.target.className  == 'videodom'){
                    // console.log('topswiper点击了')
                    this.tpswiperboxfather = true;
                }
                if($event.target.className  == 'tpswiperboxfather fixed'){
                    this.tpswiperboxfather = false;
                }
            },
            // 跳转到锚链位置
            goAnchor(selectorid) {
                // alert(selectorid);
                let docFontSizeNum = document.documentElement.clientWidth / (750 / 100);
                // let anchor = this.$el.querySelector('#'+selectorid);
                let anchor = document.querySelector('#'+selectorid);

                // document.body.scrollTop = anchor.offsetTop
                // document.documentElement.scrollTop = anchor.offsetTop - 1.32*docFontSizeNum;
                // document.body.scrollTop = anchor.offsetTop - 1.32*docFontSizeNum;
                if(anchor.clientHeight >= window.innerHeight){
                    smoothgoto(anchor.offsetTop);
                }else{
                    // smoothgoto(anchor.offsetTop-window.innerHeight + anchor.clientHeight);
                    smoothgoto(anchor.offsetTop-window.innerHeight + anchor.clientHeight + 0.98*document.documentElement.clientWidth / (750 / 100) - 0.2*document.documentElement.clientWidth / (750 / 100));
                }
            },

            // 下拉刷新事件
            onRefresh() {
                this.pagedatainit();
            },
            // 商品关注接口
            followgoodsadd(){
                let that = this;
                if(!that.iflogin()){return;};
                this.api.productdetails.goodsadd({
                    // goodsid:that.pagebaseInfo.goodsId,
                    goodsid:that.product_skuid,
                    uid:that.userID,
                }).then(res=>{
                    if(res.data.info=='关注成功'){
                        that.$toast({
                            message: '商品关注成功',
                            duration: 810,
                            // forbidClick: true
                        })
                        that.pagebaseInfo.isAttention2Goods=1;
                    }else{
                        that.$toast({
                            message: '商品关注失败',
                            duration: 810,
                            // forbidClick: true
                        })
                    }
                })
            },
            // 商品取消关注接口
            followgoodsdelete(){
                let that = this;
                this.api.productdetails.goodsdelete({
                    // goodsid:that.pagebaseInfo.goodsId,
                    goodsid:that.product_skuid,
                    uid:that.userID,
                }).then(res=>{
                    if(res.data.info=='取消成功'){
                        that.$toast({
                            message: '取消关注操作成功',
                            duration: 810,
                            // forbidClick: true
                        })
                        that.pagebaseInfo.isAttention2Goods=0;
                    }else{
                        that.$toast({
                            message: '取消关注操作失败',
                            duration: 810,
                            // forbidClick: true
                        })
                    }
                })
            },
            // 店铺 关注接口
            followstoreadd(){
                let that = this;
                if(!that.iflogin()){return;};
                this.api.productdetails.storeadd({
                    storeId:that.shopdata.id,
                    uid:that.userID,
                }).then(res=>{
                    if(res.data.info=='关注成功'){
                        that.$toast({
                            message: '商品关注成功',
                            duration: 810,
                            // forbidClick: true
                        })
                        that.pagebaseInfo.isAttention2Store=1;
                    }else{
                        that.$toast({
                            message: '商品关注失败',
                            duration: 810,
                            // forbidClick: true
                        })
                    }
                })
            },
            // 店铺 取消关注接口
            followstoredelete(){
                let that = this;
                this.api.productdetails.storedelete({
                    storeId:that.shopdata.id,
                    uid:that.userID,
                }).then(res=>{
                    if(res.data.info=='取消成功'){
                        that.$toast({
                            message: '取消关注操作成功',
                            duration: 810,
                            // forbidClick: true
                        })
                        that.pagebaseInfo.isAttention2Store=0;
                    }else{
                        that.$toast({
                            message: '取消关注操作失败',
                            duration: 810,
                            // forbidClick: true
                        })
                    }
                })
            },
            // 获取商品基础信息
            getbaseInfo(){
                let that = this;
                let userid = '';
                this.api.productdetails.baseInfo({
                    skuId:that.product_skuid,
                    uid:that.userID,
                }).then(res=>{
                    // 页面基本信息
                    if(res.data.code != 1){
                        that.$toast(res.data.info);
                        that.nodatashow=true;
                        return;
                    }
                    let pagebaseInfo = res.data.data.basicInfo;
                    console.log(pagebaseInfo);

                    that.document_title=pagebaseInfo.goods_title;

                    that.sharedata.skuID=that.product_skuid;// APP分享需要的数据
                    that.sharedata.title=pagebaseInfo.goods_title;// APP分享需要的数据

                    let goodsBannernew;
                    that.pagebaseInfo=pagebaseInfo;
                    that.goodsBannerdata.imgarr=[];
                    that.buyerselectdata.skuId = pagebaseInfo.skuId;
                    that.buyerselectdata.kezhong = pagebaseInfo.gram;
                    that.buyerselectdata.price = pagebaseInfo.price;
                    that.buyerselectdata.realGoldPrice = pagebaseInfo.realGoldPrice;
                    // debugger;
                    if(pagebaseInfo.gBanner.length>0){
                        // that.goodsBannerdata.imgarr = pagebaseInfo.gBanner;
                        let gBannernew =JSON.parse(JSON.stringify(pagebaseInfo.gBanner));
                        // debugger;
                        // that.goodsBannerdata.imgarr = gBannernew.splice(0,1);
                        // gBannernew.splice(0,1);
                        that.sharedata.cover=gBannernew.splice(0,1)[0].url;// APP分享需要的数据
                        // that.goodsBannerdata.imgarr = pagebaseInfo.gBanner;
                        that.goodsBannerdata.imgarr = gBannernew;
                        that.goodsBannerdata.video = pagebaseInfo.vedioUrl; //新增视频字段
                        that.goodsBannerdata.gif = '';
                        // if(pagebaseInfo.goodsBanner.length>0){
                        //     for(let i=0;i<pagebaseInfo.goodsBanner.length;i++){
                        //         if(pagebaseInfo.goodsBanner[i].type==3){
                        //             that.goodsBannerdata.video=pagebaseInfo.goodsBanner[i];
                        //         }
                        //     }
                        // }
                    }else{
                        goodsBannernew = pagebaseInfo.goodsBanner;
                        for(let i=0;i<goodsBannernew.length;i++){
                            if(goodsBannernew[i].type==1){
                                that.goodsBannerdata.imgarr.push(goodsBannernew[i]);
                            }else if(goodsBannernew[i].type==3){
                                that.goodsBannerdata.video=goodsBannernew[i]
                            }else if(goodsBannernew[i].type==2){
                                that.goodsBannerdata.gif=goodsBannernew[i]
                            }
                        }
                        that.sharedata.cover= that.goodsBannerdata.imgarr[0];// APP分享需要的数据
                    }
                    if(that.goodsBannerdata.video){
                        that.swiperlength = that.goodsBannerdata.imgarr.length + 2;//外加视频及后边的提示2个
                    }else{
                        that.swiperlength = that.goodsBannerdata.imgarr.length + 1;//外加后边的提示1个
                    }
                    if(pagebaseInfo.vendibilityStock>0){
                        that.productoptionsselectdata.is_exist=1;
                    }else{
                        that.productoptionsselectdata.is_exist=0;
                    }
                    that.productoptionsselectdata.selectshow ={
                        img:pagebaseInfo.spec_image,
                        price:pagebaseInfo.price,
                        optionstxt:pagebaseInfo.specs_info,
                    }
                    // 规格数据
                    let SpecGroup = res.data.data.defaultSpecs;
                    that.productoptionsselectdata.SpecGroup =SpecGroup
                    that.productoptionsselectdata.specs_id =pagebaseInfo.specs_id;
                    // // 获取店铺信息及关注状态
                    that.getshopInfo(pagebaseInfo.brand_id);
                })
            },
            // 跳转查看店铺
            checkshop(shopid,shopiduserid){
                let that = this;
                if(shopid==null||shopiduserid==null){
                    this.$toast('数据错误，请刷新页面');
                }else{
                    // console.log(shopid,shopiduserid);
                    if(that.$route.params.webtype==0){
                        let data = {
                            userId:Number(shopiduserid),
                            shopId:Number(shopid),
                        };
                        // console.log(data);
                        jsCallStore(data);
                        return;
                    }else{
                        that.$router.push({path:'/shop/shopowner',query:{
                            shop_userId:shopiduserid,
                            shop_id:shopid
                        }})
                    }
                }
            },
            // 获取店铺信息及关注状态
            getshopInfo(shopid){
                let that = this;
                this.api.productdetails.getStoreInfo({
                    shopId:shopid,
                    watchId:that.userID,
                }).then(ress=>{
                    if(ress.data.code==1){
                        that.shopdata = ress.data.data;
                    }else{
                        that.nodatashow=true;
                        that.shopdata={
                            shopId:null,
                            userId:null,
                        }
                    }
                })
            },
            // 页面数据初始化
            pagedatainit(){
                this.getbaseInfo();
            },
            // 商品规格选择事件  0当前规格层级 1规格id 2总规格层级树 3已选择好层级id数组  都是从0开始的
            specs_select(currentlevle,specs_id,specs_selectdata){
                let that = this;
                // console.log(currentlevle,specs_id,specs_selectdata);
                let specs_selectdatanew = specs_selectdata;
                specs_selectdatanew[currentlevle] = specs_id;
                // console.log(specs_selectdatanew);
                let specs_id_pinjienew = '';
                for(let i=0;i<specs_selectdatanew.length;i++){
                    if(specs_selectdatanew.length ==1){
                        specs_id_pinjienew = specs_selectdatanew[i];
                        return;
                    }else{
                        if(i < specs_selectdatanew.length-1){
                            specs_id_pinjienew += specs_selectdatanew[i] + '_';
                        }else{
                            specs_id_pinjienew += specs_selectdatanew[i];
                        }
                    }
                }

                // console.log(that.buyerselectdata.specs_id_pinjie);
                this.buyerselectdata.specs_id_pinjie = specs_id_pinjienew;
                this.dynamicSpecGroup();
            },
            // 动态匹配规格组数据
            dynamicSpecGroup(){
                let that = this;
                if(that.loadingstatus){
                    return;
                }
                that.loadingstatus = true;
                this.api.productdetails.dynamicSpecGroup({
                    goodsId:that.pagebaseInfo.goodsId,
                    specsId:that.buyerselectdata.specs_id_pinjie,
                    userId:that.userID,
                }).then(res=>{
                    // console.log(res.data.data);
                    // Toast('提示');
                    let dynamicSpecGroupdata;
                    dynamicSpecGroupdata = res.data.data;
                    // status:false,
                    // SpecGroup:[],
                    // specs_id:''
                    // that.productoptionsselectdata.SpecGroup=dynamicSpecGroupdata.dynamicSpec;
                    that.productoptionsselectdata.SpecGroup=dynamicSpecGroupdata.specsList;//字段修改了
                    that.pagebaseInfo.specs_info = dynamicSpecGroupdata.specs_info;//首页显示位置的规格项
                    that.productoptionsselectdata.is_exist=dynamicSpecGroupdata.vendibilityStock>0?1:0;
                    // that.buyerselectdata.skuId = dynamicSpecGroupdata.skuId;
                    that.buyerselectdata.skuId = dynamicSpecGroupdata.skuId;//等待返回接口
                    that.buyerselectdata.kezhong = dynamicSpecGroupdata.gram;
                    if(dynamicSpecGroupdata.vendibilityStock>0){
                        that.productoptionsselectdata.selectshow.price=dynamicSpecGroupdata.price;
                        that.buyerselectdata.price=dynamicSpecGroupdata.price
                        that.productoptionsselectdata.selectshow.optionstxt=dynamicSpecGroupdata.specs_info;
                        that.buyerselectdata.price=dynamicSpecGroupdata.price
                    }else if(dynamicSpecGroupdata.vendibilityStock==0){
                        that.productoptionsselectdata.selectshow.price= that.pagebaseInfo.price;
                        that.productoptionsselectdata.selectshow.optionstxt= '所选规格暂时无货哦';
                        // that.productoptionsselectdata.selectshow.optionstxt= that.pagebaseInfo.specs_info;
                        // price:pagebaseInfo.price,
                        // optionstxt:pagebaseInfo.specs_info,
                    }

                    that.productoptionsselectdata.specs_id = that.buyerselectdata.specs_id_pinjie;//传递当前选择规格数据
                    that.loadingstatus = false;
                    
                    // console.log(res);

                    // that.pagebaseInfo.isAttention2Goods==1;
                    that.pagebaseInfo.isAttention2Goods = dynamicSpecGroupdata.isAttention2Goods;
                    that.product_skuid = dynamicSpecGroupdata.skuId;
                })
            },
            buynumber(number){
                // console.log(number);
                this.buyerselectdata.number = number;
            },
            // 商品购买点击事件
            buyit(){
                let that = this;
                if(!that.iflogin()){return;};
                if(that.$route.params.webtype==0){
                    if(that.appgive.addressdata.addressID==0){
                        // that.$toast('暂未设置收货地址');
                        // that.closeoptionsselect();
                        that.addressconfirmstatus=true;
                        // that.addressclick();
                        return;
                    }
                }else if(that.$route.params.webtype==1){
                    let addressdata = getsessionStorage('checkaddressitem');
                    // console.log(addressdata);
                    // debugger
                    if(addressdata == null || addressdata.id == 0 || addressdata.id == null || addressdata.id == undefined){
                        // that.$toast('暂未设置收货地址');
                        // that.closeoptionsselect();
                        that.addressconfirmstatus=true;
                        // that.addressclick();
                        return;
                    }
                }
                let OrderImmediatelydataproductPic ='';
                if(that.pagebaseInfo.gBanner.length>0){
                    OrderImmediatelydataproductPic = that.pagebaseInfo.gBanner[0].url;
                }else{
                    OrderImmediatelydataproductPic = that.goodsBannerdata.imgarr[0].url;
                }
                let liveId='';
                if(that.$route.query.liveId==undefined||that.$route.query.liveId==''||that.$route.query.liveId==0){

                }else{
                    // 直播间过来的
                    liveId = that.$route.query.liveId;
                }
                let OrderImmediatelydata ={
                    // productPic:that.goodsBannerdata.imgarr[0].url,//商品第一张图片
                    productPic:OrderImmediatelydataproductPic,//商品第一张图片
                    productName:that.pagebaseInfo.goods_title,//商品名称
                    payAmount:(that.buyerselectdata.price *100) * that.buyerselectdata.number/100,
                    totalAmount : (that.buyerselectdata.price *100) * that.buyerselectdata.number/100,//订单总金额
                    totalQuantity : 1,//订单总数量
                    productPrice : that.buyerselectdata.price,//销售价格
                    productQuantity : that.buyerselectdata.number,//购买数量
                    shopId: that.shopdata.id.toString(),//店铺id
                    shopName: that.shopdata.shopName,//店铺名称
                    shopIcon: that.pagebaseInfo.brandLogo!=null&&that.pagebaseInfo.brandLogo!=undefined?that.pagebaseInfo.brandLogo:'',//店铺logo icon
                    receiverId :that.appgive.addressdata.addressID,//收货地址id
                    productAttr : that.productoptionsselectdata.selectshow.optionstxt,//选择规格属性 描述
                    productSkuId : that.buyerselectdata.skuId,//商品sku_id
                    productWeight : that.buyerselectdata.kezhong,//商品克重
                    goldenPrice : that.pagebaseInfo.realGoldPrice,//实时金价
                    manualFee : that.pagebaseInfo.manualFee?that.pagebaseInfo.manualFee:0,//手工费
                    serviceFee : that.pagebaseInfo.serviceFee?that.pagebaseInfo.serviceFee:0,//服务费
                    designFee : that.pagebaseInfo.designFee?that.pagebaseInfo.designFee:0,//设计费

                    insured_price:that.pagebaseInfo.insured_price?that.pagebaseInfo.insured_price:0,//保价费

                    liveId:liveId,//直播间过来时的传参
                }
                // debugger;
                if(that.$route.params.webtype==0){
                    that.closeoptionsselect();
                    that.buyitnowtoapp(OrderImmediatelydata);
                    return;
                }else if(that.$route.params.webtype==1){
                    that.closeoptionsselect();
                    setsessionStorage('OrderImmediatelydata',OrderImmediatelydata);
                    setsessionStorage('pagefrom','productdetails');
                    that.$router.push({name:'confirmorder'});
                }
            },
            // 点击跳转到购物车页面
            gotoshopcart(){
                let that = this;
                // Toast({
                //     message: 'msg',
                //     duration: 3300,
                //     forbidClick: true
                // });
                if(that.$route.params.webtype==0){
                    jsCallShoppingCartfn();
                    return;
                }else{
                    setTimeout(() => {
                        that.$router.push({name:'shopcart'})
                    }, 800);
                }
            },
            // 点击跳转到客服页面
            gotokefu(){
                let that = this;
                this.$toast.loading({
                    duration: 0,
                    forbidClick: true
                });
                that.api.productdetails.getShopType({
                    shopId:Number(that.pagebaseInfo.brand_id)
                }).then(res=>{
                    that.$toast.clear();
                    if(res.data.code==1){
                        // console.log(res.data.data);
                        let shoptype = res.data.data.type;
                        let shopUserId = res.data.data.user_id;
                        let servicedata ={
                            type:shoptype,
                            shopId:Number(that.pagebaseInfo.brand_id),
                            shopUserId:Number(shopUserId),
                        }
                        if(that.$route.params.webtype==0){
                            // console.log(`APP拿到的：`);
                            // console.log(servicedata);
                            jsCallService(servicedata);
                            return;
                        }else if(that.$route.params.webtype==1){
                            // console.log(`H5自用的：`);
                            // console.log(servicedata);
                            that.$toast('请在APP中体验客服功能。');
                        }
                    }else{
                        that.$toast(res.data.info);
                    }
                })
                // if(that.$route.params.webtype==0){
                //     that.addittoapp();
                //     return;
                // }
                // setTimeout(() => {
                //     that.$router.push({name:'shopcart'})
                // }, 800);
            },
            // 商品加入购物车点击事件
            addit(){
                let that = this;
                if(!that.iflogin()){return;};
                if(that.loadingstatus){
                    return;
                }
                that.loadingstatus = true;
                // debugger;
                if(that.$route.query.liveId==undefined||that.$route.query.liveId==''||that.$route.query.liveId==0){
                    that.api.productdetails.additem({
                        // skuid:that.pagebaseInfo.skuId,
                        skuId:that.buyerselectdata.skuId,
                        userId:that.userID,
                        // shopId:that.shopdata.id,
                        shopId:that.pagebaseInfo.brand_id,
                        quantity:that.buyerselectdata.number,
                        isAdd:true,
                    }).then(res=>{
                        // console.log(res.data);
                        that.loadingstatus = false;
                        if(res.data.info=='请求执行成功'){
                            that.$toast({
                                message: '加入购物车成功',
                                duration: 810,
                                forbidClick: true
                            });
                            that.closeoptionsselect();
                        }else{
                            that.$toast({
                                message: '加入购物车失败，请重试',
                                duration: 810,
                                forbidClick: true
                            });
                        }
                    })
                }else{
                    // 直播间过来的
                    // console.log('直播间来的:'+that.$route.query.liveId);
                    that.api.productdetails.additem4Live({
                        skuId:that.buyerselectdata.skuId,
                        userId:that.userID,
                        roomId:that.$route.query.liveId,//直播间ID
                        shopId:that.pagebaseInfo.brand_id,
                        quantity:that.buyerselectdata.number,
                    }).then(res=>{
                        // console.log(res.data);
                        that.loadingstatus = false;
                        if(res.data.info=='请求执行成功'){
                            that.$toast({
                                message: '加入购物车成功',
                                duration: 810,
                                forbidClick: true
                            });
                            that.closeoptionsselect();
                        }else{
                            that.$toast({
                                message: '加入购物车失败，请重试',
                                duration: 810,
                                forbidClick: true
                            });
                        }
                    })
                }
            },
            // 判断是否登录
            iflogin(){
                let that = this;
                if(that.$route.params.webtype==0){
                    // app
                    if(!that.userID || that.userID == 0){
                        that.$toast({
                            message: '暂未登录，请先登录',
                            duration: 810,
                            forbidClick: true
                        });
                        setTimeout(() => {
                            that.gotologin();
                        }, 810);
                        return false;
                    }else{
                        return true
                    }
                }else{
                    // H5端
                    if(!that.$store.state.user.userid || that.$store.state.user.userid == 0){
                        that.$toast({
                            message: '暂未登录，请先登录',
                            duration: 810,
                            forbidClick: true
                        });
                        setTimeout(() => {
                            that.gotologin();
                        }, 810);
                        return false;
                    }else{
                        return true
                    }
                }
                
            },
            // recommendbox list数据  触底加载更多
            recommendlist_onLoad(){
                 // 异步更新数据
                setTimeout(() => {
                    for (let i = 0; i < 5; i++) {
                    this.recommendlist_list.push(this.recommendlist_list.length + 1);
                    }
                    // 加载状态结束
                    this.recommendlist_loading = false;

                    // 数据全部加载完成
                    if (this.recommendlist_list.length >= 10) {
                        this.recommendlist_finished = true;
                    }
                }, 500);
            },
            
            addressclicktab(){
                this.gotobuystatus = true;
                this.addressclick();
            },
            // 点击调用地址页面
            addressclick(){
                let that = this;
                if(that.$route.params.webtype==0){
                    jsCallAddressManagerfn();
                    return;
                }else{
                    that.$router.push({name:'addresscheck'})
                }
            },
            // 原生app
            // 点击跳转到app购物车页面
            addittoapp(){
                jsCallShoppingCartfn()
            },
            // 原生app
            // 点击跳转到app生成订单页面
            buyitnowtoapp(OrderImmediatelydata){
                jsCallOrderImmediatelyfn(OrderImmediatelydata);
            },
            
            // 点击跳转到用户登录页面
            gotologin(){
                let that = this;
                if(that.$route.params.webtype==0){
                    jsCallLogin()
                    return;
                }else{
                    setTimeout(() => {
                        that.$router.push({name:'login'})
                    }, 800);
                }
            },

            // 页面底部操作按钮事件
            gotoshoucang(target_status){
                if(target_status){
                    this.followgoodsadd();
                }else{
                    this.followgoodsdelete();
                }
            },
        },
        mounted() {
            let that = this;
            this.product_skuid = this.$route.params.product_id
            // debugger;
            // console.log(this.$route.query);
            // app默认地址设置
            // if (checkdevice() == 'ios' && that.$route.params.webtype==0) {//ios同时为app端
            if (checkdevice() == 'ios') {//ios同时为app端
                // 获取地址信息
                window.updateLocation=(addressmsg)=>{
                    if(addressmsg.addressID==0||addressmsg.addressID==''){
                        that.appgive.addressdata.address = '暂无默认地址，点击编辑收货地址';
                    }else{
                        that.appgive.addressdata = addressmsg;
                        //如果此时 是 从选择地址页面过来的。则立马执行购买事件
                        // alert('ios that.gotobuystatus:'+that.gotobuystatus);
                        if(that.gotobuystatus){
                            // alert('调用立即购买');
                            that.addressconfirmstatus=false;
                            that.gotobuystatustimer1=window.setTimeout(() => {
                                that.buyit();
                            }, 1000);
                        }
                    }
                };
            } else if (checkdevice() == 'anzhuo') {
                // 获取地址信息
                window.updateLocation=(addressmsg)=>{
                    // that.$toast(addressmsg.address);
                    if(addressmsg.addressID==0||addressmsg.addressID==''){
                        that.appgive.addressdata.address = '暂无默认地址，点击编辑收货地址';
                    }else{
                        that.appgive.addressdata = addressmsg;
                        //如果此时 是 从选择地址页面过来的。则立马执行购买事件
                        // alert('安卓 that.gotobuystatus:'+that.gotobuystatus);
                        if(that.gotobuystatus){
                            // alert('调用立即购买');
                            that.addressconfirmstatus=false;
                            that.gotobuystatustimer2=window.setTimeout(() => {
                                that.buyit();
                            }, 1000);
                        }
                    }
                }
                // 设置需要更新的颜色
            }
            
            if(that.$route.params.webtype==0){ //app端
                that.topbtnstatus = false;
            }else{
                that.topbtnstatus = true;
            }
            // 监听滚动显示导航模块
            window.onscroll=()=>{
                // console.log(document.documentElement.scrollTop);
                let docscroTop = document.documentElement.scrollTop;
                let docFontSizeNum = document.documentElement.clientWidth / (750 / 100);
                // if(docscroTop <  7.9 * docFontSizeNum){
                //     this.docscroToptype=0;
                // }else if(docscroTop >= 7.9 * docFontSizeNum && docscroTop < docFontSizeNum *14.18){
                //     this.docscroToptype =1
                // }else if(docscroTop >= 14.18 * docFontSizeNum && docscroTop < docFontSizeNum *30.73){
                //     this.docscroToptype =3
                // }else if(docscroTop >= 30.73 * docFontSizeNum){
                //     this.docscroToptype =2
                // }

                // // 目前页面暂无评论及推荐模块故修改相应数据后期再改
                // if(docscroTop <  7.9 * docFontSizeNum){
                //     this.docscroToptype=0;
                // }else if(docscroTop >= 7.9 * docFontSizeNum && docscroTop < docFontSizeNum *20.0){
                //     this.docscroToptype =1
                // }
                // // else if(docscroTop >= 14.18 * docFontSizeNum && docscroTop < docFontSizeNum *30.73){
                // //     this.docscroToptype =3
                // // }
                // else if(docscroTop >= 20.0 * docFontSizeNum){
                //     this.docscroToptype =2
                // }
                this.docscroToptype =0;//一直让它隐藏不显示

                // console.log(docscroTop);
                // let height = 14.77;//14.19
                let height = 13.7;//14.19
                if(that.$route.params.webtype==0){
                    console.log(`${docscroTop} : ${height} : ${height * docFontSizeNum}`);
                    if(docscroTop <  height * docFontSizeNum){
                        // 顶部内容
                        // console.log('顶部内容');
                        jsCallAnchorPoint({
                            flag:0
                        });
                    }else{
                        // 详情部分
                        // console.log('详情部分');
                        jsCallAnchorPoint({
                            flag:1
                        });
                    }
                }
                else{
                    if(docscroTop <  height * docFontSizeNum){
                        // 顶部内容
                        // console.log('顶部内容');
                        // jsCallAnchorPoint({
                        //     flag:0
                        // });
                    }else{
                        // 详情部分
                        // console.log('详情部分');
                        // jsCallAnchorPoint({
                        //     flag:1
                        // });
                    }
                }
            };
            // debugger;
            // let that = this;
            if(that.$route.params.webtype==0){
                // app
                that.userID = that.$route.query.userid
            }else{
                // h5
                that.userID = that.$store.state.user.userid;
                let addressdata = getsessionStorage('checkaddressitem');
                // console.log(addressdata);
                // debugger
                if(addressdata == null || addressdata.id == 0 || addressdata.id == null || addressdata.id == undefined){
                    // that.$toast('暂无默认地址，点击收货地址栏，添加收货地址');
                    // that.closeoptionsselect();
                    // return;
                }else{
                    that.appgive.addressdata.address = addressdata.province+' '+addressdata.city+' '+addressdata.area+' '+addressdata.address;
                    that.appgive.addressdata.addressID = addressdata.id;
                }
            };
            that.pagedatainit();
            // app调用锚点跳转事件
            window.appgoAnchor=(jsondata)=>{
                // this.$toast('锚点跳转');
                // alert(jsondata.dom);
                that.goAnchor(jsondata.dom);
            };
            // app分享调用事件
            window.getShareJson=()=>{
                return JSON.stringify(this.sharedata)
            };
            // 直播间打开H5详情页事件
            window.updateAlert=(pagetype)=>{
                if(pagetype.type=="live"){
                    that.currentpagetype = 'livingpage';
                }
            };
            // 设置需要更新的颜色
            window.updateViewColor=(btncolordata)=>{
                if(btncolordata.view=="shopcartButton"){
                    that.bottom_btncolor = btncolordata.color;
                }
            };
            
            // ios区分版本
            window.appVersion=(serviceshow)=>{
                that.service = serviceshow;
            };
            // 移除confirmpageorder 填写订单页的存储数据
            localStorage.removeItem('confirmpageorder');
        },
        beforeCreate() {}, //生命周期 - 创建之前
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() {
            window.clearTimeout(this.gotobuystatustimer1);
            window.clearTimeout(this.gotobuystatustimer2);
            this.gotobuystatustimer1='';
            this.gotobuystatustimer2='';
        }, //生命周期 - 销毁之前
        destroyed() {}, //生命周期 - 销毁完成
        activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>


<style lang='less' scoped>
    @import url('./css/productdetails.less');
</style>
<style lang='less'>
    //@import url()
    // .productdetails .swiper-button-next, .productdetails .swiper-button-prev{
    //     display:none;
    // }
    // .productdetails .swiper-pagination-bullet{
    //     background:rgba(255,255,255,0.32);
    //     width:0.12rem;
    //     height:0.12rem;
    // }
    // .productdetails .swiper-pagination-bullet-active{
    //     background:#FFBD04;
    //     width:0.2rem;
    //     height:0.2rem;
    // }
    // .productdetails .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet{
    //     margin:0 0.24rem;
    // }
    // .productdetails .swiper-container-horizontal > .swiper-pagination-bullets{
    //     width:auto;
    //     left:3.25rem;
    //     bottom:0.415rem;
    // }
    // 底部推荐模块加载更多提示框居中
    .productdetailswrap .van-list__error-text,.productdetailswrap .van-list__finished-text,.productdetailswrap .van-list__loading{
        margin:0 auto;
        line-height:3em;
    }

    .productdetailswrap .optionsselectloading{
        position:fixed;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        z-index:1500;
    }


    @import url('./../../../assets/css/common.less');
    .productdetailswrap.wukong .productdetails .swiper-pagination-bullet-active{
        background:@wukong;
        width:0.2rem;
        height:0.2rem;
    }
</style>