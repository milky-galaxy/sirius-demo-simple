<!--上传组件-->
<template>
    <div class="yg-upload" v-xclick @xclick="fileclick">
        <input type="file" ref="ccuiFile"  @change="uploadfile">
        <input type="hidden" v-text="imgUrl=value" :value="imgUrl">
        <slot></slot>
    </div>
</template>
<script>
    require('./upload.scss')
    export default {
        props: {
            id:[String, Number],//用户id
            value:''
        },
        data() {
            return {
               imgUrl:''
            }
        },
        mounted() {
            //this.init();
        },
        created(){

        },
        methods: {
            //调用input的文件上传功能
            fileclick(){
                this.$refs.ccuiFile.click();
            },
            //uploadfile上传图片
            uploadfile(){
                let vm = this;
                const file = vm.$refs.ccuiFile.files[0];
                console.log(file)
                //jpg、png、bmp、gif、webp、tiff
                if(file.type!='image/jpg'&&file.type!='image/png'&&file.type!='image/bmp'&&file.type!='image/gif'&&file.type!='image/webp'&&file.type!='image/tiff'&&file.type!='image/jpeg'){
                    xlayer.msg('上传失败，文件类型错误！');
                    return;
                }
                let fileName = file.name.split('.')[0];
                const fd = new FormData();
                xpost('/ossGet').then((out) => {
                    if(out.success){
                        const {OSSAccessKeyId, host, policy, signature, startsWith, saveName} = out.content;
                        fd.append('OSSAccessKeyId', OSSAccessKeyId)
                        fd.append('policy', policy)
                        fd.append('signature', signature)
                        fd.append('key', startsWith + saveName+'-'+fileName)
                        fd.append('success_action_status', 200)
                        fd.append('file', file, saveName)
                        const xhr = new XMLHttpRequest()
                        xhr.open('post', host, true)
                        xhr.addEventListener('load', (e) => {
                            if (e.target.status !== 200) {
                                console.log(e.target.response)
                                console.log('上传失败！')
                                return
                            }
                            if (e.target.status === 200) {
                                vm.imgUrl = host + '/' + startsWith + saveName+'-'+fileName;
                                // vm.imgUrl = host + '/' + startsWith + saveName+'-'+fileName + '?x-oss-process=image/crop,x_100,y_50';
                                vm.$emit('input', vm.imgUrl);    
                                vm.delivery();
                            }
                        }, false)
                        xhr.send(fd)
                    }else{
                        xlayer.msg(out.errorMsg);
                    }
                    
                }).catch((err) => {
                    console.log(err);
                });
            },
            //上传的图片返回给后端
            delivery(){
                this.$emit('handleUpload');
            }
        },
        computed:{
            
        }
    }
</script>