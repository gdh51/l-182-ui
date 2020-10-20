import LContainer from './src/index.vue'

LContainer.install = function(Vue) {
    Vue.component(LContainer.name, LContainer)
}

export default LContainer
