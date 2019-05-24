/**
 * Tabslet jQuery plugin
 *
 * @copyright Copyright 2012, Dimitris Krestos
 * @license   Apache License, Version 2.0 (http://www.opensource.org/licenses/apache2.0.php)
 * @link    http://vdw.staytuned.gr
 * @version   v1.4.2
 */

/* Sample html structure

  <div class='tabs'>
    <ul class='horizontal'>
      <li><a href="#tab-1">Tab 1</a></li>
      <li><a href="#tab-2">Tab 2</a></li>
      <li><a href="#tab-3">Tab 3</a></li>
    </ul>
    <div id='tab-1'></div>
    <div id='tab-2'></div>
    <div id='tab-3'></div>
  </div>

  */

(function($, window, undefined) {
	$.fn.tabslet = function(options) {
		var defaults = {
			mouseevent: "click",
			attribute: "href",
			animation: false,
			autorotate: false,
			pauseonhover: true,
			delay: 2000,
			active: 1,
			isnull:0,
			controls: {
				prev: ".prev",
				next: ".next"
			}
		};
		var options = $.extend(defaults, options);
		return this.each(function() {
			var $this = $(this);
			options.mouseevent = $this.data("mouseevent") || options.mouseevent;
			options.attribute = $this.data("attribute") || options.attribute;
			options.animation = $this.data("animation") || options.animation;
			options.autorotate = $this.data("autorotate") || options.autorotate;
			options.pauseonhover = $this.data("pauseonhover") || options.pauseonhover;
			options.delay = $this.data("delay") || options.delay;
			options.active = $this.data("active") || options.active;
			$this.find(".tabPanebox .tabPane").hide();
			$this.find(".tabPanebox .tabPane").eq(options.active - 1).show();
			$this.find(".tabNavbox ul li").eq(options.active - 1).addClass("active");
			var fn = eval(function() {
				var currentTab = $(this).find("a").attr(options.attribute);
				$(this).trigger("_before",currentTab);
				$this.find(".tabNavbox ul li").removeClass("active");
				$(this).addClass("active");
				$this.find(".tabPanebox .tabPane").hide();
				
				if (options.animation) {
					$this.find(currentTab).animate({
						opacity: "show"
					}, "slow", function() {
						$(this).trigger("_after")
					})
				} else {
					$this.find(currentTab).show();
					$(this).trigger("_after")
				}
				return false
			});
			var init = eval("$this.find('.tabNavbox ul li')." + options.mouseevent + "(fn)");
			init;
			var elements = $this.find(".tabNavbox ul li"),
				i = options.active - 1;

			function forward() {
				i = ++i % elements.length;
				options.mouseevent == "hover" ? elements.eq(i).trigger("mouseover") : elements.eq(i).click();
				var t = setTimeout(forward, options.delay);
				$this.mouseover(function() {
					if (options.pauseonhover) {
						clearTimeout(t)
					}
				})
			}
			if (options.autorotate) {
				setTimeout(forward, 0);
				if (options.pauseonhover) {
					$this.on("mouseleave", function() {
						setTimeout(forward, 1000)
					})
				}
			}
			function move(direction) {
				
				if (direction == "forward") {
					i = ++i % elements.length
				}
				if (direction == "backward") {
					i = --i % elements.length
				}
				//alert("i="+i);
				if(i<0){i=3}
				if(i>3){i=0;}
				if(i<=0){
					
					
					if(direction == "backward"&&options.isnull!=0) {i=3;}
					
					if(direction=="forward"&&options.isnull!=0){i=1;}
				}
				if(i>=3){
					if(direction == "backward"&&options.isnull==0) {i=2;}
					
					if(direction=="forward"&&options.isnull==0){i=0;}
					
					
					
				}
//				if(options.isnull!=0){if(i<=0&& direction=="backward"){i=3;}if(i<=0&& direction=="forward"){i=1;}}else{
//					// 隐藏第四个
//					if(i==3&& direction=="backward"){i=2;}
//					if(i==3&& direction=="forward"){i=0;}
//				}
//				
				elements.eq(i).click()
				//alert(i);
			}
			$this.find(options.controls.next).click(function() {
				move("forward");
				//alert("next");
			});
			$this.find(options.controls.prev).click(function() {
				move("backward");
				//alert("pre");
			});
			$this.on("destroy", function() {
				$(this).removeData()
			})
		})
	};
	$(document).ready(function() {
		$('[data-toggle="tabslet"]').tabslet()
	})
})(jQuery);