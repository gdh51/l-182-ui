const Koa = require('koa2');
const path = require('path');
const fs = require('fs');
const koaStatic = require('koa-static');
const koaBody = require('koa-body');

const app = new Koa();
const port = 3000;


app.use(koaBody({

    // 表单解析器
    formidable: {
        uploadDir: path.resolve(__dirname, './static/uploads'),
        keepExtensions: true
    },

    multipart: true // 开启文件上传
}));

app.use(koaStatic(
    path.resolve(__dirname, './static')
));

const uploadHost = `http://localhost:${port}/uploads/`;

// 文件二次处理，比如添加文件名称后缀
// app.use(ctx => {
//     let files = ctx.request.files;

//     ctx.body = `{
//         "fileUrl": "${JSON.stringify(files)}"
//     }`;
// });

app.use(ctx => {
    let body = ctx.request.body;
    let files = ctx.request.files ? ctx.request.files.f1 : [];
    let result = [];
    let fileToken = ctx.request.body.token;
    let fileIndex = ctx.request.body.index;

    if (files && !Array.isArray(files)) {
        files = [files];
    }

    files && files.forEach(file => {

    });

    ctx.body = `{
        "fileUrl": "${JSON.stringify(files)}"
    }`;
});

app.listen(port, () => {
    console.log('running');
});