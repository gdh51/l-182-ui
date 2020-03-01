<style lang="stylus">
.article-content
    word-break break-word
    line-height 1.75
    font-weight 400
    font-size 15px
    overflow-x hidden

    .h1,.h2,.h3,.h4,.h6
        color $dg2
        line-height 1.5
        padding-bottom 5px
        margin-top 35px
        margin-bottom 10px
        border-bottom 1px solid $lw1

    .p
        line-height inherit
        margin-top 22px
        margin-bottom 22px

    .article-title
        margin 20px 0
        font-size 30px
        font-weight 700
        line-height 1.5

    .h2
        font-size 24px

    .h3
        font-size 21px

    .h4
        font-size 18px

    .h5
        font-size 16px

    .code
        padding 1px 5px
        background-color $lw1
        border-radius 2px
        word-break break-word
        color $lo3
        font-size 13px
        overflow-x auto

    .img
        max-width 100%

    .italic
        font-style italic

    .bold
        font-weight 700

    .ul-list
        padding-left 30px

        .ul-list-item
            list-style disc
    .ol-list
        padding-left 30px

        .ol-list-item
            list-style decimal

    .quote
        padding-left 15px
        border-left 4px solid #70b991
        background-color #eee7da

    .link
        text-decoration none
        color #0366d6

        &:hover
            text-decoration underline

        &:active
            outline-width 0

    .pre
        border-radius 2px
        font-size 14px

        .pre-code
            display block
            padding 16px 20px
            background-color #fcce77
            overflow-x auto
            color #289b7c
            line-height 24px
            white-space pre
</style>

<script>
/**
 * Markdown 组件，接收一个文本信息，将其格式化为DOM元素返回，
 * 可以接收两个可选参数，第一个即markdown文本
 * 第二个是对应DOM元素时添加的Class
 */
import { Markdown } from '../../../markdown/index'
import { defaultClass } from './constants'

export default {
    name: 'Markdown',

    props: {
        text: {
            type: String,
            default: ''
        },

        // 定义渲染出来的DOM元素上添加的class
        renderClass: {
            type: Object,
            default () {
                return defaultClass;
            }
        }
    },

    render (c) {
        if (this.$slots.default && Object.keys(this.$scopedSlots).length > 0) {
            throw Error('不能设置插槽');
            return null;
        }

        const md = new Markdown({
            mode: 'vnode',
            createElement: c,
            renderClass: this.renderClass
        });

        this.mdRenderHelper = md.compile(this.text);
        return this.mdRenderHelper.rootVNode;
    },

    data () {
        return {
            mdRenderHelper: null
        };
    },

    mounted () {
        this.initNodesOfDOM();
    },

    updated () {
        this.initNodesOfDOM();
    },

    methods: {
        initNodesOfDOM () {
            let mdRenderHelper = this.mdRenderHelper;
            mdRenderHelper.bindElement(mdRenderHelper.nodesTreeMap ,this.$refs);

            // 挂载完毕后将文章的标题元素暴露接口给外部
            this.$emit('md-dom-tree', {
                nodesTreeMap: mdRenderHelper.nodesTreeMap,
                nodesTreeRoot: mdRenderHelper.nodesTreeRoot
            });
        }
    }
}
</script>