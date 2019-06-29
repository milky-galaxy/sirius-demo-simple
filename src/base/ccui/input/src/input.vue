<!--input组件-->
<template>
    <div :class="{'ccui-input': !bShow, 'ccui-focus-error ccui-input': bShow}">
        <div class="ccui-input-error">{{sMsg}}</div>
        <slot></slot>
        <input  v-if="type !== 'textarea'" :type="type"
               :placeholder="placeholder"
               :value="value"
               :autocomplete = "autocomplete"
               @input="$emit('input', $event.target.value);"
               @focus="checkFocus"
               @blur="checkRules(errorParam)"
        >
        <textarea v-else></textarea>
    </div>
</template>

<script>
    export default {
        name: 'CcInput',
        componentName: 'CcInput',
        data() {
            return {
                sMsg:'',
                bShow:false,
                errorParam:''
            }
        },
        props: {
            type: {
                type: String,
                default:'text'
            },
            //预期值的提示信息
            placeholder:{
                type: String,
                default:'请输入'
            },
            value:{
                type: String,
                default:''
            },
            rules:{
                type: Object,
            },
            autocomplete:{
                type: String,
                default:'off'
            }
        },

        methods: {
            checkFocus(){
                let vm = this;
                vm.sMsg = '';
                vm.bShow = false;
            },
            checkRules(errorParam){
                let vm = this;
                let reg = {
                    mobile: /^[1][3,4,5,7,8,9][0-9]{9}$/,
                    code: /^\d{6}$/, //6位数字
                    password:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/,//6-18位数字字母组合
                };
                //过滤空格
                let value = vm.value.replace(/ /g,'');
                if (value === "") {
                    vm.sMsg = vm.rules.nullMsg;
                    vm.bShow = true;
                    return false;
                }
                //自定义传入错误提示语
                if(errorParam){
                    vm.sMsg = errorParam;
                    vm.bShow = true;
                    return false;
                }
                //判断是否是自定义规则函数
                if(typeof(vm.rules.checkType) !== "function") {
                    if (vm.rules.checkType == 'mobile') {
                        if (!(reg.mobile.test(value))) {
                            vm.sMsg = vm.rules.errorMsg;
                            vm.bShow = true;
                            return false;
                        }
                    }
                    if (vm.rules.checkType == 'code') {
                        if (!(reg.code.test(value))) {
                            vm.sMsg = vm.rules.errorMsg;
                            vm.bShow = true;
                            return false;
                        }
                    }
                    if (vm.rules.checkType == 'password') {
                        if (!(reg.password.test(value))) {
                            vm.sMsg = vm.rules.errorMsg;
                            vm.bShow = true;
                            return false;
                        }
                    }
                }else{
                    if(!vm.rules.checkType(value)){
                        vm.sMsg = vm.rules.errorMsg;
                        vm.bShow = true;
                        return false;
                    }
                }
                return true;

            },
        }
    };
</script>