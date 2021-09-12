import LSlideBox from './src/index'
import LSlidePanel from './src/components/slide-panel'

LSlideBox.install = function(Vue) {
    Vue.component(LSlidePanel.name, LSlidePanel)
    Vue.component(LSlideBox.name, LSlideBox)
}

export default LSlideBox
