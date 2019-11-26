import { $modal } from '../common/components/modal/util/util'

export const globalPlugin = {
    install (Vue, options = {}) {
        Vue.prototype.$modal = $modal;
    }
}