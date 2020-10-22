import LButton from './button'
import LMask from './mask'
import LBox from './box'
import LSlideBox from './slide-box'
import LSlidePlane from './slide-box/src/components/l-slide-plane'
import LCard from './card'
import LSuspendedCard from './suspended-card'
import LScrollbar from './scrollbar'
import LBar from './bar'

const Components = [
    LButton,
    LMask,
    LSlideBox,
    LSlidePlane,
    LBox,
    LCard,
    LSuspendedCard,
    LScrollbar,
    LBar
]

export function registerComponents(Vue) {
    Components.forEach(component => {
        Vue.component(component.name, component)
    })
}
