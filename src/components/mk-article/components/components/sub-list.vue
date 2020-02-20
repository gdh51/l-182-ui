<template>
    <ul v-if="subChildren.length">
        <li class="sub_item"
            v-for="(child, index) in subChildren"
           :key="index">
            <gradient-color class="sub_item-subtitle"
                           :selected="child.selected"
                           @click.native="focusHeading(child)">
                <span class="sub_item-level">{{ child.order }}</span>{{ child.text }}
            </gradient-color>
            <!-- 利用模版元素，避免在没有时创建无用的Vue实例 -->
            <template v-if="child.children.length">
                <sub-list :subChildren="child.children"
                          :state-interface="stateInterface"/>
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

export default {
    name: 'SubList',

    components: {
        GradientColor
    },

    props: {
        subChildren: {
            type: Array,
            default () {
                return [];
            }
        },

        stateInterface: {
            type: Object,

            default () {
                return null;
            }
        }
    },

    data () {
        return {};
    },

    methods: {
        focusHeading (node) {
            this.stateInterface && this.stateInterface.jumpToHeading(node);
        }
    }
}
</script>