import { isFunction } from '../util/type'

export default {
    props: {
        disabled: {
            type: [ Boolean, Function ],
            default: false
        }
    },

    data() {
        return {
            loading: false
        }
    },

    computed: {
        _disabled() {
            return this.loading || isFunction(this.disabled)
                ? this.disabled()
                : this.disabled
        }
    }
}
