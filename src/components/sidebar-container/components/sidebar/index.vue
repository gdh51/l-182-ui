<template>
    <div class="sidebar">
        <circle-box class="sidebar-head"></circle-box>
        <div class="user-name">我的名字</div>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
    data() {
        return {}
    }
}
</script>

<style lang="stylus" scoped>
.sidebar > div
    margin-bottom .266667rem

.sidebar-head
    width 1.5rem !important
    height 1.5rem !important

.user-name
    color $lg2
    font-size 20px
</style>

