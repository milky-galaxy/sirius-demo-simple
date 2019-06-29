<template>
    <div class="wy-login">
        <div class="wy-modal-bg">
            <!--登录-->
            <div class="wy-pop">
                <h3 class="mt20">登录 - webServerless</h3>
                <a class="wy-close-btn" v-xclick @xclick="close()">&#215;</a>
            </div>
            <!--钉钉登录二维码-->
            <div id="DDCode" class="wy-dd-code">
                <div class="tc">安装完成生成的系统管理员账号密码登陆</div>
                <div class="fr mt10 ml30">
                    <input v-xclick @xclick="gotoConsole" type="button" value="登录" class="logo-btn wy-blue-btn" />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./login.ts"></script>
