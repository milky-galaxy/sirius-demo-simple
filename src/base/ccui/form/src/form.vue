<!--form组件-->
<template>
    <div class="ccui-form">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'CcForm',
        componentName: 'CcForm',
        data() {
            return {

            }
        },
        methods: {
            checkForm(obj,component){
                let tag = true;
                let arr = [];
                for (let item in obj){
                    item = 'component'+'.'+item;
                    //函数可计算某个字符串,并执行其中的的 JavaScript 代码
                    arr.push(eval(item).checkRules());
                }
                if(arr.indexOf(false)!==-1){
                    tag = false;
                }
                return tag;
            },
        }
    }
</script>