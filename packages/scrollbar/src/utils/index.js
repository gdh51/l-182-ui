import { BAR_PROP_MAP } from './const'
import { getScrollbarWidth } from './native-scrollbar'
function genSlotbar(type, h, vm) {
    const { isScrolling } = vm,
        { axis } = BAR_PROP_MAP[type]

    return h('l-bar-slot', {
        class: [ 'l-scrollbar__bar', { 'is-scrolling': isScrolling } ],
        props: {
            movePercentage: vm[`move${axis}`],
            barSize: vm[`${type}Size`],
            disableJump: true
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
