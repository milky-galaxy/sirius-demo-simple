// ACM参考资料
// https://www.npmjs.com/package/acm-client
// https://help.aliyun.com/product/59604.html
const co = require('co');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const ACMClient = require('acm-client');
const acm = new ACMClient({
    endpoint: 'acm.aliyun.com', // ACM 控制台查看
    namespace: 'd29dc49c-9f01-479d-809d-de7f2179d1a4', // ACM 控制台查看
    accessKey: 'LTAIZFcDHjhs0IPR', // ACM 控制台查看
    secretKey: 'URO31d5wszmC8UusQZVe0twsRSmRxq', // ACM 控制台查看
    requestTimeout: 6000, // 请求超时时间，默认 6s
});

// 发布配置（完成单页应用的模板参数动态配置）
// console.log(process.argv)
glob(process.argv[2], {}, function (er, files) {
    // files is an array of filenames.
    // If the `nonull` option is set, and nothing
    // was found, then files is ["**/*.js"]
    // er is an error object or null.
    if (er) {
        console.log(er)
        console.log('save acm config error!')
        process.exit(-1)
    }
    co(function* () {
        try {
            // console.log(files)
            for (let f of files) {
                // console.log(path.basename(f, '.html'))
                // console.log(fs.readFileSync(f, 'utf-8'))
                // continue
                // 自动生成服务器开发环境配置
                const status = yield acm.publishSingle(path.basename(f, '.html'), process.argv[3],
                    fs.readFileSync(f, 'utf-8'), undefined)
                if (!status) {
                    console.log('save acm config error!!')
                    process.exit(-1)
                }
            }
        } catch (err) {
            console.log(err)
            console.log('save acm config error!!!')
            process.exit(-1)
        }
        process.exit(0)
    })
})