const  { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');  //webpack-bundle-analyzer 分析打包体积

// prerender-spa-plugin插件实现添加预渲染  SEO相关
var path = require('path')
var PrerenderSPAPlugin = require('prerender-spa-plugin')
var Renderer = PrerenderSPAPlugin.PuppeteerRenderer

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
    // publicPath: './',
    publicPath: '/1H5shop/', //http://47.103.198.168:81/1H5shop/  测试服的访问地址【非根目录】
    outputDir: current_outputDir, //输出文件夹
    devServer: {
        // open: false,
        // host: 'localhost',
        // port: 8080,
        // https: false,
        proxy: {
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
                // target: 'http://47.103.198.168', //测试服
                target: 'https://hd.test.zhulihr.com', //灰度测试服务器22222222
                // target: 'https://shop.zhulihr.com', //生产222
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/devapi': ''
                }
            }
        }
    },
    //其他配置....
    configureWebpack: {
        plugins: [
            new PrerenderSPAPlugin({
                staticDir: path.join(__dirname, `../${current_outputDir}`),
                routes: ['/', '/login'],

                renderer: new Renderer({
                    inject: {
                        foo: 'bar'
                    },
                    headless: true,
                    renderAfterDocumentEvent: 'render-event'
                })
            })
            //TODO: 灰度及生产环境的 包 不执行此插件 【防止jenkins打包不成功】
            // new BundleAnalyzerPlugin(), //webpack-bundle-analyzer 分析打包体积 暂时展示
        ]
    }
    // 这样写会报错。放到上边的 configureWebpack 里就可以了
    // plugins: [
    //     new PrerenderSpaPlugin(
    //         // 编译后的html需要存放的路径
    //         path.join(__dirname, `../${current_outputDir}`),
    //         // 列出哪些路由需要预渲染
    //         ['/', '/shop/productdetails', '/contact']
    //     )
    // ]
}