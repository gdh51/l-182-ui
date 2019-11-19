<template>
    <div>
        <virtual-rolling-fixed
            :listItems="genArrayDataByNumber(100)"/>
        <virtual-rolling-flexible
            :listItems="genArrayDataByNumber(100)"
            :visibleView="300"/>
    </div>
</template>

<style lang="stylus" scoped>

</style>

<style lang="stylus">
*
    box-sizing border-box

.ellipsis
    text-overflow ellipsis
    white-space nowrap
    overflow hidden
</style>

<script>
import VirtualRollingFixed from './components/demo1/virtual-rolling-fixed';
import VirtualRollingFlexible from './components/demo1/virtual-rolling-flexible';

export default {
    name: 'App',

    components: {
        VirtualRollingFixed,
        VirtualRollingFlexible
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