<template>
    <button :type="type"
             class="l-button global-padding"
            :class="[_btnSize]"
            :disabled="_disabled"
            @click="clickAction($event, type)">
            <span>
                <slot></slot>
            </span>
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
import FormElMixin from '@/src/mixins/form-el-mixin'
const SIZE_MAP = new Map()
    .set('medium', 'l-button_medium')
    .set('small', 'l-button-small')
    .set('mini', 'l-button-mini');

export default {
    name: 'LButton',

    mixins: [ FormElMixin ],

    props: {

        type: {
            type: String,
            default: 'button',
            validator(v) {
                return v === 'button' && v === 'textarea';
            }
        },

        size: {
            type: String,
            default: 'medium'
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