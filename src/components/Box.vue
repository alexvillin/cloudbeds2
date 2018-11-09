<!--
    Box component
    Options: 
        index: unique box id in the scope of container
        containerIndex: String; unique container id
        containerData: Object; pass data for increase vuex calls
-->

<template>
    <div class="box" >
        <input type="checkbox" v-model.lazy="checked"/>
        <input type="number" v-model="number" :disabled="checked" @input="filter"/>
        <button v-show="checked || number" @click="save">Save</button>
    </div>
</template>
<script>

    export default {
        name: 'Box',
        components: {},
        props: {
            index: {
                type: String,
                required: true
            },
            containerIndex: {
                type: String,
                required: true
            },
            containerData: {
                type: Object,
                default: () => Object()
            }
        },
        data: function(){
            return {
                checked: false,
                number: ""
            }
        },
        created(){
            this.number = this.$store.state.data[this.key] || "";
        },
        mounted(){
        },
        computed:{
            key(){
                return this.containerIndex + this.index},
        },
        methods:{
            save(){
                this.$store.commit('setData', {
                    key: this.key,
                    data: this.number
                })
                console.log(this.$store.state.data);
            },
            filter($e){
                $e.target.value = this.number.replace(/\D/g, '');
            }
        }
    }

</script>
<style scoped lang="scss">
    .box {
        min-height: 100px;
        height: 100px;
        min-width: 100px;
        width: 100px;
        border: 4px solid white;
        overflow: hidden;
/*        position: absolute;*/
        background-color: #C5CAE9;
        padding: 5px;

/*
        &:after {
            content: attr(index);
            top: 0;
            position: absolute;
            left: 0;
            display: block;
            border-radius: 50%;
            color: white;
            background-color: grey;
        }
*/
    }

</style>
