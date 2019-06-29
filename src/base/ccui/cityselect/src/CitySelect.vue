<template>
    <div class="ccui-city-select">
        <input type="hidden" :value="dateData" v-text="dateData=value">
        <cc-select class="fl" ref="province">
            <cc-option @ccClickSelect="pchoose" v-for="(item,index) in diqu" :key="index" :label="item.value" :value="item.text" :children="item.children"></cc-option>
        </cc-select>
        <cc-select class="fl ml10" ref="city">
            <cc-option @ccClickSelect="cchoose" v-for="(item,index) in shi" :key="index" :label="item.value" :value="item.text" :children="item.children"></cc-option>
        </cc-select>
        <cc-select class="fl ml10" ref="district">
            <cc-option @ccClickSelect="dchoose" v-for="(item,index) in qu" :key="index" :label="item.value" :value="item.text"></cc-option>
        </cc-select>
    </div>
</template>
<script>
    /**
     *  省 市 区/县城  三联动选择器
     */
    import City from './city.js'  
    export default {
        name: 'CcCityselect',
        componentName: 'CcCityselect',
        props: {
            value:{
                type:Array,
                default:[]
            },
        },
        data(){
            return{
                //
                dateData:[],
                province:{//选择的省
                    value:'请选择',//名称
                    label:''//编号
                },
                ccity:{//选择的市
                    value:'请选择',//名称
                    label:''//编号
                },
                district:{//选择的区/县
                    value:'请选择',//名称
                    label:''//编号
                },
                diqu:City.diqu,
                shengshiqu_1:City.shengshiqu_1,//省的编码+省下级
                shengshiqu_3:City.shengshiqu_3,//编码+名称
                shi:[],
                qu:[]
            }
        },
        mounted(){
            this.init(); 
        },
        methods: {
            //初始化
            init(){
                let vm = this;
                if(!vm.dateData){
                    return;
                }
                if(vm.dateData[1]==''){
                    vm.noneShi();
                    return;
                }else if(vm.dateData[2]==''){
                    vm.noneQu();
                    return;
                }else{
                    vm.allCity();
                }
            },
            //初始化没有市，区/县 len==1
            noneShi(){
                let vm = this;
                vm.province = {
                    value:vm.shengshiqu_3[vm.dateData[0]],
                    label:vm.dateData[0]
                }
                vm.lookProvince();
            },
            //初始化没有区/县  len==2
            noneQu(){
                let vm = this;
                vm.noneShi();
                //初始市的选择列  shi
                vm.shi = vm.shengshiqu_1[vm.province.label];
                console.log(vm.shi);
                //显示
                vm.ccity = {
                    value:vm.shengshiqu_3[vm.dateData[1]],
                    label:vm.dateData[1]
                }
                vm.lookCity();
            },
            //初始化三者都有 len==3
            allCity(){
                let vm = this;
                vm.noneQu();
                //初始区县的选择列 qu
                let num = vm.ccity.label;//选择市的编码
                vm.searchQu(num);
                //显示
                vm.district = {
                    value:vm.shengshiqu_3[vm.dateData[2]],
                    label:vm.dateData[2]
                }
                vm.lookDistrict();
            },
            //查找选择的区县
            searchQu(num){
                let vm = this;
                if(!vm.shi){
                    return;
                }
                vm.shi.forEach((item,index) => {
                    if(item.value == num){
                        vm.qu = item.children;
                        return;
                    }
                });
            },
            //省的选择
            pchoose(ob){
                let vm = this;
                vm.province.value = ob.value;
                vm.province.label = ob.label;
                //判断市是不是存在
                if(!ob.children){
                    vm.clearShi();
                    return;
                }
                vm.shi = ob.children; 
                //再次修改省时，市与区默认显示第一个
                vm.ccity = {
                    value:vm.shi[0].text,
                    label:vm.shi[0].value
                };
                vm.lookCity();
                //判断区/县是不是存在
                if(!vm.shi[0].children){
                    vm.clearQu();
                    return;
                }
                vm.qu = vm.shi[0].children;
                vm.district = {
                    value:vm.shi[0].children[0].text,
                    label:vm.shi[0].children[0].value
                };
                vm.lookDistrict();
                vm.$emit('input', vm.sanji);
            },
            //市的选择
            cchoose(ob){
                let vm = this;
                vm.ccity.value = ob.value;
                vm.ccity.label = ob.label;
                //判断区/县是不是存在
                if(!ob.children){
                    vm.clearQu();
                    return;
                }
                vm.qu = ob.children; 
                //再次修改市的时候，区/县的显示
                vm.district = {
                    value:vm.qu[0].text,
                    label:vm.qu[0].value
                };
                vm.lookDistrict();
                vm.$emit('input', vm.sanji);
            },
            //区县的选择
            dchoose(ob){
                let vm = this;
                vm.district.value = ob.value;
                vm.district.label = ob.label;
                vm.$emit('input', vm.sanji);
            },
            //显示省
            lookProvince(){
                this.$refs.province.sOption = this.province;
            },
            //显示市
            lookCity(){
                this.$refs.city.sOption = this.ccity;
            },
            //显示区/县
            lookDistrict(){
                this.$refs.district.sOption = this.district;
            },
            //清空市及县
            clearShi(){
                let vm = this;
                vm.shi = [];
                vm.qu = [];
                vm.ccity = {};
                vm.district = {};
                vm.lookCity();
                vm.lookDistrict();
                vm.$emit('input', vm.sanji);
            },
            //清空区/县
            clearQu(){
                let vm = this;
                vm.qu = [];
                vm.district = {};
                vm.lookDistrict();
                vm.$emit('input', vm.sanji);
            }
        },
        computed:{
            sanji(){
                return [this.province.label,this.ccity.label,this.district.label];
            }
        }
   }
</script>