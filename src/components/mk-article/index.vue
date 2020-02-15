<template>
    <div>
        <MkCatalog :mk-root-node="mkRootNode"/>
        <Markdown :text="`# asdasd
## 二级标题1
### 三级标题1
### 三级标题2
## 二级标题2
### 三级标题3`"
@mk-dom-tree="receiveRootEle"/>
    </div>
</template>

<style lang="stylus" scoped>

</style>

<script>
import Markdown from '../markdown/index'
import MkCatalog from './components/mk-catalog'

export default {
    name: 'MkArticle',

    props: {
        text: {
            type: String,
            default: ''
        }
    },

    components: {
        Markdown,
        MkCatalog
    },

    data () {
        return {
            mkRootNode: {
                text: '无标题',
                children: []
            }
        };
    },

    methods: {
        receiveRootEle (root) {
            this.mkRootNode = root;
        }
    }
}
</script>