import LSlideBox from './src/index.vue'
import LSlidePanel from './src/components/l-slide-plane.vue'

LSlideBox.install = function(Vue) {
    Vue.component(LSlidePanel.name, LSlidePanel)
    Vue.component(LSlideBox.name, LSlideBox)
}

export default LSlideBox
