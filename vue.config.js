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
    configureWebpack: config => {
        if (process.env.NODE_ENV !== 'production') return;
        return {
            plugins: [
                new PrerenderSPAPlugin({
                    // 生成文件的路径，也可以与webpakc打包的一致。
                    // 下面这句话非常重要！！！
                    // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
                    staticDir: path.join(__dirname, `${current_outputDir}`),
                    // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
                    routes: ['/', '/login', '/regist', '/personalcenter/index', '/shopcart', '/shop/shopowner'],
                    // 这个很重要，如果没有配置这段，也不会进行预编译
                    renderer: new Renderer({
                        inject: {
                            foo: 'bar'
                        },
                        headless: false,
                        // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
                        // renderAfterDocumentEvent: 'render-event'
                    })
                }),
                //TODO: 灰度及生产环境的 包 不执行此插件 【防止jenkins打包不成功】
                // new BundleAnalyzerPlugin(), //webpack-bundle-analyzer 分析打包体积 暂时展示
            ],
        };
    }
}