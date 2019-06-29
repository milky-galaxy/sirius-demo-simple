import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
export default new Router({
    // mode: 'history',
    mode:'hash',
    routes: [
        //错误页面重定向到404页面
        {path: "*", redirect: "404"},
        {
            path: "/404",
            // component: resolve => require(['www/page/help/404.vue'], resolve),
            component: require('../www/page/help/404.vue'),
        },
        //重定向
        {path: '/', redirect: '/index'},
        //home页面
        {
            path: '/',
            component: require('../www/common/home.vue'),
            children: [
                {
                    path: '/index',//首页
                    component: require('../www/page/home/index.vue'),
                },
                {
                    path: '/console',//控制台页面
                    component: require('../www/page/home/console.vue'),
                },
                {
                    path: '/bbs',//开发论坛
                    component: require('../www/page/bbs/bbs.vue'),
                },
                {
                    path: '/docs',//文档页面
                    component: require('../www/page/docs/docs.vue'),
                },
                {
                    path: '/example',//应用示例页面
                    component: require('../www/page/example/example.vue'),
                },
                {
                    path: '/setting',//系统设置页面
                    component: require('../www/page/setting/setting.vue'),
                },
                {
                    path: '/userManagement',//用户管理页面
                    component: require('../www/page/userManagement/userManagement.vue'),
                },
                {
                    path: '/release',//发布管理页面
                    component: require('../www/page/release/release.vue'),
                },
                {
                    path: '/statistics',//运行统计页面
                    component: require('../www/page/statistics/statistics.vue'),
                },
                {
                    path: '/expenseReport',//运行统计页面
                    component: require('../www/page/expenseReport/expenseReport.vue'),
                },
                {
                    path: '/debug',//实时日志报警系统页面
                    component: require('../www/page/debug/debug.vue'),
                },
                {
                    path: '/download',//下载页面
                    component: require('../www/page/download/download.vue'),
                },

            ]
        },
        //应用详情
        {
            path: '/',
            component: require('../www/common/app.vue'),
            children: [
                {
                    path: '/appoverview',//应用信息展示页面
                    component: require('../www/page/appoverview/appoverview.vue'),
                },
                {
                    path: '/certificate',//证书页
                    component: require('../www/page/appoverview/certificate.vue'),
                },
            ]
        },

        //测试页面
        {
            path: '/test',//测试页面
            component: require('../www/page/test/test.vue'),
        },


    ]
})

