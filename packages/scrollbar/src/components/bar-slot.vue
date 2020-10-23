<template>
    <div class="l-bar-slot" :class="bar.class" ref="bar-slot">
        <l-bar
            class="l-bar-slot__scrollbar"
            :style="barPosStyle"
            :dir="vertical"
            ref="bar"
            @mousedown="cursorTranslate"
        />
    </div>
</template>

<script>
import { on, off } from '@/utils/event'
import { BAR_PROP_MAP } from '../utils/const'
import LBar from '@pack/bar'

/**
 * @description 滚动条槽
 */
export default {
    name: 'LBarSlot',

    components: { LBar },

    props: {

        // 滚动条类型，垂直还是水平
        vertical: {
            type: Boolean,

            // 默认为垂直
            default: true
        },

        // 滚动条占整个滚动条槽的百分比
        barSizeRadio: {
            type: String,
            default: '100%'
        }
    },

    data() {
        return {

            // 上一次点击鼠标来拖动滚动条时，点击的位置
            clickPosition: 0,

            // 当前视窗相当于相对于整个数据的顶部的距离
            viewPosition: 0,
            movePercentage: 0
        }
    },

    computed: {

        // 确认滚动条的类型
        bar() {
            return BAR_PROP_MAP[this.vertical ? 'vertical' : 'horizontal']
        },

        // 滚动条在移动时的位置样式
        barPosStyle() {
            const style = {},
                  bar = this.bar

            style[bar.rectSize] = this.barSizeRadio
            style.transform = `translate${bar.axis}(${this.movePercentage}%)`

            return style
        },

        // 滚动条的具体长度
        spbarSizeRadio() {
            return (
                (this.$refs.bar &&
                    this.$refs.bar.getBoundingClientRect()[
                        this.bar.rectSize
                    ]) ||

                /* eslint-disable-next-line */
                0
            )
        }
    },

    mounted() {

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
                (e[this.bar.client] - this.clickPosition) / this.spbarSizeRadio

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

<style lang="stylus">
@import '~@theme/l-bar-slot'
</style>
