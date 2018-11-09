import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data: {}
    },
    mutations: {
        setData(state, payload) {
//            Vue.set(state.data, payload.key, payload.data)
            state.data[payload.key] = payload.data;
        },
    },
    actions: {
        setData(context, payload) {
            context.commit('setData', payload);
        },
    },

})
