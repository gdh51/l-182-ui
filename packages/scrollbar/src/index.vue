<template>
    <div class="l-scrollbar" ref="view" @resize="calcViewInfo">
        <!-- 包装内容的容器，该容器用于呈现滚动条，利用神奇的margin将其隐藏 -->
        <div
            :class="[ 'l-scrollbar__wrap', wrapClass ]"
            :style="finalStyle"
            @scroll="scrolling"
            ref="wrap"
        >
            <slot />
        </div>
        <!-- 横向竖向都需要一个，因为我们不能确定两个方向都出来滚动条 -->
        <l-bar-slot
            class="l-scrollbar__bar"
            v-if="isShowVertical"
            :move-percentage.sync="moveY"
            :barSize="verticalSize"
            :disableJump="true"
            @jump="watchUnrolledMove('vertical', $event, true)"
            @drag="watchUnrolledMove('vertical', $event)"
        />
        <l-bar-slot
            horizontal
            class="l-scrollbar__bar"
            v-if="isShowHorizontal"
            :move-percentage.sync="moveX"
            :barSize="horizontalSize"
            :disableJump="true"
            @jump="watchUnrolledMove('horizontal',$event, true)"
            @drag="watchUnrolledMove('horizontal',$event)"
        />
    </div>
</template>

<script>
import LBarSlot from '@pack/bar-slot'
import { debounce } from '@/utils/lazy'
import { getScrollbarWidth } from './utils/native-scrollbar'
import { BAR_PROP_MAP } from './utils/const'

// 获取原生滚动条厚度
const nativeBarWidth = getScrollbarWidth(),
      OneHundredPercent = 100

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

    data() {
        return {
            moveY: 0,
            moveX: 0,
            viewHeight: 0,
            viewWidth: 0,
            isShowVertical: false,

            isShowHorizontal: false,
            verticalSize: '1%',
            horizontalSize: '1%'
        }
    },

    computed: {

        // 合并用户样式与修正滚动条位置的样式
        finalStyle() {
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

    mounted() {
        this.calcViewInfo()
    },

    methods: {

        // 计算视窗的信息，包括是否显示滚动条，显示哪个滚动条
        calcViewInfo: debounce(function() {
            const { view, wrap } = this.$refs,
                  { scrollWidth, scrollHeight } = wrap,
                  { height, width } = view.getBoundingClientRect()

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

            // eslint-disable-next-line
        }, 666),
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

        // 监听非滚动带来的变动
        watchUnrolledMove(type, { relative }, isJump) {

            const {
                      viewSize, scrollOffset, start
                  } = BAR_PROP_MAP[type],
                  moveDis =
                      (relative * this[viewSize]) / OneHundredPercent
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
