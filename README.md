# 基于vue+webpack4.+的一个每日练手项目

该项目用于每天做出某个功能的实现，记录实现的思路。

项目不是基于`Vue-cli`，是自己搭建的。

## 目录

1. [虚拟滚动](./目录/虚拟滚动/README.md)

## 遇到的问题

1. 解析文件时必须要添加`.vue`后缀，否则无法解析

解决：在`webpack.config.js`的`resolve`字段中添加`extentions`字段，指定解析未指定文件后缀名的路径时默认添加的后缀顺序。

2. `stylus-resource`报错问题

由于`webpack4.+`的更新，已删除原`context`，但该组件已经未维护了，所以要自行修改为以下的代码：

```js
    var webpackConfigContext = webpack.rootContext || (webpack.options && webpack.options.context) || process.cwd();

    if (!webpack.rootContext && !webpack.options && !webpack.options.context) {
        _logger2.default.log('`rootContext` is missing. Using current working directory as a root instead:', process.cwd());
    }
```
