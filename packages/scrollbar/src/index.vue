<template>
    <div class="l-scrollbar" ref="view">
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
        />
        <l-bar-slot
            horizontal
            class="l-scrollbar__bar"
            v-if="isShowHorizontal"
            :move-percentage.sync="moveX"
        />
    </div>
</template>

<script>
import LBarSlot from '@pack/bar-slot'
import { debounce } from '@/utils/lazy'
import { on, off } from '@/utils/event'
import { getScrollbarWidth } from './utils/native-scrollbar'

// 获取原生滚动条厚度
const nativeBarWidth = getScrollbarWidth()

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

            isShowHorizontal: false
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

            return [ wrapStyle, {
                marginRight: this.isShowVertical && `-${nativeBarWidth}px`,
                marginBottom: this.isShowHorizontal && `-${nativeBarWidth}px`
            } ]
        }
    },

    mounted() {
        this.calcViewInfo()

        // this.updateScrollbar()
        // this.$refs.wrap &&
        //     on(
        //         this.$refs.wrap,
        //         'resize',

        //         /* eslint-disable-next-line */
        //         debounce(this.updateScrollbar, 500, this)
        //     )
    },

    methods: {

        // 计算视窗的信息，包括是否显示滚动条，显示哪个滚动条
        calcViewInfo() {
            const { view, wrap } = this.$refs,
                  { scrollWidth, scrollHeight } = wrap,
                  { height, width } = view.getBoundingClientRect()

            // 作为开关，能开也能关
            if (Math.round(height) < scrollHeight) {
                this.isShowVertical = true
            } else {
                this.isShowVertical = false
            }

            if (Math.round(width) < scrollWidth) {
                this.isShowHorizontal = true
            } else {
                this.isShowHorizontal = false
            }
        },
        scrolling() {

            // 视窗元素
            const viewElement = this.viewElement

            // 滚动条能移动的距离的最大范围为scrollTop
            // 所以滚动条能移动的位移比例就是视窗能在整个数据视图移动的比例
            if (this.verticalBarHeight) {
                /* eslint-disable-next-line */
                this.moveY = viewElement.scrollTop / VIEW_ELE.clientHeight* 100
            }

            if (this.horizontalBarWidth) {
                /* eslint-disable-next-line */
                this.moveX = viewElement.scrollLeft / VIEW_ELE.clientWidth * 100
            }
        },

        updateScrollbar() {
        }
    }
}
</script>

<style lang="stylus">
@import '~@theme/scrollbar.styl'
</style>
