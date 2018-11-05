<template>
    <div class="wrapper">
        <Ruler :amount="colsCounter * (indexX + 1)" position="top" />
        <Ruler :amount="rowsCounter * (indexY + 1)" position="left" />

        <div class="container">

            <div class="container-flex" v-for="(r, rindex) in rowsCounter" :key="rindex">
                <Box v-for="(c, cindex) in colsCounter" :key="colsCounter * rindex + ++cindex" />
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Helper from '@/helper'
    import Box from '@/components/Box.vue'
    import Ruler from '@/components/Ruler.vue'

    export default {
        name: 'home',
        components: {
            Box,
            Ruler
        },
        data: function() {
            return {
                indexX: 0,
                indexY: 0,
                rowsCounter: 1,
                colsCounter: 1,
                screenW: Helper.getWindowWidth(),
                screenH: Helper.getWindowHeight(),
                delay: true,
                containerH: 0,
                containerW: 0,
                container: {},
                currentContainer: {},
                stack: [],
                inProcess: false,
            }
        },
        mounted: function() {
            this.init();
            window.addEventListener('scroll', this.updateCounters)
        },
        computed: {
            rows() {
                return Array(this.rowsCounter);
            },
            cols() {
                return Array(this.colsCounter);
            },
            offsetX() {
                return this.containerW * this.indexX;
            },
            offsetY() {
                return this.containerH * this.indexY;
            },
        },
        methods: {
            init() {
                Helper.isLoadBeforehand = true;
                let box = this.$el.querySelector('.box');
                //contain visible part of screen
                this.rowsCounter = Math.ceil(this.screenW / box.clientWidth);
                this.colsCounter = Math.ceil(this.screenH / box.clientHeight);
                let container = this.$el.querySelector('.container');
                //init container dimensions
                this.$nextTick(() => {
                    this.containerH = Helper.getElementHeight(container);
                    this.containerW = Helper.getElementWidth(container);
                    //set node example for reuse
                    this.container = container.cloneNode(true);
                    //set current pointer
                    this.currentContainer = this.$el.lastChild;
                    this.stack.push(this.$el.lastChild);
                })
            },
            updateCounters() {
                if (Helper.isElementRightVisible(this.currentContainer, this.offsetX)) {
                    this.indexX++;
                    this.createNode()
                }
                if (Helper.isElementBottomVisible(this.currentContainer, this.offsetY)) {
                    this.indexY++;
                    this.createNode()
                }
                if (Helper.isElementLeftVisible(this.currentContainer, this.offsetX) &&
                    this.indexX) {
                    this.indexX--;
                    this.createNode()
                }
                if (Helper.isElementTopVisible(this.currentContainer, this.offsetY) &&
                    this.indexY) {
                    this.indexY--;
                    this.createNode()
                    
                }
            },
            //set helper timeout
            timeout(fn) {
                if (this.delay) {
                    setTimeout(fn, 500);
                } else {
                    fn();
                }
            },
            createNode() {
                this.container.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px)`
                let container = this.container.cloneNode(true);
                //mount element
                this.$el.appendChild(container);
                //change pointer
                this.currentContainer = this.$el.lastChild;
                this.stack.push(this.$el.lastChild);
                // clear queue
                if (this.stack.length > 8) {
                    this.stack.shift().remove();
                }
            },
        }
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
