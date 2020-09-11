import { $modal } from '../common/components/modal/util/util'

export const globalPlugin = {
    install(Vue) {
        Vue.prototype.$modal = $modal
    }
}
