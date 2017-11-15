var path = require("path");
module.exports = {
  entry: {
    app: path.resolve(__dirname, 'app/main.js')
  },
  output: { path: path.resolve(__dirname), filename: 'dist.js' },
  devServer: {
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /.(js|jsx)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            presets: ['es2015', 'react', 'stage-0', 'stage-1'],
	          plugins: ['transform-decorators-legacy']
        }
      },
      {
        test : /.json?$/,
        loader : "json-loader"
      },
      {
        test: /\.svg$/,
        loader: 'react-svg?es5=1'
      },
      {
        test: /\.(png|jpg)$/,
        loader: "file-loader?name=images/[name].[ext]"
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'file?name=fonts/[name].[ext]'
      }
    ]
  }
};
