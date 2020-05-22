export default {
    //修改state的方法
    saveuserdata(state, userdata) {
        state.user = userdata;
        localStorage.setItem('user-info', JSON.stringify(userdata))
    },
    //修改state的方法
    resetuserdata(state, userdata) {
        let user = {
            isLogin: false,
            username: '',
            token: '',
            userid: '',
            sig: '',
            phone: '',
            userdata: '',
        }
        state.user = user;
        localStorage.removeItem('user-info');
    }
}