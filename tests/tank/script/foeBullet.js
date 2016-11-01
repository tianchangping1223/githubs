function foeBullet(opt){
	Bullet.call(this,opt);
}
//console.log(fpeObj)
foeBullet.prototype=new Bullet();
/*foeBullet.prototype._move=function(){
		var that=this;
		var mainBox=document.getElementById("mainBox");
		that.bullet.timer=setInterval(function(){
			that.bullet.style.top=that.bullet.offsetTop+that.config.speedY+"px";
			that.bullet.style.left=that.bullet.offsetLeft+that.config.speedX+"px";
			that.config.top=that.bullet.offsetTop;
			that.config.left=that.bullet.offsetLeft;
			that.duangListeners();
			console.log(that.config.left)
			if(that.bullet.offsetTop<0||that.bullet.offsetTop>mainBox.offsetHeight||that.bullet.offsetLeft<0||that.bullet.offsetLeft>mainBox.offsetWidth){
					clearInterval(that.bullet.timer);
					that.death();
			}
		},50);
};*/
/*foeBullet.prototype.dead=function(){
		var mainBox=document.getElementById("mainBox");
		mainBox.removeChild(this.bullet);
	};*/
foeBullet.prototype.duangListeners=function(){
	var center=this.getCenter();
	//console.log(center);
	var mytank=document.getElementsByClassName('tank')[0];
	//console.log(mytank)
	if(mytank.offsetLeft<=center.x&&center.x<=mytank.offsetLeft+mytank.offsetWidth&&mytank.offsetTop<=center.y&&center.y<=mytank.offsetTop+mytank.offsetHeight){
		//console.log('game over')
		var r=confirm('you are dead,play again?')
		if(r){
			document.getElementById("mainBox").innerHTML='';
			history.go(0);
		}else{
			window.close();
		}
	}
}


