<template>
    <div>
        <MdCatalog :md-root-node="mdApi.nodesTreeRoot"
                   :md-nodes-map="mdApi.nodesTreeMap"
                   :threshhold="threshhold"/>
        <Markdown :text="`# asdasddsaasdsadasdsadsdsdsd
## sdsd
### 二级标题1
### asdasd
## sdsd`"
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