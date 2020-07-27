const  { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');  //webpack-bundle-analyzer 分析打包体积
let current_outputDir = '';
if (process.env.VUE_APP_ENV == 'uat') {
    // 开发环境
    current_outputDir = 'dist_uat';
} else if (process.env.VUE_APP_ENV == 'production') {
    // 生产环境
    current_outputDir = 'dist';
} else if (process.env.VUE_APP_ENV == 'gray') {
    // 灰度环境
    current_outputDir = 'dist_gray';
} else if (process.env.VUE_APP_ENV == 'development') {
    // 开发环境
    current_outputDir = 'dist_dev';
}
module.exports = {
    publicPath: './',
    outputDir: current_outputDir, //输出文件夹
    devServer: {
        // open: false,
        // host: 'localhost',
        // port: 8080,
        // https: false,
        proxy: {
            // '/juheapi': {
            //     target: 'https://v.juhe.cn',
            //     changeOrigin: true,
            //     ws: true,
            //     pathRewrite: {
            //         '^/juheapi': ''
            //     }
            // },
            // // https://api.komavideo.com/news
            // '/newsapi': {
            //     target: 'https://api.komavideo.com',
            //     changeOrigin: true,
            //     ws: true,
            //     pathRewrite: {
            //         '^/newsapi': ''
            //     }
            // },
            '/devapi': {
                // target: 'http://192.168.1.75:8080', //刘哥测试地址
                // target: 'http://47.103.198.168', //抓周 测试服
                // target: 'https://hd.test.zhulihr.com', //灰度测试服务器22222222
                target: 'https://shop.zhulihr.com', //生产222
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/devapi': ''
                }
            },
            '/xiuchangdevapi2': {
                // target: 'http://192.168.1.75:8080', //刘哥测试地址
                target: 'http://47.100.12.152:8100', //新架构 测试服
                // target: 'xc.premapi.zhulihr.cn', //新架构 测试服
                // target: 'http://xc.testmapi.zhulihr.cn', //新架构 测试服
                // target: 'http://47.103.198.168', //抓周 测试服
                // target: 'https://hd.test.zhulihr.com', //灰度测试服务器22222222
                // target: 'https://shop.zhulihr.com', //生产222
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/xiuchangdevapi2': ''
                }
            }
        }
    },
    //其他配置....
    configureWebpack: {
        plugins: [
            //TODO: 灰度及生产环境的 包 不执行此插件 【防止jenkins打包不成功】
            // new BundleAnalyzerPlugin(), //webpack-bundle-analyzer 分析打包体积
        ]
    },
    productionSourceMap: process.env.VUE_APP_ENV != 'production'
}