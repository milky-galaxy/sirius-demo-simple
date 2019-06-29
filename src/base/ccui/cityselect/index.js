import Cityselect from './src/CitySelect.vue';

Cityselect.install = function(Vue) {
    Vue.component(Cityselect.name, Cityselect);
};

export default Cityselect;