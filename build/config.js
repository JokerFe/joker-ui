const mockPort = 3000
const path = require('path')
module.exports = {
    // 打包文件夹名称
    base: '',
    title: 'Joker',
    // mock 配置
    mock: {
        port: mockPort,
        // 允许处理的请求类型，大写
        methods: ['GET', 'POST'],
        // 在 mock 文件未标明请求类型时，默认使用的类型
        defaultMethod: 'POST'
    },
    // 开发配置
    dev: {
        port: 8099,
        html: {
            headJs: [
                `<script>
                    console.log('%cJoker-UI%cJokul',
                        "border-bottom-left-radius: 4px;border-top-left-radius: 4px;font-size: 12px;background-color: black;color: yellowgreen;padding: 5px 10px;",
                        "border-bottom-right-radius: 4px;border-top-right-radius: 4px;font-size: 12px;background-color: yellowgreen;color: black;padding: 5px 10px;")
                </script>`
            ].join('')
        }
    },
    // 生产配置
    prod: {
        html: {
            headJs: [
                `<script>
                    console.log('%cJoker-UI%cJokul Pro',
                    "border-bottom-left-radius: 4px;border-top-left-radius: 4px;font-size: 12px;background-color: black;color: yellowgreen;padding: 5px 10px;",
                    "border-bottom-right-radius: 4px;border-top-right-radius: 4px;font-size: 12px;background-color: yellowgreen;color: black;padding: 5px 10px;")
                </script>`
            ].join('')
        }
    }
}