const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/webview/index.tsx',
    output: {
        path: path.resolve(__dirname, 'out/webview'),
        filename: 'index.js',
        clean: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: path.resolve(__dirname, 'src/webview/tsconfig.json'),
                        transpileOnly: true
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/webview/index.html',
            filename: 'index.html',
            minify: false
        })
    ],
    devtool: 'source-map'
};
