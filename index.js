window.onload = init;

var canvas;
var ctx;
var gamemap;
var blocks = [];
var player;

var max_blocks = 3;
var width;
var height;
var velocity = 2.5;
var gravity = 1;
var window_width = window.innerWidth;
var window_height = window.innerHeight;
var background;
var sky;
var start=false;
var game_over=false;

var fps=60;

function init() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas = document.getElementById("canvas");
  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext("2d");

  ground = new Ground();
  gamemap = new GameMap(ctx);
  player = new Player();
  background = new Ground();
  sky = new GameMap(ctx);
  
  background.score=0;
  background.high_score=0;
  setup();

  setInterval(function() {
    
    if(start&&!game_over){
      runGame();
    }
    drawElements();
  }, 1000 / 60);
}
/*===========SETTING UP OBJECTS=========*/
function setup() {
  gravity=1;
  player.x = 50;
  player.y = 100;
  player.size = 10;
  player.color = "#bac2c1";
  var block= new Ground();
  blocks.splice(0,blocks.length);
  block.color = "#c47b23";
  block.x = 0;
  block.y = 300;
  block.width = window.innerWidth * 2;
  block.height = 10;
  blocks.push(block);

  background.color = "black";
  background.x = 0;
  background.y = 0;
  background.setScore();
  background.width = window.innerWidth;
  background.height = window.innerHeight;
  sky.star_count = 50;
  sky.color = "white";
 
  for (i = 0; i < sky.star_count; i++) {
    sky.star_x.push(Math.random() * window_width);
    sky.star_y.push(Math.random() * window_height);
  }
}
/* ============== GENARATE BLOCKS ===========*/
function generateBlocks() {
    // Generate new block if current block has fully passed on window.
  var block_delta = new Ground();
  block_delta.color="#c47b23";
  var last_block = blocks[blocks.length - 1];
  if (last_block.x + last_block.width < window.innerWidth + 100) {
    block_delta.x = window.innerWidth + 200;
    block_delta.y = randomize(300, 100);
    block_delta.width = randomize(50, 100);
    block_delta.height = 10;
    blocks.push(block_delta);
  }
  /* ======= DETELING BLOCKS THAT'S NO LONGER VISIBLE ====*/
  if (blocks[0].x + blocks[0].width <= 0) {
    var atr = blocks[0];
    blocks.splice(0, 1);
  }
}
/* =============RUNNING THE GAME==========*/
function runGame() {
  // MOVING THE BLOCKS
  for (i = 0; i < blocks.length; i++) {
    blocks[i].x -= velocity;
  }
  generateBlocks();
  fall();
  if(!player.alive()){
    game_over=true;
  }else{
    background.countScore()
  }
}
/* =================RENDERING ELEMENTS==========*/
function drawElements() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  gamemap.draw(background)
  sky.background();
  gamemap.draw(player);
  background.drawScore(ctx);
  for (var i = 0; i < blocks.length; i++) {
    gamemap.draw(blocks[i]);
  }
  if(game_over){
    gamemap.gameOverScreen();
}
if(!start){
  gamemap.startScreen();
}
}
/*================MAKING PLAYER FALL==========*/
function fall() {
  player.y += gravity;
  var bl = blocks[0];
  if (bl.x <= player.x + player.size && bl.x + bl.width >= player.x && player.y + player.size >= bl.y && player.y + player.size <= bl.y + bl.height) {
    gravity = 0;
    player.y = bl.y - player.size;
    player.on_jump=false;
  } else {
    gravity += 0.2;
    player.on_jump=true;
  }
}
function randomize(min, range) {
  return Math.floor(Math.random() * range) + min;
}
function jump() {
  if (gravity == 0) {
    gravity = -7;
  }
}

document.addEventListener('touchstart', function() {
  if(!start){
    start=true;
  }
  if(game_over){
    game_over=false;
    setup();
}
jump();
});

