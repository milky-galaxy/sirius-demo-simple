<template>
    <div class="yg-test">
        <div class="tc pt30 fb xfont24">测试页面，自定义组件及其方法实例！！！！</div>
        <!--Select选择器-->
        <div class="pl30 pt30 pb20">1、Select选择器</div>
        <div class="pl30 pb30">
            <cc-select>
                <cc-option v-for="(item,index) in options" :key="index" :label="item.type" :value="item.name"></cc-option>
            </cc-select>
        </div>
        <!--轮播图组件-->
        <div class="pl30 pt30 pb20">2、轮播图组件</div>
        <cc-swiper :aImgData="aImgData" :iTime="3000" @ccClickSlide="goto"></cc-swiper>
        <!--提示层方法-->
        <div class="pl30 pt30 pb20">3、提示层方法</div>
        <div class="pb20">
            <button v-xclick @xclick="msg" class="ml30">提示层方法</button>
        </div>

        <!--图片延迟加载指令示例-->
        <div class="pl30 pt30 pb20">4、图片延迟加载</div>
        <div class="tc">
            <img v-for="(item,i) in 99" :key="i" style="width:200px;height: 200px;margin-left:5px; "
                 v-ximg="{sImgUrl:xxx,sDefault:xx}"/>
        </div>

        <!--form表单验证-->
        <div class="pl30 pt30">5、form表单验证</div>
        <cc-form class="pt30" ref="formdata">
            <cc-input class="mt30 ml30" style="width: 30%" ref="mobile" v-model="formdata.mobile" :rules="phone" type="text" placeholder="请输入手机号码"></cc-input>
            <cc-input class="mt30 ml30" style="width: 30%"  ref="code" v-model="formdata.code" :rules="verifyCode" type="text" placeholder="请输入验证码"></cc-input>
            <cc-input class="mt30 ml30" style="width: 30%"   ref="password" v-model="formdata.password" :rules="password" type="password" placeholder="请输入密码"></cc-input>
            <cc-input class="mt30 ml30" style="width: 30%"  ref="checkPassword" v-model="formdata.checkPassword" :rules="checkPassword" type="password" placeholder="请再次输入密码"></cc-input>
            <div class="ml30 mt30 mb30 pb30">
                <button type="button" v-xclick @xclick ="submitForm()">提交</button>
            </div>
        </cc-form>

        <!--form表单验证-->
        <div class="pl30 pt30 pb20">6、日期选择组件（年选择待优化）</div>
        <cc-date class="pb30 ml30" v-model="dates"></cc-date>

        <!-- 三级地区选择器 -->
        <div class="pl30 pt30 pb20">7、三级地区选择器</div>
        <div style="height:80px;">
            <cc-cityselect v-model="sanji" ref="xx" class="ml30"></cc-cityselect>
        </div>

        <!-- 音量条组件 -->
        <div class="pl30 pt30 pb20">8、音量条组件</div>
        <div class="cc-volume-wai pb30 pl30" style="width:200px;">
            <cc-volume :type="0" :label="100" ref="vnum" @volumeCallback="ddd"></cc-volume>
        </div>

        <!-- 上传组件 -->
        <div class="sidebar-upload ml30 mb30" style="width:100px;">
            <span> oss图片上传</span>
            <upload v-model="imgUrl">
                <div class="upload-box" style="width:100px;height:100px;background-color:#f99;">
                    <img :src="imgUrl" style="width:100%;height:100%;">
                </div>
            </upload>
        </div>

    </div>
</template>
<script>
require('static/scss/test.scss');
import upload from '../../component/upload/upload.vue'
export default {
    data(){
        //自定义验证规则，如果符合规则返回true,不符合规则返回false,value为当前input输入的值
        var checkPassword = (value)=>{
            let password = this.formdata.password.replace(/ /g,''); //过滤空格
            if(password == value){
                return true;
            }else{
                return false;
            }
        };
        return {
            dates:'',
            formdata:{
                mobile:'',
                code:'',
                password:'',
                checkPassword:'',
            },
            phone:{checkType:'mobile',nullMsg:"请输入手机号码", errorMsg:"手机号码格式不正确"},
            verifyCode:{checkType:'code',nullMsg:"请输入验证码", errorMsg:"验证码格式不正确"},
            password:{checkType:'password',nullMsg:"请输入密码", errorMsg:"请输入6-18位数字字母组合"},
            checkPassword:{checkType:checkPassword,nullMsg:"请输入密码2", errorMsg:"请再次输入一遍密码"},
            options:[
                {name:"双肩包1",type:1},
                {name:"双肩包2",type:2},
                {name:"双肩包3",type:3},
                {name:"双肩包1",type:4},
                {name:"双肩包2",type:5},
                {name:"双肩包3",type:6},
                {name:"双肩包3",type:3},
                {name:"双肩包1",type:4},
                {name:"双肩包2",type:5},
                {name:"双肩包3",type:6},
                {name:"双肩包3",type:3},
                {name:"双肩包1",type:4},
                {name:"双肩包2",type:5},
                {name:"双肩包3",type:6},
            ],
            aImgData:[
                {imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528795926192&di=eaeb246bc0281aa85ef15289bad57f89&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2F201708%2F10%2F081940slwloyous3aa0xwn.jpg'},
                {imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528795926191&di=b07d76b9d1cc6a2985d33c4a908f8c64&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2F201708%2F10%2F081924vaknb7bpohzbxnnh.jpg'},
                {imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528795987353&di=b17875dd2f5669c1f412eb165beaa253&imgtype=0&src=http%3A%2F%2Fimgfs.oppo.cn%2Fuploads%2Fthread%2Fattachment%2F2017%2F08%2F02%2F15016707229304.jpg'},
                {imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528796031660&di=98418b0758ee36b19beedf62d9ac241f&imgtype=0&src=http%3A%2F%2Fimgs.aixifan.com%2Flive%2F1483602027619%2F1483602027619.jpg'},
            ],
            xxx:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528795926191&di=b07d76b9d1cc6a2985d33c4a908f8c64&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2F201708%2F10%2F081924vaknb7bpohzbxnnh.jpg',
            xx: require('static/imgs/loadimg.png'),
            name:'',
            msgame:'',
            volumeNum:'',
            sanji:[],
            //上传
            ind:'',
            imgUrl:'',
        }
    },
    mounted(){//在子组件执行之后
        this.init();
    },
    created(){//优先于子组件的执行顺序
        this.initupload();
    },
    components:{upload},
    methods: {
        init(){
            this.sanji = ['110000','110100','110102'];
            this.$refs.xx.dateData = this.sanji;
            this.$refs.xx.init();
        },
        initupload(){
            let vm = this;
            console.log(vm.imgUrl)
        },
        submitForm(){
            let vm = this;
            if(vm.$refs['formdata'].checkForm(vm.formdata,vm.$refs)){
                console.log('递交表单');
                //此处验证结束调用后端接口
            }
        },
        goto(i) {
            console.log(i);
            alert('轮播图点击事件');
        },
        msg() {
            xlayer.msg("提示层方法");
            console.log(this.xGetState('aUserInfo'));
        },


    }
}
</script>
