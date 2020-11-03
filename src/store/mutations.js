export default {
    //修改state的方法
    saveuserdata(state, userdata) {
        state.user = userdata;
        localStorage.setItem('user-info', JSON.stringify(userdata))
    },
    //修改state的方法
    resetuserdata(state, userdata) {
        let user = {
            token: '',
            userid: '',
            timuserid: '',
            sig: '',
        }
        state.user = user;
        localStorage.removeItem('user-info');
    },
    //存新体系用户信息
    setNewUserDate(state, newuserdata) {
        //newuserdata来自 actions里.commit传入的nerUser对象
        state.nerUser = newuserdata;
        localStorage.setItem('new-user-info', JSON.stringify(newuserdata));

    },
    //重置(清除)新体系用户信息
    resetNewUserDate(state, newuserdata) {
        let nerUser = {
            isLogin: false,
            username: '',
            userid: '',
            phone: '',
            userdata: ''
        }
        state.nerUser = nerUser;
        localStorage.removeItem('new-user-info');
    }

}