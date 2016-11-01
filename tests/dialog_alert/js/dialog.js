;(function($){
//声明实例
	var diaS = function(opt){
		var that = this;
		//console.log(opt)
		//1、设置原有属性_default  用opt新属性替代原有的  不相同，则保留
		var _default={
			txt:"弹出框内容",
			btn:["确定","取消"],
			callback:null//方法初始值为null			
		}
		//扩展参数，传入的参数替换默认的参数  $.extend(原有的，新的) 若第一个参数为{}，则原有的_default值不被替换，否则被替换
		this.settings = $.extend({},_default,opt);
		//console.log(_default)

		//功能语句：弹出对话框 创建html，用拼接字符串或者dom
		var btn = "";
		
		for(var i=0;i<this.settings.btn.length;i++){
			btn+='<button>'+this.settings.btn[i]+'</button>';
		}
		//prepend里面应该是节点，所以$(''<div class="mark"></div><div class="diabox"><p class="cont">'+this.settings.txt+'</p><p class="btns">'+btn+'</p></div>'')
		var htmlNode = $('<div class="mark"></div><div class="diabox"><p class="cont">'+this.settings.txt+'</p><p class="btns">'+btn+'</p></div>');
		$("body").prepend(htmlNode);
		//点击取消按钮
		$(".btns").find("button").eq(1).on("tap",function(){
			$(".mark").remove();
			$(".diabox").remove();
		})
		//点击确定按钮
		$(".btns").find("button").eq(0).on("tap",function(){
			$(".mark").remove();
			$(".diabox").remove();
			//调用callback
			if(that.settings.callback) that.settings.callback();
		})
	}
//插件名是dialog
	$.dialog = function(opt){
		new diaS(opt);
	}

})(Zepto);