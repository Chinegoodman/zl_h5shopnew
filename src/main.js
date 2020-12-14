import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './components/index' //引入全局组件

// import vueSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.min.css'
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
    // ====项目中可能用到的===
    Toast,
    Loading,
    Swipe,
    SwipeItem
} from 'vant'
// import Vant from 'vant';
import 'vant/lib/index.css';
// Vue.use(PullRefresh, Toast, Lazyload, List); //下拉刷新 轻提示 图片懒加载 瀑布流滚动加载
// Vue.use(Lazyload); //下拉刷新 轻提示 图片懒加载 瀑布流滚动加载
// Vue.use(List); //下拉刷新 轻提示 图片懒加载 瀑布流滚动加载
// Vue.use(Tab); //下拉刷新 轻提示 图片懒加载 瀑布流滚动加载
// Vue.use(Tabs); //下拉刷新 轻提示 图片懒加载 瀑布流滚动加载
Vue.use(Toast); //下拉刷新 轻提示 图片懒加载 瀑布流滚动加载
Vue.use(Loading); //下拉刷新 轻提示 图片懒加载 瀑布流滚动加载
Vue.use(Swipe); //下拉刷新 轻提示 图片懒加载 瀑布流滚动加载
Vue.use(SwipeItem); //下拉刷新 轻提示 图片懒加载 瀑布流滚动加载
// Vue.use(Vant);

// Vue.use(vueSwiper); //swiper官方插件

import eruda from 'eruda';
if (process.env.VUE_APP_ENV == 'uat') {
    // 测试环境
    eruda.init();
} else if (process.env.VUE_APP_ENV == 'production') {
    // 生产环境
    // eruda.init();
} else if (process.env.VUE_APP_ENV == 'gray') {
    // 灰度环境
    eruda.init();
} else if (process.env.VUE_APP_ENV == 'development') {
    // 开发环境
    // eruda.init();
}
import 'font-awesome/css/font-awesome.css'

import api from './api'
Vue.prototype.api = api;

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')