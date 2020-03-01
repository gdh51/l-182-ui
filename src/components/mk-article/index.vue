<template>
    <div>
        <MdCatalog :md-root-node="mdApi.nodesTreeRoot"
                   :md-nodes-map="mdApi.nodesTreeMap"
                   :threshhold="threshhold"/>
        <Markdown :text="text"
                  :render-class="renderClass"
                  :transformTotree="true"
                  @md-dom-tree="exposeMDApi"/>
    </div>
</template>

<script>
import Markdown from '../markdown/index'
import MdCatalog from './components/md-catalog'

export default {
    name: 'MkArticle',

    props: {

        // 传入的用于解析markdown的文本
        text: {
            type: String,
            default: ''
        },

        // 设置阈值当屏幕上方到达元素什么位置时开始切换标题
        threshhold: {
            type: Number,
            default: 0
        },

        // 用于定义渲染出的markdown的class
        renderClass: {
            type: Object
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
                    children: [],
                    selected: true
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