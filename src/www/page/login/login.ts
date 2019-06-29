import Vue from "vue"
import {Observer} from "mobx-vue"
import Component from "vue-class-component"
require('static/scss/login.scss');
@Observer
@Component
export default class extends Vue {
    ModelData;

    close() {
        this.$emit('ygClose', false);
    }
    gotoConsole(){
        this.ModelData.isLogin = true;
        this.$emit('ygClose', false);
        this.$router.push('/console');
    }
}