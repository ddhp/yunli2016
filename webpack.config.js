var path = require('path');
var webpack = require('webpack');

// path to folders
// remember to setup bootstrap path for component requiring style
var dirs = {
  src: './client/scripts',
  dest: './client/assets/js',
  bootstrap: path.resolve(__dirname, './client/styles/bootstrap')
};

// plugin definition
// or simply use -p
var PROD = JSON.parse(process.env.PROD_DEV || "0");

// setup path which needs to be replaced
// to support dynamic require
var pathNeedReplace = ['controllers'];
var replacementReg = new RegExp('^.\/(' + pathNeedReplace.join('|') + ')\/[^\/]+\.js$');

var plugins = [
  // replace dynamic context
  new webpack.ContextReplacementPlugin(/\.\/?/, replacementReg),
  // find common async modules
  // required with require.ensure
  new webpack.optimize.CommonsChunkPlugin({
    minChunks: 2, // if a module used twice, move to a common chunk
    async: true,
  }),
  // new webpack.optimize.MinChunkSizePlugin({
  //   minChunkSize: 40000 // unit is byte
  // })
];

if (PROD) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
}

module.exports = {
  entry: path.join(__dirname, dirs.src, '/entry.js'),

  output: {
    path: path.join(__dirname, dirs.dest),
    publicPath: '/assets/js/', // relative public folder path where generated files would be, make browser able to load
    filename: 'entry.js',
    chunkFilename: '[hash]-[id].js'
  },

  plugins: plugins,

  resolve: {
    extensions: ['', '.js', '.scss', '.css'],
    modulesDirectories: ['', 'node_modules', dirs.src, dirs.bootstrap, './client/assets']
  },

  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      }, 
      {
        test: /\.png$/,
        loader: "url-loader",
        query: { mimetype: "image/png" }
      }
    ]
  },

  sassLoader: {
    includePaths: [dirs.bootstrap]
  }
};
