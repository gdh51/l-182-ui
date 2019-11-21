# 自定义滚动条

首先实现自定义滚动条最简单的方法，即是直接修改CSS样式`::-webkit-scrollbar`，但缺点也很明显，那就是其只能在`Chrome`浏览器下使用。

为了兼容所有浏览器，所以我们如果要修改滚动条的样式，则要自己来实现一个滚动条。

## 原理

首先，要产生滚动事件，那么元素一定不能为`overflow: hidden`，但如果设置`overflow: scroll`又会出现滚动条，所以我们要用一个神奇的方法，将滚动条来遮蔽了。

```html
<div class="view" ref="wrap">
    <div class="scroll-box" ref="view">
        <div class="data-view">
            <div>数据...</div>
        </div>
    </div>
</div>

<style>
.view {
    overflow: hidden;
}

.scroll-box {
    overflow: scroll;
    margin-right: -17px;
    margin-bottom: -17px;
}
</style>
```

首先由于我们要隐藏滚动条，所以滚动条不能出现在最外层的`div`中，所以我们只能下面两个盒子中选。在这两个盒子中间我们必须用中间的盒子来显示滚动条即`scroll-box`，这时候有个神器的`CSS`属性`margin`，当它为负值时，可以拉伸盒子，利用这个特性，我们将两个滚动条拉伸到`view`盒子的不可见区域中去，就隐藏了滚动条了，而`data-view`恰好此时就是我们的`view`的视窗。

## 实现

通过上面的原理，我们已经完全隐藏了滚动条，而且可以滚动了。现在就差如何去制作一个假的滚动条来代替真滚动条的功能。

### 模拟滚动条

首先我们要知道滚动条槽和滚动条的大小如何来计算，这里我们要有一个概念，那就是**当出现滚动条时，视窗相当于显示了全部数据的一部分，所以滚动条就相当于视窗的位置和大小，滚动条槽就相当于全部数据的大小**。

所以我们可以得出以下结论：`视窗 / 全部数据长度 = 滚动条长度 / 滚动条槽长度`，所以（这里以垂直滚动条为例）：

- 视窗为`viewElement.clientHeight`
- 全部数据为`viewElement.scrollHeight`

这里的滚动条槽的长度肯定是视窗的高度，所以滚动条长度为`viewElement.clientHeight * 100 / viewElement.scrollHeight * (viewElement.clientHeight)`(这里不用乘上括号内的具体的长度算出来，只需要用百分比写入css属性即可)，这样我们的滚动条就完成了

### 模拟滚轮事件

首先模拟滚轮事件，这时我们只需要知道，滑动滚轮时，视窗就会在全部数据上上下移动，所以我们只需要关注真正滑动滚轮时，视窗的位置就行了，此时视窗距离数据上顶的位置为`view.scrollTop`，这时我们要找一个**平行视图(即视窗对应整个数据，滚动条对应滚动槽)**中的物体来做基准，这里我们就选视窗的高度`view.clientHeight`来作为基准(主要原因是因为`css`中`translate`属性是基于元素自身的宽高来计算)，那么滚动时发生的位移相当于`view.scrollTop / view.clientHeight`个视窗的高度，此时要换算成滚动条发生的位移，则可以推导出，它要位移`view.scrollTop / view.clientHeight`个滚动条的长度，这样在使用`css`的`translate`属性去移动即可。

### 模拟鼠标拖动

这个相对来说比较复杂，首先我们要知道，当我们拖动一个滚动条时，我们**最初点击滚动条拖动的位置始终和我们的鼠标平行**，那么**滚动条移动的位移即鼠标移动后的距离到最初点击拖动时的距离**。

首先，我们通过`mousedown`事件，获取最初点击滚动条开始拖动时的位置信息`p1 = e.clientY`，此时视窗位置为`s1 = view.scrollTop`，当滚动时，我们获得鼠标的实时位置`p2 = e.clientY`，此时位移为`p2 - p1`，它相当于`(p2 - p1) / scrollbar.scrollHeight`个滚动条高度，由于我们知道滚动条和视窗存在比例关系，那么`(p2 - p1) / scrollbar.scrollHeight * view.clientHeight`即发生视窗的真实位移的距离，即`view.scrollTop`增加的位移，所以滚动后的视窗位置为`view.scrollTop = s1 + (p2 - p1) / scrollbar.scrollHeight * view.clientHeight`

这样就能保存鼠标拖动时，滚动条同步滑动了。
