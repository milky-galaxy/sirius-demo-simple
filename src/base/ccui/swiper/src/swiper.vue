<!--幻灯片组件-->
<template>
    <div class="ccui-slide" @mouseover="stop()" @mouseout="move()">
        <ul>
            <li v-for="(img, index) in aImgData" :key="index">
                <a ondragstart="return false">
                    <img :class="{'ccui-slide-fadein':index===iMark,'ccui-slide-img':index!==iMark}"
                         @click="hook(img)"
                         v-ximg="{sImgUrl:img.imgUrl,sDefault:sErrorImg}">
                </a>
            </li>
        </ul>
        <div class="ccui-slide-pagination">
            <span v-for="(item, index) in aImgData" :class="{'ccui-slide-active':index===iMark }"
                  @click="change(index)" :key="index"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CcSwiper',
        componentName: 'CcSwiper',
        data(){
            return {
                timer: null, //定时器
                iMark: 0, //比对图片索引的变量
                bActive: false,
            }
        },
        //幻灯片组件参数定义默认值
        props: {
            aImgData: {
                type: [Array, Object],
                default: [
                    {imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528795926192&di=eaeb246bc0281aa85ef15289bad57f89&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2F201708%2F10%2F081940slwloyous3aa0xwn.jpg'},
                    {imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528795926191&di=b07d76b9d1cc6a2985d33c4a908f8c64&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2F201708%2F10%2F081924vaknb7bpohzbxnnh.jpg'},
                    {imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528795987353&di=b17875dd2f5669c1f412eb165beaa253&imgtype=0&src=http%3A%2F%2Fimgfs.oppo.cn%2Fuploads%2Fthread%2Fattachment%2F2017%2F08%2F02%2F15016707229304.jpg'},
                    {imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528796031660&di=98418b0758ee36b19beedf62d9ac241f&imgtype=0&src=http%3A%2F%2Fimgs.aixifan.com%2Flive%2F1483602027619%2F1483602027619.jpg'},
                ],
            },
            iTime: {
                type: Number,
                default: 3000
            },
            sErrorImg:'',
        },
        created() {
            this.play(this.iTime);
        },

        methods: {
            autoPlay() {
                let vm = this;
                vm.iMark++;
                if (vm.iMark === vm.aImgData.length) {
                    vm.iMark = 0
                }
            },
            play(time) {
                this.timer = setInterval(this.autoPlay, time);
            },
            change(i) {
                this.iMark = i
            },
            stop() {
                clearInterval(this.timer);
            },
            move() {
                this.play(this.iTime);
            },
            hook(imgData) {
                this.$emit('ccClickSlide',imgData); //主动触发ccClickSlide方法，data为向父组件传递的数据
            },

        },
    };
</script>