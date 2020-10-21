<template>
    <div class="custom_scrollbar-container" :class="bar.class">
        <div
            class="custom_scrollbar"
            :style="barPosStyle"
            ref="bar"
            @mousedown="cursorTranslate"
        ></div>
    </div>
</template>

<script>
import { on, off } from '@/utils/event'
import { BAR_MAP } from '../utils/const'

export default {
    name: 'LBar',

    props: {

        // 滚动条类型，垂直还是水平
        vertical: {
            type: Boolean,
            default: true
        },

        // 滚动条相当于自身长度的位移距离
        movePercentage: {
            type: Number,
            default: 0
        },

        // 滚动条占整个滚动条槽的百分比
        barSize: {
            type: String,
            default: '100%'
        }
    },

    data() {
        return {

            // 上一次点击鼠标来拖动滚动条时，点击的位置
            clickPosition: 0,

            // 当前视窗相当于相对于整个数据的顶部的距离
            viewPosition: 0
        }
    },

    computed: {

        // 确认滚动条的类型
        bar() {
            return BAR_MAP[this.vertical ? 'vertical' : 'horizontal']
        },

        // 滚动条在移动时的位置样式
        barPosStyle() {
            const style = {},
                  bar = this.bar

            style[bar.rectSize] = this.barSize
            style.transform = `translate${bar.axis}(${this.movePercentage}%)`

            return style
        },

        // 视窗元素
        viewElement() {
            return this.$parent.$refs.view
        },

        // 滚动条的具体长度
        spBarSize() {
            return (
                (this.$refs.bar &&
                    this.$refs.bar.getBoundingClientRect()[
                        this.bar.rectSize
                    ]) ||

                /* eslint-disable-next-line */
                0
            )
        },

        // 视窗的具体长度
        viewSize() {
            return (

                /* eslint-disable-next-line */
                (this.viewElement && this.viewElement[this.bar.clientSize]) || 0
            )
        }
    },

    methods: {

        // 用鼠标拖动进行滚动时的处理函数
        cursorTranslate(e) {

            // 鼠标右键进行点击时无效
            /* eslint-disable-next-line */
            if (e.ctrlKey || e.button === 2) {
                return
            }

            // 计算点击时鼠标的初始位置
            this.clickPosition = e[this.bar.client]

            // 记录开始滚动时的视窗的位置
            this.viewPosition = this.viewElement[this.bar.scrollOffset]
            this.startDrag(e)
        },

        startDrag(e) {
            e.stopImmediatePropagation()
            on(document, 'mousemove', this.mousemoveHandler)
            on(document, 'mouseup', this.mouseupHandler)

            // 防止拖动滚动条时，选中其他文本(阻止默认行为)
            document.onselectstart = () => false
        },

        mousemoveHandler(e) {

            // 以滚动条长度为基计算鼠标的位移的占比
            const offsetPercentage =
                (e[this.bar.client] - this.clickPosition) / this.spBarSize

            // 由于滚动条与滚动条槽的比等于视窗比上整个数据视图，所以可以换算为视窗应该移动的距离
            // 这里其实有个小问题，但不会出现问题的原因是scroll超过自己活动范围时，不会有影响
            this.viewElement[this.bar.scrollOffset] =
                this.viewPosition + offsetPercentage * this.viewSize
        },

        mouseupHandler() {
            off(document, 'mousemove', this.mousemoveHandler)
            document.onselectstart = null
        }
    },

    destroyed() {
        off(document, 'mouseup', this.mouseupHandler)
    }
}
</script>

<style lang="stylus" scoped>
.custom_scrollbar-container
    position absolute
    right 2px
    bottom 2px
    z-index 1
    border-radius 4px

    .custom_scrollbar
        position absolute
        border-radius inherit
        background-color rgba(144, 147, 153, .3)
        opacity 0
        cursor pointer
        transition opacity 120ms ease-out

.is-horizontal
    left 2px
    height 6px

    &>div
        width 100%
        height 100%

.is-vertical
    top 2px
    width 6px

    &>div
        width 100%
</style>
