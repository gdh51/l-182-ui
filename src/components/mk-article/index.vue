<template>
    <div>
        <MdCatalog :md-root-node="mdApi.nodesTreeRoot"
                   :md-nodes-map="mdApi.nodesTreeMap"
                   :threshhold="threshhold"/>
        <Markdown :text="`# asdasd
## 二级标题1
s
s
s
s
s
s
s
s
s
s
### 三级标题1
s
s
s
s
s
s
s
s
s
s
### 三级标题2
s
s
s
s
s
s
s
s
s
s
## 二级标题2
s
s
s
s
s
s
s
s
s
s
### 三级标题3
s
s
s
s
s
s
s
s
s
s
## 二级标题3
s
s
s
s
s
s
s
s
s
s
### 三级标题4
s
s
s
s
s
s
s
s
s
s
### 三级标题5
s
s
s
s
s
s
s
s
s
s
#### 四级标题
s
s
s
s
s
s
s
s
s
s`"
@md-dom-tree="exposeMDApi"/>
    </div>
</template>

<style lang="stylus" scoped>

</style>

<script>
import Markdown from '../markdown/index'
import MdCatalog from './components/md-catalog'

export default {
    name: 'MkArticle',

    props: {
        text: {
            type: String,
            default: ''
        },

        threshhold: {
            type: Number,
            default: 0
        }
    },

    components: {
        Markdown,
        MdCatalog
    },

    data () {
        return {
            mdApi: {
                nodesTreeRoot: {
                    text: '无标题',
                    children: []
                },

                nodesTreeMap: []
            }
        };
    },

    methods: {
        exposeMDApi (mdApi) {
            this.mdApi = mdApi;
        }
    }
}
</script>