const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
    configureWebpack: config =>{
        var configObj = {
            externals: {
                'vue': 'Vue',
                'vue-router': 'VueRouter',
                'axios': 'axios',
                'element-ui': 'ELEMENT'
            }
        };
        if (process.env.NODE_ENV === 'production'){
            configObj = Object.assign(configObj, {
                plugins: [
                    new CompressionWebpackPlugin({
                        filename: '[path].gz[query]',
                        algorithm: 'gzip',
                        test: productionGzipExtensions,
                        threshold: 2048,
                        minRatio: 0.8,
                        deleteOriginalAssets: false
                    })
                ]
            })
        }
        return configObj;
    },
    
    devServer: {
        proxy: {
            '/api': {
                target: process.env.VUE_APP_API_URL,
                changeOrigin: true,
                secure: true,
                ws: true,
                pathRewrite: {
                  '^/api': ''
                }
            }
        }
    }
}
