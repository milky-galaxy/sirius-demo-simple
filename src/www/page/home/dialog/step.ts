import Vue from "vue"
import {Observer} from "mobx-vue"
import Component from "vue-class-component"
require('static/scss/home/dialog/create.scss');



@Observer
@Component
export default class Step extends Vue {
    ModelData;
    //步骤数据状态
    stepData = [
        {start:true, end:false, selected:true, name:'填写基本信息'},
        {start:false, end:false, selected:false, name:'选择环境类型'},
        {start:false, end:false, selected:false, name:'设置开发模式'},
        {start:false, end:false, selected:false, name:'配置HTTPS服务'},
        {start:false, end:true, selected:false, name:'配置域名'}
    ];
    //步骤点击数
    stepNum = 1;
    //步骤内容状态
    stepConeten = [true,false,false,false,false];
    mounted(){

    }
    close(){
        this.ModelData.isStepBtn = false;
    }

    prev(){
        let vm = this;
        if(vm.stepNum ==1){
            return;
        }
        vm.stepNum--;
        if(vm.stepNum >= 1){
            vm.stepData[vm.stepNum].selected = false;
            vm.stepConeten.forEach((item,index)=>{
                if(vm.stepNum-1 == index){
                    vm.stepConeten[index] = true;
                }else{
                    vm.stepConeten[index] = false;
                }
            });
        }
    }

    next(){
        let vm = this;
        if(vm.stepNum < vm.stepData.length){
            vm.stepData[vm.stepNum].selected = true;
            vm.stepConeten.forEach((item,index)=>{
                if(vm.stepNum == index){
                    vm.stepConeten[index] = true;
                }else{
                    vm.stepConeten[index] = false;
                }
            });
            vm.stepNum++;
        }else{
            this.ModelData.isCreateBtn = false;
            alert('开始创建应用');
        }

    }
}