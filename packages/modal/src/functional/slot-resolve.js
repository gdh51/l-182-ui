import { isVNode, isArray, isObject } from '@/utils/type'

/**
 * @description 处理不同类型的插槽类容
 * @param {Object} slotContent 用户传入的插槽内容，可以是组件或Vnode
 * @param {String} slotName 要处理的插槽名称
 * @param {Object} slotsState 用于存储转化后的插槽内容
 * @param {Object} props 当插槽为组件时，传递给该组件的props
 */
function resolveSlot({ slotContent, slotName, slotsState, props, h }) {
    // 单个节点的时候
    if (isVNode(slotContent)) {
        slotsState[slotName] = [slotContent]

        // 使用数组为节点时，只使用第一个
    } else if (isArray(slotContent) && isVNode(slotContent[0])) {
        slotsState[slotName] = slotContent
    } else if (isObject(slotContent)) {
        slotsState[slotName] = [h(slotContent, { props })]
    }
}

export { resolveSlot }
