//variables
var score = 0;
var fruitsLost = 0;
var maxNumberMisses = 5;
var fruits = [new Fruit(),new Fruit(),new Fruit()];


var canvas;
var canvasMinLimit = 0;
var canvasMaxLimit = 0;

var basket;
var numberOfFruits = 5;
const fruitInitialSpeed = 1;
var fruitPathColor;

// sound variables
var soundCatchFruit; 
var backgroundMusic; 
var endGameSound; 
var fruitLostSound; 


function preload() {
    basket = new Basket();
    
    basket.sprite = loadImage('assets/sprites/basket.png');
    
    soundCatchFruit = loadSound("assets/audio/pop.mp3"); 
    backgroundMusic = loadSound("assets/audio/ShanghaiActionLoop.mp3"); 
    endGameSound = loadSound("assets/audio/ShanghaiActionEnd.mp3"); 
    fruitLostSound = loadSound("assets/audio/fruit_lost.mp3");
    
    
    for (count in fruits) {
        fruits[count].PreLoadFruits();
    }
}


function setup() {
    // put setup code here
    canvas = createCanvas(640, 480);
    centerCanvas();
    
    basket.x = width/2;
    basket.y = height - basket.sprite.height - 5;
    
    canvasMinLimit = 5;
    canvasMaxLimit = width - (basket.sprite.width + 10);
    
    for (count in fruits)
    {
        fruits[count].PlaceFruitInRandomPosition();
        fruits[count].yThreshold = height - (basket.sprite.height/2);    
    }
    //loop([startTime], [rate], [amp], [cueLoopStart], [duration]
    endGameSound.setVolume(0.3);
    backgroundMusic.setVolume(0.3);
    backgroundMusic.loop();
}

function draw() {
    // clearing canvas before drawing
    clear();

    // change color mode to RGB
    colorMode(RGB);
    // change canvas backgroud color 
    background(223,225,239);
    if(fruitsLost < maxNumberMisses){
        
        for (count in fruits){

            fruits[count].UpdateFruitPosition(basket.x,basket.y,basket.sprite.width,basket.sprite.height);
        }
        
        basket.MoveBasket();
        
        for (count in fruits){

            fruits[count].CheckForBasket(basket.x,basket.y,basket.sprite.width,basket.sprite.height);
        }
        
    }
    else{
        backgroundMusic.stop();
        
        if(!endGameSound.isPlaying()) endGameSound.play();
        
        gameOver();
    }
    
    
    //interface 
    fill(81, 43, 102)
        .textSize(15)
        .text("SCORE: " + score,10,20)
        .text("MISSES: " + fruitsLost + " of " + maxNumberMisses,10,40);
}

// =======================================
// Centralise Canvas:
// =======================================
function centerCanvas() {
  canvas.position((windowWidth - width) / 2, (windowHeight - height) / 3);
}

function windowResized() {
  centerCanvas();
}

function gameOver(){
    fill(81,43,102)
    .textSize(30)
    .textStyle('bold')
    .text("YOUR FINAL SCORE IS",width/4,height/2)
    .text(score,width/2,(height/2)+30);
    
    let buttonLeftX = (width/4)+((width/4)/2)+10;
    let buttonLeftY = (height/2)+40;
    let buttonRightX = 150;
    let buttonRightY = 65;
    
	hit = collideRectRect(buttonLeftX,buttonLeftY,buttonRightX,buttonRightY,mouseX,mouseY,16,16);
    
    if(hit){
        fill(81,43,102);
        rect(buttonLeftX,buttonLeftY,buttonRightX,buttonRightY);
        fill(255,30,255)
        .textSize(20)
        .text("Play Again",buttonLeftY,buttonLeftY+40);
        
    }else{
        fill(145,0,180);
        rect(buttonLeftX,buttonLeftY,buttonRightX,buttonRightY);
        fill(255,255,255)
        .textSize(20)
        .text("Play Again",buttonLeftY,buttonLeftY+40);
    }
    
    // if button is pressed then game resets (score and all fruit's position)
    if (hit && mouseIsPressed) {
        endGameSound.stop();
        backgroundMusic.loop();
        score = 0;
        fruitsLost = 0;
        
        for (count in fruits)
        {
            fruits[count].PlaceFruitInRandomPosition();
            fruits[count].yThreshold = height - (basket.sprite.height/2);
            fruits[count].speed = fruitInitialSpeed;
        }
    }
	//rect(mouseX,mouseY,50,75);
    
}