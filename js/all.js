$(document).ready(function(){
  var sub=$("#sub");
  var activeRow;
  var activeMenu;
  var timer;
  var mouseInsub=false;
  sub.on("mouseenter",function(e){//判断鼠标是否在二级菜单中
   mouseInsub=true;
  })
  .on("mouseleave",function(e){
   mouseInsub=false;
  })
  var mouseTrack = [];//定义一个装鼠标移动位置的数组
  var moveHandler = function(e){//获取鼠标移动点的位置
   mouseTrack.push({
    x:e.pageX,
    y:e.pageY
   })
   if(mouseTrack.length>3){//只保存最新的三个鼠标位置点
    mouseTrack.shift();//删除数组中的第一个元素，并返回第一元素的值
   }
  }
  $("#test")
  .on("mouseenter",function(e){
   sub.removeClass('none');
   $(document).bind("mousemove",moveHandler);//目的是为了获取鼠标在一级菜单中上一次的位置和当前的位置，通过判断当前位置满不满足在三角形内来判断是否延迟
  })
  .on("mouseleave",function(e){
   sub.addClass('none');
   if(activeRow){
    activeRow.removeClass("active");
    activeRow=null;
   }
   if(activeMenu){
    activeMenu.addClass("none");
    activeMenu=null;
   }
   $(document).unbind("mousemove",moveHandler);
 
  })
  .on("mouseenter","li",function(e){
   if(!activeRow){//如果鼠标不在一级菜单内
    activeRow=$(e.target);
    activeRow.addClass("active");
    activeMenu=$("#"+activeRow.data("id"));
    activeMenu.removeClass("none");
    return;
   }
   if(timer){
    clearTimeout(timer);//不能理解debunce
   }
   var currMousePos = mouseTrack[mouseTrack.length-1];
   var leftCorner = mouseTrack[mouseTrack.length-2];
   var delay = needDelay(sub,leftCorner,currMousePos);
   if(delay){
  timer=setTimeout(function(){
   if(mouseInsub){//300毫秒之后，如果鼠标在二级菜单里面，就不执行
    return false;
   }
   //去掉上一个li的active&把对应的二级菜单隐藏
       activeRow.removeClass("active");
    activeMenu.addClass("none");
   //为当前li的添加active&把对应的二级菜单显示
    activeRow=$(e.target);
    activeRow.addClass("active");
    activeMenu=$("#"+activeRow.data("id"));
    activeMenu.removeClass("none");
    timer=null;
   },300);
     
}
else{
 var preActiveRow=activeRow;
 var preActiveMenu=activeMenu;
  
 activeRow=$(e.target);
 activeRow.addClass("active");
 preActiveRow.removeClass("active");
 preActiveMenu.addClass("none");
 activeMenu=$("#"+activeRow.data('id'));
 activeMenu.removeClass("none");
}
    
  })
})
//第二部分
function sameSign(a,b){
 return(a^b)>=0;
}
//向量定义
function vector(a,b){
 return{
  x: b.x-a.x,
  y: b.y-a.y
 }
}
//向量的叉乘运算
function vectorProduct(v1,v2){
 return v1.x * v2.y - v2.x * v1.y;
}
//叉乘判断
function isPointInTrangle(p,a,b,c){//p是当前鼠标位置，a是鼠标的上一个位置
 var pa=vector(p,a);
 var pb=vector(p,b);
 var pc=vector(p,c);
 var t1 = vectorProduct(pa,pb);
 var t2 = vectorProduct(pb,pc);
 var t3 = vectorProduct(pc,pa);
 return sameSign(t1,t2)&&sameSign(t2,t3);
}
function needDelay(elem,leftCorner,currMousePos){
 var offset = elem.offset();//offset获取二级边框的上下边缘
 var topLeft = {
  x:offset.left,
  y:offset.top
 }
 var bottomLeft={
  x:offset.left,
  y:offset.top+elem.height()
 }
 return isPointInTrangle(currMousePos,leftCorner,topLeft,bottomLeft);
}