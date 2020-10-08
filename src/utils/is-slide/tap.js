// 触摸开始，切换状态，禁用滚动事件
function touchStartHandler(box) {
    return function start() {
        box.isTouching = true
    }
}

// 触摸结束，开始滚动事件，计算当前位置
function MoveAndEndHandler(box) {

    // let moveEndPosition = {
    //     leftOffset: 0,
    //     topOffset: 0
    // }
    return {

        moveHandler(e) {
            console.log(e.changedTouches[0])

            // 保存move的最终位置
        },
        endHanlder(e) {
            console.log(e.changedTouches[0])
            box.isTouching = false
        }
    }
}

function setTouchHandler(box) {
    const { el } = box,
        startHandler = touchStartHandler(box),
        { moveHandler, endHanlder } = MoveAndEndHandler(box)

    el.addEventListener('touchstart', startHandler, { passive: false })
    el.addEventListener('touchmove', moveHandler, { passive: false })
    el.addEventListener('touchend', endHanlder, { passive: false })
    return function unbindHandler() {
        el.removeEventListener('touchstart', startHandler)
        el.removeEventListener('touchstart', moveHandler)
        el.removeEventListener('touchend', endHanlder)
    }
}

export { setTouchHandler }
