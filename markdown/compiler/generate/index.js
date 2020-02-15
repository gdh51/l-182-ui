
import { generateRenderFn } from './generate-vnode/index'
import { generateDocFragment, generateInnerHTML } from './gen-doc-fragment'

export function generate(root, options) {
    let result = null;

    switch (options.mode) {
        case 'text':
            result = generateInnerHTML(root, options);
            break;

        case 'vnode':

            // 在VNode模式下返回的是一个节点，其中包含规划好的DOM结构，
            // 在DOM生成完毕后调用配套该接口的方法即可自动注入对应DOM元素
            result = generateRenderFn(root, options);
            break;

        // 默认为dom模式，解析为dom片段
        default:
            result = generateDocFragment(root, options);
            break;
    }

    return result;
}