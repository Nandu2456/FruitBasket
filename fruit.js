function Fruit() {
    /** x position of the fruit */
    this.x = 0;
    /** y position of the fruit */
    this.y = 10;
    this.yThreshold = 0;
    this.initialSpeed = 2;
    this.startSplashTime = 0;
    this.splashPosX = 0;
    this.splashPosY = 0;
    
    this.sprite = null; // Basket sprite
    this.splash_sprite = null;
    
    this.speed = this.initialSpeed ; 
    this.increaseSpeed = 0.3;
    this.canvasMinBoundary = -10; 
    this.previousFruitIndex = 0;
    this.fruitIndex = 0;
    
    this.fruitPath = [ "assets/sprites/blueberry.png"
                      ,"assets/sprites/cherry.png"
                      ,"assets/sprites/grape.png"
                      ,"assets/sprites/green_apple.png"
                      ,"assets/sprites/orange.png"
                      ,"assets/sprites/pear.png"
                      ,"assets/sprites/pepper.png"
                      ,"assets/sprites/pumpkin.png"
                      ,"assets/sprites/red_apple.png"
                      ,"assets/sprites/strawberry.png"
                      ,"assets/sprites/tomato.png"
                     ];
    
    this.fruitSplash = "assets/sprites/splash.png";
    
    this.fruitSprites = [];
    
    this.PreLoadFruits = function(){

        for (count in this.fruitPath) {
            this.fruitSprites.push(loadImage(this.fruitPath[count]));
        }
        this.splash_sprite = loadImage(this.fruitSplash);
    }
    
    
    this.PlaceFruitInRandomPosition = function() {
        this.sprite = this.GetRandomFruit();
        this.x = getRandom(canvasMinLimit,canvasMaxLimit);
        this.y = getRandom(-1000,-10);
        
    }
    
    this.UpdateFruitPosition = function() {
        this.y += this.speed;

        //this.CheckForBasket(basketPosX,basketPosY, basketWidth,basketHeight);
        
        
        if(this.startSplashTime > 0)
            this.DoSplash();
        
        //reloads pumpkin position when it is out of canvas
        if(this.y >= height - (this.sprite.height/2))
        {
            this.startSplashTime = millis();
            this.splashPosX = this.x;
            this.splashPosY = this.y;
            fruitLostSound.play();
            this.PlaceFruitInRandomPosition();
            fruitsLost += 1;
            //tint(0, 153, 204);  // Tint blue
        }
            
        image(this.sprite, this.x, this.y);
    }
    
    this.CheckForBasket = function(basketPosX,basketPosY, basketWidth,basketHeight){
                
       /* if (this.y + this.sprite.height > this.yThreshold &&
        (this.x >= basketPosX && this.x <= (basketPosX + basketWidth))){
            score += 1;
            this.speed += this.increaseSpeed;
            this.PlaceFruitInRandomPosition();
        }*/
        
        fruitInBasket = collideRectRect(basketPosX,this.yThreshold, basketWidth,basketHeight,this.x,this.y,this.sprite.width,this.sprite.height);
        
        /*
        LOG - TODO - ADD COMMAND KEY TO DISPLAY LOGS
        fill(255,255,0,50);
        rect(basketPosX,this.yThreshold,basketWidth,basketHeight);
        fill(255,0,255,50);
        rect(this.x,this.y,this.sprite.width,this.sprite.height);
        */
        
        if(fruitInBasket){
            soundCatchFruit.play();
            score += 1;
            this.speed += this.increaseSpeed;
            this.PlaceFruitInRandomPosition();
        }
    }
    
    this.GetRandomFruit = function(){
        this.previousFruitIndex = this.fruitIndex;
        this.fruitIndex = Math.floor(random(0, this.fruitSprites.length));
        return this.fruitSprites[this.fruitIndex];
    }
    
    this.DoSplash = function(){
        if(millis() < this.startSplashTime+1000){

             switch(this.previousFruitIndex){
                    case 0:
                        tint(0, 153, 204);
                        break;
                    case 1:
                        tint(255, 46, 2);
                        break;
                    case 2:
                        tint(0, 153, 204);
                        break;
                    case 3:
                        tint(100, 185, 72);
                        break;
                    case 4:
                        tint(255, 118, 14);
                        break;
                    case 5:
                        tint(209, 198, 28);
                        break;
                    case 6:
                        tint(253, 198, 64);
                        break;
                    case 7:
                        tint(255, 114, 18);
                        break;
                    case 8:
                        tint(186, 68, 58);
                        break;
                    case 9:
                        tint(255, 46, 2);
                        break;
                    case 10:
                        tint(240, 70, 50);
                        break;
                    }

             //this.fruitPathColor[this.fruitIndex];
             image(this.splash_sprite,this.splashPosX-25,this.splashPosY-25);   
             noTint();
        }else {
            this.startSplashTime = 0;
        }
    }
}
    