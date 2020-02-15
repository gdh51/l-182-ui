<template>
    <ul v-if="subChildren.length">
        <li class="sub_item"
            v-for="(child, index) in subChildren"
           :key="index">
            <span class="sub_item-level">{{ child.order }}</span>{{ child.text }}
            <!-- 利用模版元素，避免在没有时创建无用的Vue实例 -->
            <template v-if="child.children.length">
                <sub-list :subChildren="child.children"/>
            </template>
        </li>
    </ul>
</template>

<style lang="stylus" scoped>
.sub_item
    padding 4px 0 4px 12px

    .sub_item-level
        padding-right 4px
</style>

<script>
export default {
    name: 'SubList',

    props: {
        subChildren: {
            type: Array,
            default: []
        }
    },

    data () {
        return {}
    }
}
</script>