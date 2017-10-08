$(document).ready(function(){

	var sub=$('#sub')

	var activeRow
	var activeMenu

	var timer

	var mouseInSub = false

	sub.on('mouseenter',function(e){
		mouseInSub = true;
	})
	.on('mouseleave',function(e){
		mouseInSub = false
	})

	var mouseTrack = []

	var moveHandler = function(e) {
		mouseTrack.push({
			x: e.pageX,
			y: e.pageY
		})

		if(mouseTrack.length > 3) {
			mouseTrack.shift()
		}
	}

	$('#test')
		.on('mouseenter',function(e){
			sub.removeClass('none')

			$(document).bind('mousemove',moveHandler)
		})
		.on('mouseleave',function(e){
			sub.addClass('none')

			if(activeRow) {
				activeRow.removeClass('active')
				activeRow = null
			}

			if(activeMenu) {
				activeMenu.addClass('none')
				activeMenu = null
			}

			$(document).unbind('mouseleave',moveHandler)
		})
		.on('mouseenter','li',function(e){
			if(!activeRow) {
				activeRow = $(e.target).addClass('active')
				activeMenu = $('#'+ activeRow.data('id'))
				activeMenu.removeClass('none')
				return
			}

			if(timer){
				clearTimeout(timer)
			}

			var currMousePos = mouseTrack[mouseTrack.length - 1]
			var leftCorner = mouseTrack[mouseTrack.length - 2]

			var delay = needDelay(sub,leftCorner,currMousePos)

			if(delay){
				timer = setTimeout(function(){
					if(mouseInSub) {
						return
					}

					activeRow.removeClass('active')
					activeMenu.addClass('none')

					activeRow =$(e.target)
					activeRow.addClass('active')
					activeMenu=$('#' + activeRow.data('id'))
					activeMenu.removeClass('none')
					timer = null
				},300)

			}
			else{
				var prevActiveRow = activeRow
				var prevActiveMenu = activeMenu

				activeRow = $(e.target)
				activeMenu = $('#' + activeRow.data('id'))

				prevActiveRow.removeClass('active')
				prevActiveMenu.addClass('none')

				activeRow.addClass('active')
				activeMenu.removeClass("none")
			}
		})
})




// $(document).ready(function(){
//  	var sub=$("#sub");

//  	var activeRow;
//   	var activeMenu;

//   	var timer;
//   	var mouseInsub=false;
//   	sub.on("mouseenter",function(e){//判断鼠标是否在二级菜单中
//    		mouseInsub=true;
//   	})
//   	.on("mouseleave",function(e){
//    		mouseInsub=false;
//   	})

//   	var mouseTrack = [];//定义一个装鼠标移动位置的数组
//   	var moveHandler = function(e){//获取鼠标移动点的位置
//    	mouseTrack.push({
// 	    x:e.pageX,
// 	    y:e.pageY
//    	})
//    	if(mouseTrack.length>3){//只保存最新的三个鼠标位置点
//     	mouseTrack.shift();//删除数组中的第一个元素，并返回第一元素的值
//    	}
//   }
// $("#test")
//   	.on("mouseenter",function(e){
//    		sub.removeClass('none');
//    	$(document).bind("mousemove",moveHandler);//目的是为了获取鼠标在一级菜单中上一次的位置和当前的位置，通过判断当前位置满不满足在三角形内来判断是否延迟

//  	})

//   	.on("mouseleave",function(e){
//    		sub.addClass('none');
//    	if(activeRow){
//     activeRow.removeClass("active");
//    		activeRow=null;
//    	}
//    	if(activeMenu){
//     	activeMenu.addClass("none");
//     	activeMenu=null;
//    	}
//    	$(document).unbind("mousemove",moveHandler);

//   	})

//   	.on("mouseenter","li",function(e){
//    	if(!activeRow){//如果鼠标不在一级菜单内
//     	activeRow=$(e.target);
//     	activeRow.addClass("active");
//     	activeMenu=$("#"+activeRow.data("id"));
//     	activeMenu.removeClass("none");
//     	return;
//    	}
//    	if(timer){
//     	clearTimeout(timer);//不能理解debunce
//    	}
//    	var currMousePos = mouseTrack[mouseTrack.length-1];
//    	var leftCorner = mouseTrack[mouseTrack.length-2];
//    	var delay = needDelay(sub,leftCorner,currMousePos);
//    	if(delay){
//   		timer=setTimeout(function(){
//    		if(mouseInsub){//300毫秒之后，如果鼠标在二级菜单里面，就不执行
//     		return false;
//    		}
//    		//去掉上一个li的active&把对应的二级菜单隐藏
//     	activeRow.removeClass("active");
//     	activeMenu.addClass("none");
//    		//为当前li的添加active&把对应的二级菜单显示
//     	activeRow=$(e.target);
//     	activeRow.addClass("active");
//     	activeMenu=$("#"+activeRow.data("id"));
//     	activeMenu.removeClass("none");
//     	timer=null;
//    		},300);

// 	}
// 	else{
//  		var preActiveRow=activeRow;
//  		var preActiveMenu=activeMenu;

//  		activeRow=$(e.target);
//  		activeRow.addClass("active");
//  		preActiveRow.removeClass("active");
//  		preActiveMenu.addClass("none");
//  		activeMenu=$("#"+activeRow.data('id'));
//  		activeMenu.removeClass("none");
// 	}

//   })
// })