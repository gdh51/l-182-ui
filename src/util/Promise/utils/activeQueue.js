// 记录当前处理的最顶层promise，以便来确认那些promise是内部的
let activePromise = null;

function setActiveState(promise) {
    activePromise = promise;
}

function releaseState() {
    activePromise = null;
}

function hasActiveState () {
    return activePromise !== null;
}

export {
    activePromise,
    setActiveState,
    releaseState
}