export default {
    state: {
        sideWrapperVisibility: true
    },

    mutations: {
        toggleSwVibility (state, payload) {
            this.state.sideWrapperVisibility = payload;
        }
    }
};