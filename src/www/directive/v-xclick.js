import Vue from 'vue'
var bDisabled = false;
Vue.directive('xclick', {
    bind: function (el, binding ,vnode) {
        el.addEventListener("click", function(e){
            //检测离线状态
            if(!window.navigator.onLine){
                window.location.reload();
                return false;
            }
            // //禁止点击透传冒泡问题
            // if (e && e.stopPropagation) {//非IE浏览器
            //     e.stopPropagation();
            // } else {//IE浏览器
            //     window.event.cancelBubble = true;
            // }
            if(!bDisabled){
                bDisabled = true;
                let evt = document.createEvent("HTMLEvents");
                evt.initEvent('xclick', false, true);
                el.dispatchEvent(evt);
                setTimeout(()=>{bDisabled = false;},300);
            }else{
                return false;
            }
        });

    }
});