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
            userdata: '',

            token: '', //token数据
        }
        state.nerUser = nerUser;
        localStorage.removeItem('new-user-info');
    },

    // 重置 用户token信息
    resettokenfn(state, token) {
        console.log(token);
        // 老体系的用户数据
        state.user.token = token;
        let localStorage_olddata = JSON.parse(localStorage.getItem('user-info'));
        if (localStorage_olddata) {
            localStorage_olddata.token = token;
            localStorage.setItem('user-info', JSON.stringify(localStorage_olddata));
        } else {
            localStorage.setItem('user-info', JSON.stringify({
                "user-info": {
                    "token": token,
                    "userid": '',
                    "timuserid": "",
                    "sig": ""
                }
            }));
        }

        // 新体系的用户数据
        state.nerUser.token = token;
        let localStorage_olddata2 = JSON.parse(localStorage.getItem('new-user-info'));
        if (localStorage_olddata2) {
            localStorage_olddata2.token = token;
            localStorage.setItem('new-user-info', JSON.stringify(localStorage_olddata2));
        } else {
            localStorage.setItem('new-user-info', JSON.stringify({
                "user-info": {
                    "isLogin": false,
                    "username": "",
                    "userid": '',
                    "phone": "",
                    "userdata": '',
                    "token": token,
                }
            }));
        }
    }
}