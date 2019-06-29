<template>
    <div class="wy-header">
        <!--logo-->
        <a class="logo fl fb" v-xclick @xclick="gotoIndex()">社区web应用管理</a>
        <!--登录按钮-->
        <div class="fr mt10 ml30" v-if="!ModelData.isLogin">
            <input v-xclick @xclick="login()" type="button" value="登录" class="logo-btn wy-blue-btn" />
        </div>
        <!--登录后的样式 start-->
        <div class="login-state mr30" v-if="ModelData.isLogin">
            <a href="javascript:void(0);" class="fl" @mouseenter="enter">
                <img :src="defaultAvatar">
            </a>
            <!--<span class="fl wy-f16 mt10 ml10">username</span>-->
            <div class="login-fl" v-if="isOk" @mouseenter="enter" @mouseleave="leave">
                <div class="tc lh45" v-xclick @xclick="$router.push('/setting')">系统设置</div>
                <div class="tc lh45" v-xclick @xclick="$router.push('/console')">应用管理</div>
                <div class="tc lh45" v-xclick @xclick="$router.push('/release')">发布管理</div>
                <div class="tc lh45" v-xclick @xclick="$router.push('/statistics')">运行统计</div>
                <div class="tc lh45" v-xclick @xclick="$router.push('/expenseReport')">费用管理</div>
                <div class="tc lh45" v-xclick @xclick="$router.push('/debug')">实时日志报警系统</div>

            </div>
        </div>

         <!--导航栏标题-->
        <div class="logo-title fr mr30">
            <a href="https://github.com/chyingp/nodejs-learning-guide" target="_blank">源码下载</a>
            <a href="https://github.com/chyingp/nodejs-learning-guide" target="_blank" >开发文档</a>
            <a>技术支持</a>
            <a v-xclick @xclick="$router.push('/example')">示例应用</a>
        </div>
        <Wy-login v-if="isShow" @ygClose="login" />
    </div>
</template>
<script lang="ts" src="./header.ts"></script>