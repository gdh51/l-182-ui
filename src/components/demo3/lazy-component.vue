<template>
    <div id="lazy_loading-container"
         ref="lazy">
    </div>
</template>

<style lang="stylus" scoped>
#lazy_loading-container
    overflow scroll
</style>

<script>
import ContentArea from './components/content-area';

export default {
    name: 'LazyComponent',

    props: {

    },

    data () {
       return {}
    },

    mounted () {

    }
}
</script>