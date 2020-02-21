<template>
    <nav class="catalog-container">
        <gradient-color class="sub_item-subtitle catalog-title"
                           :selected="mdRootNode.selected"
                           :title="mdRootNode.text"
                           @click.native="focusHeading(mdRootNode)">
            {{ mdRootNode.text }}
        </gradient-color>

        <!-- 这里用递归组件生成子项目 -->
        <sub-list :subChildren="mdRootNode.children"
                  :state-interface="stateInterface"/>
    </nav>
</template>

<style lang="stylus" scoped>
.catalog-container
    width 250px
    font-size 14px
    border 1px solid black
    position fixed
    right 0

    .catalog-title
        padding 4px
        font-size 16px
        font-weight bold
        text-align left
</style>

<script>
import SubList from './components/sub-list'
import GradientColor from './components/gradient-color'
import { initCatalogCom } from './components/util/state'

export default {
    name: 'MdCatalog',

    props: {
        mdRootNode: {
            type: Object
        },

        mdNodesMap: {
            type: Array
        },

        threshhold: {
            type: Number,
            default: 0
        }
    },

    components: {
        SubList,
        GradientColor
    },

    data () {
        return {};
    },

    computed: {
        stateInterface () {

            // 无其他作用，收集依赖项
            this.mdNodesMap;

            return initCatalogCom(this.mdNodesMap, {
                threshhold: this.threshhold
            });
        }
    },

    methods: {
        focusHeading (node) {
            this.stateInterface && this.stateInterface.jumpToHeading(node);
        }
    }
}
</script>