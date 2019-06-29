<template>
    <div class="wy-sidebar">
        <!--<div class="wy-sidebar-header fb">-->
            <!--&lt;!&ndash;<a v-xclick @xclick="gotoIndex()" class="wy-xml50">YWGJ</a>&ndash;&gt;-->
            <!--&lt;!&ndash;<i class="wy-iconfont wy-iconfont-zhankai"></i>&ndash;&gt;-->
        <!--</div>-->
        <ul>
            <div class="wy-xpb10" v-for="(item ,index) in menuData">
                <p class="wy-xpt10 wy-title wy-list">{{item.menuTitle}}</p>
                <li  v-for="(items ,index) in item.menuItem" v-xclick @xclick="goto(items.menuUrl)" class="wy-list">
                    <i class="wy-iconfont" :class="items.menuIcon" ></i>
                    {{items.menuName}}
                </li>
            </div>
        </ul>
    </div>
</template>
<script lang="ts" src="./sidebar.ts"></script>