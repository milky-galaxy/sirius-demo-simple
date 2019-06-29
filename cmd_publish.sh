#!/bin/bash

# BXJS前端自动化发布脚本

case $1 in
l|local)
    echo "publish local env ..."
    __ENV__=local
    ;;
d|daily)
    echo "publish daily env ..."
    __ENV__=daily
    __OSS_BUCKET__=www-static-daily
    ;;
p|pre)
    echo "publish pre-release env ..."
    __ENV__=pre
    __OSS_BUCKET__=yg-static
    ;;
g|gray)
    echo "publish online gray env ..."
    __ENV__=gray
    ;;
prod)
    echo "publish online product env ..."
    __ENV__=prod
    __OSS_BUCKET__=www-static-prod
    ;;
*)
    echo "Usage: ./cmd_publish.sh [l|local|d|daily|p|pre|g|gray|prod]"
    exit -1
    ;;
esac

# 更新当前分支最新代码
git pull -p

# 编译当前分支生产代码
rm -rf ./dist
# 取当前GIT仓库信息以及包的版本号信息(OSS目录结构为: GIT分组名/GIT仓库名/环境名/时间戳/...发布的内容...)
GITREPO=`git remote get-url origin | cut -d ":" -f 2 | cut -d "." -f 1`
GITREPO1=`echo $GITREPO | cut -d "/" -f 1`
GITREPO2=`echo $GITREPO | cut -d "/" -f 2`
VERSION=`date +%Y%m%d%H%M%S`
if [ "$__ENV__" != "local" ]; then
    __STATIC__=https://$__OSS_BUCKET__.youngget.com/$GITREPO/$__ENV__/$VERSION/
    # 编译正式的发布前端资源包
    ./node_modules/.bin/cross-env NODE_ENV=production __STATIC__=$__STATIC__ ./node_modules/.bin/webpack  --progress
else
    # 编译本地环境的前端资源包
    __STATIC__=http://localhost:8099/
    ./node_modules/.bin/cross-env __STATIC__=$__STATIC__ ./node_modules/.bin/webpack  --progress # --display-chunks --display-modules
fi

# 下载MAC版本的OSS命令行工具
# 将dist目录上传到OSS代码仓库中
# 基于OSSUTIL实现OSS的文件操作命令行工具 https://help.aliyun.com/document_detail/50452.html
if [ ! -e ./ossutilmac64 ]; then
    wget http://docs-aliyun.cn-hangzhou.oss.aliyun-inc.com/assets/attach/50452/cn_zh/1524644116085/ossutilmac64
fi
chmod +x ./ossutilmac64

# 需要提前手动生成好配置文件并制作为模板自动化生成相关的配置信息
#./ossutilmac64 config -L ch
#/Users/chujinghui/.ossutilconfig

#自动生成ossutil依赖的配置文件信息
echo "[Credentials]" > $HOME/.ossutilconfig
echo "language=CH" >> $HOME/.ossutilconfig
echo "endpoint=oss-cn-shanghai.aliyuncs.com" >> $HOME/.ossutilconfig
echo "accessKeyID=LTAIZFcDHjhs0IPR" >> $HOME/.ossutilconfig
echo "accessKeySecret=URO31d5wszmC8UusQZVe0twsRSmRxq" >> $HOME/.ossutilconfig
#echo "stsToken=1" >> $HOME/.ossutilconfig
#stsTokens授权服务端配置流程教程 https://help.aliyun.com/document_detail/32046.html
#暂时没必要使用STS服务，可以后续通过持续集成解决密钥暴露不安全隐患问题。

#./ossutilmac64 rm oss://$__OSS_BUCKET__/dist -r -f
#./ossutilmac64 rm oss://$__OSS_BUCKET__/hangzhou_oxygen_song -r -f
#./ossutilmac64 help cp 拷贝命令详细说明查看命令
if [ "$__ENV__" != "local" ]; then
    # 本地开发模式仅仅给开发个人本机联调使用，以及线上MOCK接口和前端展示效果的沟通测试用途。
    # 在代码中进行动态区分域名配置。
    # 后端本地应用：绑定本地调试域名www-local.youngget.com为127.0.0.1即可，这样线上和线下本地环境就可以统一掉。
    # 前端本地应用：绑定本地调试域名static-local.youngget.com进行区分即可？？
    # 太复杂了。支持一种mock模式？也太复杂了。最简单方案：127.0.0.1模式。
    ./ossutilmac64 cp ./dist oss://$__OSS_BUCKET__/$GITREPO/$__ENV__/$VERSION -r -f
fi

# 将最新的前端版本信息写入到ACM配置服务器上完成自动化的配置更新（ACM生产环境不支持公网访问问题，生产环境需要手动配置）
# 生产环境的脚本必须要到持续集成环境上完成自动化的部署配置对于应用开发者无感才是最佳方法。
# HTML模板需要支持手动的同步配置进行自动的特征识别发布处理
# 读取最新的模板内容将其写入到ACM上对应于单页应用的入口模板文件信息保持最新的版本信息以及前端的内容一一映射过去
# https://$__OSS_BUCKET__.youngget.com/$GITREPO/$__ENV__/$VERSION/xxx.css|xxx.js 自动替换掉html模板内容的CSS和JS内容
# 实现原理：自动检测当前工程目录下的html文件导出数量，每个html对应于ACM的一个配置项，配合内容为html文件的内容。
npm install acm-client co glob --save-dev
node ./cmd.acm.js "./dist/*.html" "$GITREPO1:$GITREPO2:$__ENV__"
