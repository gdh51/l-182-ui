<template>
    <nav class="catalog-container">
        <div class="catalog-title">{{ mdRootNode.text }}</div>
        <!-- 这里用递归组件生成子项目 -->
        <sub-list :subChildren="mdRootNode.children"/>
    </nav>
</template>

<style lang="stylus" scoped>
.catalog-container
    width 250px
    font-size 14px
    border 1px solid black

    .catalog-title
        padding 4px
        font-size 16px
        font-weight bold
        text-align left
</style>

<script>
import SubList from './components/sub-list'
export default {
    name: 'MdCatalog',

    props: {
        mdRootNode: {
            type: Object
        }
    },

    components: {
        SubList
    },

    data () {
        return {
            index: 0
        };
    }
}
</script>