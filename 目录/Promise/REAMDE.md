# Promise

今天我们来`poly`一个`Promise`，首先要确定的是：

1. 实例化一个`Promise`后，`resolve`和`reject`后，是在微任务阶段调用`then()`中函数
2. 每个`then()`方法都会返回一个新的`Promise`实例
3. 已被拒绝的`Promise`再次连接`then()`方法时，应该如何被调用。
4. 两种情况：
   1. 已被`resolve`很久的`Promise`，突然加上一个`then()`方法来执行，此时，应该由`then()`来启动任务
   2. 同步的`then()`调用，应该由`resolve()`来启动任务。
5. 初始`promise`中的`reject`，后面必须要有一个`catch()`或`then()`来对其进行捕获否则报错
6. 已被`reject`的`Promise`，如果后面有`catch`类型函数，那么`catch`类型返回的`Promise`会被重新`resolve`
