var monkey, monkey_running, ground
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0
var survivaltime = 0
var play = 0
var end = 1
var gameState = 0

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

  monkey = createSprite(100, 144, 1, 10);
  monkey.addAnimation("big", monkey_running);
  monkey.scale = 0.07;

}



function setup() {

  createCanvas(600, 200)
  ground = createSprite(300, 170, 600, 10)
  ground.velocityX = -10

  obstaclesGroup = new Group();
  FoodGroup = new Group();
}


function draw() {

  background("black");

  if (gameState === play) {
    if (frameCount % 80 === 0) {
      bananaSpawn();
    }

    if (frameCount % 100 === 0) {
      obstaclesSpawn();
    }
    survivalTime = Math.ceil(frameCount / frameRate());
  }
  if (obstaclesGroup.isTouching(monkey)) {
    gameState = end
  }
  if (ground.x < 300) {
    ground.x = ground.width / 2;
  }
  monkey.velocityY = monkey.velocityY + 2
  monkey.collide(ground)

  if (keyDown("space") && monkey.y >= 140) {
    monkey.velocityY = -20;
  }

  if (FoodGroup.isTouching(monkey)) {
    FoodGroup.destroyEach();
    score = score + 1;
  }
  if (gameState === end) {
    monkey.velocityY = 0;
    monkey.destroy();
    obstaclesGroup.destroyEach();
    FoodGroup.destroyEach();
    
    stroke("red");
  textSize(25);
  fill("red");
  textFont("0_0 Helvetica")
  text(" GAME OVER", 250, 100)
  }


  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("score :" + score, 500, 50)

  text("survival time : " + survivalTime, 25, 50)
}


function bananaSpawn() {
  banana = createSprite(600, 50, 10, 10);
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -10

  banana.lifetime = 60
  FoodGroup.add(banana);
}

function obstaclesSpawn() {
  obstacle = createSprite(600, 150, 10, 10);
  obstacle.addImage(obstaceImage);
  obstacle.scale = 0.1;
  obstacle.velocityX = -10;

  obstacle.lifetime = 60.
  obstaclesGroup.add(obstacle);

}