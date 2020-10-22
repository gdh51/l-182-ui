import LBar from './src/index'

LBar.install = function(Vue) {
    Vue.component(LBar.name, LBar)
}

export default LBar
