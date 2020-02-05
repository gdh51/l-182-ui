import { reviseEndNewline, isUndefined } from '../core/uitl'
import { MarkAst, createTextSymbol, isUnarySymbol } from '../core/mark-ast'
import {
    titleLevelRE,
    shortCodeRE,
    asteriskRE,
    text,
    newline
} from '../core/constants'

export function parseLexer(template) {

    // 规范语法
    template = reviseEndNewline(template);

    let unhandleTemplate = template,
        index = 0,

        // 从栈底开始数，第一个文本标签的前一个标签的下标，
        // 用于将后面的文本生成段落，记录的是在root对象子数组中的下标
        pStartIndex = 0,

        // 定义一个根节点，方便处理数据
        lastAst = new MarkAst('root'),
        stack = [lastAst];

    while (!!unhandleTemplate) {

        // 匹配#题目标签
        if (titleLevelRE.test(unhandleTemplate)) {

            // 匹配到的对象
            let titleMatch = unhandleTemplate.match(titleLevelRE);

            // Match[1] 存放#，Match[0]存放#及其空格
            updateLastAst(new MarkAst(titleMatch[1], titleMatch[0], null, true));

            // 截取剩余的模版
            advance(index, titleMatch[0].length);
            continue;
        }

        // 处理`xx`的短代码标签
        if (shortCodeRE.test(unhandleTemplate)) {
            let shortCodeMatch = unhandleTemplate.match(shortCodeRE),

                // 查询栈中是否存在匹配的标签
                shouldCloseIndex = shouldCloseSymbol(shortCodeMatch[1]);

            // 如果栈中有配对的标签，那么就闭合该标签，且将栈中该标签之后的未闭合标签视为普通字符串
            if (shouldCloseIndex !== false) {

                // 闭合标签
                closeSymbol(shouldCloseIndex);
            } else {

                // 将该`推入栈中
                updateLastAst(new MarkAst(shortCodeMatch[1], shortCodeMatch[0], null, false));
            }

            advance(index, shortCodeMatch[0].length);
            continue;
        }

        // 匹配*与**语法，每次匹配时会贪婪匹配，所以当匹配**时，不会匹配为*
        if (asteriskRE.test(unhandleTemplate)) {
            let asteriskMatch = unhandleTemplate.match(asteriskRE),
                shouldCloseIndex = shouldCloseSymbol(asteriskMatch[1]);

            // 遇到配对的标签时，就可以出栈了
            if (shouldCloseIndex !== false) {

                // 闭合标签
                closeSymbol(shouldCloseIndex);
            } else {
                updateLastAst(new MarkAst(asteriskMatch[1], asteriskMatch[0], null, false));
            }

            advance(index, asteriskMatch[0].length);
            continue;
        }

        // 如何截取文本？首先经过上面的排除，我们第一个字符肯定不为特殊符号。
        // 那么我们只需要找到后面第一个特殊符号位置停止即可。
        if (text.test(unhandleTemplate)) {
            let textMatch = unhandleTemplate.match(text);

            // 对于文本，我们直接将其存入当前栈顶标签对象的子节点数组中
            setParent(createTextSymbol(textMatch[0]), lastAst);

            advance(index, textMatch[0].length);
            continue;
        }

        // 处理换行符号，换行符可以闭合栈中任何未闭合的标签，换行符之间为一个段落
        if (newline.test(unhandleTemplate)) {

            closeSymbol();
            advance(index, unhandleTemplate.match(newline)[1].length);
        }
    }

    return stack[0];


    // 更新模版，和当前在原始模版中的下标
    function advance(start, step) {

        // 更新当前模版在原模版中的下标b
        index = start + step;

        // 更新剩余要处理的模版
        unhandleTemplate = template.slice(index);
    }

    // 更新父级AST对象
    function updateLastAst(target) {

        // 未传入目标时，自动更新为当前栈的最后一个
        if (!target) return lastAst = stack[stack.length - 1];

        // 传入目标时，在栈中存放当前标签
        stack.push(target);

        // 将当前栈最顶层标签更新
        return lastAst = target;
    }



    // 查找stack是否有与其成对的标签，如果存在则说明应该闭合它
    function shouldCloseSymbol(symbol) {
        let times = stack.length;
        while (times--) {

            if (stack[times].symbol === symbol) {
                return times;
            }
        }

        return false;
    }


    // `sada*as**da**sd`
    // 闭合标签，处理其中的父子关系以及其他栈中未闭合的标签
    function closeSymbol(indexInStack) {
        let stackSize = stack.length;

        // 未传入参数时，自动侦查并闭合所有标签(root根节点除外)
        if (isUndefined(indexInStack)) {

            // 对于一元标签，如#标题标签，闭合到当前标签
            indexInStack = 1;

            // 首先确认我们要闭合的标签的类型，二元标签要作为文本
            let isUnary = isUnarySymbol(stack[1]);

            // 对于除#这种一元标题外，其他要闭合的对象要当作文本处理
            if (!isUnary) {
                indexInStack = 0;
            } else {

                // 更新第一个文本出现的位置，其实就为root数组的长度
                // 仅在闭合一元标签时(也就是通过换行符闭合时)，更新该值
                pStartIndex = stack[0].children.length + 1;
            }
        }

        while (stackSize > indexInStack) {

            // 优先运算减操作，因为我们要取该坐标下的标签对象
            stackSize--;

            // 如果当前闭合的标签对象不为对应标签，则说明当前闭合的标签应该为一个文本
            if (stackSize !== indexInStack) {

                let currentSymbol = stack[stackSize],

                    // 当前闭合节点的上一个节点
                    prevSymbol = stack[stackSize - 1],
                    newTextSymbol = createTextSymbol(currentSymbol.symbol);

                // 将当前标签转化为文本，并与其子节点一起存放至其父节点数组后
                // 重新为其设置父节点与子节点数组信息
                setParent([].concat(newTextSymbol, currentSymbol.children), prevSymbol);
                continue;
            }

            // 当处理到根节点时(仅根节点处理时，会处理到0)，直接退出
            if (!stackSize) {
                stack.length = 1;

                // 为文本生成段落

                generateParagraph(stack[0], pStartIndex);

                pStartIndex += 1;
            } else {

                // 对于正常配对闭合的标签，直接闭合即可，然后截断stack栈。
                stack[indexInStack].closed = true;

                // 设置父子节点信息
                setParent(stack[indexInStack], stack[indexInStack - 1]);

                stack.length = indexInStack;
            }

            updateLastAst();
        }
    }
}

// target加入parent的children数组中
function setParent(targets, parent) {

    // 统一为数组处理
    if (!Array.isArray(targets)) {
        targets = [targets];
    }

    targets.forEach(target => {
        parent.children.push(target);
        target.parent = parent;
    });
}

function generateParagraph(root, startIndex) {
    let textArray = root.children.splice(startIndex),
        pMarkAst = new MarkAst('p', '', void 0, true);

    // 为这些文本设置父节点为段落节点
    setParent(textArray, pMarkAst);

    // 将锻炼节点添加到根节点数组中
    setParent(pMarkAst, root);
}