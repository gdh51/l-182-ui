export const on = (function() {
    if (document.addEventListener) {
        return function(el, event, handler, useCapture) {
            if (el && event && handler) {
                el.addEventListener(event, handler, !!useCapture)
            }
        }
    }

    return function(el, event, handler) {
        if (el && event && handler) {
            el.attachEvent('on' + event, handler)
        }
    }
})()

export const off = (function() {
    if (document.removeEventListener) {
        return function(el, event, handler) {
            if (el && event && handler) {
                el.removeEventListener(event, handler)
            }
        }
    }

    return function(el, event, handler) {
        if (el && event && handler) {
            el.removeEvent('on' + event, handler)
        }
    }
})()
