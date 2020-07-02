<!-- 组件说明 -->
<template>
    <div class="chatxinicon">
        <!-- <span class="praise-num">{{praiseCount}}</span> -->
        <!-- <img src="../assets/imgs/living/details/like.png" alt /> -->
        <canvas :id="'bubble' + livingId"  width="90" :index="index" height="200" class="like-fx" ></canvas>
    </div>
</template>

<script>
    //import x from ''
    export default {
        name:'nodata',
        props:[
            'livingId',
            'livingUid',
            'index'
        ],
        components: {

        },
        data () {
            return {
                //点赞====================start
                obj_canvas: {},
                obj_ctx: {},
                praiseCount: 0,
                height: 200, //点赞
                width: 90, //点赞
                queue: {}, //点赞
                anima_timer: null, //点赞定时器    
                isFirst: 1
                //点赞====================end
            };
        },
        mounted() {
            let that = this;
            that.obj_canvas = document.getElementById("bubble" + that.livingId);
            that.obj_ctx = that.obj_canvas.getContext("2d");
        },
        computed: {
            
        },
        methods: {
            //轮询直播观看人数与点赞数
            getLivingPersonAndpraisePoint() {
                let that = this;
                this.api.living
                    .getLivingUserAndPraise({
                        liveId: that.livingId,
                        uid: that.livingUid
                    })
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.code == 1) {
                            that.watchcount = res.data.data.userNum;
                            that.praiseCount = res.data.data.continuePraiseNum;
                        }
                    })
            },
            //点赞提交后台
            postPraisePoint() {
                let that = this;
                this.api.living
                    .getLivingPraisePoint({
                        anchorId: that.livingUid,
                        flag: that.isFirst == 1 ? 2 : 1
                    })
                    .then(res => {
                        if (res.data.code == 1) {
                            //点赞成功回显
                            console.log(res.data);
                        }
                    })
            },
            /**点赞 */
            likeClick() {
                let that = this;
                let arrs = [];
                arrs.push("../../../../assets/imgs/icons/animation/1.png", "../../../../assets/imgs/icons/animation/2.png", "../../../../assets/imgs/icons/animation/3.png", "../../../../assets/imgs/icons/animation/4.png", "../../../../assets/imgs/icons/animation/5.png", "../../../../assets/imgs/icons/animation/6.png")
                const image = new Image(60, 45);
                image.onload = that.bubbleAnimate();
                image.src = 'http://www.piaoyouni.com/images/zan/' + that.getRandomInt(1, 6) + '.png';
                const anmationData = {
                    id: new Date().getTime(),
                    timer: 0,
                    opacity: 0.5,
                    pathData: that.generatePathData(),
                    image: image,
                    factor: {
                        speed: 0.004, // 运动速度，值越小越慢
                        t: 0 //  贝塞尔函数系数
                    }
                };
                if (Object.keys(that.queue).length > 0) {
                    that.queue[anmationData.id] = anmationData;
                } else {
                    that.queue[anmationData.id] = anmationData;
                    that.bubbleAnimate();
                }

                that.praiseCount = that.praiseCount + 1;
                that.isFirst = that.isFirst + 1;
                that.postPraisePoint();
            },
            /**获取最大最小随机值 */
            getRandom(min, max) {
                return Math.random() * (max - min) + min;
            },
            /**获取最大最小之前随机值的整数 */
            getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
            /**获取图片路径 */
            generatePathData() {
                let that = this;
                const p0 = {
                    x: 0.65 * that.width,
                    y: that.height
                };
                const p1 = {
                    x: that.getRandom(0.22 * that.width, 0.33 * that.width),
                    y: that.getRandom(0.5 * that.height, 0.75 * that.height)
                };
                const p2 = {
                    x: that.getRandom(0, 0.88 * that.width),
                    y: that.getRandom(0.25 * that.height, 0.5 * that.height)
                };
                const p3 = {
                    x: that.getRandom(0, 0.88 * that.width),
                    y: that.getRandom(0, 0.125 * that.height)
                };
                return [p0, p1, p2, p3];
            },
            /**更新图片的最新运动路径 */
            updatePath(data, factor) {
                const p0 = data[0];
                const p1 = data[1];
                const p2 = data[2];
                const p3 = data[3];
                const t = factor.t;
                /*计算多项式系数 （下同）*/
                const cx1 = 3 * (p1.x - p0.x);
                const bx1 = 3 * (p2.x - p1.x) - cx1;
                const ax1 = p3.x - p0.x - cx1 - bx1;

                const cy1 = 3 * (p1.y - p0.y);
                const by1 = 3 * (p2.y - p1.y) - cy1;
                const ay1 = p3.y - p0.y - cy1 - by1;

                const x = ax1 * (t * t * t) + bx1 * (t * t) + cx1 * t + p0.x;
                const y = ay1 * (t * t * t) + by1 * (t * t) + cy1 * t + p0.y;
                return {
                    x,
                    y
                };
            },
            /**点赞动画 */
            bubbleAnimate() {
                let that = this;
                Object.keys(that.queue).forEach(key => {
                    that.clearCanvas();
                    const anmationData = that.queue[+key];
                    const {
                        x,
                        y
                    } = that.updatePath(
                        anmationData.pathData,
                        anmationData.factor
                    );
                    const speed = anmationData.factor.speed;
                    anmationData.factor.t += speed;
                    var curWidth = 30;
                    curWidth = (that.height - y) / 1.5;
                    curWidth = Math.min(30, curWidth);
                    var curAlpha = anmationData.opacity;
                    curAlpha = y / that.height;
                    curAlpha = Math.min(1, curAlpha);
                    that.obj_ctx.globalAlpha = curAlpha;
                    that.obj_ctx.drawImage(anmationData.image, x - curWidth / 2, y, curWidth, curWidth);
                    if (anmationData.factor.t > 1) {
                        delete that.queue[anmationData.id];
                    }
                    if (y > that.height) {
                        delete that.queue[anmationData.id];
                    }
                });

                if (Object.keys(that.queue).length > 0) {
                    that.anima_timer = setTimeout(() => {
                        that.bubbleAnimate();
                    }, 5);
                } else {
                    clearTimeout(that.anima_timer);
                    that.clearCanvas();
                }
            },
            /**清空画布**/
            clearCanvas() {
                let that = this;
                var c = document.getElementById("bubble" + that.livingId);
                var cxt = c.getContext("2d");
                cxt.clearRect(0, 0, that.width, that.height);
            }
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
.like-fx {
    position: absolute;
    right: -.1rem;
    bottom: .6rem;
    z-index: 100000;
    pointer-events: none;
}
</style>

<style lang='less'>
//@import url()

</style>