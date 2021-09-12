// 滑动的方向
const Direction = { horizontal: 1, vertical: 1 },
    Horizontal = 'horizontal',
    Vertical = 'vertical',
    DirToShape = {
        [Horizontal]: 'width',
        [Vertical]: 'height'
    },
    DirToDelta = {
        [Horizontal]: 'deltaX',
        [Vertical]: 'deltaY'
    }

export {
    Direction,
    DirToShape,
    Horizontal,
    Vertical,
    DirToDelta
}
