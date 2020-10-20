import LCard from './src/index.vue'

LCard.install = function(Vue) {
    Vue.component(LCard.name, LCard)
}

export default LCard
