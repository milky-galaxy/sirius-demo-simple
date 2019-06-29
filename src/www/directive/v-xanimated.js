import Vue from 'vue'
Vue.directive('xanimated', {
    update: function (el, binding) {
        if(!binding.value.bState){
            el.className+=" "+binding.value.sClass;
        }
    }
});