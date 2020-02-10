const path=require("path");
const webpack=require("webpack");
const HtmlWebpackPlugin=require('html-webpack-plugin');
const ExtractTextPlugin=require("extract-text-webpack-plugin")
module.exports={
    mode:"development",
    entry:{
        'index':'./src/index.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js',
        publicPath:"http://127.0.0.1:8081/"
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:'css-loader'
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
                        outputPath:'images/'
                    }
                }]
            },
            {
                test:/\.scss/,
                use:['style-loader','css-loader','sass-loader']
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template:"./src/index.html",
            hash:true,
            minify:{
                removeAttributeQuotes:true
            }
        }),
        new ExtractTextPlugin("css/main.css")
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:"127.0.0.1",
        compress:true,
        port:'8081',
        hot:true
    }
}