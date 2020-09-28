import LSlideBox from './src/index.vue'
import LSlidePlane from './src/components/l-slide-plane.vue'

LSlideBox.install = function(Vue) {
    Vue.component(LSlidePlane.name, LSlidePlane)
    Vue.component(LSlideBox.name, LSlideBox)
}

export default LSlideBox
