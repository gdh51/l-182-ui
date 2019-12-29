<template>
    <aside class="sidebar-container">
        <wrapper type="normal"
                :visibility="wrapperVisibility"
                :opacity="wrapperOpacity"
                @click.native="slideOut"/>
        <div class="sidebar-content"
            :style="slideOffset"
            :class="animationClass"
            @touchmove="slideSidebar"
             ref="slidebar">
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
        border-top-right-radius 3px
        border-bottom-right-radius 3px
        background-image url('./bg.jpg')
        background-size cover
        background-position-x -2.133333rem

    .sidebar-content-click
        transition all .3s linear
</style>

<script>
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

            isTap: false
        }
    },

    computed: {

        wrapperVisibility () {
            return this.state.sideWrapperVisibility;
        },

        // 侧边栏的位移style对象
        slideOffset () {
            return {
                left: -this.left + 'px'
            };
        },

        wrapperOpacity () {
            let parallelToLeft = this.synchronizeAction(this.sidebarSize - this.left ,this.sidebarSize);
            return originOpacity * parallelToLeft;
        },

        animationClass () {
            return this.isTap ? '' : 'sidebar-content-click';
        }
    },

    created() {
        this.state = this.$store.state;
        this.$watch( 'wrapperVisibility',(newVal) => {
            if (newVal) {
                this.left = 0;
            } else {
                this.left = this.sidebarSize;
            }
        });
    },
    mounted () {
        this.initSidebarSize();
    },

    methods: {
        slideOut () {
            if (this.left !== 0) return;
            this.isTap = false;
            this.$store.commit('toggleSwVibility', false);
        },

        initSidebarSize () {
            this.sidebarSize = this.$refs.slidebar.getBoundingClientRect().width;
        },

        synchronizeAction (targetVal, targetMaxVal) {
            return targetVal / targetMaxVal;
        },

        slideSidebar (e) {
            this.isTap = true;
            if (this.left < 0) {
                return this.left = 0;
            }
            let leftOffset = e.changedTouches[0].clientX;
            this.left = this.sidebarSize - leftOffset;
            if (this.left === 0) {
                this.wrapperVisibility = false;
            }
        }
    }
}
</script>