/**
  * 简单的jquery购物商城秒杀倒计时插件
  * @date 2016-06-11
  * @author TangShiwei
  * @email 591468061@qq.com
  */
 (function(factory) {
     "use strict";
 // AMD RequireJS
 if (typeof define === "function" && define.amd) {
  define(["jquery"], factory);
 } else {
  factory(jQuery);
 }
})(function($) {
 "use strict";
 $.fn.extend({
  countdown: function(options) {
   if (options && typeof(options) !== 'object') {
    return false;
   }
   //默认配置
   var defaults = {
   	stepTime: 60,
    //活动开始时间 (可采用时间戳 或者 标准日期时间格式 "yyyy/MM/dd HH:mm:ss")
	//优先采取元素的data-stime值(该值只能为时间戳格式)
	startTime: '2016/12/11 21:00:00',
	//活动结束时间 (可采用时间戳 或者 标准日期时间格式 "yyyy/MM/dd HH:mm:ss")
	//优先采取元素的data-etime值(该值只能为时间戳格式)         
	endTime: '2016/12/11 24:00:00',
	//活动开始前倒计时的修饰
	//可自定义元素,例如"<span>距离活动开始倒计时还有:</span>"            
	beforeStart: '距离活动开始倒计时还有:',
	//活动进行中倒计时的修饰 
	//可自定义元素,例如"<span>距离活动截止还有:</span>"  
	beforeEnd: '距离活动截止还有:',
	//活动结束后的修饰
	//可自定义元素,例如"<span>活动已结束</span>"             
	afterEnd: '活动已结束',
	//时间格式化(可采用"ddd:hh:mm:ss、 dd:hh:mm:ss、  hh:mm:ss、 mm:ss、 ss"等)    
	digitImages: 6,
    digitWidth: 31,
    digitHeight: 42,
    image: "/static/images/digits32.png",
	format: 'dd:hh:mm:ss',
	//活动结束后的回调函数                    
    callback: function() {                    
     return false;
    }
   };
   /********样式1*********/
   //根据时间格式渲染对应结构
   var strategies2 = {
    "4": function($this, timeArr, desc) {
   	return $this.html(desc + '<span class="countdown-day">' + timeArr[0] + '</span>天' + 　'<span class="countdown-hour">' + timeArr[1] + '</span>时' + '<span class="countdown-minute">' + timeArr[2] + '</span>分' + '<span class="countdown-second">' + timeArr[3] + '</span>秒');
    },
    "3": function($this, timeArr, desc) {
     return $this.html(desc + '<span class="countdown-hour">' + timeArr[0] + '</span>时' + '<span class="countdown-minute">' + timeArr[1] + '</span>分' + '<span class="countdown-second">' + timeArr[2] + '</span>秒');
    },
    "2": function($this, timeArr, desc) {
     return $this.html(desc + '<span class="countdown-minute">' + timeArr[0] + '</span>分' + '<span class="countdown-second">' + timeArr[1] + '</span>秒');
    },
    "1": function($this, timeArr, desc) {
     return $this.html(desc + '<span class="countdown-second">' + timeArr[0] + '</span>秒');
    }
   };
   /**********end********/
  /**********样式2********/
   var digits = [], intervals = [];
   var strategies = function($this, timeArr,desc)
  {
    var c = 0;
    // Iterate each startTime digit, if it is not a digit
    // we'll asume that it's a separator
    var elem = this;
        digits = [];
        intervals = [];
       //alert(timeArr.length); 
    var formatArr=new Array();
    for(var _n=0;_n<opts.format.length;_n++){
    	formatArr.push(opts.format.charAt(_n))
    }
    for (var i = 0; i < timeArr.length; i++)
    {
      
      //alert(timeArr[i]);
      if (parseInt(timeArr[i]) >= 0)
      {
        elem = $('<div id="cnt_' + c + '" class="cntDigit" />').css({
          height: opts.digitHeight,
          float: 'left',
          background: 'url(\'' + opts.image + '\')',
          width: opts.digitWidth
        });

        elem.current = parseInt(timeArr[i]);
        digits.push(elem);

        margin(c, -elem.current * opts.digitHeight * opts.digitImages);

        // Add max digits, for example, first digit of minutes (mm) has
        // a max of 5. Conditional max is used when the left digit has reach
        // the max. For example second "hours" digit has a conditional max of 4
        //alert(formatArr[i]);
        switch (formatArr[i])
        {
          case 'h':
            digits[c]._max = function(pos, isStart) {
              if (pos % 2 == 0)
                return 2;
              else
                return (isStart) ? 3: 9;
            };
            break;
          case 'd':
            digits[c]._max = function(){ return 9; };
            break;
          case 'm':
          case 's':
            digits[c]._max = function(pos){ return (pos % 2 == 0) ? 5: 9; };
        }
        ++c;
      }
      else
      {
        elem = $('<div class="cntSeparator"/>').css({float: 'left'})
                                               .text(timeArr[i]);
      }
			   
      $this.append(elem);
      //alert($this.html()+"----");
    }
  };
  /* 翻牌*/
   // Set or get element margin
  var margin = function(elem, val)
  {
    if (val !== undefined)
    {
      digits[elem].margin = val;
      return digits[elem].css({'backgroundPosition': '0 ' + val + 'px'});
    }

    return digits[elem].margin || 0;
  };

  var makeMovement = function(elem, steps, isForward)
  {
    // Stop any other movement over the same digit.
    //if(elem==7){alert(2);}
    if (intervals[elem])
      window.clearInterval(intervals[elem]);

    // Move to the initial position (We force that because in chrome
    // there are some scenarios where digits lost sync)
    var initialPos = -(opts.digitHeight * opts.digitImages *
                       digits[elem].current);
    margin(elem, initialPos);
    digits[elem].current = digits[elem].current + ((isForward) ? steps: -steps);

    var x = 0;
    intervals[elem] = setInterval(function(){
      if (x++ === opts.digitImages * steps)
      {
        window.clearInterval(intervals[elem]);
        delete intervals[elem];
        return;
      }

      var diff = isForward ? -opts.digitHeight: opts.digitHeight;
      margin(elem, initialPos + (x * diff));
    }, opts.stepTime / steps);
  };

  // Makes the movement. This is done by "digitImages" steps.
  var moveDigit = function($this,elem)
  {
    if (digits[elem].current == 0)
    {
      

      // Is there still time left?
      if (elem > 0)
      {
 
        var isStart = (digits[elem - 1].current == 0);
        
        makeMovement(elem, digits[elem]._max(elem, isStart), true);
        moveDigit($this,elem - 1);
      }
      else // That condition means that we reach the end! 00:00.
      {
      	
      	//intervals.main
        for (var i = 0; i < digits.length; i++)
        {
          clearInterval(intervals[i]);
          margin(i, 0);
        }
        
        _timer($this);
      }

      return;
    }

    makeMovement(elem, 1);
  };
  
/***************end**************/
   /**
    * [killTime 时间差换算并进行格式化操作]
    * @param  {[Object]} _this_ [jquery对象]
    * @param  {[Number]} sTime  [当前时间]
    * @param  {[Number]} eTime  [结束时间]
    * @param  {[String]} desc   [时间修饰]
    * @param  {[String]} format [时间格式]
    * @return {[Function]} strategies [根据格式渲染对应结构]
    */
   var killTime = function(_this_, sTime, eTime, desc, format) {
    var diffSec = (eTime - sTime) / 1000;
    var map = {
     h: Math.floor(diffSec / (60 * 60)) % 24,
     m: Math.floor(diffSec / 60) % 60,
     s: Math.floor(diffSec % 60)
    };
    if(format.indexOf("d") < 1 ){
    	//alert('不提取天数');
    	//var d=Math.floor(diffSec / (60 * 60 * 24));
    	//map["h"] +=d*24;
		
		map["h"]=Math.floor(diffSec / (60 * 60));
    	//alert(map["h"] );
		}
    var format = format.replace(/([dhms])+/g, function(match, subExp) {
     var subExpVal = map[subExp];
     if (subExpVal !== undefined) {
      if (match.length > 1) {
       subExpVal = '0' + subExpVal;
       subExpVal = subExpVal.substr(subExpVal.length - match.length);
       return subExpVal;
      }
     } else if (subExp === 'd') {
      if (match.length >= 1 && match.length < 4) {
       map[subExp] = Math.floor(diffSec / (60 * 60 * 24));
       var d = '00' + map[subExp];
       return d.substr(d.length - match.length);
      }
     }
     return match;
    });
    //将时间格式通过":"符号进行分组
    //var timeArr = String.prototype.split.call(format, ':');
    var _timeArr = format;
    var timeArr=new Array();
    for(var _n=0;_n<_timeArr.length;_n++){
    	timeArr.push(_timeArr.charAt(_n))
    }
    //alert(timeArr+'---');
   /**
    * [render 通过分组情况渲染对应结构]
    * @param  {[Object]} _this_ [jquery对象]
    * @param  {[Number]} timeArrLen  [时间分组后的数组长度]
    * @param  {[Array]} timeArr  [时间分组后的数组]
    * @param  {[String]} desc   [时间修饰]
    * @return {[Function]} strategies [根据数组长度渲染对应结构]
    */
    var render = function(_this_, timeArrLen, timeArr, desc) {
     //return strategies2[timeArrLen](_this_, timeArr, desc);
     return strategies(_this_, timeArr,desc);
    };
    render(_this_, timeArr.length, timeArr, desc);
   }
    var _timer = function(_this_) {
    	//alert(intervals.main+"----");
    	if(intervals.main){
   			clearInterval(intervals.main);
   		}
    	var $this = _this_;
    	$this.html("");
     //优先采取元素的data-stime值(该值只能为时间戳格式)
    var sTime = $this.data('stime') ? parseInt($this.data('stime'), 10) : (new Date(opts.startTime.replace(/-/g,"/"))).getTime();
    //优先采取元素的data-etime值(该值只能为时间戳格式)
    var eTime = $this.data('etime') ? parseInt($this.data('etime'), 10) : (new Date(opts.endTime.replace(/-/g,"/"))).getTime();
    var nowTime = (new Date()).getTime();
     if (nowTime < sTime) {
      //活动暂未开始
      $("#jdftimebox #s_time").html(opts.beforeStart);
      killTime($this, nowTime, sTime, opts.beforeStart, opts.format);
      intervals.main = setInterval(function(){ moveDigit($this,digits.length - 1); },1000);
     } else if (nowTime >= sTime && nowTime <= eTime) {
      //活动进行中
      //alert("进行中");
      $this.html("");
      $("#jdftimebox #s_time").html(opts.beforeEnd);
      killTime($this, nowTime, eTime, opts.beforeEnd, opts.format);
      intervals.main = setInterval(function(){ moveDigit($this,digits.length - 1); },1000);
     } else {
      //活动已结束
      $("#jdftimebox #s_time").html(opts.afterEnd);
      //$this.html(opts.afterEnd);
	  
      if (opts.callback && $.isFunction(opts.callback)) {
       opts.callback.call($this);
      }
     }
    }
   //覆盖默认配置
   var opts = $.extend({}, defaults, options);

// return this.each(function() {
 var $this = $(this);
   
  _timer($this);
//  
// });
  }
 });
});