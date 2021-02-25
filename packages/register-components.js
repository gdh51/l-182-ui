import LButton from './button'
import LMask from './mask'
import LModal from './modal'
import LBox from './box'
import LSlideBox from './slide-box'
import LSlidePanel from './slide-box/src/components/slide-panel'
import LCollapseBox from './collapse-box'
import LCard from './card'
import LScrollbar from './scrollbar'
import LBar from './bar'
import LBarSlot from './bar-slot'
import LIcon from './icon'
import LMenu from './menu'
import LMenuItem from './menu/src/components/menu-item'
import LFlipTransition from './flip-transition'

import { $alert, $modal } from './modal/src/functional'

const Components = [
    LButton,
    LMask,
    LSlideBox,
    LSlidePanel,
    LBox,
    LCollapseBox,
    LCard,
    LScrollbar,
    LBar,
    LBarSlot,
    LModal,
    LIcon,
    LMenu,
    LMenuItem,
    LFlipTransition
]

export default function registerComponents(Vue) {
    Components.forEach(component => {
        Vue.component(component.name, component)
    })
}

export { $alert, $modal }
