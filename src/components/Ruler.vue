<!-- 
  Rulers component
      Options: 
      position: ['top', 'left']
      step: in pixels ruler step
      amount: amount of blocks in parent scope
 -->
 
<template>
    <div :class="'ruler-' + position">
        <div class="stack" ref="stack">
            <div class="index" v-for="(i, index) in items" :index="index" :key="position + index"></div>
        </div>
    </div>
</template>
<script>
    import Helper from '@/helper'

    export default {
        name: 'Ruler',

        props: {
            amount: {
                type: Number,
                required: true
            },
            position: {
                type: String,
                required: true
            },
            step: {
                type: Number,
                default: 100
            }
        },
        computed: {
            items() {
                return Array(this.amount).fill(null);
            },
            isTop() {
                return this.$el.className == 'ruler-top';
            },
            isLeft() {
                return this.$el.className == 'ruler-left';
            },

        },
        updated: function() {
            let items = this.$el.querySelectorAll('.index');
            if (this.isTop) {
                Array.from(items).forEach((i) => {
                    i.style['min-width'] = this.step + 'px';
                })
            }
            if (this.isLeft) {
                Array.from(items).forEach((i) => {
                    i.style['min-height'] = this.step + 'px';
                })
            }
            window.addEventListener('scroll', this.shiftPosition)
        },
        methods: {
            shiftPosition() {
                let offset;
                if (this.isTop) {
                    offset = Helper.getScrollOffsetWidth();
                    this.$refs.stack.style.transform = `translateX(-${offset}px)`;
                }
                if (this.isLeft) {
                    offset = Helper.getScrollOffsetHeight();
                    this.$refs.stack.style.transform = `translateY(-${offset}px)`;
                }
            },
        }
    }

</script>
<style lang="scss" scoped>
    @mixin fixed {
        position: fixed;
        z-index: 100;
    }

    @mixin number {
        content: attr(index);
        position: absolute;
        display: block;
    }

    .ruler {
        &-top {
            @include fixed;
            height: 20px;
            width: 100%;
/*            margin-top: -20px;*/

            .stack {
                display: inline-flex;
                flex-wrap: nowrap;
                flex-direction: row;

                .index {
                    height: 20px;
                    border: 1px solid grey;
                    border-bottom: none;
                    background-color: gold;

                    &:after {
                        @include number;
                    }
                }
            }
        }

        &-left {
            @include fixed;
            width: 20px;
            height: 100%;
/*            margin-left: -20px;*/

            .stack {
                display: flex;
                flex-wrap: wrap;
                flex-direction: column;

                .index {
                    width: 20px;
                    border: 1px solid grey;
                    border-right: none;
                    background-color: gold;

                    &:after {
                        @include number;
                    }
                }
            }
        }

    }

</style>
