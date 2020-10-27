import LButton from './button'
import LMask from './mask'
import LBox from './box'
import LSlideBox from './slide-box'
import LSlidePanel from './slide-box/src/components/l-slide-plane'
import LCard from './card'
import LScrollbar from './scrollbar'
import LBar from './bar'
import LBarSlot from './bar-slot'

const Components = [
    LButton,
    LMask,
    LSlideBox,
    LSlidePanel,
    LBox,
    LCard,
    LScrollbar,
    LBar,
    LBarSlot
]

export function registerComponents(Vue) {
    Components.forEach(component => {
        Vue.component(component.name, component)
    })
}
