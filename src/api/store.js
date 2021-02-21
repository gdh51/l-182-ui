const STORE_MAP = {}

class Store {
    constructor(key = '_l-182-ui', type = 'localStorage') {
        this.type = type

        // 对应一个唯一的存储的key值
        this.key = key
        this._store = {}
        this._init()
    }

    _init() {
        Object.defineProperty(this, '$store', {
            get() {
                // 这样做是防止用户muta _store
                // 而不是通过set的方式修改
                // 这里只读，
                return { ...this._store }
            }
        })

        if (this.type === 'localStorage') {
            const local = window.localStorage.getItem(this.key)
            if (local) {
                this._store = JSON.parse(local)
            } else {
                this.updateStore((this._store = {}))
            }
        }
    }

    updateStore(newStore) {
        if (this.type === 'localStorage') {
            window.localStorage.setItem(this.key, JSON.stringify(newStore))
        }
        this._store = newStore
    }
}

function useStore(type, key) {
    const hit = STORE_MAP[key] || (STORE_MAP[key] = new Store(key, type))
    return [hit.$store, hit.updateStore.bind(hit), hit]
}

export { useStore }
