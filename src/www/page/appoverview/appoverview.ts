import Vue from "vue"
import {Observer} from "mobx-vue"
import Component from "vue-class-component"
require('static/scss/appoverview/appoverview.scss');

@Observer
@Component
export default class Appoverview extends Vue {
    ModelData;

    //左侧导航栏数据状态
    menuData = [
        {
            menuTitle: "基本信息",
            menuItem: [
                {
                    menuIcon: "wy-iconfont-huanjingguanli",
                    menuName: "应用名称",
                    menuUrl: "/#"
                },
                {
                    menuIcon: "wy-iconfont-zhengshu",
                    menuName: "证书",
                    menuUrl: "/#"
                },
            ]
        },
        {
            menuTitle: "环境类型",
            menuItem: [
                {
                    menuIcon: "wy-iconfont-shebeiguanli",
                    menuName: "日常环境",
                    menuUrl: "/#"
                },
                {
                    menuIcon: "wy-iconfont-shebeiguanli",
                    menuName: "预发环境",
                    menuUrl: "/#"
                },
            ]
        },
    ];

    mounted(){
    }
    gotoIndex() {
        location.replace('/');
    }
}