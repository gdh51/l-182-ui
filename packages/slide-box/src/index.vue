<script>
import LBox from '@pack/box'
import { hyphenate } from '@/utils/hyphenate'
import {
    Direction,
    DirToShape,
    DirToDelta,
    Horizontal
} from '@/utils/is-slide/constants'
import { on, off } from '@/utils/event'
import { debounce } from '@/utils/lazy'

const LSlidePanel = 'l-slide-panel',
      ORIGIN_INDEX = 0,

      // 滚动的容错值，有时即使不同方向上的滚动，会导致实际滚动方向上的值有偏差
      TOLERANCE = 1,
      ONE_SECOND = 1000

export default {
    name: 'LSlideBox',
    components: { LBox },

    props: {
        width: { default: '100vw ', type: String },

        height: { default: '100vh', type: String },

        wrapperStyles: {
            type: Object,
            default() {
                return {
                    width: this.width,
                    height: this.height
                }
            }
        },

        direction: {
            default: 'horizontal',
            type: String,
            validator(val) {
                return Direction[val]
            }
        },

        // 过渡时间
        transitionTime: {
            default: 700,
            type: Number
        }
    },

    data() {
        return {
            isFocus: false,
            isSliding: false,

            // 当前方向下的以px为单位的一个box的位移量
            viewBaseOffset: 0,

            // 当前正处于页面的下标
            activeIndex: ORIGIN_INDEX,
            boxCount: 1,
            offsetRanges: [ 0 ]
        }
    },

    render(h) {

        // 过滤非l-box-plane元素
        const LSlidePanels = (this.$slots.default || []).filter(node => {
            const { data, componentOptions } = node,
                  { tag } = componentOptions || {},
                  isPanel = tag && hyphenate(tag) === LSlidePanel

            if (!isPanel) return false

            // 继承slide-box上的样式，优先保留子组件上样式
            if (data) {
                data.style = Object.assign(this.sharedStyle, data.style || {})
            } else {
                node.data = { style: this.sharedStyle }
            }
            return true
        })

        // 同步当前box的数量
        this.boxCount = LSlidePanels.length

        return h(
            'div',
            {
                style: {

                    // 视窗容器，相当于模拟滚动条
                    ...this.sharedStyle
                },
                staticClass: 'l-slide-box',
                on: {
                    click: () => (this.isFocus = true),
                    mousewheel: this.mousewheelHandler
                },
                ref: 'wrapper'
            },
            [
                h(
                    'div',
                    {

                        // 整个承载内容的容器
                        staticClass: 'l-slide-box__ctx-wrapper',
                        style: { ...this.mergedWrapperStyles },
                        on: { transitionend: this.transitionendHandler },
                        ref: 'view'
                    },
                    LSlidePanels
                )
            ]
        )
    },

    computed: {
        sharedStyle() {
            const styles = {
                width: this.width,
                height: this.height
            }

            if (this.direction === Horizontal) {
                styles.display = 'inline-block'

                // 在某些布局下(grid)，会出现奇怪的换行
                styles.verticalAlign = 'top'
            }

            return styles
        },

        // 当前页面位移的样式
        mergedWrapperStyles() {
            let translateStr
            const styles = {
                transition: `${this.transitionTime / ONE_SECOND}s ease all`,
                ...this.wrapperStyles
            }

            if (this.direction === Horizontal) {
                translateStr = `${this.offsetRanges[this.activeIndex]}px, 0px`
                styles.whiteSpace = 'nowrap'
            } else {
                translateStr = `0px, ${this.offsetRanges[this.activeIndex]}px`
            }
            styles.transform = `translate3d(${translateStr}, 0)`

            return styles
        }
    },

    watch: {
        width() {
            this.restoreBoxInfo()
        },

        height() {
            this.restoreBoxInfo()
        },

        boxCount() {
            this.restoreBoxInfo()
        }
    },

    mounted() {
        this.restoreBoxInfo()
    },

    methods: {
        restoreBoxInfo() {
            this.viewBaseOffset = this.$refs.wrapper.getBoundingClientRect()[
                DirToShape[this.direction]
            ]

            // 根据当前box的数量，初始化各个box所在的位移
            this.offsetRanges = Array.from({ length: this.boxCount }).map(
                (_, index) => -(index * this.viewBaseOffset)
            )

            // 自动跳转到首页
            this.activeIndex = ORIGIN_INDEX
        },
        unFocus() {
            this.isFocus = false
        },
        mousewheelHandler(e) {

            // 未聚焦或正在自动滚动，不进行滚动
            if (!this.isFocus || this.isSliding) return

            // 判断方向
            let offsetDelta = e[DirToDelta[this.direction]]

            // 这里剔除0的情况，防止其他方向的滑动导致误滑动
            if (!offsetDelta || Math.abs(offsetDelta) === TOLERANCE) return

            // 大于0是往下或者往右
            if (offsetDelta > 0) {

                // 当处于最后一个时，往下滚时
                if (this.activeIndex === this.boxCount - 1) return
                if (this.activeIndex >= this.boxCount - 1) {
                    this.activeIndex = this.boxCount
                } else {
                    this.activeIndex++
                }
            } else {

                // 当处于第一个时，往上滚，退出
                if (this.activeIndex === ORIGIN_INDEX) return

                if (this.activeIndex <= ORIGIN_INDEX) {
                    this.activeIndex = ORIGIN_INDEX
                } else {
                    this.activeIndex--
                }
            }

            this.isSliding = true
        },

        resizeHandler: debounce(function() {
            this.restoreBoxInfo()
        }, 300),

        // 动画执行完毕后还原
        transitionendHandler() {
            this.isSliding = false
        }
    },

    created() {
        on(window, 'click', this.unFocus, true)
        on(window, 'resize', this.resizeHandler)
    },

    destroyed() {
        off(window, 'click', this.unFocus)
        off(window, 'resize', this.resizeHandler)
    }
}
</script>

<style lang="stylus">
@import '~@theme/slide-box'
</style>
