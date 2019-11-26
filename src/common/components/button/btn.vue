<template>
    <button type="button"
            class="button global-padding"
           :class="[_btnSize]"
           :disabled="_btnDisable"
           @click="clickAction($event, type)"
           >
        <span>{{ value }}</span>
    </button>
</template>

<style lang="stylus" scoped>
.button
    display inline-block
    border 1px solid $lg2
    border-radius 3.5px
    text-align center
    color $lg2
    outline none
    background-color $lw1
    cursor pointer

    &:hover
        color $lw1
        background-color $lg2

    &:disabled
        cursor not-allowed

.btn-small
    padding 7px 15px
    font-size 12px

.btn-medium
    padding 9px 15px
    font-size 12px

.btn-big
    padding 10px 20px
    font-size 14px
</style>

<script>
const SIZE_MAP = new Map()
    .set('big', 'btn-big')
    .set('medium', 'btn-medium')
    .set('small', 'btn-small');

export default {
    name: 'Btn',

    props: {

        // 用于按钮的文字
        value: {
            type: String,
            default: 'None'
        },

        // 点击按钮后传入的名称，默认为close，主要用作点击事件的判断
        type: {
            type: String,
            default: 'close'
        },

        size: {
            type: String,
            default: 'medium'
        },

        // 用户自定义是否禁用按钮
        disabled: {
            type: Boolean,
            default: false
        },

        // 默认情况下，在触发按钮点击期间会禁用按钮
        withDisable: {
            type: Boolean,
            default: true
        }
    },

    data () {
        return {
            builtInDis: false
        };
    },

    computed: {
        _btnSize () {
            return SIZE_MAP.get(this.size) || 'medium';
        },

        _btnDisable () {
            return this.builtInDis || this.disabled;
        }
    },

    methods: {
        clickAction (e, type) {
            if (this.withDisable) {
                this._disableWhileCall(this.$emit, 'action', type);
            } else {
                this.$emit('action', type);
            }
        },

        _disableWhileCall (callback, ...args) {
            this.builtInDis = true;
            callback.call(this, ...args);
            this.builtInDis = false;
        }
    }
}
</script>