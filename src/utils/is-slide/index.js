import { DirToPosition } from './constants'
import { setScrollHandler } from './scroll'
import { setTouchHandler } from './tap'
import { cloneDeep, upperFirst } from 'lodash'

// 滚动、tap助手，让用户每次滚动或滑动时，滑动相同的位移
class IsometricSlide {

    // 注销事件监听器
    listeners = []

    //  所有的可滚动高度数组
    offsets = []

    // 当前处理的滑动位移的下标
    // eslint-disable-next-line
    current = 0

    constructor(options) {
        this.init(options)
    }

    /**
     * @description 初始化容器的大小信息与事件监听器
     * @param {Number} offset 单个容器的宽度
     * @param {Number} size 容器个数
     */
    init(options) {
        const {
            el, offset, size, dir = 'left'
        } = options

        this.el = el
        this.dir = upperFirst(dir)
        this.options = options

        // 当前是否在执行tap处理
        this.isTouching = false

        // 初始化所有可滑动的位移数组
        this.offsets = Array
            .from({ length: size })
            .map((v, index) => index * offset)

        this._setListener()
    }

    _setListener() {
        this.listeners.push(setScrollHandler(this))
        this.listeners.push(setTouchHandler(this))
    }

    // 暴露个接口，提供给外界更新所有事件监听器
    restore(options) {
        this.destroy()
        this.init(options)
    }

    destroy() {
        this.listeners.forEach(listener => listener())
        this.listeners = []
    }
}

/**
 * @description 等距离滑动容器
 * @param {Object} el 进行滚动的容器元素
 * @param {Number} size 容器元素中的展示界面的个数
 * @param {Number} offset 单个容器元素的用于滑动方位的长或宽
 * @param {direction} 滑动的模式 vertical 垂直还是 horizontal 水平
 */
function initSlideHelper(options) {
    const { direction } = options,
        normalizedOpt = cloneDeep(options)

    normalizedOpt.dir = DirToPosition[direction]
    delete normalizedOpt.direction

    const slider = new IsometricSlide(normalizedOpt),
        { restore, destroy } = slider

    // 返回一个重新载入配置与注销监听器函数
    return { restore: restore.bind(slider), destroy: destroy.bind(slider) }
}

export { initSlideHelper }
