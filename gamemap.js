class GameMap {
  constructor(ctx) {
    this.ctx = ctx;
    this.width=window.innerWidth;
    this.height;
    this.color;
    this.star_x=[];
    this.star_y=[];
    this.star_count;
  }
  draw(obj) {
    obj.draw(this.ctx);
  }
  clear(ctx) {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  background(){
    var x=this.star_x;
    var y=this.star_y;
    var st=this.star_count;
    for(var i=0;i<st;i++){
      var r=Math.random()*255;
      var g=Math.random()*255;
      var b=Math.random()*255;
      var color="rgba("+r+","+g+","+b+")";
      this.ctx.beginPath();
      this.ctx.fillStyle=color;
      this.ctx.arc(x[i],y[i],Math.random()*2,0,360);
      this.ctx.fill();
    }
  }
  startScreen(){
    var ctx=this.ctx;
    ctx.fillStyle="#fb3b28";
    ctx.font="25px Arial";
    ctx.fillText("VOID ESCAPE",100,280);
    ctx.font="20px Arial";
    ctx.fillText("Touch to start",115,380);
    ctx.strokeStyle="#fb3b28";
    ctx.strokeRect(60,window.innerHeight/2-180,250,300);
    
  }
  gameOverScreen(){
    var ctx=this.ctx;
    ctx.fillStyle="#fb3b28";
    ctx.font="30px Arial";
    ctx.fillText("Game Over",100,250);
    ctx.font="20px Arial";
    ctx.fillText("Touch to start",115,350);
    ctx.strokeStyle="#fb3b28";
    ctx.strokeRect(60,window.innerHeight/2-180,250,300);
    }
  
}