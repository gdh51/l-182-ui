<template>
    <nav>
        <ul class="navbar">
            <li class="navbar_item"
               :class="index === selectedIndex ? 'selected' : ''"
                v-for="(item, index) in navs"
               :key="index"
               @click="changePlate(index)">{{ item }}</li>
        </ul>
    </nav>
</template>

<style lang="stylus" scoped>
.navbar
    display flex
    cursor pointer

    .navbar_item
        width 1.6rem
        padding 0 .266667rem
        text-align center

    .selected
        transform scale(1.2)
        transition all .5s ease
        color $lg1
</style>

<script>
export default {
    name: 'NavBar',

    props: {
        navs: {
            type: Array,
            required: true
        }
    },

    data () {
        return {
            selectedIndex: 0
        }
    },

    methods: {
        changePlate (index) {
            this.selectedIndex = index;
        }
    }
}
</script>