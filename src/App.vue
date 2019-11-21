<template>
    <div>
        <virtual-rolling-fixed
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
        </custom-scrollbar>
        <el-scrollbar wrap-class="list" wrap-style="color: red;" view-style="font-weight: bold;" view-class="view-box" :native="false">
            <div v-for="value in 30" :key="value">
                {{ value }}
            </div>
        </el-scrollbar>
    </div>
</template>

<style lang="stylus" scoped>
/*展示列表的区域，超过200px出现滚动条*/
>>>.list
    max-height 200px

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