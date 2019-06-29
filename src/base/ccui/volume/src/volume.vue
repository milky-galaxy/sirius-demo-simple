<!--音量条选项组件-->
<template>
    <div class="ccui-volume">
        <!-- 横向 -->
        <div class="ccui-volume-crosswise" v-if="type==0">
            <div class="ccui-crosswise-bar" ref="bar" @mousedown="crosswiseClick">
                <div class="ccui-crosswise-l" ref="cl" :style="'width:'+clWidth+'px'"></div>
                <div class="ccui-crosswise-yuan" ref="yuan" :style="'left:'+yuanLeft + 'px'"  @mousedown.stop="down"></div>
            </div>
            <span>{{valueData}}</span>
        </div>
        <!-- 纵向 -->
        <div class="ccui-volume-lengthways" v-if="type==1">
            <p>{{valueData}}</p>
            <div class="ccui-lengthways-bar" ref="bar2" @mousedown="lengthwaysClick">
                <div class="ccui-lengthways-l" ref="cl2" :style="'height:'+clHeight+'px'"></div>
                <div class="ccui-lengthways-yuan" ref="yuan2" :style="'top:'+yuanTop+'px'" @mousedown.stop="lwsDown"></div>
            </div>
        </div>
    </div>
</template>
<script>
    require('../../css/ccui.scss')
    export default {
        name: 'CcVolume',
        componentName: 'CcVolume',
        props: {
            type:[String, Number],//type: 0--横向  1--纵向
            label:[String, Number]//音量值：0-255
        },
        data() {
            return {
                value:0,
                cha:0,
                //横向
                yuanWidth:0,
                yuanLeft:0,
                downl:0,//鼠标按下圆的left值
                mouseX:0,//鼠标按下的位置
                //纵向
                barHeight:80,
                yuanHeight:0,
                yuanTop:-5,
                downt:0,
                mouseY:0,
            }
        },
        mounted() {
            this.init();
            this.resize();
        },
        methods: {
            init(){
                let vm = this;
                vm.value = vm.label;
                //横向
                //计算小圆圈的宽度
                if(vm.type == 0){
                    //计算长条与圆的宽度差，方便计算比例
                    vm.yuanWidth = vm.$refs.yuan.offsetWidth;
                    vm.cha = vm.$refs.bar.offsetWidth;
                    vm.numToWidth();
                }else{
                    //纵向
                    vm.barHeight = vm.$refs.bar2.offsetHeight;
                    vm.yuanHeight = vm.$refs.yuan2.offsetHeight;
                    vm.cha = vm.barHeight;
                    vm.numToHeightY();
                }
            },
            //窗口大小发生变化时
            resize(){
                let vm = this;
                window.onresize = function(){
                    if(vm.type==0){
                        vm.cha = vm.$refs.bar.offsetWidth;
                        vm.numToWidth();
                    }
                }
            },
            down(ev){
                let vm = this;
                let e = ev || window.event;
                vm.mouseX = e.clientX;
                //鼠标按下时滑块的left值
                vm.downl = vm.yuanLeft;
                vm.move();
                vm.moveup();
                return false;
            },
            //移动时
            move(){
                let vm = this;
                window.onmousemove = function(ev){
                    let e = ev || window.event;
                    let moveL = e.clientX - vm.mouseX;//鼠标移动的距离
                    //小圆圈的left值
                    let yl = vm.downl + moveL;
                    if(yl<-vm.yuanWidth/2){
                        yl = -vm.yuanWidth/2;
                    }
                    if(yl >= vm.cha - vm.yuanWidth/2){
                        yl = vm.cha - vm.yuanWidth/2;
                    }
                    vm.yuanLeft = yl;
                    //计算value的值
                    vm.widthToNum();
                    return false;
                }
            },
            //放开鼠标
            moveup(){
                let vm = this;
                window.onmouseup = function(){
                    window.onmousemove = false;
                    return false;
                }
            },
            //横向点击事件(鼠标按下mousedown 解决与小圆点事件的冲突)
            crosswiseClick(ev){
                let vm = this;
                let e = ev || window.event;
                vm.yuanLeft = e.offsetX - vm.yuanWidth/2; 
                vm.widthToNum();
            },
            //0-255传的数值转化成 音量条显示的宽度(即用value值显示音量条)
            numToWidth(){
                let vm = this;
                let bili = vm.value/255 * vm.cha;
                vm.yuanLeft = Math.ceil(bili - vm.yuanWidth/2);
            },
            //将音量条的宽度，转化成0-255的数值
            widthToNum(){
                let vm = this;
                let num = vm.yuanLeft + vm.yuanWidth/2;
                vm.value = Math.ceil(num/vm.cha * 255);
                vm.defineFn();
            },
            //纵向的鼠标按下
            lwsDown(ev){
                let vm = this;
                let e = ev || window.event;
                vm.mouseY = e.clientY;
                //鼠标按下时滑块的top值
                vm.downt = vm.yuanTop;
                vm.lwsMove();
                vm.moveup();
                return false;
            },
            //纵向移动
            lwsMove(){
                let vm = this;
                window.onmousemove = function(ev){
                    let e = ev || window.event;
                    let moveT = e.clientY - vm.mouseY;//鼠标移动的距离
                    //小圆圈的top值
                    let yt = vm.downt + moveT;
                    if(yt < -vm.yuanHeight/2){
                        yt = -vm.yuanHeight/2;
                    }
                    if(yt >= vm.cha - vm.yuanHeight/2){
                        yt = vm.cha - vm.yuanHeight/2;
                    }
                    vm.yuanTop = yt;
                    //计算value的值
                    vm.heightToNumY();
                    return false;
                }
            },
            //纵向点击事件(鼠标按下mousedown 解决与小圆点事件的冲突)
            lengthwaysClick(ev){
                let vm = this;
                let e = ev || window.event;
                //e.srcElement.offsetHeight是offsetX作用的父元素高度
                if(e.srcElement.offsetHeight!=vm.barHeight){
                    vm.yuanTop = vm.yuanTop + e.offsetY;
                }else{
                    vm.yuanTop = e.offsetY - vm.yuanHeight/2;
                }
                vm.heightToNumY();
            },
            //纵向传入value,计算音量条
            numToHeightY(){
                let vm = this;
                let bili = vm.value/255 * vm.cha;
                vm.yuanTop = vm.barHeight - bili - vm.yuanHeight/2;
            },
            //  计算value的值
            heightToNumY(){
                let vm = this;
                let num = vm.barHeight - vm.yuanTop - vm.yuanHeight/2;
                vm.value = Math.ceil(num/vm.cha * 255);
                vm.defineFn();
            },
            //定义函数
            defineFn(){
                this.$emit('volumeCallback');
            }

        },
        computed:{
            clHeight(){
                let vm = this;
                return vm.barHeight - vm.yuanTop - vm.yuanHeight/2;
            },
            clWidth(){
                let vm = this;
                return vm.yuanLeft + vm.yuanWidth/2;
            },
            valueData(){
                return Math.ceil(this.value*100/255);
            }
        }
    }
</script>