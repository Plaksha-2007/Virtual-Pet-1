var dog, happyDog, database, foodStock, foodS;
var dogImage, happyDogImage;
var bg;

function preload()
{
  dogImage = loadImage("dogImg.png");
  happyDogImage = loadImage("dogImg1.png");
  bg = loadImage("bg.jpg");
}

function setup() {
  createCanvas(800, 600);
  dog = createSprite(400,320,5,5);
  dog.addImage(dogImage);
  dog.scale = 0.5;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  
  background(bg);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }

  drawSprites();
  textSize(30);
  textFont('Georgia');
  fill(0);
  text("Food stock: "+foodStock, 30,50);
}

function writeStock(x){
  if(x<=0){
    x=0
  } else{
    x=x-1;
  }
  database.ref('/').set({
    Food: x
  })
}

function readStock(data){
  foodS = data.val();
}

