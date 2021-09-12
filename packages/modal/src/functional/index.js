import { Modal } from './base'
import { isString } from '@/utils/type'

function $modal(options) {
    const modalInstance = new Modal(options)
    modalInstance.show()

    return modalInstance
}

function $alert(content, title = '提示', options) {
    if (!isString(content) || !isString(title)) {
        return console.log(`First and second params must be String, 
        if you want use more flexible modal, you should choose modal.`)
    }

    return $modal({
        content,
        title,
        cancel: false,
        ...options
    })
}


export { $modal, $alert }
