const ABSOLUTE_PATH = /^\//,
    RELATIVE_PATH = /^(?:\.\/)(.*)/,
    BACK_PATH = /^((?:\.\.\/)+)(.*)/

function resolvePath(toPath = '', fromPath = '') {

    // 根路径
    if (ABSOLUTE_PATH.test(toPath)) {
        return toPath
    }

    // 单层相对路径
    if (RELATIVE_PATH.test(toPath)) {
        const [ i, p ] = toPath.match(RELATIVE_PATH),
            lastSlash = fromPath.lastIndexOf('/')

        return fromPath.slice(0, lastSlash + 1) + p
    }

    // 多层相对路径

    if (BACK_PATH.test(toPath)) {
        let [ i, backSteps, p ] = toPath.match(BACK_PATH)
        backSteps = backSteps.length / 3

        for (let i = 1; i <= backSteps; i++) {
            const lastSlashIndex = fromPath.lastIndexOf('/')

            // 后退的层级超过了根路径
            if (lastSlashIndex < 0) return '/' + p
            fromPath = fromPath.slice(0, lastSlashIndex)
        }

        return fromPath + (fromPath.slice(-1) === '/' ? '' : '/') + p
    }

    return fromPath + (fromPath.slice(-1) === '/' ? '' : '/') + toPath
}

export { resolvePath }
