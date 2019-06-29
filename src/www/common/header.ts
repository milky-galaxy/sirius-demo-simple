import Vue from "vue"
import {Observer} from "mobx-vue"
import Component from "vue-class-component"

import WyLogin from '../page/login/login.vue';
import './header.scss';
@Observer
@Component({
    components: {
        WyLogin
    },
})
export default class WyHeader extends Vue {
    ModelData;
    isShow = false;
    isOk = false;
    defaultAvatar = require('static/imgs/default-sqare-avatar.png');
    mounted(){
    }

    // computed2
    // get loginState() {
    //     // let vm = this;
    //     // if (vm.xGetState('aUserInfo', 'addUserInfo')) {
    //     //     return vm.xGetState('aUserInfo', 'addUserInfo');
    //     // } else {
    //     //     return false;
    //     // }
    //     return 0;
    // }



    gotoIndex() {
        location.replace('/');
    }

    login() {
        this.isShow = !this.isShow;
    }
    //鼠标放入
    enter(){
        this.isOk = true;
    }
    //鼠标离开
    leave(){
        this.isOk = false;
    }
}