<!-- 组件说明 -->
<template>
    <div class='testwrap'>
        这是测试页面 自动打包
        <hr>
        query{{this.$route.query}} <br>
        params{{this.$route.params}} <br>
        <uploadfile :uploaddatainit="uploaddatainit" @_upimglistchange="upimglistchange"></uploadfile>
    </div>
</template>

<script>
    import uploadfile from '@/components/uploadfile.vue'
    export default {
        components: {
            uploadfile
        },
        data () {
            return {
                uploaddatainit:{
                    upimglist:[],
                    maxnumber:1,
                }
            };
        },
        computed: {

        },
        methods: {
            upimglistchange(listdata){
                console.log(listdata);
            }
        },
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>

<style lang='less' scoped>
//@import url()

</style>

<style lang='less'>
//@import url()

</style>