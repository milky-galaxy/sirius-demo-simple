<!--Select选择器组件-->
<template>
    <div class="ccui-select" tabindex="1" v-xclick @xclick="toggleMenu" @blur="isibles">
        <p>{{sOption.value}}</p>
        <i v-xanimated="{sClass:'ccui-rotatein',bState:bShow}" class=" fr mr5 ccui-iconfont "
           :class="{'ccui-xiala ': !bShow, 'ccui-rotateinI ccui-shangla': bShow}"></i>
        <ul class="ccui-select-list" v-show="bShow">
            <slot></slot>
        </ul>
        <input type="hidden" value="" v-model="sOption">
    </div>
</template>
<script>
    require('../../css/ccui-animated.css');
    export default {
        name: 'CcSelect',
        componentName: 'CcSelect',
        data() {
            return {
                bShow: false,
                // sOption: '请选择',
                sOption: {
                    label:'',
                    value:'请选择',
                    children:{},
                },
            }
        },
        created() {
            this.$on('handleOptionClick', this.handleOptionSelect);
        },
        methods: {
            toggleMenu() {
                let self = this;
                self.bShow = !self.bShow;
            },
            handleOptionSelect(data) {
                this.bShow = false;
                this.sOption = data;
            },
            isibles() {
                this.bShow = false;
            },
        }
    }
</script>