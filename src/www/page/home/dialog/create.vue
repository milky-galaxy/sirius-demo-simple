<template>
    <div class="wy-create">
        <div class="wy-create-wrap">
            <!--创建对话框关闭按钮-->
            <a class="fr wy-create-close" v-xclick @xclick="close">×</a>
            <!--创建对话框内容-->
            <div class="wy-create-body">
                <div class="wy-create-list tr">
                    <label>名称</label>
                    <input  type="text"/>
                </div>
                <div class="wy-create-list wy-mtop tr">
                    <label>说明</label>
                    <textarea></textarea>
                </div>
            </div>
            <!--创建对话框底部-->
            <div class="wy-create-footer tr">
                <input v-xclick @xclick="create" type="button" value="创 建" class="wy-blue-btn" />
                <input v-xclick @xclick="cancel" type="button" value="取 消" class="wy-xml30 wy-white-btn" />
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./create.ts"></script>