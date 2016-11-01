$(function(){
		//获取json 
		getJson();
		function getJson(){
			$.ajax({
				url:"json/data.json",
				dataType:"json",
				type:"get",
				success:function(json){
					render(json);
				}
			});
		}
		function render(data){			
            $(".first_sel").each(function(){
            	var key=$(this).data("key");
            	//console.log(key);
            	if(key=="localArea"){
 					var arr=data[key];
            	}else{
            		var arr=data[key].option;
            	}
                 
            	var str="<option>请选择</option>";
            	$.each(arr,function(i,ele){
            		var name=ele.text||ele.name;
            		var value=ele.id||ele.value;
            		str+='<option value="'+value+'">'+name+'</option>'
            	})
            	$(this).html(str);

            	bindEvent($(this),arr);
            })
		}	
        //绑定事件
        function bindEvent(ele,arr){
        	var x=0;
            ele.on("change",function(){
            	var opts=this.options;            	
            	var optindex=this.selectedIndex;
            	var opttxt=opts[optindex].innerHTML;       	
            	$spans=$(this).prev();
                $spans.html(opttxt);//设置第一个文本框的内容

                 if(opttxt=="请选择"){
                  $(this).parents(".menus1").next().hide();
                 }else{
                  $(this).parents(".menus1").next().show();

                    var str="<option>请选择</option>";
            	    $.each(arr,function(i,ele){
            	   	  var name=ele.name||ele.text;
            		  if(name==opttxt){
            		 	$.each(ele.option,function(idx,e){
            		 		var names=e.name||e.text;
            		 		var vals=e.id||e.value;
            		 		str+='<option value="'+vals+'">'+names+'</option>'
            		 	})
            		  }
            	    });
            	    $(this).parents(".menus1").next().find("select").html(str);      
            	  }         
            })
            ele.parents(".menus1").next().find("select").on("change",function(){
             	 var opts=this.options;            	
            	var optindex=this.selectedIndex;
            	var opttxt=opts[optindex].innerHTML;
            	$spans=$(this).prev();
                $spans.html(opttxt);
             })

        }
	})