<script>
import LBox from '@pack/box'
import { hyphenate } from '@/utils/hyphenate'

const LBoxPlane = 'l-box-plane'

export default {
    name: 'LSlideBox',
    components: { LBox },

    props: {
        width: { default: '100%', type: String },

        height: { default: '100%', type: String }
    },

    render() {
        console.log(this.$slots.default)

        // 过滤非l-box-plane元素
        const LBoxPlanes = (this.$slots.default || [])
            .filter(({ tag }) => tag && hyphenate(tag) === LBoxPlane)

        return LBoxPlanes
    },

    computed: {
        sharedAttrs() {
            const data = this.$attrs

            data.style = {
                width: this.width,
                height: this.height
            }

            return Object.assign({}, $)
        }
    }
}
</script>

<style>

</style>
