# 模拟原生Promise

该`Promise`是模拟原生的`Promise`，所以不能按网上的直接的订阅者模式来书写。因为可能会存在如下的这种情况：

```js
new Promise((resolve, reject) => reject(1))
    .catch(e => e).then(e => e);
```

像以上的情况在大多数模拟书写`Promise`的不能连续处理中途`reject`但捕获掉错误的`Promise`，基于这种思想，所以我们要为每个`Promise`实例单独处理其状态，而不是用发布订阅者模式。

## 构造函数

首先处理构造函数，我还是习惯只写一个`resolve`和`reject`方法，所以我们会在构造函数上的静态方法中同时处理`Promise`构造函数传入的两个函数参数。

为了区分直接调用`Promise`的静态`API`和传入的回调函数，这里通过调用它的`this`来确定：

```js
// 执行promise的回调函数
try {
    executor(resolve.bind(this), reject.bind(this));

    // 发生错误时直接reject掉
} catch (e) {
    reject.call(this, e);
}
```
