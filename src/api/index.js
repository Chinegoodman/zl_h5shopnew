/** 
 * api接口的统一出口
 */
// ==========================庞世锋============================
// 商品详情模块接口====店铺相关接口也在这里
import productdetails from '@/api/productdetails';
import login from '@/api/login'
import living from '@/api/living/index.min.js'
// ==========================庞世锋============================

// ==========================刘巍============================
// 个人中心词模块接口
import personalcenter from '@/api/personalcenter';
import shopcart from "@/api/shopcart";
// ==========================刘巍============================
// 分类页接口
import productsearch from '@/api/productsearch';
// ==========================孙雅洁============================
// 商城首页接口
import homedetails from '@/api/homedetails';
// ==========================李家雄============================
// 商城首页接口
import newcomer from '@/api/newcomer';
// 小视频首页接口
import videodetails from '@/api/videodetails';
// 店铺首页接口
import shopmassages from '@/api/shopmassages';
// ==========================孙雅洁============================
// ==========================李可心============================
// 退货接口
import returngoods from '@/api/returngoods';
// ==========================李可心============================

// 导出接口
export default {
    productdetails,
    personalcenter,
    homedetails,
    login,
    productsearch,
    videodetails,
    shopcart,
    shopmassages,
    living,
    returngoods,
    newcomer
    // ……
}