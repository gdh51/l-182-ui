export const preDefinedProps =  {

    // 弹框的标题
    title: {
        type: String,
        default: '标题'
    },

    //  弹框的内容文本
    content: { type: String },

    // 弹框的默认宽度，你可以通过重写modalStyle来自定义其width
    size: {
        type: String,
        validator(val) {
            return val === 'large' || val === 'small'
        },
        default: 'small'
    },

    // 确认按钮的文案与是否显示，使用false时，将隐藏该按钮
    confirm: {
        type: [ Boolean, String ],
        validator(val) {
            if (val === true) return new Error('It display by default.')
            return true
        },
        default: '确定'
    },

    // 取消按钮的文案与是否显示，使用false时，将隐藏该按钮
    cancel: {
        type: [ Boolean, String ],
        validator(val) {
            if (val === true) return new Error('It display by default.')
            return true
        },
        default: '取消'
    },

    // 是否通过点击mask来关闭弹窗
    closeByMask: {
        type: Boolean,
        default: true
    },

    // 是否在隐藏后销毁实例
    once: {
        type: Boolean,
        default: true
    },

    // 定义弹出框的样式
    modalStyle: [ Array, String, Object ],

    // 取消header区域的显示
    header: {
        type: Boolean,
        default: true
    },

    // 反转确定按钮与取消按钮位置
    buttonReverse: Boolean,

    // 取消footer区域显示
    footer: {
        type: Boolean,
        default: true
    }
}
