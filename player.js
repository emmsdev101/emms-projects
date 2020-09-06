class Player{
  constructor(){
    this.x;
    this.y;
    this.color;
    this.size;
    this.ctx;
    this.alpha=1;
    this.ins=-.1;
    this.on_jump=false;
  }
  draw(ctx){
    this.ctx=ctx;
    if(this.on_jump){
      if (this.alpha == 1) {
        this.ins = -.2;
      }
      if (this.alpha < .5) {
        this.ins = .2;
      }
      this.alpha += this.ins
    }else{
      this.alpha=1;
    }
    
   
    var color="rgba(255,89,6,"+this.alpha+")";
    this.ctx.fillStyle=color;
    this.ctx.beginPath();
    this.ctx.arc(this.x,this.y,this.size,0,360);
    ctx.fill();
  }
  alive(){
    if(this.y<window.innerHeight){
      return true;
    }else{
      return false;
    }
  }
}