<!--dialog组件-->
<template>
    <div class="ccui-dialog">
        <div class="ccui-dialog-wrap">
            <div class="ccui-dialog-title">
                {{msg.title}}
            </div>
            <div class="ccui-dialog-content">
                <div class="ccui-dialog-explain">
                    {{msg.content}}
                </div>
                <div class="ccui-dialog-btn">
                    <button v-xclick @xclick="confirmFn" v-if="!msg.btn||msg.btn==1" class="ccui-blue-btn">{{msg.confirm?msg.confirm:'确定'}}</button>
                    <button v-xclick @xclick="cencelFn" v-if="!msg.btn||msg.btn==2" class="ccui-grey-btn">{{msg.cencel?msg.cencel:'取消'}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    require('../../css/ccui.scss');
    export default {
        name: 'CcDialog',
        componentName: 'CcDialog',
        props:{
            msg:{
                title:String,
                content:String,
                confirm:String,//确定 文字
                cencel:String,//取消 文字
                btn:Number //1:确定  2:取消
            },
        },
        data() {
            return {

            }
        },
        methods: {
            confirmFn(){
                this.$emit('confirm');
            },
            cencelFn(){
                this.$emit('cencel');
            }

        }
    }
</script>