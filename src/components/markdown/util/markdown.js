import {
    compile
} from 'vue';

class Markdown {
    constructor ({
        toRenderFunction,
        levelClass
    }) {

        // 默认情况下编译为模版
        this.toRenderFunction = toRenderFunction;

        // h标签的class
        this.levelClass = levelClass;
    }
}

class MarkAst {
    constructor(symbol, raw, text) {
        this.symbol = symbol;
        this.children = [];
        this.tag = symbol2Tag[symbol];
        this.text = text;
        this.raw = raw;
    }
}

let unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/,
    asteriskRegExp = /\*{1,2}/,
    spSymbol = /[*`#]/;

// 匹配#标签，匹配到当前排的换行符之前 $1为# $2为匹配的文本
const titleLevelRE = /^(\#{1,5})\s(.+)(?:\n)/,
    shortCodeRE = /^(`{1,2})/,

    // 匹配1~2个*，且它们后面不能跟空格否则无效
    asteriskRE = /^(\*{1,2})(?![\s\*])/
    // normalContent = new Reg

let symbol2Tag = {
    '#': 'h1',
    '##': 'h2',
    '###': 'h3',
    '####': 'h4',
    '#####': 'h5',
    '`': 'code',
    '``': 'code'
};

function parseCotent (template) {
    let unhandleTemplate = template,
        index = 0,
        root = new MarkAst('root'),
        stack = [root],
        lastAst = stack[0];

        while (!!unhandleTemplate) {

            // 匹配#题目标签
            if (titleLevelRE.test(unhandleTemplate)) {

                // 匹配到的对象
                let titleMatch = unhandleTemplate.match(titleLevelRE);

                lastAst.children.push(new MarkAst(titleMatch[1], titleMatch[0], titleMatch[2]));

                // 截取剩余的模版
                advance(index, titleMatch[0].length);
                continue;
            }

            // 处理``xx``或`xx`的短代码标签
            if (shortCodeRE.test(unhandleTemplate)) {
                let shortCodeMatch = unhandleTemplate.match(shortCodeRE);

                // 遇到配对的标签时，就可以出栈了
                if (lastAst.symbol === shortCodeMatch[1]) {

                    // 完全配对时，将其加入上一个标签的子数组中
                    setParent(stackPop());
                    continue;
                }

                // 遇到新的头标签时，加入栈中
                stack.push(new MarkAst(shortCodeMatch[1], shortCodeMatch[0]));

                // 更新上一个Ast标签(父级)
                updateLastAst();
                advance(index, shortCodeMatch[0].length);
                continue;
            }

            if (asteriskRE.test(unhandleTemplate)) {
                let asteriskMatch = unhandleTemplate.match(asteriskRE);

                // 遇到配对的标签时，就可以出栈了
                if (lastAst.symbol === asteriskMatch[1]) {

                    // 完全配对时，将其加入上一个标签的子数组中
                    setParent(stackPop());
                    continue;
                }

                stack.push(new MarkAst(asteriskMatch[1], asteriskMatch[0]));

                updateLastAst();
                advance(index, asteriskMatch[0].length);
                continue;
            }

            // 如何截取文本？
        }

    function advance (start, step) {

        // 更新当前模版在原模版中的下标b
        index = start + step + 1;

        // 更新剩余要处理的模版
        unhandleTemplate = template.slice(start, index);
    }

    function updateLastAst () {
        lastAst = stack[stack.length - 1];
    }

    function stackPop () {
        let popAst = stack.pop();

        updateLastAst();
        return popAst;
    }

    function setParent (parent, target) {
        parent.children.push(target);
    }
}



