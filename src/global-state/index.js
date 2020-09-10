export default {
    state: {
        sideWrapperVisibility: false
    },

    mutations: {
        toggleSwVibility(state, payload) {
            this.state.sideWrapperVisibility = payload
        }
    }
}
