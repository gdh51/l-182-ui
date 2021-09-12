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
            el.removeEvent('on' + exsvent, handler)
        }
    }
})()

export function mergeEvents(toEvents = {}, fromEvents = {}) {
    const keys = [
        ...new Set([...Object.keys(toEvents), Object.keys(fromEvents)])
    ]

    keys.forEach(key => {
        const toEvent = toEvents[key],
            fromEvent = fromEvents[key]

        if (toEvent && fromEvent) {
            if (Array.isArray(toEvent)) {
                toEvents[key] = toEvent.concat(fromEvent)
            } else {
                toEvents[key] = [toEvent].concat(fromEvent)
            }
        } else if (fromEvent) {
            toEvents[key] = fromEvent
        }
    })

    return toEvents
}
