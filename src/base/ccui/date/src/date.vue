<template>
    <div class="ccui-date">
        <i class="ccui-date-icon ccui-iconfont ccui-riqi"></i>
        <!--v-text="dateData=value" 父组件双向绑定的值初始化给子组件中的变量-->
        <input class="ccui-date-input" type="text" placeholder="选择日期" :value="dateData"
               v-text="dateData=value"
               @input="$emit('input', $event.target.value);"
               @focus="trueDateBox" readonly/>
        <div class="ccui-date-box" v-show="dateBoxFlag">
            <div class="ccui-day-select">
                <div class="ccui-date-w20 tl">
                    <button class="ccui-iconfont ccui-_double-left ccui-date-btn" v-xclick
                            @xclick="reduceYear"></button>
                    <button class="ccui-iconfont ccui-_left  ccui-date-btn" v-xclick @xclick="reduceMonth"></button>
                </div>
                <div class="ccui-date-w60 tc">
                    <span>{{year}}</span><span> 年</span>
                    <span>{{Appendzero(month)}}</span><span> 月</span>
                </div>
                <div class="ccui-date-w20 tr">
                    <button class="ccui-iconfont  ccui-_right ccui-date-btn ccui-date-monthfs"
                            @click="addMonth"></button>
                    <button class="ccui-iconfont ccui-_double-right  ccui-date-btn ccui-date-yearfs"
                            @click="addYear"></button>
                </div>
            </div>
            <div class="ccui-date-screen">
                <div class="ccui-date-week">
                    <span class="ccui-date-weekbtn" v-for="week in week">{{ week }}</span>
                </div>
                <div class="ccui-date-day" @click="selectDay">
                    <span class="ccui-date-daybtn ccui-date-pcolor" v-for="day in previousMonth"> {{ day }} </span>
                    <span class="ccui-date-daybtn" v-for="day in monthDay[month - 1]" :class="isActive(day)">{{ day }}</span>
                    <span class="ccui-date-daybtn ccui-date-ncolor" v-for="day in nextMonth">{{ day }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CcDate',
        componentName: 'CcDate',
        props: {
            value: {
                type: String,
                default:''
            },
        },
        data () {
            return {
                dateBoxFlag: false,
                year: 0,
                month: 0,
                day: 0,
                previousMonth: [],
                nextMonth: [],
                week: ['日', '一', '二', '三', '四', '五', '六'],
                monthDay: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                dateData:this.value,
            }
        },
        computed: {
            date () {
                if (this.year == 0 || this.month == 0 || this.day == 0) {
                    return '';
                }
                return this.year + '-' + this.month + '-' + this.day;
            },
        },
        watch: {
            year: function (val) {
                let reg = /^[1-9]\d*$/g;
                if (!reg.test(val)) {
                    let date = new Date();
                    this.year = date.getFullYear();
                }
                if (val < 0) {
                    this.year = 1;
                }
                if (val > 10000) {
                    this.year = 10000;
                }
                this.dayScreen();
            },
            month: function (val) {
                let reg = /^[1-9]\d*$/g;
                if (!reg.test(val)) {
                    let date = new Date();
                    this.month = date.getMonth() + 1;
                }
                if (val < 1) {
                    this.month = 1;
                }
                if (val > 12) {
                    this.month = 12;
                }
                this.dayScreen();
            }
        },
        created(){
            //监听该组件之外的点击事件（除组件之外的所有区域点击事件）
            document.addEventListener('click', (e) => {
                if (!this.$el.contains(e.target)){
                    this.dateBoxFlag = false;
                }
            });
        },
        methods: {
            //日期不足两位补0
            Appendzero(obj) {
                if(obj<10) return "0" +""+ obj;
                else return obj;
            },
            // 突出显示当前日期
            isActive(index) {
                if (index == this.day) {
                    return {
                        active: true,
                    }
                }
            },
            // 显示日期盒子并初始化
            trueDateBox() {
                let vm = this;
                //判断父组件双向绑定的值初始化显示日期盒子
                if(vm.value){
                    let date = new Date(vm.value);
                    vm.year = date.getFullYear();
                    vm.month = date.getMonth() + 1;
                    vm.day = date.getDate();
                }
                if (vm.date === '') {
                    let date = new Date();
                    vm.year = date.getFullYear();
                    if (vm.isLeapYear(vm.year)) {
                        vm.monthDay[1] = 29;
                    } else {
                        vm.monthDay[1] = 28;
                    }
                    vm.month = date.getMonth() + 1;
                    vm.day = date.getDate();
                }
                vm.dayScreen();
                vm.dateBoxFlag = true;
            },
            // 增减年份
            addYear() {
                let vm = this;
                vm.year++;
                if (vm.isLeapYear(vm.year)) {
                    vm.monthDay[1] = 29;
                } else {
                    vm.monthDay[1] = 28;
                }
            },
            reduceYear(){
                let vm = this;
                vm.year--;
                if (vm.isLeapYear(vm.year)) {
                    vm.monthDay[1] = 29;
                } else {
                    vm.monthDay[1] = 28;
                }
            },
            // 增减月份
            addMonth() {
                let vm = this;
                vm.month++;
                if (vm.month > 12) {
                    vm.month = 1;
                    vm.year++;
                }
            },
            reduceMonth() {
                let vm = this;
                vm.month--;
                if (vm.month < 1) {
                    vm.month = 12;
                    vm.year--;
                }
            },
            // 选择日期
            selectDay(e) {
                let vm = this;
                let targetClass = e.target.className;
                if (targetClass == 'ccui-date-daybtn ccui-date-pcolor') {
                    if (vm.month == 1) {
                        vm.month = 12;
                        vm.year--;
                    } else {
                        vm.month = vm.month - 1;
                    }
                    vm.day = parseInt(e.target.innerText);
                } else if (targetClass == 'ccui-date-daybtn ccui-date-ncolor') {
                    if (vm.month == 12) {
                        vm.month = 1;
                        vm.year++;
                    } else {
                        vm.month = vm.month + 1;
                    }
                    vm.day = parseInt(e.target.innerText);
                } else {
                    vm.day = parseInt(e.target.innerText);
                }
                vm.dateBoxFlag = false;
                vm.dateData = vm.year + '-' + vm.Appendzero(vm.month) + '-' + vm.Appendzero(vm.day);
                vm.$emit('input', vm.dateData);
            },
            // 日期显示
            dayScreen() {
                // 上一个月
                let vm = this;
                let firstDate = new Date(vm.year, vm.month - 1, 1);
                let firstWeek = firstDate.getDay();
                let preMonthDay = null;
                if (vm.month == 1) {
                    preMonthDay = vm.monthDay[11];
                } else {
                    preMonthDay = vm.monthDay[vm.month - 2];
                }
                for (let i = 0; i < preMonthDay; i++) {
                    vm.previousMonth[i] = i + 1;
                }
                if (firstWeek == 0) {
                    vm.previousMonth = vm.previousMonth.slice(-7);
                } else {
                    vm.previousMonth = vm.previousMonth.slice(-firstWeek);
                }
                // 下一个月
                let endDate = new Date(vm.year, vm.month - 1, vm.monthDay[vm.month - 1]);
                let endWeek = endDate.getDay();
                let nextMonthDay = null;
                if (vm.month == 12) {
                    nextMonthDay = vm.monthDay[0];
                } else {
                    nextMonthDay = vm.monthDay[vm.month];
                }
                for (let i = 0; i < nextMonthDay; i++) {
                    vm.nextMonth[i] = i + 1;
                }
                if (endWeek == 6) {
                    vm.nextMonth = vm.nextMonth.slice(0, 7);
                } else {
                    //判断是否需要在最后加一行下个月日期
                    if(vm.monthDay[vm.month - 1]+vm.previousMonth.length+(6 - endWeek) === 35){
                        vm.nextMonth = vm.nextMonth.slice(0, (6 - endWeek)+7);
                    }else{
                        vm.nextMonth = vm.nextMonth.slice(0, 6 - endWeek);
                    }

                }
            },
            // 判断是否是闰年
            isLeapYear(year) {
                return (year % 100 == 0 ? (year % 400 == 0 ? true : false) : (year % 4 == 0 ? true : false));
            },
        }

    }
</script>