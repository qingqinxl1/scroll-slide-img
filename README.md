## 图片轮播使用说明

![图片轮播](http://p1lj739vz.bkt.clouddn.com/round-slide-img/default.png)

### 依赖 jQuery 1.9.1+

## 引入方式

### ES6

```
import RoundSlideImg from '@cnpm/round-slide-img';
```

### 普通引入方式

*引入之前需要引入jquery*

`<script type="text/javascript" src="http://n3.static.pg0.cn/fp/round-slide-img/dist/round-slide-img.js">`


### AMD
```
require(['@cnpm/round-slide-img'], function(RoundSlideImg){

  //方法调用

})
```

## 调用方式

```
var RoundSlideImg = new RoundSlideImg(options); //options可以省略
RoundSlideImg.init();
```

## 参数说明

名称 | 说明 | 默认值
----- | ------ | ------
wrap | 轮播图片外层容器 | .scroll_in_cnt
bigWrap | 包含所有轮播元素的外层容器 | #auto_focus_head
itemClass | 每个轮播元素的轮播样式 | .fh_panel
prev | 上一张箭头 | .scroll_prev
next | 下一张箭头 | .scroll_next
prevLayer | 上一张浮层 | .l_fh_layer
nextLayer | 下一张浮层 | .r_fh_layer
isAutoPlay | 是否自动轮播 | 1
sepTime | 轮播间隔 | 5000
