let userInfo = '';
if (window.localStorage.getItem('user-info')) {
    userInfo = JSON.parse(window.localStorage.getItem('user-info')) || ''
} else {
    userInfo = '';
}
const user = {
    token: userInfo.token ? userInfo.token : '',
    userid: userInfo.userid ? userInfo.userid : '',
    timuserid: userInfo.timuserid ? userInfo.timuserid : '',
    sig: userInfo.sig ? userInfo.sig : ''
}

let newUserInfo = '';

if (window.localStorage.getItem('new-user-info')) {
    newUserInfo = JSON.parse(window.localStorage.getItem('new-user-info')) || '';
} else {
    newUserInfo = '';
}

const nerUser = {
    isLogin: newUserInfo.isLogin ? newUserInfo.isLogin : false,
    username: newUserInfo.username ? newUserInfo.username : '',
    userid: newUserInfo.userid ? newUserInfo.userid : '',
    phone: newUserInfo.phone ? newUserInfo.phone : '',
    userdata: newUserInfo.userdata ? newUserInfo.userdata : '',
}


export default {
    // haveTabbar: true,
    // cartList: JSON.parse(window.localStorage.getItem('cart-lists')) || [],
    // searchLists: JSON.parse(window.localStorage.getItem('search-lists')) || [],
    user,
    nerUser
}