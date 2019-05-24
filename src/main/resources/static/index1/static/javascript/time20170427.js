// JavaScript Document
function GetDateStr(AddDayCount) { 
var dd = new Date(); 
dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
var y = dd.getFullYear(); 
var m = dd.getMonth()+1;//获取当前月份的日期 
var d = dd.getDate(); 
return y+"/"+m+"/"+d; 
} 

$(function(){
	var timenum=0;
	var categroyIDs=new Array();
	var downtimes=new Array(); 
	var downlasttimes=new Array();
	var picpath=new Array(); 
	var piclink=new Array();	
	var cat_title=new Array();
	//var nowTime = (new Date()).toLocaleDateString();////获取当前日期 格式：2016/12/9 ie浏览器 2016年12月9日
	var today=new Date();
	var datatime=new Array();
	//var nowTime=today.getFullYear()+"/"+(today.getMonth()+1)+"/"+today.getDate();
	datatime.push(GetDateStr(0));//今日
	datatime.push(GetDateStr(1));//明天
	datatime.push(GetDateStr(2));//后天
	datatime.push(GetDateStr(3));//后天
	datatime.push(GetDateStr(4));//后天
	datatime.push(GetDateStr(5));//后天
	//alert(GetDateStr(0)+"--"+GetDateStr(1));
	function creattime(idname){
//alert(downtimes[timenum]+"--"+timenum);
		if(timenum<downtimes.length){
		   	$('.digits').countdown({
		    //活动开始时间 (可采用时间戳 或者 标准日期时间格式 "yyyy/MM/dd HH:mm:ss")
		    //优先采取元素的data-stime值(该值只能为时间戳格式)
		    startTime: downtimes[timenum],//活动结束时间 (可采用时间戳 或者 标准日期时间格式 "yyyy/MM/dd HH:mm:ss")
		    //优先采取元素的data-etime值(该值只能为时间戳格式)         
		    endTime: downlasttimes[timenum],
		    //活动开始前倒计时的修饰
		    //可自定义元素,例如"<span>距离活动开始倒计时还有:</span>"            
		    beforeStart: '距离下线',
		    //活动进行中倒计时的修饰 
		    //可自定义元素,例如"<span>距离活动截止还有:</span>"  
		    beforeEnd: '正在下线',
		    //活动结束后的修饰
		    //可自定义元素,例如"<span>活动已结束</span>"             
		    afterEnd: '已经结束!',
		    //时间格式化(可采用"ddd:hh:mm:ss、 dd:hh:mm:ss、  hh:mm:ss、 mm:ss、 ss"等)                   
		    format: 'hh时mm分ss秒',
		    image: "/static/images/digits32.png",
		    //活动结束后的回调函数                    
		    callback: function() {
    	   		timenum=timenum+1;
		    	creatview(timenum,idname);		    	
		    }
		   });
	  }
   	
   }
	function creatview(num,idname){
		//alert(picpath[num]);
		
		
		
		if(num < downtimes.length){
			$("#"+idname+" .jdfdivbox div.jdfcon:eq("+(num-1)+")").hide();		
			var _html="<div class=\"jdfcon\"><div class=\"endimg\"></div>";                  
			_html+="<div class=\"jdfimgbox\"><a href=\'"+piclink[num-1]+"\' ><img src=\'"+picpath[num-1]+"\'  /></a></div>";
			_html+="<div class=\"jdftxtbox jdftxtsm\">";
			_html+="<h2><a href=\'"+piclink[num-1]+"\'  >"+cat_title[num-1]+"</a></h2>";
			_html+="</div>";
			_html+="</div>";
			
			$("#"+idname+" .jdfdivbox").append(_html);
			
			$("#"+idname+" .jdfconfirst .jdfimgbox").html("<a href=\'"+piclink[num]+"\' ><img src='"+picpath[num]+"'  /></a>");
			$("#"+idname+" .jdfconfirst .jdftxtbox h2").html("<a href=\'"+piclink[num]+"\'  >"+cat_title[num]+"</a>");
			$("#"+idname+" .jdfconfirst .jdftxtbox p").html("开始下线："+downtimes[num]+"<br />下线结束："+downlasttimes[num]);
		    creattime(idname);
	  	}else{
			$("#"+idname+" .jdfconfirst .jdfimgbox").html("<a href='"+piclink[num-1]+"' ><img src='"+picpath[num-1]+"'  /></a><div class=\"endimg\"></div>");
			$("#"+idname+" .jdfconfirst .jdftxtbox h2").html("<a href=\'"+piclink[num-1]+"\'  >"+cat_title[num-1]+"</a>");
			$("#"+idname+" .jdfconfirst .jdftxtbox p").html("开始下线："+downtimes[num-1]+"<br />下线结束："+downlasttimes[num-1]);
			creattime(idname);
		}
		
		
		
	}
	function CreatdivboxView(tabid){
		$.getJSON('/static/data.json',function(data){  
					//var _data=data.sort(function(a,b){return a.ID-b.ID});//倒序 “b.Sort-a.Sort” 
					timenum=0;
					categroyIDs=[];
					downtimes=[]; 
					downlasttimes=[];
					picpath=[]; 
					piclink=[];	
					cat_title=[];
					
					$('#li_a em').html(GetDateStr(0));
					$('#li_b em').html(GetDateStr(1));
					$('#li_c em').html(GetDateStr(2));
					$('#li_d em').html(GetDateStr(3));
					$('#li_e em').html(GetDateStr(4));
					$('#li_f em').html(GetDateStr(5));
					$('#li_g em').html(GetDateStr(6));
			
					$("#tab-"+tabid+" .jdfdivbox").empty();

					for(i=0;i<data.length;i++){
						//alert(nowTime)  
						//获取今日数据 nowTime 为今日日期
						$('#li_a em').html(GetDateStr(0));
		  $('#li_b em').html(GetDateStr(1));
		  $('#li_c em').html(GetDateStr(2));
		  $('#li_d em').html(GetDateStr(3));

						
						if(data[i].datename==datatime[tabid-1]){
						    
							var _data=data[i].datacontent;
							for(n=0;n<_data.length;n++){ 
								categroyIDs.push(_data[n].ID);
								downtimes.push(_data[n].downtimes);
								downlasttimes.push(_data[n].downlasttimes);
								picpath.push(_data[n].picpath);
								piclink.push(_data[n].piclink);
								cat_title.push(_data[n].cat_title);
								if(n==0){
									$("#tab-"+tabid+" .jdfconfirst .jdfimgbox").html("<a href=\'"+_data[n].piclink+"\' ><img src=\'"+_data[n].picpath+"\'  /></a>");
									$("#tab-"+tabid+" .jdfconfirst .jdftxtbox h2").html("<a href=\'"+_data[n].piclink+"\'  >"+_data[n].cat_title+"</a>");
									$("#tab-"+tabid+" .jdfconfirst .jdftxtbox p").html("开始下线："+_data[n].downtimes+"<br />下线结束："+_data[n].downlasttimes);
								}else{
									var _html="<div class=\"jdfcon\">";                  
									_html+="<div class=\"jdfimgbox\"><a href=\'"+_data[n].piclink+"\' ><img src=\'"+_data[n].picpath+"\'  /></a></div>";
									_html+="<div class=\"jdftxtbox jdftxtsm\">";
									_html+="<h2><a href=\'"+_data[n].piclink+"\'  >"+_data[n].cat_title+"</a></h2>";
									_html+="</div>";
									_html+="</div>";
								
									$("#tab-"+tabid+" .jdfdivbox").append(_html);
								}
								
							   }
		                 
		                 var _N=$("#tab-"+tabid+" .jdfdivbox div.jdfcon").length;// 数量

						  if(_N==1)
						  {
							$('#jdftimebox').css({'display':'block'});
							$("#tab-"+tabid+" .jdfdivbox").css({ 'padding-top':'0px'});
							$("#tab-"+tabid+" .jdfcon").css({ 'width':'590px','height':'440px'});
							$("#tab-"+tabid+" .jdfimgbox").css({ 'width':'590px','height':'440px'});
							$("#tab-"+tabid+" .jdfimgbox img").css({'width':'590px','height':'440px'});
						   }
		                  else if(_N<3)
			              {
							$('#jdftimebox').css({'display':'block'});
							$("#tab-"+tabid+" .jdfdivbox").css({ 'padding-top':'115px'});
						  }
		                  else
			              {
							  $('#jdftimebox').css({'display':'block'});
							  $("#tab-"+tabid+" .jdfdivbox").css({ 'padding-top':'0px'}); 
						  }
						//  if(_N==0){
						//	  $("#tab-"+tabid+" .jdfzoompic").css({ 'background':'#f30'});
						//	  $("#tab-"+tabid+" .jdfzoompic").html('<h1>无专场</h1>')
						//	  }
						   if(_N==0){
								 $('#jdftimebox').css({'display':'none'});
								 $("#tab-"+tabid+" .jdfzoompic").html("<h2 class='none_zc'><img src='http://www.artrade.com/static/images/mzhct.jpg'  /></h2>");
								 
									var _html="<div class=\"meirihuicui\">";                  

									_html+="<a><div id='zgsh_2' style='cursor:pointer'><img src='http://www.artrade.com/static/images/mzhc1.jpg'/></div></a>"
									_html+="<a><div id='gczx_5' style='cursor:pointer'><img src='http://www.artrade.com/static/images/mzhc2.jpg'/></div></a>"	
									_html+="<a><div id='ddgy_6' style='cursor:pointer'><img src='http://www.artrade.com/static/images/mzhc3.jpg'/></div></a>"									
									_html+="<a><div id='yhds_4' style='cursor:pointer'><img src='http://www.artrade.com/static/images/mzhc4.jpg'/></div></a>"									

									_html+="</div>";
								
									$("#tab-"+tabid+" .jdfzoompic").append(_html);
								 
							  //代码添加
								    $("#zgsh_2,#gczx_5,#ddgy_6,#yhds_4").bind("click",function(){
										  var bs= $(this).attr("id")
										    bs= bs.substring(bs.indexOf("_")+1);
										  var _id = $("#"+bs).data("id");
										  var _lev = $("#"+bs).data("level");
										  var _l1Id = $("#"+bs).data("l1Id");
										  var _l1Text = $("#"+bs).data("l1Text");
										  var _l2Id = $("#"+bs).data("l2Id");
										  var _l2Text = $("#"+bs).data("l2Text");
										  var setting={
											"action":baseUrl+"http://www.artrade.com/jsp/ecp/item/manage/itemquerylist.jsp",
											"datas":[{"name":"categoryId","value":_id},
													 {"name":"l1Id","value":_l1Id},
													 {"name":"l1Text","value":_l1Text},
													 {"name":"l2Id","value":_l2Id},
													 {"name":"l2Text","value":_l2Text},
													 {"name":"lev","value":_lev}],	
											"target":"_blank"
										  };	
										  
										 simulateFormSubmit(setting);
	
									  }); 						  
								  
								 
								 
								 
								  } 
								  
								  

							  break; // 获取所需数据后 跳出for循环
						   }
				  	} 
					
					creattime("tab-"+tabid);
					

				  //鼠标滑动显示图片文字
					$('.jdfcon').mouseover(function(){
					 $(this).find('.jdftxtsm').stop().animate({bottom:'0px'},500);
											 })
								  .mouseout(function(){
					 $(this).find('.jdftxtsm').stop().animate({bottom:'-70px'},500);						   
					 })	
								  
								  
		});	
					
					
    
	}
	
//  当日时间  为19点的时候，结束的专场被第二天下线的覆盖--------20170427 修改
	var _tab=1;
      var date=new Date();
      var h=date.getHours();
       var isnullnum=0;
      if(h>=19){
		   _tab=2;
		   isnullnum=1;
		   CreatdivboxView(2);
		   $('#li_a').hide();
  	   
		   $('#li_d').show();
		   
		   
      }else{
      	CreatdivboxView(1);
      }
		  
  
   
	
					  
			$('.tabs').tabslet({
				active:_tab,           //第几个选项卡开始--------20170427 修改
				autorotate:false,    //设置自动切换效果
				isnull:isnullnum,
				delay:5000,         //设置切换时间
				animation: true,    //设置过渡效果
				controls: {         //设置左右按钮控制选项卡切换
					prev: '.prev',
					next: '.next'
				}
						
			   });
			
			$('.tabs').on("_before", function(e,text) {
				// do stuff here
				var N=text.replace("#tab-","");
				//alert(N);
				_tab =N*1
				
				if(isnullnum!=0){if(_tab==1){_tab=2;}}
				
				//alert("“tan=”"+_tab);
				//var elements = $(this).find(".tabNavbox ul li");
				//elements.eq(_tab-1).click();
//				$('#li_a').click();
				CreatdivboxView(_tab);
				//alert(1);
			});
			
			
						
					

});	
