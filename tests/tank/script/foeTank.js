/*敌对坦克*/
function FoeTank(opt){
	Tank.call(this,opt);
}
FoeTank.prototype=new Tank();
FoeTank.prototype.autoMove=function(){
	var int,left=0,top=0,rotate=0,i=2;
	var timer1,timer2,timer3,timer4;
	var that=this;
	setInterval (function(){
	    clearInterval(timer3);
	    clearInterval(timer2);
	    clearInterval(timer4);
	    clearInterval(timer1);
		int=Math.random()*5;
		int=Math.ceil(int);
		switch(int.toString()){
			case '1':
				that.config.direction="up"
				//rotate=-90;
				rotate=180
				timer1=setInterval(function(){
					clearInterval(timer3);clearInterval(timer2);clearInterval(timer4);
					that.tank.style.top=that.tank.offsetTop-i+'px'
					that.turnAround();
				},40)
				break;
			case '2':
				that.config.direction="down"
				//rotate=90;
				rotate=0;
				timer2=setInterval(function(){
					clearInterval(timer3);clearInterval(timer1);clearInterval(timer4);
					that.tank.style.top=that.tank.offsetTop+i+'px'
					that.turnAround();
				},40)
				//alert(int);
				break;
			case '3':
				that.config.direction="left"
				//rotate=180;
				rotate=90
				timer3=setInterval(function(){
					clearInterval(timer1);clearInterval(timer2);clearInterval(timer4);
					that.tank.style.left=that.tank.offsetLeft-i+'px'
					that.turnAround();
				},40)
				//alert(int);
				break;
			case '4':
				that.config.direction="right"
				//rotate=0;
				rotate=-90
				timer4=setInterval(function(){
					clearInterval(timer3);clearInterval(timer2);clearInterval(timer1);
					that.tank.style.left=that.tank.offsetLeft+i+'px'
					that.turnAround();
				},40)
				//alert(int);
				break;
		};

		that.tank.style.transform="rotate("+rotate+"deg)";
		},3000);
};
FoeTank.prototype.onFire=function(){
	var le=5;
	var top;
	var left;
	//console.log(fpeObj)
	var speed=this.config.speed*2;
	if(this.config.direction=="up"){
		top=-speed;
	}else if(this.config.direction=="down"){
		top=speed;
	}else if(this.config.direction=="left"){
		left=-speed;
	}else if(this.config.direction=="right"){
		left=speed;
		
	}
	var foebullet=new foeBullet({
			width:le,
			height:le,
			top:(this.tank.offsetTop+this.tank.offsetHeight/2)-le/2,
			left:(this.tank.offsetLeft+this.tank.offsetWidth/2)-le/2,
			speedX:left,
			speedY:top
		});
	foebullet.init();
	foebullet.move();
}