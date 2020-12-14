function Base64fn() {
    // private property  
    let _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding  
    this.encode = function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    };
    // public method for decoding  
    this.decode = function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    };
    // private method for UTF-8 encoding  
    let _utf8_encode = function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    };
    // private method for UTF-8 decoding  
    let _utf8_decode = function(utftext) {
        var string = "";
        var i = 0;
        var c = 0;
        var c1 = 0;
        var c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                let c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
};
//DES加密
function encryptByDES(message, key) {
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
};
//DES解密
function decryptByDES(ciphertext, key) {
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    // direct decrypt ciphertext
    var decrypted = CryptoJS.DES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
    }, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
};
export default {
    //修改state的方法
    saveuserdata(state, userdata) {
        state.user = userdata;
        // localStorage.setItem('user-info', JSON.stringify(userdata))
        let userdata_storage = JSON.stringify(userdata);
        // localStorage.setItem('pczlwh_shopuserdata', JSON.stringify(userdata))
        localStorage.setItem('user-info', encryptByDES(userdata_storage, '9527')); //DES加密 密码：'9527'

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
        let userdata_storage = JSON.stringify(newuserdata);
        localStorage.setItem('new-user-info', encryptByDES(userdata_storage, '9527')); //DES加密 密码：'9527'


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

        let userdata_storageorigin = window.localStorage.getItem('user-info');
        let localStorage_olddata = JSON.parse(decryptByDES(userdata_storageorigin, '9527')) || ''; //DES解密 密码：'9527'
        // let localStorage_olddata = JSON.parse(localStorage.getItem('user-info'));
        if (localStorage_olddata) {
            localStorage_olddata.token = token;
            // localStorage.setItem('user-info', JSON.stringify(localStorage_olddata));
            let userdata_storage = JSON.stringify(localStorage_olddata);
            localStorage.setItem('user-info', encryptByDES(userdata_storage, '9527')); //DES加密 密码：'9527'
        } else {
            let userdata_storagenull = JSON.stringify({
                "user-info": {
                    "token": token,
                    "userid": '',
                    "timuserid": "",
                    "sig": ""
                }
            });
            localStorage.setItem('user-info', encryptByDES(userdata_storagenull, '9527'));
        }

        // // 新体系的用户数据
        // state.nerUser.token = token;
        // let localStorage_olddata2 = JSON.parse(localStorage.getItem('new-user-info'));
        // if (localStorage_olddata2) {
        //     localStorage_olddata2.token = token;
        //     localStorage.setItem('new-user-info', JSON.stringify(localStorage_olddata2));
        // } else {
        //     localStorage.setItem('new-user-info', JSON.stringify({
        //         "user-info": {
        //             "isLogin": false,
        //             "username": "",
        //             "userid": '',
        //             "phone": "",
        //             "userdata": '',
        //             "token": token,
        //         }
        //     }));
        // }

        state.nerUser.token = token;

        let new_userdata_storageorigin = window.localStorage.getItem('new-user-info');
        let new_localStorage_olddata = JSON.parse(decryptByDES(new_userdata_storageorigin, '9527')) || ''; //DES解密 密码：'9527'
        // let localStorage_olddata = JSON.parse(localStorage.getItem('user-info'));
        if (new_localStorage_olddata) {
            new_localStorage_olddata.token = token;
            // localStorage.setItem('user-info', JSON.stringify(localStorage_olddata));
            let new_userdata_storage = JSON.stringify(new_localStorage_olddata);
            localStorage.setItem('new-user-info', encryptByDES(new_userdata_storage, '9527')); //DES加密 密码：'9527'
        } else {
            let new_userdata_storagenull = JSON.stringify({
                "user-info": {
                    "token": token,
                    "userid": '',
                    "timuserid": "",
                    "sig": ""
                }
            });
            localStorage.setItem('new-user-info', encryptByDES(new_userdata_storagenull, '9527'));
        }
    }
}