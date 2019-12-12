<template>
    <div id="app">
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
        <!-- <lazy-loading></lazy-loading> -->
        <!-- <tip :type="'top'" :width="70" style="height: 656px;">
            <btn></btn>
        </tip> -->
        <div class="app_container">
            <drag-bar :enableControl="true" disabled/>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
    #app
        width 100%

        .app_container
            width 80%
            height 500px
            padding-top 220px
            margin 0 auto
            background-size cover
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

.grabbing
    cursor grabbing

.disabled
    cursor not-allowed!important
</style>

<script>
import VirtualRollingFixed from './components/demo1/virtual-rolling-fixed';
import VirtualRollingFlexible from './components/demo1/virtual-rolling-flexible';
import CustomScrollbar from './components/demo2/custom-scrollbar';
import LazyComponent from './components/demo3/lazy-component'
import ContentArea from './components/demo3/components/content-area'

export default {
    name: 'App',

    components: {
        VirtualRollingFixed,
        VirtualRollingFlexible,
        CustomScrollbar,
        LazyComponent,
        ContentArea
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