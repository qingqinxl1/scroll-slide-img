// var request = require('request');
var CleanCSS = require('clean-css');
var source = '@import url(./src/index.css);';
var fs = require('fs');
var path = require('path');
var minCssPath = path.join(__dirname, 'dist/round-slide-img.css');

new CleanCSS({
  returnPromise: true,
  level: {
    1: {
      transform: function (propertyName, propertyValue) {
        // 处理css中的图片地址
        if (propertyName == 'background' && propertyValue.indexOf('dist/mlzhongguo_') > -1) {
          return propertyValue.replace('dist/mlzhongguo_', './mlzhongguo_');
        }
      }
    }
  }
}).minify(source)
  .then(function (output) {
    // console.log(output.styles);
    return output.styles;
  })
  .then(function (minStyleBody) {
    fs.writeFile(minCssPath, minStyleBody, function (err) {
      if (err) throw err;
      console.log('The clean css has been saved in ' + minCssPath);
    });
  })
  .catch(function (error) {
    // deal with errors
    console.log(error);
  });
