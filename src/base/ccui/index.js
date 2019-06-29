import Select from './select/index.js';
import Option from './option/index.js';
import Swiper from './swiper/index.js';
import Input from './input/index.js';
import Form from './form/index.js';
import Date from './date/index.js';
import Cityselect from './cityselect/index.js';
import Volume from './volume/index.js';
import Dialog from './dialog/index.js';
const components = [
    Select,
    Option,
    Swiper,
    Input,
    Form,
    Date,
    Cityselect,
    Volume,
    Dialog
];

const install = function(Vue) {
    components.map(component => {
        Vue.component(component.name, component);
    });
};

export default install