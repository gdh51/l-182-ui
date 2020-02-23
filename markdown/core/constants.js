export const

    // 匹配一元标签，以换行符结束的
    titleLevelRE = /^(\#{1,5})\s/,
    quoteRE = /^(>)/,

    // 匹配1~2个的闭合符号
    shortCodeRE = /^(`{1,2})/,
    asteriskRE = /^(\*{1,2})/,
    delRE = /^(~{1,2})/,

    // 匹配图片
    imgRE = /^\!\[(.*)\]\((.*)\)/,

    // 链接
    linkRE = /^\[(.*)\]\((.*)\)/,

    // 匹配文本
    text = /^(.+?)(?![^`*(**)(~)(\!\[(.*)\]\((.*)\))(\[(.*)\]\((.*)\))\n])/,

    // 文段结束
    newline = /^(\n+)/;

export const symbol2Tag = {
    '#': 'h1',
    '##': 'h2',
    '###': 'h3',
    '####': 'h4',
    '#####': 'h5',
    '>': 'blockquote',
    '`': 'code',
    '``': 'code',
    'p': 'p',
    'img': 'img',
    'link': 'a',
    '*': 'i',
    '**': 'b',
    '~': 'del',
    '~~': 'del',
    'root': 'article'
};

export const unarySymbol = {
    '#': true,
    '##': true,
    '###': true,
    '####': true,
    '#####': true,
    '>': true
};