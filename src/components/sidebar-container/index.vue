<template>
    <aside class="sidebar-container">
        <wrapper type="normal"
                :visibility="wrapperVisibility"
                :class="animationClass"
                :opacity="wrapperOpacity"
                @click.native="slideIn"/>
        <div class="sidebar-content"
            :style="slideOffset"
            :class="animationClass"
            @touchstart="initSlide"
            @touchmove="slideSidebar"
            @touchend="autoPackupSidebar"
             ref="slidebar">
            <sidebar/>
        </div>
    </aside>
</template>

<style lang="stylus" scoped>
.sidebar-container
    height 100%

    .sidebar-content
        position fixed
        width 8.5rem
        height 100%
        padding .8rem .426667rem .426667rem
        border-top-right-radius 3px
        border-bottom-right-radius 3px
        background-image url('./bg.jpg')
        background-size cover
        background-position-x -2.133333rem

    .sidebar-content-click
        transition all .3s linear
</style>

<script>
import Sidebar from './components/sidebar'
import { calcAbOfEle } from './util/handle-event'
const originOpacity = 0.7;
export default {
    name: 'SidebarContainer',
    data () {
        return {

            // 侧边栏当前的X轴上的位移
            left: 0,

            // 侧边栏的宽度
            sidebarSize: 0,

            state: null,

            isTap: false,

            wrapperOpacity: 0,

            startLeftOffset: 0,

            sidebarRect: null
        }
    },

    components: {
        Sidebar
    },

    computed: {

        // 获取sidebar的可见性
        wrapperVisibility () {
            return this.state.sideWrapperVisibility;
        },

        // 侧边栏的位移style对象
        slideOffset () {

            // 由于我们是通过prop来控制的遮布的样式opacity，这与transition组件逻辑违背。
            // (这里如果我们直接操作prop，在v-show为true时，会导致样式改变先于display，导致动画失败)
            // 所以这里我们这里不能用computed属性来自动同步wrapperOpacity属性
            this.$nextTick(() => {
                this.wrapperOpacity = originOpacity * this.synchronizeAction(this.sidebarSize - this.left ,this.sidebarSize);
            });

            return {
                left: -this.left + 'px'
            };
        },

        // 根据操作添加动画过渡，因为移动操作滑动时不需要过渡动画时间
        animationClass () {
            return this.isTap ? '' : 'sidebar-content-click';
        }
    },

    created() {

        // 存起来方便查询
        this.state = this.$store.state;
    },
    mounted () {
        this.initSidebarSize();

        // 这里就很方便了，如果外部组件要收起侧边栏，只需要向vuex提交变量信息即可
        this.$watch( 'wrapperVisibility',(newVal) => {
            if (newVal) {
                this.left = 0;
            } else {
                this.left = this.sidebarSize;
            }
        }, { immediate: true });
    },

    methods: {

        // click事件点击收起侧边栏
        slideIn () {
            this.$store.commit('toggleSwVibility', false);
        },

        initSidebarSize () {
            this.sidebarRect = this.$refs.slidebar.getBoundingClientRect();
            this.sidebarSize = this.sidebarRect.width;
        },

        // 返回传入targetVal在targetMaxVal中的比例
        synchronizeAction (targetVal, targetMaxVal) {
            return targetVal / targetMaxVal;
        },

        // 更新滑动的初始信息
        initSlide (e) {

            // 添加滑动时的动画过渡类名
            this.isTap = true;

            // 记录滑动的起始位置
            this.startLeftOffset = calcAbOfEle(e.changedTouches[0], this.sidebarRect).left;
        },

        slideSidebar (e) {

            // 计算当前拖动的相对位移，为了方便计算，这里取正值为开始点向左滑动
            let leftOffset = this.startLeftOffset - e.changedTouches[0].clientX;

            // 开始滑动时向右滑动无效
            if (leftOffset <= 0) {
                return;
            }

            this.left = leftOffset;

            if (this.left === this.sidebarSize) {
                this.$store.commit('toggleSwVibility', false);
            }
        },

        // 根据当前的滑动的结束位置，自动收起或展开侧边栏
        autoPackupSidebar (e) {

            // 自动收回时要执行动画
            this.isTap = false;

            // 获取滑动条一半位置的X轴位置
            let middleOfSidebar = this.sidebarRect.left + this.sidebarRect.width / 2;

            // 超过一半时结束，自动展开
            if (e.changedTouches[0].clientX >= middleOfSidebar) {
                this.left = 0;

            // 未超过一半时结束，自动收起
            } else {
                this.left = this.sidebarRect.width;
                this.$store.commit('toggleSwVibility', false);
            }
        }
    }
}
</script>