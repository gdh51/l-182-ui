<template>
    <div id="app">
        <!-- <header-area/>
        <music-bar/>
        <sidebar-container/>
        <playing-panel/> -->
        <!-- <file-upload/> -->
        <loading-mask :textList="[{
            title: 'Ahtsds',
            text: 'Xsdsaf'
        },
        {
            title: 'Geesd',
            text: 'geggeg'
        },
        {
            title: 'Usdsd',
            text: 'XXXXX'
        }]">
            <!-- <template v-slot:title>
                sdsd
            </template> -->
        </loading-mask>
    </div>
</template>

<style lang="stylus" scoped>
    #app
        width 100%
        height 100%

        .app_container
            width 80%
            height 500px
            padding-top 220px
            margin 0 auto
            background-size cover
</style>

<script>
import './common/assets/common-style.styl';
// import VirtualRollingFixed from './components/demo1/virtual-rolling-fixed';
// import VirtualRollingFlexible from './components/demo1/virtual-rolling-flexible';
// import CustomScrollbar from './components/demo2/custom-scrollbar';
// import LazyComponent from './components/demo3/lazy-component'
// import ContentArea from './components/demo3/components/content-area';
// import HeaderArea from './components/header/header';
// import MusicBar from './components/music-bar/index';
// import SidebarContainer from './components/sidebar-container/index'
// import PlayingPanel from './components/playing-panel/index';
// import FileUpload from './components/file-upload/index';
import LoadingMask from '../src/components/loading-mask/index'

export default {
    name: 'App',

    components: {
        // VirtualRollingFixed,
        // VirtualRollingFlexible,
        // CustomScrollbar,
        // LazyComponent,
        // ContentArea,

        // HeaderArea,
        // MusicBar,
        // SidebarContainer,
        // PlayingPanel,
        // FileUpload
        LoadingMask
    },

    data () {
        return {
            isShow: false,
            barSize: {
                height: '.2rem',
                width: '1rem'
            },

            text: ''
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