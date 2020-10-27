import Vue from 'vue'

// eslint-disable-next-line
let scrollbarWidth = 0

// 获取当前环境下原生滚动条的宽度
function getScrollbarWidth() {
    if (Vue.prototype.$isServer) return scrollbarWidth
    if (scrollbarWidth) return scrollbarWidth

    const inner = document.createElement('div'),
        outer = document.createElement('div')

    inner.style.overflow = 'scroll'
    outer.style.visibility = 'hidden'
    outer.style.position = 'absolute'
    outer.style.top = '-9999px'
    outer.appendChild(inner)
    document.body.appendChild(outer)

    scrollbarWidth = outer.scrollWidth
    outer.remove()

    return scrollbarWidth
}


export { getScrollbarWidth }
