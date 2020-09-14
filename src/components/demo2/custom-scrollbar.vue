<template>
    <div
        class="scrollbar_wrap-container"
        ref="wrap"
        :style="wrapStyle"
        :class="wrapClass"
    >
        <!-- 包装内容的容器，该容器用于呈现滚动条，利用神奇的margin将其隐藏 -->
        <div class="scrollbar_wrap-content" @scroll="scrolling" ref="view">
            <div
                class="scrollbar_view-box"
                :class="viewClass"
                :style="viewStyle"
            >
                <slot></slot>
            </div>
        </div>
        <bar :movePercentage="moveY" :barSize="verticalBarHeight" />
        <bar
            :vertical="false"
            :movePercentage="moveX"
            :barSize="horizontalBarWidth"
        />
    </div>
</template>

<script>
import Bar from './components/bar'
import { lazyHandler } from './util/util'
import { on } from '../../util/event'

export default {
    name: 'CustomScrollBar',

    components: {
        Bar
    },

    props: {

        // 视窗样式
        viewStyle: {
            type: Object,
            default() {
                return {}
            }
        },

        viewClass: {
            type: [ Array, String ],
            default() {
                return ''
            }
        },

        // 外层的包裹样式
        wrapStyle: {
            type: Object,
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

        // 当包裹大小 小于 视窗时，就会出现滚动条
    },

    data() {
        return {

            // 垂直和水平滚动条所占滚动条槽的长度
            verticalBarHeight: '0',
            horizontalBarWidth: '0',
            moveY: 0,
            moveX: 0
        }
    },

    computed: {
        viewElement() {
            return this.$refs.view
        }
    },

    mounted() {
        this.updateScrollbar()
        this.$refs.wrap &&
            on(
                this.$refs.wrap,
                'resize',

                /* eslint-disable-next-line */
                lazyHandler(this.updateScrollbar, 500, this)
            )
    },

    methods: {
        scrolling() {

            // 视窗元素
            const VIEW_ELE = this.viewElement

            // 滚动条能移动的距离的最大范围为scrollTop
            // 所以滚动条能移动的位移比例就是视窗能在整个数据视图移动的比例
            if (this.verticalBarHeight) {

                /* eslint-disable-next-line */
                this.moveY = (VIEW_ELE.scrollTop * 100) / VIEW_ELE.clientHeight
            }

            if (this.horizontalBarWidth) {

                /* eslint-disable-next-line */
                this.moveX = (VIEW_ELE.scrollLeft * 100) / VIEW_ELE.clientWidth
            }
        },

        updateScrollbar() {
            const VIEW_ELE = this.viewElement,

                  // 整个数据视图的大小
                  totalHeight = VIEW_ELE.scrollHeight,
                  totalWidth = VIEW_ELE.scrollWidth,

                  // 我们能看见的视窗的大小
                  viewHeight = VIEW_ELE.clientHeight,
                  viewWidth = VIEW_ELE.clientWidth

            // 计算滚动条占整个滚动条槽的长度,它的占比应该和视窗占整个数据视图的比例一样
            if (viewHeight && totalHeight > viewHeight) {

                /* eslint-disable-next-line */
                this.verticalBarHeight = (viewHeight * 100) / totalHeight + '%'
            }

            if (viewWidth && totalWidth > viewWidth) {

                /* eslint-disable-next-line */
                this.horizontalBarWidth = (viewWidth * 100) / totalWidth + '%'
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.scrollbar_wrap-container
    position relative
    overflow hidden

    .scrollbar_wrap-content
        overflow scroll
        margin-right -17px // 滚动条的宽度
        margin-bottom -17px

    &:hover >>> .custom_scrollbar
        position relative
        overflow hidden
        opacity 1

        .scrollbar_wrap-content
            overflow scroll
            margin-right -17px
            margin-bottom -17px
</style>
