<style lang="stylus" scoped>

</style>

<script>
import { throws } from 'assert';
export default {
    name: 'Markdown',

    abstrict: true,

    props: {
        template: {
            type: String,
            required: true
        }
    },

    render () {
        if (this.$slots.default && Object.keys(this.$scopedSlots).length > 0) {
            throw Error('不能设置插槽');
            return;
        }

    },

    data () {
        return {}
    }
}
</script>