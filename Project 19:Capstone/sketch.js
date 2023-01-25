

var copter,copterImg
var copter2,copter2Img
var missile,missileImg
var scenary,scenaryImg
var game_over,game_overImg
var restart,restartImg
var obstaclesGroup
var gameState = "play"
var score = 0
var winImage


function preload(){
copterImg = loadAnimation("copter.png")
copter2Img = loadAnimation("copter2.png")
missileImg = loadImage("missile.png")
scenaryImg = loadImage("scenary.png")
restartImg = loadImage("restart.png")
game_overImg = loadImage("game_over.png")
winImage = loadImage("backgroundwin.png")
}

function setup() {
 createCanvas(900,500);
 copter = createSprite(55,250);
 copter.addAnimation("helicopter",copterImg)
 copter.addAnimation("collided",copter2Img)
 copter.scale = 0.15
 scenary = createSprite(880,325)
 scenary.addImage("scenary",scenaryImg)
 scenary.scale=0.3
 scenary.velocityX = -5
 scenary.depth = copter.depth
 copter.depth = copter.depth + 1
 game_over = createSprite(470,200)
 game_over.addImage("game over",game_overImg)
 game_over.visible = false
 restart = createSprite(460,300,500,500)
 restart.addImage("restart",restartImg)
 restart.scale = 0.1
 restart.visible = false
 copter.setCollider("circle",50,0,160);
 obstaclesGroup = createGroup();
}

function draw() {
 background(200);

 


 if (scenary.x<10){
    scenary.x=900
 }


 if (gameState=="play"){
  score = score + (Math.round(frameCount/100))
  copter.addAnimation("copter",copterImg)
   
   if (keyDown("RIGHT_ARROW")){
      copter.x = copter.x + 15
    }
    if (keyDown("LEFT_ARROW")){
      copter.x = copter.x - 15
    }
    if (keyDown("UP_ARROW")){
      copter.y = copter.y - 10
    }
    if (keyDown("DOWN_ARROW")){
      copter.y = copter.y + 10
    }
    if (copter.y>540){
      gameState = "end"
    }
    if (copter.y<-40){
      gameState = "end"
    }
    if (score==1000){
      gameState = "win"
     }
    
    if (obstaclesGroup.isTouching(copter)){
      gameState = "end"
    }
    if (frameCount%50==0){
      missile = createSprite(900,Math.round(random(10,490)))
      missile.addImage("missile",missileImg);
      missile.scale = 0.1;
      missile.velocityX = -7;
      missile.setCollider("rectangle",-10,20,700,missile.height-100)
      obstaclesGroup.add(missile)
      }
    }
    else if (gameState == "end"){
    game_over.visible = true;
    restart.visible = true;
    copter.velocityX = 0;
    copter.velocityY = 0;
    scenary.velocityX = 0
    obstaclesGroup.setVelocityXEach(0);
    copter.changeAnimation("collided",copter2Img)
    copter.scale = 0.2
    if(mousePressedOver(restart)){
      reset();
      copter.changeAnimation("copter",copterImg)
      scenary.velocityX = -5
    }
    }
    else if (gameState == "win"){
    copter.velocityX = 0;
    copter.velocityY = 0;
    scenary.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    var square = createSprite(450,200)
    square.scale = 1.5
    square.addImage("win",winImage)
    }
    
    
    
      

 drawSprites();
 text("score:"+score,700,40);
}
function reset(){
  frameCount = 0
  copter.x = 55;
  copter.y = 250;
  game_over.visible = false
  restart.visible = false
  obstaclesGroup.destroyEach();
  score = 0;
  copter.scale = 0.15
  gameState = "play"
}

