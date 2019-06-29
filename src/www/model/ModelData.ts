import { action, computed, observable } from "mobx";
export default class ModelData {
    @observable isCreateBtn:boolean = false; //创建对话框显示状态
    @observable isStepBtn:boolean = false; //创建对话框显示状态
    @observable isLogin:boolean = false; //登陆状态

    @observable Text:any = '';

}