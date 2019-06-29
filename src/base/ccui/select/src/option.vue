<!--Select选项组件-->
<template>
    <li v-xclick @xclick="selectOptionClick">{{value}}</li>
</template>
<script>
    import Emitter from '../../mixins/emitter.js';

    export default {
        mixins: [Emitter],
        name: 'CcOption',
        componentName: 'CcOption',
        props: {
            value: {},
            label: [String, Number],
            children:{}
        },
        data() {
            return {}
        },
        created() {
        },
        methods: {
            selectOptionClick() {
                let vm = this;
                var data = {value: vm.value, label: vm.label ,children:vm.children}
                vm.dispatch('CcSelect', 'handleOptionClick', data);
                this.$emit('ccClickSelect',data);
            },
        }
    }
</script>