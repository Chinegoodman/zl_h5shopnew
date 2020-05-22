<!-- 组件说明 -->
import { type } from 'os';
<template>
    <div v-if="mengbanstatus" @click="mengbanclick" class='mengban' @touchmove.prevent>
        
    </div>
</template>

<script>
    //import x from ''
    export default {
        props:{
            mengbanstatus:{
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
            mengbanclick:function(){
                this.$emit('mengbanclick')
            }
        },
        mounted() {

        },
    }
</script>

<style lang='less' scoped>
//@import url()
.mengban{
    position: fixed;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 7.5rem;
    height: 100%;
    background-color: rgba(0,0,0,0.62);
    z-index: 500;
}
</style>

<style lang='less'>
//@import url()

</style>