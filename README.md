## 图片轮播使用说明

### 依赖 jQuery 1.9.1+

## 引入方式

### ES6

```
import Paging from '@cnpm/round-slide-img';
```

### 普通引入方式

*引入paging/index.js之前需要引入jquery*

`<script type="text/javascript" src="http://n3.static.pg0.cn/fp/round-slide-img/dist/round-slide-img.js">`


### AMD
```
require(['@cnpm/round-slide-img'], function(RoundSlideImg){

  //cookie方法操作

})
```

## 调用方式

```
var opts = {
  //图片外层容器
  wrap: '.scroll_in_cnt',
  //包含所有轮播元素的外层容器
  bigWrap: '#auto_focus_head',
  //每个轮播元素的轮播样式
  itemClass: '.fh_panel',
  //上一张箭头
  prev: '.scroll_prev',
  //下一张箭头
  next: '.scroll_next',
  //上一张箭头浮层
  prevLayer: '.l_fh_layer',
  //下一张箭头浮层
  nextLayer: '.r_fh_layer',
  //是否自动轮播，默认1，即支持轮播
  isAutoPlay: 1,
  //轮播间隔
  sepTime: 5000
};
var RoundSlideImg = new RoundSlideImg(opts); //opts可以省略
RoundSlideImg.init();
```
