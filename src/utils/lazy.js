/**
 * @description 防抖函数，连续多次调用仅会在最后次调用延迟一段时间后触发一次绑定函数
 * @param {Function} fn 防抖的函数
 * @param {Number} time 每次防抖函数触发的延迟时间
 * @param {Object} ctx 函数调用的上下文环境，默认为null
 * @param {Function} pre 防抖函数调用前的前置函数，该函数会在防抖函数每次调用时调用
 * @returns {Function} 防抖函数
 */
function debounce(fn, time, {
    ctx,
    pre
} = { ctx: null }) {
    let timer

    return function(...arg) {

        // 若未指定上下文，则使上下文为当前函数调用环境
        ctx || (ctx = this)
        pre && pre.call(ctx, ...arg)
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.call(ctx, ...arg)
        }, time)
    }
}

export { debounce }
