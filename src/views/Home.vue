<template>
    <div class="wrapper">
        <Ruler :amount="(indexX+1) * containerW /100" position="top" />
        <Ruler :amount="(indexY+1) * containerH /100" position="left" />
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
                offsetX: 0,                                                                                                                                                                                                                                                                                                                                                     
                offsetY: 0,
                containerH: 100,
                containerW: 100,
                stack: [],
                matrix: new Array(1000).fill(null).map(() => {
                    return new Array(1000).fill(null);
                })
            }
        },
        mounted: function() {
            window.addEventListener('scroll', this.updateCounters)
            this.$nextTick(() => {
                let container = this.$el.lastChild;
                this.containerH = container.offsetHeight;
                this.containerW = container.offsetWidth;
                this.updateCounters();
                this.redraw();
            })
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
                        indexX: this.indexX,
                        indexY: this.indexY, 
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
                this.redraw();
            },
            indexY(newVal){
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
