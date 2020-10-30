<script>
import LBarSlot from '@pack/bar-slot'
import { debounce } from '@/utils/lazy'
import {
    BAR_PROP_MAP, getScrollbarWidth, genSlotbar
} from './utils'

// 获取原生滚动条厚度
const nativeBarWidth = getScrollbarWidth(),
      OneHundredPercent = 100,
      WatiTime = 666

export default {
    name: 'LScrollbar',

    components: { LBarSlot },

    props: {

        // 视窗样式
        wrapStyle: {
            type: [ Object, String ],
            default() {
                return {}
            }
        },

        wrapClass: {
            type: [ Array, String ],
            default() {
                return ''
            }
        }
    },

    render(h) {

        // 有些滚动条不参与盒子计算，比如Mac
        const gutterClass = nativeBarWidth
                  ? ''
                  : 'l-scrollbar__wrap--hidden-default',

              // 容器元素，用来做大小限制，滚动
              wrap = h(
                  'div',
                  {
                      class: [ 'l-scrollbar__wrap', this.wrapClass, gutterClass ],
                      ref: 'wrap',
                      on: { scroll: this.scrolling },
                      style: this.mergedStyle
                  },
                  [ this.$slots.default ]
              ),
              viewChildNodes = [ wrap ]

        this.isShowVertical &&
            viewChildNodes.push(genSlotbar('vertical', h, this)),
        this.isShowHorizontal &&
            viewChildNodes.push(genSlotbar('horizontal', h, this))

        return h(
            'div',
            {
                class: [ 'l-scrollbar', this.pending ? 'is-pending' : '' ],
                on: { resize: this.calcViewInfo }
            },
            viewChildNodes
        )
    },

    data() {
        return {
            moveY: 0,
            moveX: 0,
            viewHeight: 0,
            viewWidth: 0,
            isShowVertical: false,

            isShowHorizontal: false,
            verticalSize: '1%',
            horizontalSize: '1%',
            isVerticalScrolling: false,
            isHorizontalScrolling: false,

            // 由于计算方式问题，在window下滚动条会闪现，所以我们需要做个处理
            pending: true
        }
    },

    computed: {

        // 合并用户样式与修正滚动条位置的样式
        mergedStyle() {
            let wrapStyle = this.wrapStyle

            // 处理字符串形式值
            if (typeof this.wrapStyle === 'string') {
                wrapStyle = wrapStyle.split(';').reduce((f, style) => {

                    // 无样式直接返回
                    if (!style) return f
                    const [ key, val ] = style.split(':')
                    f[key.trim()] = val.trim()

                    return f
                }, {})
            }

            return [
                wrapStyle,
                {
                    marginRight: this.isShowVertical && `-${nativeBarWidth}px`,
                    marginBottom:
                        this.isShowHorizontal && `-${nativeBarWidth}px`
                }
            ]
        }
    },

    // 滚动时显示滚动条
    watch: {
        moveX() {
            this.delayRestoreH()
        },
        moveY() {
            this.delayRestoreV()
        }
    },

    mounted() {
        this.calcViewInfo()
    },

    methods: {

        // 计算视窗的信息，包括是否显示滚动条，显示哪个滚动条
        calcViewInfo: debounce(function() {
            const { wrap } = this.$refs,
                  { scrollWidth, scrollHeight } = wrap,
                  height = wrap.clientHeight,
                  width = wrap.clientWidth

            // 存储视窗信息用于等会滚动计算
            this.viewHeight = height
            this.viewWidth = width

            // 作为开关，能开也能关
            if (Math.round(height) < scrollHeight) {
                this.isShowVertical = true
                this.verticalSize =
                    (height / scrollHeight) * OneHundredPercent + '%'
            } else {
                this.isShowVertical = false
            }

            if (Math.round(width) < scrollWidth) {
                this.isShowHorizontal = true
                this.horizontalSize =
                    (width / scrollWidth) * OneHundredPercent + '%'
            } else {
                this.isShowHorizontal = false
            }

            this.pending = false
        }, WatiTime),
        scrolling() {
            const wrap = this.$refs.wrap

            if (this.isShowVertical) {
                this.moveY =
                    (wrap.scrollTop / this.viewHeight) * OneHundredPercent
            }

            if (this.isShowHorizontal) {
                this.moveX =
                    (wrap.scrollLeft / this.viewWidth) * OneHundredPercent
            }
        },

        delayRestoreV: debounce(
            function() {
                this.isVerticalScrolling = false
            },
            WatiTime,
            {
                pre: function() {
                    this.isVerticalScrolling = true
                }
            }
        ),

        delayRestoreH: debounce(
            function() {
                this.isHorizontalScrolling = false
            },
            WatiTime,
            {
                pre: function() {
                    this.isHorizontalScrolling = true
                }
            }
        ),

        // 监听非滚动带来的变动
        watchUnrolledMove(type, isJump, { relative }) {
            const {
                      viewSize, scrollOffset, start
                  } = BAR_PROP_MAP[type],
                  moveDis = (relative * this[viewSize]) / OneHundredPercent
            if (!isJump) {
                return (this.$refs.wrap[scrollOffset] = moveDis)
            }

            // 跳转时，使用scroll函数平滑跳转
            this.$refs.wrap.scrollTo({ [start]: moveDis, behavior: 'smooth' })
        }
    }
}
</script>

<style lang="stylus">
@import '~@theme/scrollbar.styl'
</style>
