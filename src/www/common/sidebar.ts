import Vue from "vue"
import {Observer} from "mobx-vue"
import Component from "vue-class-component"
require('./sidebar.scss');

@Observer
@Component
export default class Sidebar extends Vue {
    ModelData;

    //左侧导航栏数据状态
    menuData = [
        {
            menuTitle: "基本信息",
            menuItem: [
                {
                    menuIcon: "wy-iconfont-huanjingguanli",
                    menuName: "应用名称",
                    menuUrl: '/appoverview'
                },
                {
                    menuIcon: "wy-iconfont-zhengshu",
                    menuName: "证书",
                    menuUrl: '/certificate'
                },
                {
                    menuIcon: "wy-iconfont-zhengshu",
                    menuName: "域名",
                    menuUrl: '/certificate'
                },
                {
                    menuIcon: "wy-iconfont-zhengshu",
                    menuName: "cdn",
                    menuUrl: '/certificate'
                },
                {
                    menuIcon: "wy-iconfont-zhengshu",
                    menuName: "oss",
                    menuUrl: '/certificate'
                },
                {
                    menuIcon: "wy-iconfont-zhengshu",
                    menuName: "ots",
                    menuUrl: '/certificate'
                },
                {
                    menuIcon: "wy-iconfont-zhengshu",
                    menuName: "sls",
                    menuUrl: '/certificate'
                },
            ]
        },
        // {
        //     menuTitle: "环境类型",
        //     menuItem: [
        //         {
        //             menuIcon: "wy-iconfont-shebeiguanli",
        //             menuName: "日常环境",
        //             menuUrl: '/appoverview'
        //         },
        //         {
        //             menuIcon: "wy-iconfont-shebeiguanli",
        //             menuName: "预发环境",
        //             menuUrl: '/certificate'
        //         },
        //     ]
        // },
    ];
    gotoIndex() {
        location.replace('/');
    }
    goto(url){
        this.$router.push(url);
    }
}