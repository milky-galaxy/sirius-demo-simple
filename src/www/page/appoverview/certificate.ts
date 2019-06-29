import Vue from "vue"
import {Observer} from "mobx-vue"
import Component from "vue-class-component"
require('static/scss/appoverview/certificate.scss');

@Observer
@Component
export default class Certificate extends Vue {
    ModelData;

}