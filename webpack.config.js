// webpack.config.js
module.exports = {
    entry: {
        confirm: './src/modules/confirm.js',
        toast: './src/modules/toast.js',
        lazyload: './src/modules/lazyload.js'
    },
    output: {
        path: './dist',
        filename: '[name].js'
    },
    module: {
        loaders: [{
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }, // use ! to chain loaders
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};
