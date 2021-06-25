var path,playerCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var opPink1Img,opPink2Img;
var opYellow1Img,opYellow2Img;
var opRed1Img,opRed2Img;
var gameOverImg,cycleBell;

var pinkCycleG, yellowCycleG,redCycleG; 

//gameStates
var PLAY =1;
var END =0;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
  
  opPink1Img = loadAnimation("opponent1.png","opponent2.png");
  opPink2Img = loadAnimation("opponent3.png");
  
  opYellow1Img = loadAnimation("opponent4.png","opponent5.png");
  opYellow2Img = loadAnimation("opponent6.png");
  
  opRed1Img = loadAnimation("opponent7.png","opponent8.png");
  opRed2Img = loadAnimation("opponent9.png");
  
  cycleBell = loadSound("bell.mp3");
  gameOverImg = loadImage("gameOver.png");
}

function setup(){
  
createCanvas(1200,300);
//Making a moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating the player cyclist
playerCyclist  = createSprite(70,150);
playerCyclist.addAnimation("SahilRunning",mainRacerImg1);
playerCyclist.scale=0.07;
  
//setting the collider for playerCyclist
playerCyclist.setCollider("rectangle",0,0,30,30);
  
//Adding the gameOver icon
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
//Creating new groups
pinkCycleG = new Group();
yellowCycleG = new Group();
redCycleG = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();

  //aading texts
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  //increasing the distance
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   //making the player cyclist move with the help of mouse 
   playerCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   playerCyclist .collide(edges);
  
  //giving the code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to ring the cycle bell
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continuous opponent cyclists
  var select_opPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_opPlayer == 1) {
      pinkCyclists();
    } else if (select_opPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }
  
  //making the game end when the opponent cyclists collide with the player cyclist
   if(pinkCycleG.isTouching(playerCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",opPink2Img);
    }
    
    if(yellowCycleG.isTouching(playerCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",opYellow2Img);
    }
    
    if(redCycleG.isTouching(playerCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",opRed2Img);
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Press R to Restart the game!", 500,200);
  
    path.velocityX = 0;
    playerCyclist.velocityY = 0;
    playerCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCycleG.setVelocityXEach(0);
    pinkCycleG.setLifetimeEach(-1);
  
    yellowCycleG.setVelocityXEach(0);
    yellowCycleG.setLifetimeEach(-1);
  
    redCycleG.setVelocityXEach(0);
    redCycleG.setLifetimeEach(-1);
    
    if(keyDown("R")) {
      reset();
    }
}
}

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",opPink1Img);
        player1.setLifetime=170;
        pinkCycleG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",opYellow1Img);
        player2.setLifetime=170;
        yellowCycleG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",opRed1Img);
        player3.setLifetime=170;
        redCycleG.add(player3);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  playerCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  pinkCycleG.destroyEach();
  yellowCycleG.destroyEach();
  redCycleG.destroyEach();
  
  distance = 0;
}
