export const TIP_DIR_MAP = {}
TIP_DIR_MAP.left = TIP_DIR_MAP.right = {
    dir: 'top',
    side: 'height'
}
TIP_DIR_MAP.top = TIP_DIR_MAP.bottom = {
    dir: 'left',
    side: 'width'
}

const LEFT = 'left',
    RIGHT = 'right',
    TOP = 'top',
    BOTTOM = 'bottom'

const CALC_INFO_MAP = {}
CALC_INFO_MAP.left = CALC_INFO_MAP.right = {
    axis: 'mouseY',
    clientSize: 'innerHeight',
    tipSize: 'height',
    edge: 'top',
    pre: 'left'
}
CALC_INFO_MAP.top = CALC_INFO_MAP.bottom = {
    axis: 'mouseX',
    clientSize: 'innerWidth',
    tipSize: 'width',
    edge: 'left',
    pre: 'top'
}

export class Tip {
    constructor(opt) {
        this.direction = this.originDirection = opt.direction || 'right'
        this.width = opt.width || 0
        this.height = opt.height || 0

        // 误差范围
        this.boundingRange = opt.boundingRange || 5
        this.top = 0
        this.left = 0
        this.targetRect = opt.targetRect
        this.visible = false
    }

    // 根据鼠标所在屏幕位置，调整tip相对于容器的方向
    reviseTipDirection(mouseX, mouseY) {
        const range = this.boundingRange,
            tipHeight = this.height,
            tipWidth = this.width,
            originDirection = this.originDirection,
            arrowSize = Tip.ARROW_SIZE
        let res

        if (originDirection === LEFT && tipWidth + arrowSize + range > mouseX) {
            res = RIGHT
        }

        if (originDirection === TOP && tipHeight + arrowSize + range > mouseY) {
            res = BOTTOM
        }

        if (
            originDirection === RIGHT &&
            tipWidth + arrowSize + mouseX + range > window.innerWidth
        ) {
            res = LEFT
        }

        if (
            originDirection === BOTTOM &&
            tipHeight + arrowSize + mouseY + range > window.innerHeight
        ) {
            res = TOP
        }

        this.direction = res || this.originDirection
        return this
    }

    calcPositionInfo(mouseX, mouseY) {
        let mouseInfo = {
            mouseX,
            mouseY,
            top: mouseY - this.targetRect.top,
            left: mouseX - this.targetRect.left
        }
        const curDirection = this.direction,
            arrowSize = Tip.ARROW_SIZE
        let currentCalcDir = CALC_INFO_MAP[curDirection],
            halfTipSize = this[currentCalcDir.tipSize] / 2

        if (mouseInfo[currentCalcDir.axis] <= halfTipSize) {
            mouseInfo[currentCalcDir.edge] = halfTipSize - arrowSize
        } else if (
            mouseInfo[currentCalcDir.axis] + halfTipSize >=
            window[currentCalcDir.clientSize]
        ) {
            mouseInfo[currentCalcDir.edge] =
                window[currentCalcDir.clientSize] - halfTipSize - arrowSize
        } else {
            mouseInfo[currentCalcDir.edge] =
                mouseInfo[currentCalcDir.edge] - arrowSize
        }

        // bug处理
        if (curDirection === LEFT || curDirection === TOP) {
            mouseInfo[currentCalcDir.pre] =
                mouseInfo[currentCalcDir.pre] - arrowSize - 4
        }

        // 上面为下面代码的简化

        // if (curDirection === LEFT || curDirection === RIGHT) {
        //     let halfTipHeight = this.height / 2;

        //     // 鼠标移动到屏幕最上方时
        //     if (mouseY <= halfTipHeight) {
        //         top = halfTipHeight - arrowSize;

        //         // 鼠标移动到屏幕最下面时
        //     } else if (mouseY + halfTipHeight >= window.innerHeight) {
        //         top = window.innerHeight - halfTipHeight - arrowSize;

        //     // 鼠标移动到中间的情况
        //     } else {
        //         top = top - arrowSize;
        //     }

        //     if (curDirection === LEFT) {
        //         left = left - arrowSize - 4;
        //     }
        // }

        // if (curDirection === TOP || curDirection === BOTTOM) {
        //     let halfTipWidth = this.width / 2;

        //     // 鼠标移动到屏幕最左方时
        //     if (mouseX <= halfTipWidth) {
        //         left = halfTipWidth - arrowSize;

        //         // 鼠标移动到屏幕最右面时
        //     } else if (mouseX + halfTipWidth >= window.innerWidth) {
        //         left = window.innerWidth - halfTipWidth - arrowSize;

        //         // 鼠标移动到中间的情况
        //     } else {
        //         left = left - arrowSize;
        //     }

        //     if (curDirection === TOP) {
        //         top = top - arrowSize - 4;
        //     }
        // }

        this.top = mouseInfo.top
        this.left = mouseInfo.left

        return this
    }
}

Tip.ARROW_SIZE = 5
