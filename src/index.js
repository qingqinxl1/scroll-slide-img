(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // 浏览器全局变量(root 即 window)
    root.RoundSlideImg = factory(root.jQuery);
  }
}(this, function ($) {
  var RoundSlideImg = function (options) {
    var T = this;
    T.defs = {
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

    T.defs = $.extend(T.defs, options);
  };

  //初始化方法
  RoundSlideImg.prototype.init = function () {
    var T = this;

    //初始状态将最后一个元素放挪到第一个位置
    T.$wrap = $(T.defs.wrap);
    T.$items = T.$wrap.find(T.defs.itemClass);
    T.itemLen = T.$items.length;

    if (T.itemLen < 3) {
      return false;
    }

    //wrap的初始位置
    T.slideOffsetArr = T.getSlideOffsetArr();
    T.$items.eq(T.itemLen - 1).insertBefore(T.$items.eq(0));
    T.$wrap.css({marginLeft: T.slideOffsetArr[1] + 'px'});

    //绑定点击事件方法调用
    T.bindClick();
    if (T.defs.isAutoPlay) {
      T.autoPlay();
    }

    //窗口尺寸修改时候设置图片距离左侧位置
    $(window).on('resize', function () {
      T.slideOffsetArr = T.updateSlideOffsetArr();
      T.$wrap.css({marginLeft: T.slideOffsetArr[1] + 'px'});
    });
  };

  //获取第一第二第三张图片展示时距离左侧的位置
  RoundSlideImg.prototype.getSlideOffsetArr = function (winWidth) {
    var T = this;
    var winW = winWidth || $(window).width();
    var defaultOffsetLeft = (winW - T.$items.eq(0).outerWidth()) / 2;
    var arr = [defaultOffsetLeft];
    var i = 1;
    var cur;
    var iWidth;

    for (i; i < 3; i += 1) {
      cur = T.$items.eq(i);
      iWidth = cur.outerWidth();
      arr.push(arr[arr.length - 1] - iWidth);
    }
    return arr;
  };

  //上一张图片展示
  RoundSlideImg.prototype.goPrev = function () {
    var T = this;
    var leftOffset = T.slideOffsetArr;
    var items = T.$wrap.find(T.defs.itemClass);

    //操作之前的设置
    items.eq(T.itemLen - 1).insertBefore(items.eq(0));
    T.$wrap.css({marginLeft: leftOffset[2] + 'px'});

    T.$wrap.animate({marginLeft: leftOffset[1] + 'px'}, 400);
  };

  //下一张图片展示
  RoundSlideImg.prototype.goNext = function () {
    var T = this;
    var leftOffset = T.slideOffsetArr;
    var items = T.$wrap.find(T.defs.itemClass);

    //操作之前的设置
    items.eq(0).insertAfter(items.eq(T.itemLen - 1));
    T.$wrap.css({marginLeft: leftOffset[0] + 'px'});

    T.$wrap.animate({marginLeft: leftOffset[1] + 'px'}, 400);
  };

  //添加自动播放
  RoundSlideImg.prototype.autoPlay = function () {
    var T = this;

    //处理bug：避免多次绑定setInterval事件
    if (T.timmer) {
      clearInterval(T.timmer);
    }

    T.timmer = setInterval(function () {
      T.goNext();
    }, T.defs.sepTime);
  };

  //绑定事件
  RoundSlideImg.prototype.bindClick = function () {
    var T = this;
    var defs = T.defs;

    $(document).on('click', defs.prevLayer + ',' + defs.prev, function () {
      T.goPrev();
    });
    $(document).on('click', defs.nextLayer + ',' + defs.next, function () {
      T.goNext();
    });

    if (defs.isAutoPlay) {
      $(document).on('mouseenter', defs.bigWrap, function () {
        clearInterval(T.timmer);
      }).on('mouseleave', function () {
        T.autoPlay();
      });
    }
  };

  //当窗口大小修改时重新计算第一第二第三张图片展示时距离左侧的位置
  RoundSlideImg.prototype.updateSlideOffsetArr = function () {
    var T = this;
    var arr = T.getSlideOffsetArr($(window).width());
    return arr;
  };

  return RoundSlideImg;
}));
