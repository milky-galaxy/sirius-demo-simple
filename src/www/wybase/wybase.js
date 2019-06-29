import axios from 'axios';
import URL from 'config/url.config.js';


window._LS_ = window.localStorage;
window._SS_ = window.sessionStorage;

// 前端封装bxjs后端调用方法示例（封装到前端单页应用的模板中成为全局函数，隔离掉各种axjs底层库的实现差异性）
window.xpost = async function (path, param) {
    return new Promise((resolve, reject) => {
        axios({
            method:'post',
            baseURL: URL.HOST,
            url:path,
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
            data:param,
            // TODO 后续根据需要扩展头部信息参数（这部分应该封装到前后端框架中自动对接而对应用开发者透明无感）
        }).then(function (resp) {
            // if (!resp.data.success) {
            //     //未登陆授权弹出登陆对话框
            //     if(resp.data.errorCode === 'ERR$UNAUTHORIZED'){
            //         __VueRoot__.$children[0].loginState();
            //     }
            //     console.log(resp.data)
            //     // TODO 错误处理先暂时这样，后续需要与错误编码和错误消息做前后端统一定义全局使用。
            //     resolve(resp.data);
            //     return
            // }
            resolve(resp.data);
        }).catch((err) => {
            // TODO 此处错误处理应该按照错误规范进行编码转换
            reject(err)
        })
    })
}

//提示层方法
window.xlayer = {
    elem:document.querySelector("#xtoast"),
    timer:"",
    msg:function(info,time){
        this.show();
        this.elem.innerHTML=info;
        this.elem.style.marginLeft=-1*(this.elem.clientWidth/2)+"px";
        this.timer=setTimeout(this.hide.bind(this), time||1000);
    },
    show:function(){
        if(this.elem==null){
            var node=document.createElement("div");
            node.setAttribute("id", "xtoast");
            node.className="xtoast";
            document.body.appendChild(node);
            this.elem=document.querySelector("#xtoast");
        }
        if(this.timer){
            window.clearTimeout(this.timer);
        }
        $.fn.addClass.call($(this.elem),"xactive");
    },
    hide:function(){
        $.fn.removeClass.call($(this.elem),"xactive");
    }
}
//检查对象是否存在方法
window.xCheckObj = function (param) {
    if(typeof(param)=='undefined'||JSON.stringify(param) == "{}" ){
        return false;
    }
    return true;
}
//手机号码脱敏方法
window.xDataDesensitization = function(num) {
    var len = num.length
    if(len && len > 4) {
        return num.substring(0, 3) + '****' + num.substring(len - 4, len)
    }
}

window.backendHost = (function backendHost() {
    if (/\.[-_a-zA-Z0-9]+\.[a-zA-Z][-_a-zA-Z0-9]+/.test(window.location.host)) {
        // 线上暂不支持跨域前端代码需要发布到后端同一个服务器上
        return window.location.protocol + '//' + window.location.host
    }
    // FIXME 本地调试由于两个独立站点不同于前端服务器地址暂时临时写死掉，后续需要做成自适应配置。
    return 'http://127.0.0.1:8099'
})();

//获取指定数组的属性值是否存在，存在返回数组坐标，不存在return false
//arr:数组 attr:属性 value:属性值
window.xIsArrAttr = function(arr,attr,value){
    var out = arr.findIndex((item)=>{
        if(item[attr] == value){
            return true;
        }
    });
    if(out == -1){
        return false;
    }
    return out;
}

