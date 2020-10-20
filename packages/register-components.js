import LButton from './button'
import LMask from './mask'
import LBox from './box'
import LSlideBox from './slide-box'
import LSlidePlane from './slide-box/src/components/l-slide-plane'
import LCard from './card'
import LSuspendedCard from './suspended-card'

const Components = [
    LButton,
    LMask,
    LSlideBox,
    LSlidePlane,
    LBox,
    LCard,
    LSuspendedCard
]

export function registerComponents(Vue) {
    Components.forEach(component => {
        Vue.component(component.name, component)
    })
}
