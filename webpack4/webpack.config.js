const path=require("path");  //node下管理地址的包
const webpack=require("webpack");
const HtmlWebpackPlugin=require('html-webpack-plugin');
const ExtractTextPlugin=require("extract-text-webpack-plugin")
const glob=require('glob');
const PurifycssWebpack=require("purifycss-webpack");
const entry=require("./src/webpack_config/webpack_entry");
var CopyWebpackPlugin=require('copy-webpack-plugin');

module.exports={
    mode:"development",//开发模式，生产模式会压缩代码到同一行
    entry,
    output:{
        path:path.resolve(__dirname,'dist'),//resolve()可以对传过来的地址进行拼接；__dirname是node下的一个关键字，指当前的路径
        filename:'[name].js',//name和entry入口文件的'index'一致。
        publicPath:"http://127.0.0.1:8081/"
    },
    module:{
        rules:[//对应的是一个数组，每一个元素是一个对象
            {
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[{
                        loader:'css-loader',
                        options:{importLoaders:1}
                        },'postcss-loader']
                })
            },
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            },
            {
                test:/\.(jpg|png|gif)$/,
                use:[{
                    loader:"url-loader",
                    options:{
                        limit:500,
                        outputPath:'images/',
                        esModule:false
                    }
                }]
            },
            {
                test:/\.scss/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','sass-loader']
                })
            },
            {
                test:/\.(jsx|js)$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                },
                exclude:/node_modules/
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template:"./src/index.html",//指定html文件位置
            hash:true,//是否开启哈希
            minify:{
                removeAttributeQuotes:true//是否移除引号
            }
        }),
        new ExtractTextPlugin("css/main.css"),//打包到哪个文件
        new PurifycssWebpack({
            paths:glob.sync(path.join(__dirname,'./src/*.html')),
        }),
        new webpack.BannerPlugin('fellow37'),
        new webpack.ProvidePlugin({$:"jquery"}),
        new CopyWebpackPlugin([{
            from:__dirname+'/src/public',to:'./public'
        }])
    ],
    devServer:{//需要安装webpack-dev-server,属于启动服务的配置（与live-server一样）
        contentBase:path.resolve(__dirname,'dist'),//在哪个目录下启动服务
        host:"127.0.0.1",//地址--走网络服务
        compress:true,//服务端压缩是否开启
        port:'8081',//端口号
        hot:true
    }
}