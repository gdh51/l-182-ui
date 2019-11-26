<template>
    <div>
        <!-- <virtual-rolling-fixed
            :listItems="genArrayDataByNumber(100)"
            v-show="isShow"/>
        <virtual-rolling-flexible
            :listItems="genArrayDataByNumber(100)"
            :visibleView="300"
            v-show="isShow"/>
        <custom-scrollbar :viewStyle="{height: '300px'}">
            <div v-for="item in 18"
                :key="item"
                :style="{width: '100px'}">
                {{item}} 我是内容
            </div>
        </custom-scrollbar>-->
        <!-- <btn @action=""></btn> -->
        <!-- <wrapper></wrapper> -->
    </div>
</template>

<style lang="stylus" scoped>
</style>

<style lang="stylus">
*
    box-sizing border-box
    padding 0
    margin 0

.ellipsis
    text-overflow ellipsis
    white-space nowrap
    overflow hidden

.global-padding
    padding 10px 15px
</style>

<script>
import VirtualRollingFixed from './components/demo1/virtual-rolling-fixed';
import VirtualRollingFlexible from './components/demo1/virtual-rolling-flexible';
import CustomScrollbar from './components/demo2/custom-scrollbar';

export default {
    name: 'App',

    components: {
        VirtualRollingFixed,
        VirtualRollingFlexible,
        CustomScrollbar
    },

    data () {
        return {
            isShow: false
        };
    },

    created() {
        this.$modal({
            title: '测试标题',
            message: '测试信息',
            type: 'confirm',
            callback: function () {

            }
        });
    },

    methods: {
        genArrayDataByNumber (num) {
            return Array.from({ length: num }, (item, index) => ({
                text: '这是一条信息'.repeat(Math.random() * 10),
                uuid: index
            }));
        }
    }
}
</script>