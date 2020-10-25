var stars = 0;
var survivalTime = 0;
var back, backI;
var monkey, monkey_running, monkeyI;
var invisible, invisible2;
var obstacle, obstacleI;
var star, starI;
var starG, obstacleG;
var over, overI, restartImg;
var score;
var gameState = "play";
var end;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png",
    "sprite_3.png", "sprite_4.png", "sprite_5.png",
    "sprite_6.png", "sprite_7.png", "sprite_8.png");
  backI = loadImage("back3.jpg");
  obstaceImage = loadImage("obstacle.png");
  starI = loadImage("star.png");
  overI = loadImage("end.png");

}

function setup() {
  createCanvas(600, 600);
  console.log(frameRate());
console.log(frameCount);
  
  back = createSprite(250, 140, 600, 600);
  back.addImage(backI);
  back.velocityX = -4;
  back.x = back.width / 2;
  console.log(back.x);
  monkey = createSprite(80, 100, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  monkey.setCollider("rectangle", 0, 0, 400, 500)
  monkey.debug = true
  invisible = createSprite(250, 210, 500, 1);
  invisible.visible = false;

  invisible2 = createSprite(250, 10, 500, 1);
  invisible2.visible = false;


  // score variables and groups
  obstacleGroup = new Group();
  starG = new Group();

}

function draw() {
  background("white")

  if (gameState === "play") {


    if (back.x < 350) {
      back.x = back.width / 2;
    }

    if (keyDown("space") && monkey.y >= 160) {
      monkey.velocityY = -12;
    }


    if (starG.isTouching(monkey)) {
      stars = stars + 1;
      starG.destroyEach();
    }

    if (obstacleGroup.isTouching(monkey)) {
      gameState = end;
      starG.destroyEach();
      starG.setVelocityXEach(0);
      starG.visible = false;

    }

    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(invisible);
    monkey.collide(invisible2);

  } else if (gameState === end) {
    back.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    starG.setVelocityXEach(0);
    starG.visible = false;
    over = createSprite(300, 150, 10, 10);
    over.addImage(overI);
    over.scale = 0.9;
    
    obstacleGroup.setLifetimeEach(-1);
    starG.setLifetimeEach(-1);
  }

  obstacles();
  star();

  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");

  text("Star:" + stars, 500, 50);
  stroke("black");

  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount /frameRate());
  text("Survival Time: " + survivalTime, 100, 50);
}


function star() {
  if (frameCount % 80 === 0) {
    var star = createSprite(500, 200.10, 10);
    star.addImage(starI);
    star.y = Math.round(random(120, 200))
    star.velocityX = -6;
    star.scale = 0.09;
    star.lifetime = 600;
    starG.add(star);
  }
}

function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(500, 200, 10, 10);
    obstacle.addImage(obstaceImage);
    obstacle.velocityX = -9;
    obstacle.scale = 0.1;
    obstacleGroup.add(obstacle);
    obstacle.lifetime = 600;
     obstacle.debug = true;
    obstacle.setCollider("circle", 0, 0, 200);
  }
}