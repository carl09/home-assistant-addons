const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // entry: {
  //   index: "./src/index",
  // },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3004,
    compress: true,
  },

  target: ['web', 'es2017'],
  output: {
    module: true,
  },
  experiments: {
    outputModule: true,
  },

  // output: {
  //   publicPath: "http://localhost:3004/",
  // },
  devtool: 'source-map', // inline-source-map',
  resolve: {
    mainFields: ['es2015', 'module', 'main'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss', '.css'],
    fallback: {
      //   path: false,
      //   util: require.resolve('util/'),
      //   fs: false,
      //   stream: require.resolve('stream-browserify'),
      crypto: false, // require.resolve("crypto-browserify")
      //   https: false, // require.resolve("https-browserify")
      //   http: false, // require.resolve("stream-http")
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.(t|j)sx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { esmodules: true },
                modules: false,
                shippedProposals: true,
                bugfixes: true,
                useBuiltIns: false,
              },
            ],
            [
              '@babel/preset-react',
              {
                runtime: 'automatic',
              },
            ],
          ],
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // hmr: env.NODE_ENV === "development",
            },
          },
          // 'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          // "postcss-loader",
          'sass-loader',
        ],
      },
      {
        test: /jsoneditor-icons\.svg$/,
        use: ['file-loader?name=static/[name].[ext]'],
      },
      {
        test: /\.svg$/,
        exclude: /jsoneditor-icons\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          runtimeCompat: true,
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
      chunkFilename: '[id].css',
    }),
    // new BabelEsmPlugin(),
    // new PurgecssPlugin({
    //   paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    // }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
