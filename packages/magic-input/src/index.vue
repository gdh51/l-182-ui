<template>
    <l-input
        v-model="innerValue"
        @focus="onExpand"
        @blur="onShrink"
        class="l-magic-input"
        :style="expandedStyle"
    >
        <slot name="append" />
        <slot name="prepend" />
    </l-input>
</template>

<script>
import LInput from '@pack/input'
export default {
    name: 'LMagicInput',
    props: {
        expandedWitdh: { default: '300px' },
        contractiveWidth: { default: '100px' },
        value: { type: String }
    },
    components: { LInput },
    data() {
        return {
            innerValue: '',
            isExpanded: false
        }
    },

    computed: {
        expandedStyle() {
            return {
                width: this.isExpanded
                    ? this.expandedWitdh
                    : this.contractiveWidth
            }
        }
    },

    watch: {
        innerValue(v) {
            this.$emit('input', v)
        },

        value(v) {
            this.innerValue = v
        }
    },

    methods: {
        onExpand() {
            this.isExpanded = true
        },

        onShrink() {
            this.isExpanded = false
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~@theme/magic-input.styl'
</style>
