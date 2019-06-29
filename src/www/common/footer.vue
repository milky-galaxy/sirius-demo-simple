<template>
    <div class="yg-footer">
        尾部
        <!--<div class="ewcode fl"><img src="../../../src/static/imgs/ewcode.png"></div>-->
        <!--<div class="footer-r fl">-->
            <!--<div class="about-list">-->
                <!--<ul>-->
                    <!--<li><a @click="gotoabout()">关于我们</a></li>-->
                    <!--<li><a @click="gotocontact()">联系我们</a></li>-->
                    <!--<li><a @click="gotobusiness()">业务合作</a></li>-->
                <!--</ul>-->
            <!--</div>-->
            <!--<div class="beian fl">-->
                <!--<span><a href="http://www.miibeian.gov.cn/" target="_blank">浙ICP备18024662号-1</a></span>-->
                <!--<span><a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33011002013420"-->
                         <!--target="_blank"><i><img-->
                        <!--src="../../../src/static/imgs/gh.png"></i>浙公网安备 33011002013420号</a></span>-->
                <!--<span>本公司常年法律顾问：浙江律企联</span>-->
                <!--<span>&copy; 2018-现在 杭州氧歌科技有限公司 版权所有</span>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>
<script>
    require('./footer.scss');
    export default {
        data() {
            return {
                ishow: false,
            }
        },
        created() {
        },
        methods: {
            isibles() {
                console.log(11111);
                this.ishow = false;
            },
            showwx: function () {
                this.ishow = !this.ishow;
            },
            gotoabout() {
                this.$router.push('/about?item=0');
            },
            gotocontact() {
                this.$router.push('/contact?item=1');
            },
            gotobusiness() {
                this.$router.push('/business?item=2');
            },
        }
    }
</script>

