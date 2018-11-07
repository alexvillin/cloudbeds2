<template>
    <div class="wrapper">
        <Ruler :amount="indexX + 2" position="top" />
        <Ruler :amount="indexY + 2" position="left" />

        <div class="container">

<!--            <div class="container-flex" v-for="(r, rindex) in rowsCounter" :key="rindex">-->
                <Box :key="1" @scroll="updateCounters"/>
<!--                <Box v-for="(c, cindex) in colsCounter" :key="colsCounter * rindex + ++cindex" />-->
<!--            </div>-->
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Helper from '@/helper'
    import Box from '@/components/Box.vue'
    import Ruler from '@/components/Ruler.vue'
    import VueLodash from 'vue-lodash'
    Vue.use(VueLodash, {
        name: 'lodash'
    })
    const BoxComponent = Vue.extend(Box);

    export default {
        name: 'home',
        components: {
            Box,
            Ruler,
        },
        data: function() {
            return {
                indexX: 1,
                indexY: 1,
//                rows: 0,
//                cols: 0,
                containerH: 100,
                containerW: 100,
                container: {},
                stack: [],
                matrix: Array(100).fill(Array(100).fill(null))
            }
        },
        mounted: function() {
//            this.init();
//                let box = this.createBox();
//            this.$el.appendChild(box)
//            console.log(box.clientHeight);
//                    this.containerH = box.clientHeight;
//                    this.containerW = box.clientWidth;
//                    this.stack.push(this.$el.lastChild);
            this.container = this.$el.lastChild;
//            this.matrix[0][0] = 1;
//            this.indexX = 2;
//            this.indexY = 2;
//                    this.$el.lastChild;
//            this.$nextTick(() => {
//                this.createContainer();
            this.redraw;
//                this.fillAround(2, 2, this.createContainer);
                
//            })
            
//            let throttleUpdate = this.lodash.throttle(this.updateCounters, 500)
            window.addEventListener('scroll', this.updateCounters)
        },
        computed: {
            rows(){
                return Helper.getWindowHeight() * (this.indexY + 1)
            },
            cols(){
                return Helper.getWindowWidth() * (this.indexX + 1)
            },
            offsetX() {
                return this.containerW * this.indexX;
            },
            offsetY() {
                return this.containerH * this.indexY;
            },
            redraw(){
                return this.createContainer(this.indexX, this.indexY)
                    && this.fillAround(this.indexX, this.indexY, this.createContainer)
//                return this.indexX + this.indexY
            },
            
        },
        methods: {
            createContainer(x = 0 , y = 0){
                if(this.matrix[x][y] === undefined || this.matrix[x][y]){
                    return ;
                }
                let offsetX = this.containerW * x;
                let offsetY = this.containerH * y;
                console.log("New el: ", offsetX, offsetY);
                let container = this.createBox();
                    
                container.style.transform = `translate(${offsetX}px, ${offsetY}px)`
                //mount element
                this.$el.appendChild(container);
                this.stack.push({container, x, y});
                this.$nextTick(() => {
                    this.matrix[x][y] = 1;
                    this.clearOld();
                })
                return true;
            },
            fillAround(x = 0, y = 0, fn, level = 1, counter = 1) {
                let op = [1, -1, 1];
                //set start position
                let startX = ++x;
                let startY = --y;
                //drawing
                while (counter <= level) {
                    x = startX;
                    y = startY;
                    for(let i = 0; i< counter *2; i++){
                        let inc = op[i];
                        let ix = counter *2;
                        let iy = counter *2;
                        while(iy){
                            y += inc;
                            iy--;
                            fn(x, y);
                        }
                        //shift operation
                        inc = op[i+1];
                        while(ix){
                            x += inc;
                            ix--;
                            fn(x, y);
                        }
                    }
                    counter++;
                    startX += counter;
                    startY -= counter; 
                }
                console.log(this.indexX, this.indexY);
                console.log('done');
                return true;
            },

            clearOld() {
                if(this.stack.length > 9) {
//                      clearMatrix
                    let o = this.stack.shift()
                    o.container.remove();
                    this.matrix[o.x][o.y] = null;
                    console.log("del " + o.x, o.y);
                }
//                console.log('Shown: ' + this.stack.length);  
            },
            updateCounters() {
                if (Helper.isElementRightVisible(this.container, this.offsetX)) {
                    this.indexX++;
                    this.redraw;
//                    this.redraw();
                    return;
                }
                if (Helper.isElementBottomVisible(this.container, this.offsetY)) {
                    this.indexY++;
                    this.redraw;
//                    this.redraw();
                    return;
                }
//                if (Helper.isElementLeftVisible(this.container, this.offsetX) &&
//                    this.indexX) {
//                    this.indexX--;
//                }
//                if (Helper.isElementTopVisible(this.container, this.offsetY) &&
//                    this.indexY) {
//                    this.indexY--;
//                }
            },
            createBox() {
                let box = new BoxComponent({
                    propsData: {
//                        index: 
//                        scroll: this.throttleUpdate
                    },
                }).$mount();
                return box.$el;
            },
        },
    }

</script>

<style lang="scss" scoped>
    .wrapper {
        position: relative;
    }

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

    #optional {
        display: block;
        position: fixed;
        z-index: 1000;
        padding: 20px;
        background-color: lightgray;
        border: 2px solid gray;
    }

</style>
