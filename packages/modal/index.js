import LModal from './src/index'

LModal.install = function(Vue) {
    Vue.component(LModal.name, LModal)
}

export default LModal
