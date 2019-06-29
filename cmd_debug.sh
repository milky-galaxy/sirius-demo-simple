#!/bin/bash

# BXJS前端本地开发调试模式
# 应用于前端本地开发调试，直接链接local后端环境，$1参数表示是否运行MOCK模式还是真实接口。

__MOCK__=no
if [ "$1" != "" ]; then
    case $1 in
    mock)
        echo "publish local env ..."
        __MOCK__=yes
        ;;
    help|*)
        echo "Usage: ./cmd_debug.sh [mock]"
        exit -1
        ;;
    esac
fi

__STATIC__=http://localhost:8099/
./node_modules/.bin/cross-env __STATIC__=$__STATIC__ ./node_modules/.bin/webpack-dev-server --hot --progress
