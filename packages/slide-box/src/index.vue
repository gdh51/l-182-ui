<template>
  <l-box>
      <slot />
  </l-box>
</template>

<script>
import LBox from '@pack/l-box'
export default {
    name: 'LSlideBox',
    components: { LBox },

    props: {
        width: { default: '100%' },

        height: { default: '100%' }
    }
}
</script>

<style>

</style>
