class Ground{
  
  constructor(){
    this.x;
    this.y
    this.width;
    this.height;
    this.color;
    this.score;
    this.high_score;
  }
  draw(ctx){
    var mctx=ctx;
    mctx.fillStyle=this.color;
    mctx.fillRect(this.x,this.y,this.width,this.height);
  }
  drawScore(ctx){
    ctx.fillStyle = "#fb3b28";
    ctx.font = "15px Arial";
    ctx.fillText("Score:  " + this.score, 15, 30);
    ctx.fillText("High Score: " + this.high_score, window.innerWidth - 150, 30);
    ctx.strokeStyle = "#fb3b28";
    ctx.strokeRect(10, 10, window.innerWidth - 20, 30);
  }
  setScore(){
    if(this.score>this.high_score){
      this.high_score=this.score;
    }
    this.score=0;
  }
  countScore(){
    this.score++;
  }
}