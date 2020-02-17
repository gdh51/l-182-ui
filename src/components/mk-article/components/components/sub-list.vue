<template>
    <ul v-if="subChildren.length">
        <li class="sub_item"
            v-for="(child, index) in subChildren"
           :key="index">
            <gradient-color class="sub_item-subtitle"
                           :selected="child.selected"
                           @click.native="focusHead(child)">
                <span class="sub_item-level">{{ child.order }}</span>{{ child.text }}
            </gradient-color>
            <!-- 利用模版元素，避免在没有时创建无用的Vue实例 -->
            <template v-if="child.children.length">
                <sub-list :subChildren="child.children"/>
            </template>
        </li>
    </ul>
</template>

<style lang="stylus" scoped>
.sub_item
    padding-left 14px

    .sub_item-subtitle
        padding 4px 0 4px 4px

    .sub_item-level
        padding-right 4px
        font-weight bold
</style>

<script>
import GradientColor from './gradient-color.vue'
import { initScrollState } from './util/scroll-to-element'
import { updateListState } from './util/bus'

export default {
    name: 'SubList',

    components: {
        GradientColor
    },

    props: {
        subChildren: {
            type: Array,
            default: []
        }
    },

    data () {
        return {};
    },

    computed: {
        scrollTo () {
            // 收集依赖项，无其他作用
            this.subChildren;

            // 为每个组件初始化一个点击目标获取元素信息的缓存，
            // 只会收集当前组件下的项目点击情况
            return initScrollState();
        }
    },

    methods: {
        focusHead (node) {
            node.selected = true;
            this.scrollTo(node.order, node.el);

            // 清空上一个节点被点击的状态
            updateListState(node);
        }
    }
}
</script>