<template>
    <header class="header">
        <icon
            class="header_icon"
            :icon="'menu1'"
            @click.native="slideOut"
        />
        <nav-bar :navs="navsList" />
        <icon
            class="header_icon"
            :icon="'search'"
        />
    </header>
</template>

<style lang="stylus" scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1.333333rem;

    .header_icon {
        padding: 0 15px;
    }
}
</style>

<script>
import NavBar from './components/nav-bar'

export default {
    name: 'HeaderArea',

    components: {
        NavBar
    },

    data() {
        return {
            navsList: ['1', '2']
        }
    },

    methods: {
        slideOut() {
            this.$store.commit('toggleSwVibility', true)
        }
    }
}
</script>