;(function($){
	var homeIscroll,listIscroll,detailsIscroll,favoriteIscroll,historyIscroll,searchIscroll;
	var jsondata;
	//创建一个本地存储对象，添加收藏记录，判断是否存在，如果不存在则保存一个空的数组
	var ls=window.localStorage;

	//ls.clear();
	//初始化函数
	function initFn(){
		//通过ajax获取json数据
		$.ajax({
			url:"data/data.json",
			type:"post",
			dataType:"json",
			success:function(data){
				//渲染列表项
				jsondata=data;
			},
			error:function(){
				alert("请求失败，请重新加载页面");
			}

		})
		if(!ls.getItem("save")){
			ls.setItem("save","[]");
		}

		if(!ls.getItem("history-list")){
			ls.setItem("history-list","[]");
		}
		//局部滚动
		homeIscroll=new iScroll("home",{//首页滚动
			OnBeforeScrollStart:function(e){
				var target=e.target.nodeName.toLowerCase();
				if(target!="input" && target!="select" && target!="textarea"){
					e.preventDefault();
				}
			}
		});
		listIscroll=new iScroll("list",{//列表页滚动
			OnBeforeScrollStart:function(e){
				var target=e.target.nodeName.toLowerCase();
				if(target!="input" && target!="select" && target!="textarea"){
					e.preventDefault();
				}
			}
		});
		detailsIscroll=new iScroll("details",{//内容页滚动
			OnBeforeScrollStart:function(e){
				var target=e.target.nodeName.toLowerCase();
				if(target!="input" && target!="select" && target!="textarea"){
					e.preventDefault();
				}
			}
		});	
		favoriteIscroll=new iScroll("favorite",{//收藏页滚动
			OnBeforeScrollStart:function(e){
				var target=e.target.nodeName.toLowerCase();
				if(target!="input" && target!="select" && target!="textarea"){
					e.preventDefault();
				}
			}
		});
		historyIscroll=new iScroll("history",{//历史记录滚动
			OnBeforeScrollStart:function(e){
				var target=e.target.nodeName.toLowerCase();
				if(target!="input" && target!="select" && target!="textarea"){
					e.preventDefault();
				}
			}
		});
		searchIscroll=new iScroll("search",{//历史记录滚动
			OnBeforeScrollStart:function(e){
				var target=e.target.nodeName.toLowerCase();
				if(target!="input" && target!="select" && target!="textarea"){
					e.preventDefault();
				}
			}
		});

		//加载事件
		addEvent();
	}
	initFn();

	//绑定事件
	function addEvent(){
		var needData=["yq","yz","cq","ch","cz","fz"];
		$("#box").on("click","a",function(e){//给页面中所有A标签绑定点击事件
			e.preventDefault();//阻止默认动作 禁止跳转
			var pageHerf=$(this).attr("href");	//提取出点击的A标签的href属性作为跳转的依据

			//点击a切换页面，找到对应的页面，通过translate移动到左侧，其他移动到右侧
			$(pageHerf).css({"-webkit-transform":"translate3d(0,0,0)"})
			.siblings().css({"-webkit-transform":"translate3d(100%,0,0)"});

			//当点击导航里的a才执行的动作
			if($(this).parent().is("nav")){
				var idx=$(this).index();
				//底部导航背景跟随移动
				$("#marker").css("left",idx*25+"%");
			}

			//调用更改header函数，传递当前点击的对象作为实参
			changeHeader($(this),pageHerf);

			//是否进入列表页
			if(pageHerf=="#list"){//获取列表页的相关数据
				var key=$(this).attr("id");
				if($.inArray(key,needData)>-1){
					getListData(key);
				}
			}else if(pageHerf=="#details"){//进入内容页
				randerDetailsPage($(this));
			}else if(pageHerf=="#favorite"){//进入收藏页
				randerSavePage();
			}else if(pageHerf=="#history"){//进入历史记录页
				randerHistoryPage();
			}			
		})
		
		//给收藏按钮添加点击事件
		$("#save-btn").on("click",function(){
			$(this).css("background-image","url(../yybd/images/scc.png)");
			//判断文章是否已经收藏过
			var saveTxt=$(this).data("title");
			//获取本地存储的数组，检测saveTxt是否在数组中
			var saveArr=JSON.parse(ls.getItem("save"));//将字符串转化为对象
			if($.inArray(saveTxt,saveArr)>-1){
				alert("已经收藏过了，亲！");
			}else{
				saveArr.unshift(saveTxt);//将收藏的题目推入数组前面
				ls.setItem("save",JSON.stringify(saveArr));//将对象转化为字符串，并存入本地存储中去
				alert("ok，收藏成功");
			}

		})

		//给搜索按钮绑定事件
		$("#btn").on("click",function(){
			//获取搜索框内的值
			var sea_txt=$("#txt").val();
			if(sea_txt.length>0){
				//当搜索框输入内容后，调去相关信息
				search(sea_txt);
			}
		})
	}

	//更改头部
	function changeHeader(curObj,pageHerf){
		var txt=curObj.attr("title");

		//更改标题文字
		$("#title").text(txt);
		$(".header").show();
		$("#sear-box").hide();

		//更改头部图标
		//返回按钮
		if(pageHerf=="#list"){
			$("#back-btn").show().attr({"href":"#home","title":"孕育宝典"});
			$("#save-btn").hide();
			$("#sea-btn").show();
		}else if(pageHerf=="#details"){
			var from=curObj.data("from");
			var cate=curObj.data("cate").split("_");
			if(from=="#list"){
				$("#back-btn").attr({"href":from,"title":jsondata[cate[0]].home_title})
			}else if(from=="#history"){
				$("#back-btn").attr({"href":from,"title":"历史记录"});
			}else if(from=="#favorite"){
				$("#back-btn").attr({"href":from,"title":"收藏"});
			}else if(from=="#search"){
				$("#back-btn").attr("href",from);
			}
			
			$("#back-btn").show();
			$("#save-btn").show().attr("data-title",txt);
			$("#sea-btn").hide();
		}else if(pageHerf=="#search"){
			$(".header").hide();
			$("#sear-box").show();
		}else{
			$("#back-btn").hide();
			$("#save-btn").hide();
			$("#sea-btn").show();
		}
	}

	//通过ajax请求得到列表页的数据
	function getListData(key){
		$.ajax({
			url:"data/data.json",
			type:"post",
			dataType:"json",
			success:function(data){
				//隐藏提示文字
				$("#list").find(".loading").hide();
				//渲染列表项
				randerListPage(data,key);
				

				jsondata=data;
			},
			error:function(){
				alert("请求失败，请重新加载页面");
			}

		})
	}
	

	//渲染列表页
	function randerListPage(data,key){
		var str="";
		$.each(data[key].fenlei,function(i,val){
			//DOM方式
			/*$("<a href='#details'><dl><dt><img src='images/tu/"+val.img+"'></dt><dd>"+val.title+"</dd></dl></a>")
			.appendTo("#list-con");*/

			//拼接方式
			//自定义data属性存放键名和数组索引，以方便调用json数据中的content项
			str+="<a data-from='#list' href='#details' data-cate='"+key+"_"+i+"' title='"+val.title+"'><dl><dt><img src='images/tu/"+val.img+"'></dt><dd>"+val.title+"</dd></dl></a>";
			//$("#details").html(val.content);
		})
		$("#list-con").html(str);
		listIscroll.refresh();
	}

	//渲染内容页
	function randerDetailsPage(curObj){
		//jsondata获取到json数据
		//jsondata.fz.fenlei[0].content
		var cate=curObj.data("cate").split("_"),
			content=jsondata[cate[0]].fenlei[cate[1]].content,
			hisTxt=jsondata[cate[0]].fenlei[cate[1]].title,
			hisArr=JSON.parse(ls.getItem("history-list"));

			hisArr.unshift(hisTxt);
			ls.setItem("history-list",JSON.stringify(hisArr));

			$("#article").html(content);
			detailsIscroll.refresh();

	}

	//将收藏的渲染到页面
	function randerSavePage(){
		var favArr=JSON.parse(ls.getItem("save"));
		if(favArr.length==0){
			$("#fav-list>li").text("暂无收藏记录")
		}else{

			var ul="";

			$.each(favArr,function(i,val){
				var _cate=getDataCate(val);
				ul+="<li><a data-from='#favorite' href='#details' data-cate='"+_cate+"' title='"+val+"'>"+val+"</a></li>";
			})
			$("#fav-list").html(ul);
		}
		favoriteIscroll.refresh();
	}
	
	//将历史记录的渲染到页面
	function randerHistoryPage(){
		var favArr=JSON.parse(ls.getItem("history-list"));
		if(favArr.length==0){
			$("#his-list>li").text("暂无历史记录");
		}else{
			var ul="";
			$.each(favArr,function(i,val){
				var _cate=getDataCate(val);
				ul+="<li><a data-from='#history' href='#details' data-cate='"+_cate+"' title='"+val+"'>"+val+"</a></li>";
			})
			$("#his-list").html(ul);
		}
		favoriteIscroll.refresh();
	}

	//获取点击是data-cate的值，格式为cq_1;
	function getDataCate(val){
		var str="";
		$.each(jsondata,function(key,value){
			$.each(jsondata[key].fenlei,function(i,ele){
				if(val==ele.title){
					str+=key+"_"+i;
				}
			})
		})

		return str;
	}

	//搜索按钮
	function search(val){
		var seaArr=[],html="",sA=[];
		$.each(jsondata,function(key,key_val){
			$.each(key_val.fenlei,function(idx,ele){
				if(ele.title.indexOf(val)>-1){
					seaArr.unshift(ele.title);
					sA.unshift(key+"_"+idx);
				}
			})
		})

		if(seaArr.length>0){
			$.each(seaArr,function(i,v){
				html+="<li><a data-from='#search' href='#details' data-cate='"+sA[i]+"' title='"+v+"'>"+v+"</a></li>"
			})
			searchIscroll.refresh();
			$("#sea-list").html(html);
		}else{
			$("#sea-list").find("li").text("找不到相关内容");
		}
	}
})(Zepto)