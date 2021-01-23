import LButton from './button'
import LMask from './mask'
import LModal from './modal'
import LBox from './box'
import LSlideBox from './slide-box'
import LSlidePanel from './slide-box/src/components/slide-panel'
import LCard from './card'
import LScrollbar from './scrollbar'
import LBar from './bar'
import LBarSlot from './bar-slot'
import LIcon from './icon'

const Components = [
    LButton,
    LMask,
    LSlideBox,
    LSlidePanel,
    LBox,
    LCard,
    LScrollbar,
    LBar,
    LBarSlot,
    LModal,
    LIcon
]

export default function registerComponents(Vue) {
    Components.forEach(component => {
        Vue.component(component.name, component)
    })
}
