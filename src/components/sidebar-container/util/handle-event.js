/**
 * 计算当前点击(鼠标)相对于提供的元素的相对位置(用于绝对定位)
 * @param {Object} event 事件对象，我会这里会取其client的值
 * @param {Object} elRect 元素的Rect对象，优先使用该值
 * @param {Object} el 参照的元素
 * 超出边界时返回0
 */
function calcAbOfEle (event, elRect, el) {

    // 提供Rect时，就使用当前的Rect
    elRect = elRect || el.getBoundingClientRect()
    let top = event.clientY - elRect.top,
        left = event.clientX - elRect.left

    return {
        top: top <= 0 ? 0 : top,
        left: left <= 0 ? 0 : left
    }
}

export {
    calcAbOfEle
}
