<template>
    <div class="wy-console wy-xwrap">
        <!--页面布局左边-->
        <div class="wy-console-left fl">
            <div class="wy-console-applist">
                <!--创建应用按钮-->
                <div class="wy-console-create ">
                    <button v-xclick @xclick="createBtn()" class="wy-console-btn wy-blue-btn">
                        <i class="mr10 ccui-iconfont ccui-plus-bold"/>创建应用
                    </button>
                </div>
                <!--应用名称信息-->
                <div class="wy-console-appinfo" v-xclick @xclick="gotoAppoverview()">
                    <div class="wy-console-appicon">
                        <img src="../../../static/imgs/default.png"/>
                        <span class="wy-console-appname xoverflow">youngget</span>
                        <span class="wy-console-appid xoverflow">ID: a6062474635747</span>
                    </div>
                </div>
            </div>
        </div>
        <!--页面布局中间-->
        <div class="wy-console-center fl">
            <div class="wy-console-message">
                <div class="pt30 tc wy-f24">用户视角：新增：选择创建模版（包括：组件、微应用、微服务），一键生成最小应用。

                    删除：删除应用（admin权限）

                    后台工作：1、开通阿里云相关服务（证书、域名、cdn 、oss 、ots、sls），并生成最小应用需要的实例。

                    2、将应用自动化发布，生成一个在线上真实可访问的应用。</div>
            </div>
        </div>
        <!--创建对话框-->
        <Wy-create v-if="ModelData.isCreateBtn" />
    </div>
</template>
<script lang="ts" src="./console.ts"></script>