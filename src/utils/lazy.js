function debounce(fn, time, ctx) {
    let timer

    return function(...arg) {

        // 若未指定上下文，则使上下文为当前函数调用环境
        ctx || (ctx = this)
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.call(ctx, ...arg)
        }, time)
    }
}

export { debounce }
