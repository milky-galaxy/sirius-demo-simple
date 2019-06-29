import Date from './src/date.vue';

Date.install = function(Vue) {
    Vue.component(Date.name, Date);
};

export default Date;