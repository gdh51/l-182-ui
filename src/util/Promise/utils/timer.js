// 如果调度任务队列，优先微任务
export function timer(callback) {
    if (MutationObserver) {
        var counter = 1
        var observer = new MutationObserver(callback)
        var textNode = document.createTextNode(String(counter))
        observer.observe(textNode, {
            characterData: true
        })

        // 触发事件
        counter = (counter + 1) % 2
        textNode.data = String(counter)
    } else {
        setTimeout(callback, 4)
    }
}