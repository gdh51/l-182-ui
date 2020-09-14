<template>
    <div
        class="rolling_container"
        @scroll="scrolling"
        :style="{ height: visibleNum * itemHeight + 'px' }"
    >
        <div
            class="rolling_scroll-bar"
            :style="{ height: listItems.length * itemHeight + 'px' }"
        ></div>
        <div
            class="rolling_items"
            :style="{ transform: 'translateY(' + viewTranslate + 'px)' }"
        >
            <div
                class="rolling_items-item ellipsis"
                v-for="(item, index) of renderItems"
                :key="index"
                :style="{
                    height: itemHeight + 'px',
                    lineHeight: itemHeight + 'px'
                }"
            >
                {{ item.uuid }} : {{ item.text }}
            </div>
        </div>
    </div>
</template>

<script>

/**
 * @description 虚拟滚动列表
 * @author gdh51
 * 虚拟滚动列表初级版本，只支持等高项。
 * 可以传递三个参数，分别为数组数组、单行高度、当前可显示数目
 */
export default {
    name: 'VirtualRollingFixed',

    props: {
        listItems: {
            type: Array,
            default() {
                return []
            }
        },

        itemHeight: {
            type: Number,
            default: 50
        },

        visibleNum: {
            type: Number,
            default: 5
        }
    },

    data() {
        return {
            renderItems: [],

            // 当前可视窗口，到滚动条顶部的高度
            topOffset: 0
        }
    },

    created() {
        this.scrolling()
    },

    computed: {

        // 可视窗口的第一条数据的下标
        startIndex() {
            return Math.floor(this.topOffset / this.itemHeight)
        },

        // 可视窗口的最后条数据的下标
        endIndex() {
            return this.startIndex + this.visibleNum
        },

        viewTranslate() {

            // 首先视窗跟随移动，之后要产生相对位置，
            // 所以相对位移则为当前可视区域第一个元素未显示在可视区域部分的高度
            return this.topOffset - (this.topOffset % this.itemHeight)
        }
    },

    methods: {
        scrolling(e) {

            // 获取可视窗口上方到顶部的高度，即滚动条高度
            /* eslint-disable-next-line */
            this.topOffset = e ? e.target.scrollTop : 0
            this.$nextTick(() => {

                // 将视口区域的数据显示出来
                this.renderItems = this.listItems.slice(
                    this.startIndex,

                    /* eslint-disable-next-line */
                    this.endIndex + 1
                )
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.rolling_container
    position relative
    overflow auto
    width 200px

    .rolling_scroll-bar
        position absolute
        top 0
        right 0
        left 0

    .rolling_items
        position absolute
        top 0
        right 0
        left 0
        border-bottom 1px dashed black

        .rolling_items-item
            border 1px dashed black
            border-bottom none
            text-align center
</style>
