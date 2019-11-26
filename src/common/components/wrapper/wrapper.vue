<template>
    <div class="modal_wrapper"
        :style="{ zIndex: axis.axisZ }"
        v-if="visible"></div>
</template>

<style lang="stylus" scoped>
.modal_wrapper
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    opacity .4
    background-color #000
</style>

<script>
import { generateLevel } from '../../util/util'

export default {
   name: 'Wrapper',

    data () {
        return {
            visible: true,
            axis: {
                axisZ: 999
            }
        }
    },

    created() {
        this.axis = generateLevel();

        // 暴露销毁该遮布的接口
        this.$once('destroy', this._destroy);
    },

    methods: {
        _destroy () {
            this.visible = false;
            this.$nextTick(() => {
                this.$destroy();
            });
        }
    },

    destroyed() {
        this.axis.destroy();
    },
}
</script>