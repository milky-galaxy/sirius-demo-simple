<template>
    <div id="wy" class="wy">
        <router-view></router-view>
        <!--xpost判断登陆状态弹出登陆组件-->
        <yg-login v-if="ishow" @ygClose="close()"></yg-login>
    </div>
</template>

<script>
    import YgLogin from 'src/www/page/login/login.vue';
    export default {
        data(){
            return {
                ishow: false,
            }
        },
        components: {
            YgLogin,
        },
        methods: {
            login(){
                this.ishow = true;
            },
            close(){
                this.ishow = false;
            },
            loginState(){
                this.$router.push('/index');
                this.login();
            }
        }
    }
</script>
