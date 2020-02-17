<script>
/**
 * Markdown 组件，接收一个文本信息，将其格式化为DOM元素返回，
 * 可以接收两个可选参数，第一个即markdown文本
 * 第二个是对应DOM元素时添加的Class
 */
import { Markdown } from '../../../markdown/index'

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
                return {};
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
            this.$emit('md-dom-tree', mdRenderHelper.nodesTreeRoot);
        }
    }
}
</script>