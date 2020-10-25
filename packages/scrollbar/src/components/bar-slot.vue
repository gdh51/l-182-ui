<template>
    <div
        class="l-bar-slot"
        :class="barTypeArgs.class"
        ref="bar-slot"
        @mouseup="cursorJump"
        @mousedown="saveClickPos"
        @resize="restoreBarInfo"
    >
        <l-bar
            class="l-bar-slot__scrollbar"
            :style="barPosStyle"
            :dir="!horizontal"
            :size="slotRectThickness + 'px'"
            ref="bar"
            @mousedown="cursorTranslate"
        />
    </div>
</template>

<script>
import { on, off } from '@/utils/event'
import { BAR_PROP_MAP } from '../utils/const'
import LBar from '@pack/bar'

const OneHundredPercent = 100,
      ZeroPercent = 0

/**
 * @description 滚动条槽
 */
export default {
    name: 'LBarSlot',

    components: { LBar },

    props: {

        // 滚动条类型，垂直还是水平
        horizontal: {
            type: Boolean,

            // 默认为垂直
            default: false
        },

        // 滚动条的尺寸，支持百分比
        barSize: {
            type: String,
            default: '30%'
        }
    },

    data() {
        return {

            // 上一次点击鼠标来拖动滚动条时，点击的位置
            clickPosition: 0,

            // 滚动槽的长度
            slotRectSize: 0,

            // 滚动槽的厚度
            slotRectThickness: 0,

            // 滚动条的长度
            barRectSize: 0,

            // 滚动槽顶部位置(单位px)
            slotRectStart: 0,

            // 滚动条相当于自身长度的实时位移(单位100%)
            movePercentage: 0,

            startDragPercentage: 0,

            // 滚动条可以移动的最大百分比(相对于滚动条自身，以长度为1个单位)
            maxMovePercentage: 0,

            // 点击直接跳转的安全位置，即实际点击后会真实进行跳转的位置
            jumpSafeRange: {

                // 最小的值为bar的一半，这个不用去计算
                min: 50,
                max: 100
            },

            isDragging: false
        }
    },

    computed: {

        // 确认滚动条的类型，以及这个类型中会用到的参数
        barTypeArgs() {
            return BAR_PROP_MAP[this.horizontal ? 'horizontal' : 'vertical']
        },

        // 滚动条在移动时的位置样式
        barPosStyle() {
            const style = {},
                  barArgs = this.barTypeArgs

            // 应用bar的长度
            style[barArgs.rectSize] = this.barSize

            // 当前bar的位置情况
            style.transform = `translate${barArgs.axis}(${this.movePercentage}%)`

            // 点击跳转时添加动画
            style.transition = this.isDragging ? '' : 'all .2s linear'

            return style
        }
    },

    mounted() {
        this.restoreBarInfo()
    },

    updated() {
        this.restoreBarInfo()
    },

    methods: {

        restoreBarInfo() {

            // 初始化滚动槽和滚动条的真实长度
            this.calcSlotSize()
            this.calcBarSize()

            this.maxMovePercentage =
                ((this.slotRectSize - this.barRectSize) / this.barRectSize) *
                OneHundredPercent

            // eslint-disable-next-line
            this.jumpSafeRange.max = (this.slotRectSize - this.barRectSize / 2) 
                / this.barRectSize *  OneHundredPercent
        },

        // 计算槽的长度
        calcSlotSize() {

            const slotRect = this.$refs['bar-slot'].getBoundingClientRect(),
                  barTypeArgs = this.barTypeArgs

            // 计算滚动槽的真实长度(单位px)
            this.slotRectSize = slotRect[barTypeArgs.rectSize]
            this.slotRectThickness = slotRect[barTypeArgs.thicknessUnit]

            this.slotRectStart = slotRect[barTypeArgs.start]
        },
        calcBarSize() {

            // 计算滚动条的真实长度(单位px)
            this.barRectSize = this.$refs.bar.getBoundingClientRect()[
                this.barTypeArgs.rectSize
            ]
        },

        // 用鼠标拖动进行滚动时的处理函数
        cursorTranslate(e) {

            // 鼠标右键进行点击时无效
            /* eslint-disable-next-line */
            if (e.ctrlKey || e.button === 2) {
                return
            }

            // 记录滚动条的拖拽前位置，之后的相对移动都要在此基础上计算
            this.startDragPercentage = this.movePercentage

            // 记录开始滚动时的视窗的位置
            this.startDrag(e)
        },

        startDrag() {
            on(document, 'mousemove', this.mousemoveHandler)
            on(document, 'mouseup', this.mouseupHandler)

            // 防止拖动滚动条时，选中其他文本(阻止默认行为)
            document.onselectstart = () => false
        },

        mousemoveHandler(e) {
            this.isDragging = true

            // 以滚动条长度为基计算鼠标的位移的占比
            const offsetPercentage =
                      ((e[this.barTypeArgs.client] - this.clickPosition) /
                          this.barRectSize) *
                      OneHundredPercent,

                  // 计算出来的最终位置
                  calcMovePercentage =
                      this.startDragPercentage + offsetPercentage

            // 限制滚动条勿超过最大可移动位移。勿小于0
            this.movePercentage = calcMovePercentage
                > this.maxMovePercentage
                ? this.maxMovePercentage
                : calcMovePercentage > ZeroPercent
                    ? calcMovePercentage
                    : ZeroPercent

            // 移动时传递当前位置信息
            this.$emit('move', {

                // 移动的绝对距离，相对于上次位置
                absolute:
                    (offsetPercentage * this.barRectSize) / OneHundredPercent +
                    'px',
                relative: offsetPercentage,
                relativeTargetSize: this.barRectSize
            })
        },

        mouseupHandler() {

            off(document, 'mousemove', this.mousemoveHandler)
            document.onselectstart = null
            this.isDragging = false
        },

        saveClickPos(e) {
            this.clickPosition = e[this.barTypeArgs.client]
        },

        // 点击槽某个位置的直接跳转
        cursorJump(e) {
            if (this.isDragging) return

            const offsetPercentage = (e['page' + this.barTypeArgs.axis] - this.slotRectStart) /
                      this.barRectSize * OneHundredPercent,
                  { min, max } = this.jumpSafeRange

            // 安全范围内跳转至点击位置
            if (offsetPercentage < max && offsetPercentage > min) {
                this.movePercentage = offsetPercentage - min

            // 其余位置跳转至底部或顶部
            } else if (offsetPercentage < min) {
                this.movePercentage = ZeroPercent
            } else {
                this.movePercentage = this.maxMovePercentage
            }

            // 放出当前点击位置的信息
            this.$emit('jump', {

                // 相对于插槽顶部的距离(单位px)
                absolute:
                    (this.movePercentage * this.barRectSize) /
                    OneHundredPercent + 'px',
                relative: this.movePercentage,
                relativeTargetSize: this.barRectSize
            })
        }
    },

    destroyed() {
        off(document, 'mouseup', this.mouseupHandler)
    }
}
</script>

<style lang="stylus">
@import '~@theme/bar-slot'
</style>
