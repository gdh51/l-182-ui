<template>
    <div
        class="rolling_container"
        @scroll="scrolling"
        :style="{ height: visibleView + 'px' }"
    >
        <!-- 滚动条高度，用于撑起滚动条 -->
        <div
            class="rolling_scroll-bar"
            :style="{ height: listTotalHeight + 'px' }"
        ></div>
        <div
            class="rolling_items"
            :style="{ transform: 'translateY(' + viewTranslate + 'px)' }"
        >
            <div
                class="rolling_items-item"
                v-for="(item, index) of renderItems"
                :key="index"
                :data-uuid="item.uuid"
                ref="items"
            >
                {{ item.uuid }} : {{ item.text }}
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */

/**
 * @description 虚拟滚动列表
 * @author gdh51
 * 虚拟滚动列表高级版本，支持任意高度内容
 */

export default {
    name: 'VirtualRollingFlexible',

    props: {
        listItems: {
            type: Array,
            default() {
                return []
            }
        },

        visibleView: {
            type: Number,
            default: 500
        },

        estimatedItemHeight: {
            type: Number,
            default: 50
        },

        prevRenderCount: {
            type: Number,
            default: 2
        }
    },

    data() {
        return {
            renderItems: [],

            // 当前可视窗口，到滚动条顶部的高度
            topOffset: 0,

            // 用于缓存渲染后的项目的实际位置信息
            positionInfo: [],

            lastTickNodeBottom: 0,

            alreadyRenderCount: 0
        }
    },

    created() {
        this.initPositionInfo()
        this.scrolling()
    },

    computed: {
        // 可视窗口的第一条数据的下标，应该为第一个bottom坐标大于scrollTop
        startIndex() {
            // 这里没用二分法，因为原生函数查找速度快于自己写的二分法
            return this.positionInfo.find(item => item.bottom >= this.topOffset)
                .uuid
        },

        // 可视窗口的最后条数据的下标，应该为第一个bottom坐标大于scrollTop+视口长度
        endIndex() {
            const TOTAL_OFFSET = this.topOffset + this.visibleView
            let res = this.positionInfo.find(
                item => item.bottom >= TOTAL_OFFSET
            )

            // 当滑动到最下面时，最后一个元素的下底小于TOTAL_OFFSET
            return res ? res.uuid : this.positionInfo.length - 1
        },

        viewTranslate() {
            // 首先视窗跟随移动，之后要产生相对位置，
            // 所以相对位移则为当前可视区域第一个元素未显示在可视区域部分的高度
            // 所有其实求得的值为视口第一个元素的顶到scrollTop的高度
            return this.positionInfo[this.startIndex - this.aboveCount].top
        },

        listTotalHeight() {
            let positionInfo = this.positionInfo
            return positionInfo[positionInfo.length - 1].bottom
        },

        // 可视区域上方预渲染的个数
        aboveCount() {
            return Math.min(this.startIndex, this.prevRenderCount)
        },

        // 可视区域下方预渲染的个数
        belowCount() {
            return Math.min(
                this.positionInfo.length - this.endIndex,
                this.prevRenderCount
            )
        }
    },

    methods: {
        scrolling(e) {
            // 获取可视窗口上方到顶部的高度，即滚动条高度
            this.topOffset = e ? e.target.scrollTop : 0
            this.$nextTick(() => {
                // 将视口区域的数据显示出来，这里包含预渲染的个数
                this.renderItems = this.listItems.slice(
                    this.startIndex - this.aboveCount,
                    this.endIndex + 1 + this.belowCount
                )
            })
        },

        // 初始化全部数据的位置，按估计值预算，待真正渲染后在更新
        initPositionInfo() {
            let estimatedItemHeight = this.estimatedItemHeight
            this.positionInfo = this.listItems.map((item, index) => ({
                uuid: index,
                height: estimatedItemHeight,
                top: index * estimatedItemHeight,
                bottom: (index + 1) * estimatedItemHeight
            }))
        },

        /**
         * @param {Number} lastNodeBottom 当前dom节点的上一个节点的bottom
         * @param {Object} node 当前dom节点
         * @description 更新传入节点的位置信息
         */
        updatePositionInfo(lastNodeBottom, node) {
            // 当前更新结点的位置信息
            const CUR_NODE_POS = this.positionInfo[parseInt(node.dataset.uuid)]

            // 已更新真实位置信息的节点直接返回
            if (CUR_NODE_POS.flag) {
                return CUR_NODE_POS.bottom
            }

            const RECT = node.getBoundingClientRect()

            // 当前节点底部信息的位置
            let curNodeBottom = lastNodeBottom + RECT.height
            Object.assign(CUR_NODE_POS, {
                height: RECT.height,
                top: lastNodeBottom,
                bottom: curNodeBottom,
                flag: true
            })

            // 已渲染的个数
            this.alreadyRenderCount++

            return curNodeBottom
        },

        /**
         * @param {Number} lastNodeBottom 上一个节点的底部位置
         * @param {Object} curPos 当前节点的位置信息对象
         * @description 当前一个节点更新后，该函数用于更新后面节点的位置信息
         */
        updateRestNodePos(lastNodeBottom, curPos) {
            // 更新的信息只包含上底和下底
            Object.assign(curPos, {
                top: lastNodeBottom,
                bottom: lastNodeBottom + curPos.height
            })

            return curPos.bottom
        },

        /**
         * @param {Object} list 位置信息对象集合
         * @param {Function} conditionCallback 自定义的查询条件, 返回true为满足条件
         * @param {Boolean} flag 标记位，用于判断数据来源于原始数据的哪部分，true表示前部分
         * @description 二分递归查找，传入一个回调函数，找到第一个满足回调函数条件的位置信息
         */
        binaryFindRecursion(list, conditionCallback, flag) {
            // 这里要处理两种特殊情况：仅两个一个满足一个不满足或仅两个两个都满足
            if (list.length <= 2) {
                return list.length === 2 ? (flag ? list[1] : list[0]) : list[0]
            }

            // 因为位置队列是有序的，满足条件的元素一定在后面
            let middle = Math.floor(list.length / 2)

            // 符合条件，但不能确定它是第一个符合条件的，前面可能还有，所以取前面的
            if (conditionCallback(list[middle])) {
                return this.binaryFindRecursion(
                    list.slice(0, middle + 1),
                    conditionCallback,
                    true
                )
            }
            // 不符合条件，则直接取后面的
            return this.binaryFindRecursion(
                list.slice(middle + 1),
                conditionCallback,
                false
            )
        },

        /**
         * @param {Object} list 位置信息对象集合
         * @param {Function} conditionCallback 自定义的查询条件, 返回true为满足条件
         * @description 二分迭代查找，传入一个回调函数，找到第一个满足回调函数条件的位置信息
         */
        binaryFindIteration(list, conditionCallback) {
            let start = 0,
                end = list.length - 1,
                middle,
                flag

            while (start < end) {
                // 处理特殊情况，仅有两个都满足的情况，则返回第一个；
                // 第一个不满足，第二个满足的情况，返回第二个
                if (end - start + 1 === 2) return flag ? list[1] : list[0]

                middle = Math.floor((end + start) / 2)

                // 满足条件，则取当前middle及其之前的项目
                if (conditionCallback(list[middle])) {
                    end = middle
                    flag = true
                    continue
                }

                // 不满足条件，则取当前middle及其之后的项目
                start = middle + 1
                flag = false
            }

            return list[start]
        },

        correctLastTickNodeBottom(lastTickNodeBottom) {
            // 已全部渲染完毕时，无需在计算，直接返回即可
            if (this.alreadyRenderCount === this.listItems.length) {
                return lastTickNodeBottom
            }

            // 本轮渲染的上一个节点的uuid，及其下底的位置
            // (如果上一个节点为0节点，则不进行计算直接返回)
            const LAST_NODE_UUID = this.$refs.items[0].dataset.uuid - 1
            const LAST_NODE_BOTTOM = this.positionInfo[
                LAST_NODE_UUID >= 0 ? LAST_NODE_UUID : 0
            ].bottom

            // 防止0节点计算，因为0节点没有上一个节点
            // 如果上一个节点与当前节点应该继承的下底上出现断层，则要修复这个断层
            if (
                LAST_NODE_UUID !== -1 &&
                LAST_NODE_BOTTOM !== lastTickNodeBottom
            ) {
                return LAST_NODE_BOTTOM
            }

            // 未出现断层时，直接返回
            return lastTickNodeBottom
        }
    },

    // 每次渲染新节点时，要对这些新节点的位置信息进行更新
    updated() {
        const CUR_RENDER_DOM_ITEMS = this.$refs.items
        this.lastTickNodeBottom = CUR_RENDER_DOM_ITEMS.reduce(
            this.updatePositionInfo,

            // 为了防止用户滑动过快导致lastBottom出现断层，所以要预防一下
            this.correctLastTickNodeBottom(this.lastTickNodeBottom)
        )

        // 已更新完时，不再进行更新
        if (this.alreadyRenderCount !== 100) {
            // 当前节点信息发生变化时，要更新之后的节点的信息变化
            this.positionInfo
                .slice(
                    +CUR_RENDER_DOM_ITEMS[CUR_RENDER_DOM_ITEMS.length - 1]
                        .dataset.uuid + 1
                )
                .reduce(this.updateRestNodePos, this.lastTickNodeBottom)
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
