
/*
<div class="tank">
    	<span class="gun"></span>
</div>
*/
function Tank(opt){
	this.config={
		hp:500,
		sp:300,
		speed:5,
		top:0,
		left:0,
		width:50,
		height:50,
		bgcolor:"#060",
		direction:"down"/*up,right,down,left*/
	};
	for(var i in opt){
		this.config[i]=opt[i];
	}
	this.tank=null;
}

Tank.prototype={
	init:function(){
		this.create();
		//var self=this;
		setTimeout(function(){
			timer=setInterval(function(){
				for(var i in fpeObj){
					var fpeObjC=fpeObj[i];
					if(fpeObjC){
						//console.log(1)
						fpeObjC.onFire()
					}
				}
			},2000)
		},2000)

	},
	create:function(){
		var mainBox=document.getElementById("mainBox");
		var tank=document.createElement("div");
		tank.setAttribute("class","tank");
		var gun=document.createElement("span");
		gun.setAttribute("class","gun");

		tank.style.top=this.config.top+"px";
		tank.style.left=this.config.left+"px";
		tank.style.width=this.config.width+"px";
		tank.style.height=this.config.height+"px";
		//tank.style.background=this.config.bgcolor;

		tank.appendChild(gun);
		mainBox.appendChild(tank);

		this.tank=tank;
	},
	death:function(){
		var mainBox=document.getElementById("mainBox");
		mainBox.removeChild(this.tank);
		delete fpeObj[this.config.id];
		clearInterval()
	},
	move:function(){
		var mainBox=document.getElementById("mainBox");
		var top=0;
		var left=0;
		var rotate=0;
		if(this.config.direction=="up"){
			top=-this.config.speed;
			//rotate=-90;
			rotate=180
		}else if(this.config.direction=="down"){
			top=this.config.speed;
			//rotate=90;
			rotate=0
		}else if(this.config.direction=="left"){
			left=-this.config.speed;
			//rotate=180;
			rotate=90
		}else if(this.config.direction=="right"){
			left=this.config.speed;
			//rotate=0;
			rotate=-90
		}
		this.tank.style.left=this.tank.offsetLeft+left+"px";
		this.tank.style.top=this.tank.offsetTop+top+"px";
		this.tank.style.transform="rotate("+rotate+"deg)";
		this.turnAround();
	},
	turnAround:function(){
		//alert(1);
		if(this.tank.offsetTop<=-this.tank.offsetWidth){
				//console.log(1)
				this.tank.style.top=mainBox.offsetHeight+"px";
		}else if(this.tank.offsetTop>=mainBox.offsetHeight){
				//console.log(2)
				this.tank.style.top=-this.tank.offsetHeight+"px";
		};
		if(this.tank.offsetLeft<=-this.tank.offsetWidth){
				//console.log(3)
				this.tank.style.left=mainBox.offsetWidth+"px";
		}else if(this.tank.offsetLeft>=mainBox.offsetWidth){
				//console.log(4)
				this.tank.style.left=-this.tank.offsetWidth+"px";
		};
	},
	fire:function(){
		var le=10;
		var top;
		var left;
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
		var bullet=new Bullet({
				width:le,
				height:le,
				top:(this.tank.offsetTop+this.tank.offsetHeight/2)-le/2,
				left:(this.tank.offsetLeft+this.tank.offsetWidth/2)-le/2,
				speedX:left,
				speedY:top
			});
		bullet.init();
		bullet.move();
	},
	getCenter:function(){
		this.config.left=this.tank.offsetLeft;
		this.config.top=this.tank.offsetTop;
		var center={
			x:this.config.left+this.config.width/2,
			y:this.config.top+this.config.height/2,
			w_r:this.config.width/2,
			h_r:this.config.height/2
		}
		return center;
	}

}

