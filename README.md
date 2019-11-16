# 基于vue+webpack4.+的脚手架

## 遇到的问题

1. 解析文件时必须要添加`.vue`后缀，否则无法解析

解决：在`webpack.config.js`的`resolve`字段中添加`extentions`字段，指定解析未指定文件后缀名的路径时默认添加的后缀顺序。
