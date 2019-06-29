import Vue from "vue"
import {Observer} from "mobx-vue"
import Component from "vue-class-component"
require('static/scss/home/index.scss');

@Observer
@Component
export default class Cxb extends Vue {
    ModelData;
    mounted(){
    }
    gotoConsole(){
        this.$router.push('/console');
    }
}