/**
 * 接口域名的管理
 */
let baseUrl = '';
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == 'development') {
    baseUrl = '/devapi';
} else if (process.env.NODE_ENV == 'production') {
    baseUrl = process.env.VUE_APP_BASE_API; //生产环境服务器
} else if (process.env.NODE_ENV == 'uat') {
    baseUrl = process.env.VUE_APP_BASE_API;
} else if (process.env.NODE_ENV == 'gray') {
    baseUrl = process.env.VUE_APP_BASE_API;
}
const base = {
    yxf: baseUrl,
}
export default base;