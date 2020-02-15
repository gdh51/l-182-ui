<template>
    <nav class="catalog-container">
        <div class="catalog-title">{{ mkRootNode.text }}</div>
        <!-- 这里用递归组件生成子项目 -->
        <sub-list :subChildren="mkRootNode.children"/>
    </nav>
</template>

<style lang="stylus" scoped>
.catalog-container
    width 250px
    font-size 14px
    background-color orange

    .catalog-title
        padding 4px
        font-weight bold
        text-align left
</style>

<script>
import SubList from './components/sub-list'
export default {
    name: 'MkCatalog',

    props: {
        mkRootNode: {
            type: Object
        }
    },

    components: {
        SubList
    },

    data () {
        return {}
    }
}
</script>