import { BAR_PROP_MAP } from './const'
import { getScrollbarWidth } from './native-scrollbar'
import { upperFirst } from 'lodash'

function genSlotbar(type, h, vm) {
    const { axis } = BAR_PROP_MAP[type],
        isHorizontal = type === 'horizontal'

    return h('l-bar-slot', {
        class: [ 'l-scrollbar__bar', { 'is-scrolling': vm['is' + upperFirst(type) + 'Scrolling'] } ],
        props: {
            movePercentage: vm[`move${axis}`],
            barSize: vm[`${type}Size`],
            disableJump: true,
            horizontal: isHorizontal
        },
        on: {
            'update:movePercentage': v => (vm[`move${axis}`] = v),
            jump: vm.watchUnrolledMove.bind(vm, type, true),
            drag: vm.watchUnrolledMove.bind(vm, type, false)
        }
    })
}

export {
    genSlotbar, BAR_PROP_MAP, getScrollbarWidth
}
