const path = require('path');
//const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode:"development",
  entry: {
    app: './src/ReactApp.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'static'),
    sourceMapFilename: '[name].bundle.map'
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  },
  devtool: 'hidden-source-map',
  plugins: [
    //new webpack.HotModuleReplacementPlugin()
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: path.resolve(__dirname, 'src/index.html'),
        }
    ))
  ],
  module: {
    rules: [
      {
        oneOf: [
          // "url" loader works like "file" loader except that it embeds assets
          // smaller than specified limit in bytes as data URLs to avoid requests.
          // A missing `test` is equivalent to a match.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'media/[name].[hash:8].[ext]',
            },
          },          
          // Process application JS with Babel
          {
            test: /\.(js|jsx|mjs)$/,
            exclude: /(node_modules)/,
            use: [
              {
                loader: require.resolve('babel-loader'),
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react']
                }
              },
            ]    
          },
          // CSS Loader
          {
            test: /\.(s*)css$/,
            // порядок имеет значение: применяются с конца (last to first)
            // сначала css-loader, затем style-loader.        
            use: [{
              loader: 'style-loader' // inject CSS to page
            }, {
              loader: 'css-loader' // translates CSS into CommonJS modules
            }, {
              loader: 'postcss-loader', // Run post CSS actions (? post SASS)
              options: { plugins: function (){
                                    return [
                                      require('precss'),
                                      require('autoprefixer')
                                    ];
                                  }
              }
            }, {        
              loader: 'sass-loader'   // compiles Sass to CSS 
            }]
          },
          // file loader
          {
            loader: require.resolve('file-loader'),
            //test: /\.(png|svg|jpg|gif)$/,
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: 'media/[name].[hash:8].[ext]',
            }
            //use: ['file-loader']
          }
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ]
      }
    ]
  }
};