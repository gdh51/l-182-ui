<template>
    <div class="tip-container"
        @mousemove="showTip"
        @mouseleave="hideTip"
        ref="container">
        <slot></slot>
        <div class="tip-arrow"
            :class="`tip-arrow-${tip.direction}`"
            :style="arrowPosition"
            v-show="tip.visible">
            <div class="tip"
                :class="`tip-${tip.direction}`"
                :style="tipPosition"
                 ref="tip">
                {{ message }}
            </div>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
.tip-container
    position relative

    .tip-arrow
        position absolute
        width 0
        height 0
        border 5px dashed transparent

        .tip
            position absolute
            // z-index -1
            display inline-block
            padding 5px 8px
            border 1px dashed $lo2
            border-radius 5px
            box-shadow $shadow
            font-size 14px
            color $lo1
            background-color $lg1

        .tip-left
            right 4px

        .tip-right
            left 4px

        .tip-top
            bottom 4px

        .tip-bottom
            top 4px

    .tip-arrow-left
        border-left 5px dashed $lg1

    .tip-arrow-right
        border-right 5px dashed $lg1

    .tip-arrow-top
        border-top 5px dashed $lg1

    .tip-arrow-bottom
        border-bottom 5px solid $lg1
</style>

<script>
import { TIP_DIR_MAP, Tip } from './util/util';

export default {
    name: 'Tip',

    props: {
        message: {
            type: String,
            default: 'Content Required'
        },

        type: {
            type: String,
            default: 'right'
        },

        range: {
            type: Number,
            default: 5
        },

        // 必须传入slot中内容的宽度，为了尽量让用户自定义组件元素，
        // 所以如果要计算组件大小则必须要传入至少一个宽度
        width: {
            type: Number,
            required: true
        }
    },

    data () {
        return {
            tip: {
                direction: 'right',
                visible: false,
                boundingRange: 5,
                top: 0,
                left: 0,
                width: 0,
                height: 0
            },
            tipRect: {
                height: 0,
                width: 0
            }
        }
    },

    mounted() {
        this.initRect();
    },

    computed: {
        tipPosition () {
            let { dir, side } = TIP_DIR_MAP[this.tip.direction];
            return `${dir}: -${this.tipRect[side] / 2}px;`
        },

        arrowPosition () {
            return {
                top: `${this.tip.top}px`,
                left: `${this.tip.left}px`
            }
        }
    },

    methods: {
        showTip (e) {
            this.tip.visible = true;

            this.$nextTick(() => {
                this.tip.reviseTipDirection(e.clientX, e.clientY)
                    .calcPositionInfo(e.clientX, e.clientY);
            });
        },

        followCursor () {

        },

        hideTip () {
            this.tip.visible = false;
        },

        // 封装以复用
        initRect () {
            // 这里注册个一次性的watcher用来获取一次元素的大小
            let unwatch = this.$watch('tip.visible', (val) => {
                if (val) {
                    const tip = this.$refs.tip,
                    tipContainer = this.$refs.container;
                    this.tipRect = tip.getBoundingClientRect();

                    // 在此处才初始化tip对象
                    this.tip = new Tip({
                        direction: this.type,
                        visible: this.visible,
                        boundingRange: this.range,
                        top: this.top,
                        left: this.left,
                        width: this.tipRect.width,
                        height: this.tipRect.height,
                        targetRect: tipContainer.getBoundingClientRect()
                    });
                    unwatch();
                }
            });
        }
    }
}
</script>