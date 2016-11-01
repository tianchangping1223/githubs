function lineChart(option,canvas){

	var ctx = canvas.getContext("2d");
	var width = canvas.width;
	var height = canvas.height;


	var lenx = option.x.length;
	var stepWidth = (width-80)/(lenx-1);

	var leny = option.y.length;
	var stepHeight = (height-80)/(leny-1);

	var pyx = [40,40];
	var pyy = [40,height-40];

	for(var i =0;i<lenx;i++){

		ctx.font = "25px 微软雅黑";
		ctx.fillText(option.x[i],pyy[0]-15,pyy[1]+30);

		ctx.beginPath();
		ctx.moveTo(pyx[0],pyx[1]);
		ctx.lineTo(pyy[0],pyy[1]);

		pyx[0]+=stepWidth;
		pyy[0]+=stepWidth;

		ctx.stroke();

	}


	var xpy = [40,40];
	var ypy = [width-40,40];


	for(var i =0;i<leny;i++){
 

		ctx.font = "20px 宋体";

		ctx.fillText(option.y[i],0,height-stepHeight*i-30);

		ctx.beginPath();
		ctx.moveTo(xpy[0],xpy[1]);
		ctx.lineTo(ypy[0],ypy[1]);

		xpy[1]+=stepHeight;
		ypy[1]+=stepHeight;

		ctx.stroke();
	
	}


	ctx.font = "20px 宋体";
	ctx.fillText(option.xt,40,30);



	for(var i =0;i<option.data.length;i++){
 		

		
		var item = option.data[i].da;


			for(var n=0;n<item.length;n++){

				ctx.strokeStyle= option.data[i].color;

				ctx.beginPath();
				ctx.moveTo(40+n*stepWidth,height-(height-80)*( item[n]/option.y[leny-1])-40);
				ctx.lineTo(40+(n+1)*stepWidth,height-(height-80)*(item[n+1]/option.y[leny-1])-40);
				ctx.stroke();


				ctx.beginPath();
				ctx.fillStyle = "#fff";

				ctx.arc(40+n*stepWidth,height-(height-80)*( item[n]/option.y[leny-1])-40,8,0,2*Math.PI,false);

				ctx.stroke();
				ctx.fill();



			}
	
	}



}