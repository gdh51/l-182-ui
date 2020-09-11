export const BAR_MAP = {

    // 垂直
    vertical: {
        axis: 'Y',
        client: 'clientY',
        rectSize: 'height',
        clientSize: 'clientHeight',
        scrollOffset: 'scrollTop',
        class: 'is-vertical'
    },

    // 水平
    horizontal: {
        axis: 'X',
        client: 'clientX',
        rectSize: 'width',
        clientSize: 'clientWidth',
        scrollOffset: 'scrollLeft',
        class: 'is-horizontal'
    }
}

// 节流函数
export function lazyHandler (fn, time, ctx) {
    let timer

    return function (...arg) {

        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.call(ctx, ...arg)
        }, time)
    }
}
