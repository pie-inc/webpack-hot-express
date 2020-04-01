const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.js');

const app = express();
const config = webpackConfig();
const compiler = webpack(config);
const dev =
  typeof process.env.NODE_ENV !== 'undefined' &&
  process.env.NODE_ENV === 'development';

if (dev) {
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath,
      hot: true
    })
  );
  app.use(webpackHotMiddleware(compiler));
  console.log("it's dev");
} else {
  app.use(express.static('public'));

  app.get('/', (req, res) =>
    res.sendFile(path.resolve(__dirname, './public/index.html'))
  );
}

// Serve the files on port 3000.
app.listen(3000, () => {
  console.log('Example app listening on port 3000!\n');
});
