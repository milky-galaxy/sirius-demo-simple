<template>
    <div class="lostpage">

        <div class="error-404">
            <div class="fl">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#yg-icon-test1"></use>
                </svg>
            </div>
            <div class="error-toindex">
                <h3>出错啦～</h3>
                <p>抱歉，您访问的页面不存在</p>
                <a v-xclick @xclick="gotoIndex()">返回首页</a>
            </div>
        </div>
    </div>
</template>
<script>
    require('static/scss/404.scss');
    export default {
        data() {
            return {}
        },
        methods: {
            gotoIndex() {
                this.$router.push('/index');
            },
        }
    }
</script>