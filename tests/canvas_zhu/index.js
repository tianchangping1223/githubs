function lineWidth(object,obj){
	var cas = obj.getContext("2d");
	//划出Y数轴坐标小节
	var x = obj.width;
	var y = obj.height;
	//宽的间距为70，宽是40
	var stepX = 70;
	var width = 40;
	var stepY = 50;
	var lenY = object.y.length;
	var num = y-stepY*7-80;
	//alert(num);   //表格下面的高
	var arr = [50,80];
	var brr = [x-50,80];
	//alert(object.y);  //测试一下链接代码
	for( var i=0;i<lenY;i++){
		cas.font = "15px 微软雅黑";
		cas.fillText(object.y[i],arr[0]-50,y-i*stepY-num);
		cas.beginPath();
		cas.moveTo(arr[0],arr[1]+i*stepY);
		cas.lineTo(brr[0],brr[1]+i*stepY);
		cas.stroke();
	}
	//一根竖线
	cas.beginPath();
	cas.moveTo(50,80);
	cas.lineTo(50,80+stepY*(lenY-1));
	cas.stroke();
	//设置矩形，欲盖弥彰
	cas.beginPath();
	cas.fillStyle = "#fff";
	cas.fillRect(55,77,x-55,y-(y-stepY*(lenY-1)));
	//两个for循环
	var crr = [70,60];
	//宽的间距为70，宽是40，
	for( var i=0;i<object.font.length;i++){
		
		cas.fillStyle = object.font[i].color;
		var item = object.font[i].value;
		
		for( var j=0;j<item.length;j++){
		cas.fillText(object.font[1].value[j]+"/"+object.font[0].value[j],70+j*stepX,y-(y-80-70)*item[j]/350-70,40,item[j]);	
			cas.beginPath();
			cas.fillRect(70+j*stepX,y-(y-80-70)*item[j]/350-70,40,item[j]);
		}
	}
	
}