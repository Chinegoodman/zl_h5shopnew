<!-- 组件说明 -->
<template>
    <span :class="{'levlein' :true,'.levlein6-10': Number(lv_num)>5 && Number(lv_num)<= 10,'levlein10-15': Number(lv_num)>11 && Number(lv_num)<= 15,'levlein16-20':Number(lv_num)>16 && Number(lv_num)<= 20,'levlein21-25':Number(lv_num)>21 && Number(lv_num)<= 25,'levlein26-30':Number(lv_num)>26 && Number(lv_num)<= 30,'levlein31-35':Number(lv_num)>31 && Number(lv_num)<= 35,'levlein36-40':Number(lv_num)>36 && Number(lv_num)<= 40,'levlein41-45':Number(lv_num)>41 && Number(lv_num)<= 45,'levlein46-50':Number(lv_num)>46 && Number(lv_num)<= 50,'levlein51-55':Number(lv_num)>51 && Number(lv_num)<= 55,'levlein56-60':Number(lv_num)>56 && Number(lv_num)<= 60,'levlein61-65':Number(lv_num)>61 && Number(lv_num)<= 65,'levlein66-70':Number(lv_num)>66 && Number(lv_num)<= 70,'levlein71-72':Number(lv_num)>71 && Number(lv_num)<= 72}">
        <!-- <span class="praise-num">{{praiseCount}}</span> -->
        <!-- <img src="../assets/imgs/living/details/like.png" alt /> -->
        <!-- <canvas :id="'bubble' + livingId"  width="90" :index="index" height="200" class="like-fx" ></canvas> -->
        <span class="ic">
            <img v-if="Number(lv_num)>6 && Number(lv_num) <= 10"  src="../assets/imgs/living/xiudetails/diamond.png" alt="">
            <img v-if="Number(lv_num)<=5 || Number(lv_num) >= 11"  src="../assets/imgs/living/xiudetails/star.png" alt="">
        </span>
        <span class="lv_num">{{lv_num<10?'0'+lv_num:lv_num}}</span>
    </span>
</template>

<script>
    //import x from ''
    export default {
        name:'levledata',
        props:[
            'lv_num'
        ],
        components: {

        },
        data () {
            return {

            };
        },
        mounted() {
        },
        computed: {
            
        },
        methods: {
            //以下区间为点赞 end  
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
.levlein {
    display: inline-block;
    width: 0.94rem;
    height: 0.34rem;
    // position: relative;
    text-align: center;
    color: #ffffff;
    background-image: url(../assets/imgs/living/xiudetails/lv.png);
    background-size: .94rem .34rem;
    background-position: left center;
    background-repeat: no-repeat;
    display: flex;
    .ic{
        display : inline-block;
        width: .26rem;
        height: .26rem;
        padding-left : .15rem;
        padding-top : .03rem;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .lv_num{
        display: inline-block;
        width: .53rem;
        height: .34rem;
        text-align: center;
        font-size: .24rem;
        font-family:DIN;
        font-weight:bold;
        color:rgba(255,255,255,1);
    }
}
.levlein6-10{
    background-image: url(../assets/imgs/living/xiudetails/vips6-10.png);
}
.levlein10-15{
    background-image: url(../assets/imgs/living/xiudetails/vips10-15.png);
}
.levlein16-20{
    background-image: url(../assets/imgs/living/xiudetails/vips16-20.png);
}
.levlein21-25{
    background-image: url(../assets/imgs/living/xiudetails/vips21-25.png);
}
.levlein26-30{
    background-image: url(../assets/imgs/living/xiudetails/vips26-30.png);
}
.levlein31-35{
    background-image: url(../assets/imgs/living/xiudetails/vips31-35.png);
}
.levlein36-40{
    background-image: url(../assets/imgs/living/xiudetails/vips36-40.png);
}
.levlein41-45{
    background-image: url(../assets/imgs/living/xiudetails/vips41-45.png);
}
.levlein46-50{
    background-image: url(../assets/imgs/living/xiudetails/vips46-50.png);
}
.levlein51-55{
    background-image: url(../assets/imgs/living/xiudetails/vips51-55.png);
}
.levlein56-60{
    background-image: url(../assets/imgs/living/xiudetails/vips56-60.png);
}
.levlein61-65{
    background-image: url(../assets/imgs/living/xiudetails/vips61-65.png);
}
.levlein66-70{
    background-image: url(../assets/imgs/living/xiudetails/vips66-70.png);
}
.levlein71-72{
    background-image: url(../assets/imgs/living/xiudetails/vips71-72.png);
}
</style>

<style lang='less'>
//@import url()

</style>