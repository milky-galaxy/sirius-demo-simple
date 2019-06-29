import Vue from "vue"
import {Observer} from "mobx-vue"
import Component from "vue-class-component"

@Observer
@Component
export default class extends Vue {
    ModelData;
}