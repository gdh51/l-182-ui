<template>
    <progress-bar
        :size="size"
        :progress="progress"
        :disabled="disabled"
        ref="bar"
        @click-progress="changeProgress"
    >
        <div
            class="dragbar-dot"
            :style="[ dotLeftOffset, progressDotSize ]"
            @mousedown="startDrag"
            :class="disabled ? 'disabled' : ''"
        ></div>
    </progress-bar>
</template>



<script>
import { on, off } from '../../../util/event'

export default {
    name: 'DragBar',

    props: {
        size: {
            type: Object,
            default() {
                return {
                    width: '70px',
                    height: '10px'
                }
            }
        },

        disabled: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            progress: 0,
            progressDotSize: {
                height: '20px',
                width: '20px'
            },
            barRect: {
                height: 0,
                width: 0
            },
            progressStart: 0
        }
    },

    mounted() {
        this.initDotSize()
    },

    computed: {
        dotLeftOffset() {
            return {
                left:
                    this.progressStart +
                    (this.progress / 100) * this.barRect.width +
                    'px'
            }
        }
    },

    methods: {
        initDotSize() {
            const barRect = (this.barRect = this.$refs.bar.$el.getBoundingClientRect())
            this.progressStart = -barRect.height
            this.progressDotSize = {
                width: barRect.height * 2 + 'px',
                height: barRect.height * 2 + 'px'
            }
        },

        changeProgress(offsetPercentage) {
            // 防止超出范围
            if (offsetPercentage <= 0) offsetPercentage = 0
            if (offsetPercentage >= 1) offsetPercentage = 1
            this.progress = offsetPercentage * 100
        },

        startDrag(e) {
            console.log(this.disabled)
            if (this.disabled) return
            e.stopImmediatePropagation()
            on(document, 'mousemove', this.mousemoveHandler)
            on(document, 'mouseup', this.mouseupHandler)

            // 防止拖动滚动条时，选中其他文本(阻止默认行为)
            document.onselectstart = () => false
        },

        comOffsetPercentage(barRect, event) {
            return (event.clientX - this.barRect.left) / this.barRect.width
        },

        mousemoveHandler(e) {
            let offsetPercentage = this.comOffsetPercentage(this.barRect, e)
            this.changeProgress(offsetPercentage)
        },

        mouseupHandler() {
            off(document, 'mousemove', this.mousemoveHandler)
            document.onselectstart = null
        },

        destroyed() {
            off(document, 'mousemove', this.mouseupHandler)
        }
    }
}
</script>

<style lang="stylus" scoped>
.dragbar-dot
    position absolute
    top 0
    bottom 0
    margin auto 0
    background-image url('./imgs/dot.png')
    background-size cover
    cursor grab
    user-select none

    &:active
        cursor grabbing
</style>
