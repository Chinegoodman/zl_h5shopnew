let userInfo = '';
if (window.localStorage.getItem('user-info')) {
    userInfo = JSON.parse(window.localStorage.getItem('user-info')) || ''
} else {
    userInfo = '';
}
const user = {
    isLogin: userInfo.isLogin ? userInfo.isLogin : false,
    username: userInfo.username ? userInfo.username : '',
    token: userInfo.token ? userInfo.token : '',
    userid: userInfo.userid ? userInfo.userid : '',
    sig: userInfo.sig ? userInfo.sig : '',
    phone: userInfo.phone ? userInfo.phone : '',
    userdata: userInfo.userdata ? userInfo.userdata : '',
}
export default {
    // haveTabbar: true,
    // cartList: JSON.parse(window.localStorage.getItem('cart-lists')) || [],
    // searchLists: JSON.parse(window.localStorage.getItem('search-lists')) || [],
    user
}