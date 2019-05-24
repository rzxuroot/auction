/**
 * 首页滚动轮播图
 */


var ImgSlider={
		 imgSlider:function(id,delay,speed){
		    	var _delay = 5000;
		    	var _speed = 500;
		    	if(delay != null && delay ==""){
		    	    _delay = delay;
		    	}
		    	if(speed != null && speed ==""){
		    	    _speed = speed;
		    	}
		    	if("imgSlider" ===id){
		    		var unslider = $("#" + id + "").unslider({
						animation : 'fade',
						autoplay : true,
						delay : _delay,
						speed : _speed,
						dots : true, //  是否显示白色圆点，用于slider切换
						pause:true  //鼠标移动上去停止播放
					}), data0 = unslider.data('unslider');
				    $('.unslider-arrow_my').click(function() {
					   var fn = this.className.split(' ')[1];
					     data0[fn]();
					 });
		    	}else{
		    		 $("#" + id + "").unslider({
						animation : 'fade',
						autoplay : true,
						delay : _delay,
						speed : _speed,
						dots : true, //  是否显示白色圆点，用于slider切换
						pause:true  //鼠标移动上去停止播放
					});
		    	}
		    	
		    }
}


$(function(){
	ImgSlider.imgSlider("imgSlider");
})
