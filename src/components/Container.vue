<template>
    <div class="container">
        <div class="container-flex" v-for="(r, rindex) in rowsCounter" :key="rindex">
            <Box v-for="(c, cindex) in colsCounter" 
                :index="rindex + '' + cindex"
                :containerIndex="containerIndex"
                :key="cindex" />
        </div>
    </div>
</template>
<script>
    import Box from '@/components/Box.vue'
    import Helper from '@/helper'

    export default {
        name: 'Container',
        components: {
            Box,
        },
        props: {
            indexX: {type: Number, default: 0},
            indexY: {type:Number, default: 0}
        },
        data: function() {
            return {
                rowsCounter: 1,
                colsCounter: 1,
                screenH: Helper.getWindowHeight(),
                screenW: Helper.getWindowWidth(),
            }
        },
        computed:{
            containerIndex(){
                return String(this.indexX) + String(this.indexY)
            },
        },
        created(){
            this.rowsCounter = Math.ceil(this.screenH / 100);
            this.colsCounter = Math.ceil(this.screenW / 100);
        },  
    }

</script>
<style lang="scss" scoped>
    .container {
        position: absolute;
    }
    .container-flex {
        width: 100%;
        display: inline-flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        clear: both;

    }

</style>
