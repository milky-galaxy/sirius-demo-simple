<template>
    <div class="wy-step">
        <div class="wy-create-wrap">
            <!--创建对话框标题-->
            <div class="wy-create-step">
                <ul>
                    <li v-for="(row,index) in stepData" :key="index" :class="{'fl on':row.selected,'fl':!row.selected}">
                        <span class="num"><em></em><i>{{index+1}}</i></span>
                        <span v-if="row.start"  class="line_bg lbg-r"></span>
                        <span v-if="row.end" class="line_bg lbg-l"></span>
                        <span v-if="!row.start && !row.end">
                            <span class="line_bg lbg-l"></span>
                            <span class="line_bg lbg-r"></span>
                        </span>
                        <p class="lbg-txt">{{row.name}}</p>
                    </li>
                </ul>
                <a class="fr wy-create-close" v-xclick @xclick="close">×</a>
            </div>
            <!--创建对话框内容-->
            <div class="wy-create-body" v-show="stepConeten[0]">
                <div class="wy-create-list">
                    <label>应用名称 :</label>
                    <input  type="text"/>
                </div>
                <div class="wy-create-list wy-mtop">
                    <label>阿里云密钥 :</label>
                    <input  type="text"/>
                </div>
            </div>
            <div class="wy-create-body" v-show="stepConeten[1]">
                2、选择环境类型
            </div>
            <div class="wy-create-body" v-show="stepConeten[2]">
                3、设置开发模式
            </div>
            <div class="wy-create-body" v-show="stepConeten[3]">
                4、配置HTTPS服务
            </div>
            <div class="wy-create-body" v-show="stepConeten[4]">
                5、配置域名
            </div>
            <!--创建对话框底部-->
            <div class="wy-create-footer tc">
                <input v-if="stepNum > 1" v-xclick @xclick="prev" type="button" value="上 一 步" class="logo-btn wy-blue-btn" />
                <input v-xclick @xclick="next" type="button" value="下 一 步" class="wy-xml30 logo-btn wy-blue-btn" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./step.ts"></script>