import Vue from "vue"
import {Observer} from "mobx-vue"
import Component from "vue-class-component"
require('static/scss/home/dialog/create.scss');



@Observer
@Component
export default class Console extends Vue {
    ModelData;
    mounted(){

    }
    关闭方法
    close(){
        this.ModelData.isCreateBtn = false;
    }
    //创建方法
    create(){
        this.$router.push('/appoverview');
    }
    //取消方法
    cancel(){
        this.ModelData.isCreateBtn = false;
    }


}