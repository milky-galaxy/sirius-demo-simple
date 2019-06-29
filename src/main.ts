import Vue from 'vue';
import Pc from './main.vue';
import router from './router/index.js';
import store from './www/wybase/wystore.js';
import Ccui from './base/ccui/index.js';
import './base/ccui/css/ccui.scss';
import './base/ccui/css/iconfont/iconfont.css';
Vue.use(Ccui);
import './www/wybase/wybase.js';
//加载自定义权限指令
import './www/directive/v-xclick.js';
//加载动画指令
import './www/directive/v-xanimated.js'
import './www/directive/v-ximg.js'
//加载公共CSS样式及字体图标
import './base/base.css';
import './www/wybase/wybase.scss';
import './www/wybase/iconfont/iconfont.css';

import ModelData from './www/model/ModelData'

Vue.prototype.ModelData = new ModelData();

window['__VueRoot__'] = new Vue({
        el: '#wy-main',
        router,
        store,
        template: '<Pc/>',
        components: {Pc}
});
