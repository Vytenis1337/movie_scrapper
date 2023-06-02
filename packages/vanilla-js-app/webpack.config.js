const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    const isDevelopment = argv.mode !== 'production';
    return {
        entry: {
            main: './src/index.ts',
            login: './src/login.ts',
            movie: './src/movie.ts',
            library: './src/library.ts',
        },
        devtool: 'inline-source-map',
        plugins: [
            new CleanWebpackPlugin({
                cleanStaleWebpackAssets: false,
            }),
            new HtmlWebpackPlugin({
                title: isDevelopment ? 'Development Build' : 'Production Build',
                template: './src/index.html',
                filename: './index.html',
                chunks: ['main'],
            }),
            new HtmlWebpackPlugin({
                title: isDevelopment ? 'Development Build' : 'Production Build',
                template: './src/login.html',
                filename: './login.html',
                chunks: ['login'],
            }),
            new HtmlWebpackPlugin({
                title: isDevelopment ? 'Development Build' : 'Production Build',
                template: './src/movie.html',
                filename: './movie.html',
                chunks: ['movie'],
            }),
            new HtmlWebpackPlugin({
                title: isDevelopment ? 'Development Build' : 'Production Build',
                template: './src/library.html',
                filename: './library.html',
                chunks: ['library'],
            }),
        ],
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
        },

        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },
    };
};
