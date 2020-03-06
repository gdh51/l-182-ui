<template>
    <div class="upload-area">
        <progress-bar :progress="progress"/>
        <input type="file" ref="file" multiple>
        <button type="button" @click="upload">上传</button>
        <iframe ref="iframe" name="temp" src="" style="display: none"></iframe>
        <form action="/upload" method="post" target="temp" enctype="multipart/form-data">
            <input type="file" multiple>
            <button type="submit">表单上传</button>
        </form>
        <upload-img-view url="sdsd"></upload-img-view>
    </div>
</template>

<style lang="stylus" scoped>
.upload-area
    width 500px
    margin auto
</style>

<script>
import UploadImgView from './components/upload-img-view/index'
export default {
    name: 'FileUpload',

    components: {
        UploadImgView
    },

    data () {
        return {
            progress: 0
        }
    },

    methods: {
        upload () {
            let file = this.$refs.file.files;
            if (!file.length) return;
            let formData = new FormData();
            console.log(file);
            formData.append('f1', file[0]);
            formData.append('f1', file[1]);
            let vm = this;
            this.request('/upload', 'post', {
                data: formData,
                onUploadProgress (e) {
                    vm.progress = Number(e.loaded / e.total) * 100;
                }
            })
        },

        uploadSuccess () {
            let iframe = this.$refs.iframe;
            iframe.onload = function () {
                alert('!!!!');
            }
        },

        // 对单个文件的分片上传
        shardUpload (file) {
            const chunkSize = 2 * 1024 * 1024;
            let chunks = [],
                start = 0,
                end = 0,
                token = performance.now(),
                filename = file.name,
                chunkCount = 0,
                sendCount = 0;

            // 小于2m的就不用分片了
            if (file.size > chunkSize) {
                while (true) {
                    end += chunkSize;
                    let blob = file.slice(start, end);
                    start += chunkSize;

                    // 分片结束
                    if (!blob.size) {
                        break;
                    }

                    chunks.push(blob);
                }
            } else {
                chunks.push(file.slice(0));
            }

            chunkCount = chunks.length;

            for (let i = 0; i < chunkCount; i++) {
                let formData = new FormData();
                formData.append('token', token);
                formData.append('f1', chunks[i]);
                formData.append('index', i);

                this.request('post', '/upload', {
                    data: formData
                }).then(() => {
                    sendCount += 1;
                    if (sendCount === chunkCount) {
                        console.log('上传完毕，开始合并');
                        let formData = new FormData();
                        formData.append('type', 'merge');
                        formData.append('filename', filename);
                        formData.append('token', token);
                        formData.append('chunkCount', chunkCount);
                        this.request('post', '/upload', {
                            data: formData
                        }).then(data => {
                            console.log('合并完成');
                        });
                    }
                });
            }
        }
    },


}
</script>