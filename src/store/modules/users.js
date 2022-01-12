import axios from "axios";

export default {
    namespaced: true,

    state: () => ({
        items: []
    }),

    mutations: {
        set(state, payload) {
            state.items = payload;
        },
    },

    actions: {
        set(context) {
            return axios.get('http://jsonplaceholder.typicode.com/posts').then((response) => {
                context.commit("set", response.data);
            });
        },
    },

    getters: {
        get: (state) => state.items,
    }
};
