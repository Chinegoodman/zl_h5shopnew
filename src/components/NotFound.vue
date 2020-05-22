<!-- 组件说明 -->
<template>
    <div class='404page'>
        <p class="tips404">抓周H5提醒你。你找的页面不存在</p>
    </div>
</template>

<script>
    //import x from ''
    export default {
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