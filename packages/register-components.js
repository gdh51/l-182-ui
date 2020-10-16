import LButton from './button'
import LMask from './mask'
import LBox from './box'
import LSlideBox from './slide-box'
import LSlidePlane from './slide-box/src/components/l-slide-plane.vue'

// import Modal from '../../packages/modal/modal.vue'
// import Wrapper from './components/wrapper/wrapper.vue'
// import Tip from '../../packages/tip/tip.vue'
// import DragBar from './components/dragbar/drag-bar.vue'
// import ProgressBar from './components/progress-bar/index.vue'
// import Icon from './components/icon/index.vue'
// import CirCleBox from './components/circle-box/index.vue'

const Components = [ LButton, LMask, LSlideBox, LSlidePlane, LBox ]

export function registerComponents(Vue) {
    Components.forEach(component => {
        Vue.component(component.name, component)
    })
}
