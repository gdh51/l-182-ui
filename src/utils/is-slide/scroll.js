import { findLastIndex } from 'lodash'
function scrollHandler(box) {

    // 上一次滚动的位置
    // eslint-disable-next-line
    let prevOffset = 0,

        // 是否处于滚动中
        pending = false,
        {
            el, offsets, dir
        } = box,

        // eslint-disable-next-line
        maxIndex = offsets.length - 1

    // 指定this到box实例
    return function() {
        if (box.isTouching) return
        const currentOffset = el['scroll' + dir]

        // 由于调用scrollTo会不断的触发滚动时间，所以在到达目标前
        // 我们需要禁止其他行为
        if (pending) {

            // 滚动完毕，还原滚动状态
            (currentOffset === prevOffset) && (pending = false)
            return
        }

        // 计算应该滑动的位置
        // 向下滚动
        if (currentOffset > prevOffset) {

            // 已经为最后一个位置了，则直接退出
            if (box.current >= maxIndex) return

            // 找到第一个比前一个位置大的位置的下标
            box.current = offsets.findIndex(offset => offset > prevOffset)
        } else {

            // eslint-disable-next-line
            if (box.current <= 0) return 

            // 找到第一个比前一个位置小的位置的下标
            box.current = findLastIndex(offsets, offset => offset < prevOffset)
        }

        // 获取下一个滚动位置位移
        prevOffset = offsets[box.current]

        el.scrollTo({
            [dir.toLowerCase()]: prevOffset,
            behavior: 'smooth'
        })

        // 切换为滚动状态
        pending = true
    }
}

function setScrollHandler(box) {
    const { el } = box,
        handler = scrollHandler(box)

    el.addEventListener('scroll', handler, { passive: false })
    return function unbindHandler() {
        el.removeEventListener('scroll', handler)
    }
}

export { setScrollHandler }
