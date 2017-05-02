const path       = require('path'),
      webpack    = require('webpack'),
      ExtractTxt = require('extract-text-webpack-plugin');
// need to figure out how to load uswds stuff
// webbpack-dev-server launch static directory
// would like all css/fonts to be under styles.css
// and not packaged with build.js

// issues with cross-site access?

// want to load css/fonts/imgs in their own separate folders
// inside of /dist
module.exports = {
    entry: './static/js/z-app.js',
    output: {
        publicPath: '/dist/',
        path: path.resolve(__dirname, 'static/dist'),
        filename: 'build.js'
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {}
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: '[name].[ext]?[hash]'
            },
            {
              test: /\.css$/,
              //include: '/node/modules/',
              //loader: ExtractTxt.extract({
                //fallback: 'style-loader',
                //use: 'css-loader'
              //})
              use: ['style-loader', 'css-loader']
            },
        ],
    },

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
    },

    devServer: {
        historyApiFallback: true,
        noInfo: true
    },

    performance: {
        hints: false,
    },

    devtool: '#eval-source-map'
};

if(process.env.NODE_ENV === 'production'){
    module.exports.devtool = '#source-map';
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: { warnings: false }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
