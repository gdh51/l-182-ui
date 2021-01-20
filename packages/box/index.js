import LBox from './src/index.vue'

LBox.install = function(Vue) {
    Vue.component(LBox.name, LBox)
}

export default LBox
