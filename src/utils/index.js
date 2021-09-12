function extend(from, to) {
    for (let key in from) {
        to[key] = from[key]
    }
    return to
}

export { extend }
