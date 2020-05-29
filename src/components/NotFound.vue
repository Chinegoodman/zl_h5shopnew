<!-- 组件说明 -->
<template>
    <div class='404page'>
        <p class="tips404">抓周H5提醒你。你找的页面不存在</p>
    </div>
</template>

<script>
    //import x from ''
    export default {
        metaInfo: {
          title: '抓周直播电商平台 - 黄金购物价格_今日黄金价格_最新黄金价格_黄金价格走势_24小时走势_历史走势_走势分析图_国际黄金价格_上交所_美元走势_美女直播_电商直播', // set a title
          meta: [{                 // set meta
            name: 'keywords',
            content: '黄金价格实时走势中心,黄金价格,今日黄金价格,最新黄金价格,黄金价格走势,24小时走势,历史走势,走势分析图,国际黄金价格,上交所,美女直播,电商直播'
          },{
            name:'description',
            content:'中国黄金投资网(中国黄金网)专业提供黄金价格,中国黄金,黄金期货,黄金投资,黄金交易所,金价,黄金公司,黄金网站,黄金开户,纸黄金,黄金外汇实时图形行情资讯及实时行情服务!'
          }],
          // link: [{                 // set link
          //   rel: 'asstes',
          //   href: 'https://assets-cdn.github.com/' 
          // }]
        },
        components: {

        },
        data () {
            return {

            };
        },
        computed: {

        },
        methods: {

        },
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {
    document.title="抱歉，你找的页面或ID不存在";
    // <meta name="keywords" content="关键词1,关键词2">
    // <meta name="description" content="需要的内容" />
    let newmeta1 = document.createElement('meta');
    let newmeta2 = document.createElement('meta');
    newmeta1.name = 'keywords';
    newmeta1.content = '抓周,珠宝';
    newmeta2.name = 'description';
    newmeta2.content = '抓周，珠宝首饰，服务大众';
    document.getElementsByTagName('head')[0].appendChild(newmeta1);
    document.getElementsByTagName('head')[0].appendChild(newmeta2);
}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>

<style lang='less' scoped>
//@import url()
.tips404{
    position:fixed;
    left:50%;
    top:50%;
    width:100%;
    transform:translate(-50%,-50%);
    font-size:0.16rem;
    text-align:center;
}
</style>

<style lang='less'>
//@import url()

</style>