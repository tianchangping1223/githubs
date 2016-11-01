
/*
<p class="bullet"></p>
*/
function Bullet(opt){
	this.config={
		id:null,
		top:0,
		left:0,
		width:10,
		height:10,
		speedX:0,
		speedY:0,
		att:500,
		master:null
	}
	for(var i in opt){
		this.config[i]=opt[i];
	}
	//this.bullet=null;
}

Bullet.prototype={
	init:function(){
		this.create();
	},
	create:function(){
		var bullet=document.createElement("p");
		var mainBox=document.getElementById("mainBox");
		bullet.setAttribute("class","bullet");
		bullet.style.top=this.config.top+"px";
		bullet.style.left=this.config.left+"px";
		mainBox.appendChild(bullet);

		bullet.timer=null;
		this.bullet=bullet;
	},
	move:function(){
		var that=this;
		var mainBox=document.getElementById("mainBox");
		that.bullet.timer=setInterval(function(){
			that.bullet.style.top=that.bullet.offsetTop+that.config.speedY+"px";
			that.bullet.style.left=that.bullet.offsetLeft+that.config.speedX+"px";
			that.config.top=that.bullet.offsetTop;
			that.config.left=that.bullet.offsetLeft;
			if(that.duangListeners){
				that.duangListeners()
			}else{
				that.duangListener();
			}
			if(that.bullet.offsetTop<0||that.bullet.offsetTop>mainBox.offsetHeight||that.bullet.offsetLeft<0||that.bullet.offsetLeft>mainBox.offsetWidth){
					clearInterval(that.bullet.timer);
					that.death();
			}
		},50);
	},
	death:function(){
		var mainBox=document.getElementById("mainBox");
		if(this.bullet){
			mainBox.removeChild(this.bullet);
		}

	},
	duangListener:function(){
		//console.log(1)
		var center=this.getCenter();
		for(var i in fpeObj){
			var fpeObjC=fpeObj[i].getCenter();
			//console.log()
			if(Math.abs(center.x-fpeObjC.x)<(fpeObjC.w_r+center.w_r)&&Math.abs(center.y-fpeObjC.y)<(fpeObjC.h_r+center.h_r)){

				this.death();
				fpeObj[i].death();
				//console.log(fpeObj);
			}
		}
	},
	getCenter:function(){
		var center={
			x:this.config.left+this.config.width/2,
			y:this.config.top+this.config.height/2,
			w_r:this.config.width/2,
			h_r:this.config.height/2
		}
		return center;
	}
}