<template>
    <div class="wrapper">
        <Ruler :amount="indexX + 2" position="top" />
        <Ruler :amount="indexY + 2" position="left" />
        <Container :key="1" />
    </div>
</template>

<script>
    import Vue from 'vue'
    import Helper from '@/helper'
    import Ruler from '@/components/Ruler.vue'
    import Container from '@/components/Container.vue'
    import VueLodash from 'vue-lodash'
    Vue.use(VueLodash, {
        name: 'lodash'
    })
    const ContainerComponent = Vue.extend(Container);

    export default {
        name: 'home',
        components: {
//            Box,
            Ruler,
            Container
        },
        data: function() {
            return {
//                indexX: 1,
//                indexY: 1,
//                oldX:0,
//                oldY:0,
                offsetX: 0,                                                                                                                                                                                                                                                                                                                                                     
                offsetY: 0,
                containerH: 1,
                containerW: 1,
                stack: [],
                matrix: new Array(1000).fill(null).map(() => {
                    return new Array(1000).fill(null);
                })
            }
        },
        mounted: function() {
            window.addEventListener('scroll', this.updateCounters)
//            this.init();
//                let box = this.createBox();
//                let box = this.createBox();
//            this.$el.appendChild(box)
//            console.log(box.clientHeight);
//                    this.stack.push(this.$el.lastChild);
            this.$nextTick(() => {
                let container = this.$el.lastChild;
//            let box = container.lastChild;
//            this.rows = Math.ceil(this.containerH / box.clientHeight)
//            this.rows = Math.ceil(this.containerW / box.clientWidth)
                    this.containerH = container.offsetHeight;
                    this.containerW = container.offsetWidth;
                this.updateCounters();
            this.redraw();
            })
//            this.indexX = 2;
//            this.indexY = 2;
//                    this.$el.lastChild;
//                this.createContainer();
//            let throttleUpdate = this.lodash.throttle(this.updateCounters, 500)
        },
        computed: {
            indexX(){
                return this.offsetX
                    ? Math.ceil(this.offsetX / this.containerW)
                    : 1
            },
            indexY(){
                return this.offsetY
                    ? Math.ceil(this.offsetY / this.containerH)
                    : 1
            },
        },
        methods: {
            redraw(){
                console.log(this.indexX, this.indexY);
                this.createContainer(this.indexX, this.indexY)
                this.fillAround()
            },
            
            updateCounters() {
                this.offsetX = Helper.getScrollOffsetX();
                this.offsetY = Helper.getScrollOffsetY();
            },
            createBox() {
                let box = new ContainerComponent({
                    propsData: {
//                        index: 
                    },
                }).$mount();
                return box.$el;
            },
            createContainer(x = 0 , y = 0){
                if(x < 0 || y < 0 || this.matrix[x][y]){
                    return ;
                }
                let offsetX = this.containerW * x;
                let offsetY = this.containerH * y;
                let container = this.createBox();
                container.style.transform = `translate(${offsetX}px, ${offsetY}px)`
                //mount element
                this.$el.appendChild(container);
                this.stack.push({container, x, y});
                this.matrix[x][y] = 1;
                console.log("New el: ", offsetX, offsetY);
            },
            fillAround() {
                Helper.spiralMatrix(this.indexX, this.indexY, this.createContainer) 
                console.log('done');
            },
        },
        watch: {
            indexX(newVal){
//                this.createContainer(this.indexX, this.indexY)
//                this.fillAround()
//                if(newVal - this.oldX >= this.containerW){
//                    this.matrix.forEach((i) => i.push(null))
//                    this.indexX++
//                    this.redraw();
//                    this.oldX = newVal;
//                }
//                if(this.oldX - newVal >= this.containerW && this.indexX){
//                    this.indexX--
//                    this.redraw();
//                    this.oldX = newVal;
//                }
                    this.redraw();
            },
            indexY(newVal){
//                if(newVal - this.oldY >= this.containerH){
//                    this.matrix.push(new Array(this.indexX).fill(null))
//                    this.indexY++
//                    this.redraw();
//                    this.oldY = newVal;
//                }
//                if(this.oldY - newVal >= this.containerH && this.indexY){
//                    this.indexY--
//                    this.redraw();
//                    this.oldY = newVal;
//                    console.log("!!!!: "+newVal);
//                }
                    this.redraw();
            },
            stack(val) {
                if(val.length > 12){
                let obj = val.shift()
                    obj.container.remove()
                    this.matrix[obj.x][obj.y] = null
                }
            },
        }
    }

</script>

<style lang="scss" scoped>
    .wrapper {
        position: relative;
    }
</style>
