const backendHost = (function backendHost() {
    if (/\.[-_a-zA-Z0-9]+\.[a-zA-Z][-_a-zA-Z0-9]+/.test(window.location.host)) {
        // 线上暂不支持跨域前端代码需要发布到后端同一个服务器上
        return window.location.protocol + '//' + window.location.host
    }
    // FIXME 本地调试由于两个独立站点不同于前端服务器地址暂时临时写死掉，后续需要做成自适应配置。
    return 'http://127.0.0.1:8888'
})();

module.exports = {
    HOST: backendHost,
    // HOST:'https://www-daily.youngget.com',
    // HOST: 'https://room.youngget.com',
}