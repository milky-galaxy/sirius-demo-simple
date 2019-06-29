import Vue from 'vue'

var oInit = {
    default: '',
    time:0
}

const addListener = (el,binding) =>{
    //绑定的图片地址
    var sImageSrc = binding.value.sImgUrl;
    var iTimes = binding.value.iTime;
    var sImgDefault = binding.value.sDefault;
    if(sImgDefault){
        oInit.default = sImgDefault;
    }
    if(iTimes){
        oInit.time = iTimes;
    }

    el.src = oInit.default;

    setTimeout(function () {
        var image = new Image();
        image.onload = function(){
            el.src = sImageSrc;
        }
        image.src = sImageSrc;
    },oInit.time);

}

Vue.directive('ximg', {
    inserted:addListener,
    updated:addListener
});