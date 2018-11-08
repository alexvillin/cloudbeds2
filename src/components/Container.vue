<template>
    <div class="container">
        <div class="container-flex" v-for="(r, rindex) in rowsCounter" :key="rindex">
            <Box v-for="(c, cindex) in colsCounter" :index="colsCounter * rindex + ++cindex" :key="cindex"/>
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

        },
        data: function() {
            return {
                rowsCounter: 1,
                colsCounter: 1,
                screenH: Helper.getWindowHeight(),
                screenW: Helper.getWindowWidth(),
            }
        },
        mounted: function() {
            let box = this.$el.querySelector('.box');
            this.rowsCounter = Math.ceil(this.screenH / 100);//box.clientHeight);
            this.colsCounter = Math.ceil(this.screenW / 100);//box.clientWidth);
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
