function debounce(fn, time, ctx) {
    let timer

    return function(...arg) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.call(ctx, ...arg)
        }, time)
    }
}

export { debounce }
