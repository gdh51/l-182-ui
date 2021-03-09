<template>
    <div
        class="l-input"
        :class="[ inputSizeClz, {
        'l-input_use-append': !!$slots.append,
        'l-inpug_use-prepend': !!$slots.prepend
    } ]"
        v-if="type === 'text'"
    >
        <!-- 前置插槽 -->
        <div class="l-input__prepend" v-if="!!$slots.prepend">
            <slot name="prepend" />
        </div>
        <div class="l-input__wrapper">
            <input
                :type="type"
                class="l-input__inner"
                :placeholder="placeholder"
                @focus="onFocus"
                @blur="onBlur"
                @input="handleInput"
                @compositionstart="handleCompositionStart"
                @compositionupdate="handleCompositionUpdate"
                @compositionend="handleCompositionEnd"
                :value="value"
            />
            <!-- 后置图标区域 -->
            <span class="l-input__suffix" v-if="isShowSuffix">
                <l-icon
                    v-if="isShowClearIcon"
                    icon="close"
                    @mousedown.prevent
                    class="l-input__suffix_close"
                    @click="clear"
                />
                <l-icon
                    v-if="suffixIcon"
                    :icon="suffixIcon"
                    class="l-input__suffix_icon"
                />
            </span>
            <!-- 输入建议区 -->
            <div class="l-input__advice" v-if="advice.length">
                <span class="l-input__advice-wrapper__arrow" />
                <l-scrollbar
                    wrapStyle="height: 270px;"
                    class="l-input__advice-wrapper"
                >
                    <ul>
                        <li
                            class="l-input__advice-item"
                            v-for="node in advice"
                            :key="node.value"
                            @click="selectAdvice(node)"
                        >{{ node.label }}</li>
                    </ul>
                </l-scrollbar>
            </div>
        </div>
        <!-- 后置插槽 -->
        <div class="l-input__append" v-if="!!$slots.append">
            <slot name="append" />
        </div>
    </div>
    <div v-else class="l-textarea">
        <textarea
            class="l-textarea__inner"
            :placeholder="placeholder"
            :style="autoSizeStyles"
            @input="handleInput"
            @compositionstart="handleCompositionStart"
            @compositionupdate="handleCompositionUpdate"
            @compositionend="handleCompositionEnd"
            :value="value"
        />
    </div>
</template>

<script>
import LIcon from '@pack/icon'
import LScrollbar from '@pack/scrollbar'
import { isObject } from '@/utils/type'

function calcRows(str) {
    return str.split('\n').length
}

const CLASS_PREFIX = 'l-input',
    INPUT_TYPE = new Map().set('textarea', true).set('text', true),
    INPUT_SIZE = new Map()
        .set('large', `${CLASS_PREFIX}_large`)
        .set('middle', `${CLASS_PREFIX}_middle`)
        .set('small', `${CLASS_PREFIX}_small`),
    BASE_ROW_HEIGHT = 20,
    PADDING_VERTICAL = 10
export default {
    name: 'LInput',
    props: {
        type: {
            type: String,
            default: 'text',
            validator(v) {
                return INPUT_TYPE.has(v)
            }
        },
        placeholder: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: 'large',
            validator(v) {
                return INPUT_SIZE.has(v)
            }
        },

        autoSize: { type: [Boolean, Object] },
        value: { type: String },
        clearable: Boolean,
        suffixIcon: String,
        adviceCb: { type: Function }
    },
    components: { LIcon, LScrollbar },
    data() {
        return {
            isFocused: false,
            isComposing: false,
            advice: []
        }
    },
    computed: {
        inputSizeClz() {
            return INPUT_SIZE.get(this.size)
        },

        isShowSuffix() {
            return !!(this.isShowClearIcon || this.suffixIcon)
        },

        isShowClearIcon() {
            return this.clearable && this.isFocused && this.value
        },

        autoSizeStyles() {
            if (!this.autoSize) return {}
            let { minRow, maxRow } = isObject(this.autoSize)
                ? this.autoSize
                : { minRow: 1, maxRow: null }
            return {
                minHeight: `${BASE_ROW_HEIGHT * minRow + PADDING_VERTICAL}px`,
                height: `${
                    (maxRow || calcRows(this.value)) * BASE_ROW_HEIGHT +
                    PADDING_VERTICAL
                }px`
            }
        }
    },
    methods: {
        onFocus(e) {
            this.isFocused = true
            this.$emit('focus', e)
        },
        onBlur(e) {
            this.isFocused = false
            this.$emit('blur', e)
        },

        handleInput(e) {
            if (this.isComposing) return

            if (this.adviceCb) {
                this.adviceCb(
                    e.target.value,
                    advice => (this.advice = advice || [])
                )
            }

            this.$emit('input', e.target.value)
        },

        handleCompositionStart() {
            this.isComposing = true
        },
        handleCompositionUpdate() {
            this.isComposing = true
        },
        handleCompositionEnd(event) {
            if (this.isComposing) {
                this.isComposing = false
                this.handleInput(event)
            }
        },

        handleChange(e) {
            this.$emit('change', e.target.value)
        },

        selectAdvice(node) {
            this.$emit('input', node.value, node)
            this.$emit('change', node.value, node)
            this.advice = []
        },

        clear() {
            this.$emit('input', '')
            this.$emit('change', '')
            this.$emit('clear')
        }
    }
}
</script>

<style lang="stylus">
@import '~@theme/input.styl'
</style>
