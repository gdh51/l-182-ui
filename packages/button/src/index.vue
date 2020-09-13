<template>
    <button
        :type="nativeType"
        class="l-button"
        :class="[
            _calcBtnSize,
            _calcBtnType,
            _disabled ? 'disabled' : '',
            plain ? 'is-plain' : '',
            round ? 'is-round' : '',
            circle ? 'is-circle' : ''
        ]"
        :disabled="_disabled"
    >
        <span>
            <slot></slot>
        </span>
    </button>
</template>

<script>
import FormElMixin from '@/mixins/form-el-mixin'

const SIZE_MAP = new Map()
          .set('medium', 'l-button_medium')
          .set('small', 'l-button_small')
          .set('mini', 'l-button_mini'),
      NATIVE_TYPE_MAP = new Map()
          .set('button', true)
          .set('reset', true)
          .set('submit', true),
      TYPE_PREFIX = 'l-button_'

export default {
    name: 'LButton',

    mixins: [FormElMixin],

    props: {
        // 按钮样式类型属性，支持eva/text
        type: String,

        // 三个控制按钮形状的属性
        plain: Boolean,
        circle: Boolean,
        round: Boolean,

        // 按钮类型, 原生属性:button/reset/submit
        nativeType: {
            type: String,
            default: 'button',
            validator(v) {
                return NATIVE_TYPE_MAP.get(v)
            }
        },

        // 按钮尺寸大小属性：medium/small/mini
        size: String
    },

    computed: {
        // 计算按钮尺寸
        _calcBtnSize() {
            return SIZE_MAP.get(this.size) || ''
        },

        // 计算按钮皮肤
        _calcBtnType() {
            let type = this.type

            switch (type) {
            case 'text':
                type = TYPE_PREFIX + 'text'
                break

            case 'eva':
                type = TYPE_PREFIX + 'eva'
                break
            default:
                type = TYPE_PREFIX + 'default'
                break
            }

            return type
        }
    },

    methods: {}
}
</script>

<style lang="stylus" scoped>
@import "../../theme/src/button"
</style>
