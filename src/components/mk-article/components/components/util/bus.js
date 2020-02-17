import Vue from 'vue'

let observable = Vue.observable,
    origin = {
    selected: false
};

// 存储上一个被点击的标题，好用于在下一个节点被点击时清空当前节点的状态
const listState = {
    prevSelectedNode: origin
};

observable(listState);

export function updateListState (node) {
    listState.prevSelectedNode.selected = false;
    listState.prevSelectedNode = node;
}

export function resetListState () {
    listState.prevSelectedNode = origin;
}