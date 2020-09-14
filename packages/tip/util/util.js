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
    BOTTOM = 'bottom',

    CALC_INFO_MAP = {}
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

        /* eslint-disable-next-line */
      this.width = opt.width || 0
        /* eslint-disable-next-line */
      this.height = opt.height || 0

        // 误差范围
        /* eslint-disable-next-line */
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

            /* eslint-disable-next-line */
          halfTipSize = this[currentCalcDir.tipSize] / 2;

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
              /* eslint-disable-next-line */
              mouseInfo[currentCalcDir.pre] - arrowSize - 4;
        }

        this.top = mouseInfo.top
        this.left = mouseInfo.left

        return this
    }
}

Tip.ARROW_SIZE = 5
