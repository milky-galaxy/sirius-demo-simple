import Vue from "vue"
import {Observer} from "mobx-vue"
import Component from "vue-class-component"
require('static/scss/home/console.scss');

import WyCreate from './dialog/create.vue';
@Observer
@Component({
    components: {
        WyCreate
    },
})
export default class Console extends Vue {
    ModelData;
    mounted(){

    }
    createBtn(){
        let vm:any = this;
        vm.ModelData.isCreateBtn = true;
    }

    gotoAppoverview(){
        this.$router.push('/appoverview');
    }
}