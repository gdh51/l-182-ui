// 滑动的方向
const Direction = { horizontal: 1, vertical: 1 },
    Horizontal = 'horizontal',
    Vertical = 'vertical',
    DirToPosition = {
        [Horizontal]: 'left',
        [Vertical]: 'top'
    },
    DirToShape = {
        [Horizontal]: 'width',
        [Vertical]: 'height'
    }

export {
    Direction, DirToPosition, DirToShape
}
