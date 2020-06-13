<!-- 组件说明 -->
<template>
    <!-- 新人专区弹层start -->
      <div v-if="newcomershellshowstate" class="openappbtnsbox opennewcomersbox">
        <div class="box-cover">
            <img src="http://playback.17biyi.com/149ca6a5e3ae975b25dee00ba656a99c" alt="">
        </div>
        <div class="box-content box-content-newcomer-inner">
          <span @click="gonewcomer" class="content-newcomer-btn"><img src="@/assets/imgs/newcomer/xrzqan.png" alt=""></span>
          <div @click="closewrapshell" class="closewrapshell"><img src="@/assets/imgs/newcomer/fcch.png" alt=""></div>
        </div>
    </div>
    <!-- 新人专区弹层end -->
</template>

<script>
    //import x from ''
    export default {
        name:'newcomershell',
        props:{
            newcomershellshowstate : {
                type : Boolean,
                value : false
            }
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
            closewrapshell(){
                this.$emit('closecomershellclick');
            },
            //跳转新人专区
            gonewcomer(){
                this.$router.push({path:'/newcomer'});
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
@import url('./../assets/css/common.less');
</style>

<style lang='less'>
.opennewcomersbox{
    position: fixed;
    width: 5.4rem;
    height: 6.84rem;
    left : 50%;
    top : 50%;
    transform : translate(-50%,-50%);
    .box-cover{
        width : 100%;
        height: 100%;
        position: absolute;
        left : 0;
        top : 0;
        z-index: 1;
        img{
            width : 100%;
        }
    }
    .box-content-newcomer-inner{
        width: 5.4rem;
        height: 6.84rem;
        border: none;
        padding: 0;
        position: absolute;
        left : 0;
        top : 0;
        z-index: 2;
    }
    .content-newcomer-btn{
        width: 3.2rem;
        height: .7rem;
        position: absolute;
        bottom: .4rem;
        left: 50%;
        transform : translateX(-50%);
        z-index: 3;
        cursor: pointer;
        img{
            width: 100%;
            height: 100%;
            cursor: pointer;
        }
    }
    .closewrapshell{
        width : .68rem;
        height: .68rem;
        position: absolute;
        bottom: -1.1rem;
        left: 50%;
        transform : translateX(-50%);
        z-index: 3;
        img{
            width: 100%;
            height: 100%;
        }
    }
}    

</style>