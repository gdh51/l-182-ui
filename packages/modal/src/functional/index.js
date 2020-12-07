import { Modal } from './base'

function modal(options) {
    const modalInstance = new Modal(options)
    modalInstance.show()

    return modalInstance
}

export { modal }
