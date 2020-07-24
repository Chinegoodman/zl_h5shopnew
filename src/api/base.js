/**
 * 接口域名的管理
 */
let baseUrl = '';
let baseUrl2 = '';
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == 'development') {
    baseUrl = '/devapi';
    baseUrl2 = '/xiuchangdevapi2';
} else if (process.env.NODE_ENV == 'production') {
    baseUrl2 = baseUrl = process.env.VUE_APP_BASE_API; //生产环境服务器
} else if (process.env.NODE_ENV == 'uat') {
    baseUrl2 = baseUrl = process.env.VUE_APP_BASE_API;
} else if (process.env.NODE_ENV == 'gray') {
    baseUrl2 = baseUrl = process.env.VUE_APP_BASE_API;
}
const base = {
    yxf: baseUrl,
    yxf2: baseUrl2,
}
export default base;