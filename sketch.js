//Create variables here
var dog,dog1,dog2,database;
var feed,add;
var foodobject;
var Feedtime;
var Lastfeed;

function preload()
{
  //load images here
  dogimg1=loadImage("dogImg.png");
  dogimg2=loadImage("dogImg1.png");
}

function setup() {
  createCanvas(800,500);
  database=firebase.database();
  console.log(database);
  
  foodobject=new Food();
  dog=createSprite(550,250,10,10);
  dog.addImage(dogimg1);
  dog.scale=0.2;

  var dogo=database.ref('Food');
  dogo.on("value",readPosition,showError);
  feed=createButton("FEED DOG");
  feed.position(900,60);
  feed.mousePressed(FeedDog);

  add=createButton("ADD FOOD");
  add.position(800,60);
  add.mousePressed(AddFood);

  
  }
  
function draw() {  
background("yellow");

foodobject.display();

  drawSprites();
  
}

  //add styles here


function readPosition(data){
  position=data.val();
  foodobject.updateFoodStock(position);
}
function showError(){
  console.log("Error");
}
function writePosition(x){
  if(x>0){
    x=x-1;
  }
  else{
    x=0;
  }
  database.ref('/').set({
    'Food':x
  })
}
function AddFood(){
  position++
  database.ref('/').update({
    Food:position
  })
}

function FeedDog(){
  dog.addImage(dogimg2);
  foodobject.updateFoodStock(foodobject.getFoodStock()-1)
  database.ref('/').update({
    Food:foodobject.getFoodStock(),
    FeedTime:hour()
  })
}


