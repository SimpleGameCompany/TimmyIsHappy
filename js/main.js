
class Obstacule extends HitableObject{
    /**
     * 
     * @param {String} name 
     * @param {Vector2} position 
     * @param {String} imgSrc 
     * @param {number} height 
     * @param {number} width 
     * @param {SpriteObject} jugador
     
     */
    constructor(name, position, imgSrc, height, width,jugador){
        super(name, position, imgSrc, height, width);
        this._player = jugador;
    }
}

class Alcantarilla extends Obstacule{
    constructor(name, position, imgSrc, height, width, jugador){
        super(name, position, imgSrc, height, width, jugador);
        this.OnClick = function(e){
            this.deactivate();
            canvasManager.clickObjects.delete(this.hitColor);
            this.SetAnimation("clicked");
        }
    }
}

class ObjetoVolador extends Obstacule{
    constructor(name, position, imgSrc, height, width, jugador){
        super(name, position, imgSrc, height, width, jugador);
        this.OnClick = function(e){
            this.deactivate();
            canvasManager.clickObjects.delete(this.hitColor);
            this.SetAnimation("clicked");
        }
    }
}

class Caca extends Obstacule{
    constructor(name, position, imgSrc, height, width, jugador){
        super(name, position, imgSrc, height, width, jugador);
        this.clicks = 0;
        this.OnClick = function(e){
            clicks ++;
            if(clicks == 2){
                this.deactivate();
                canvasManager.clickObjects.delete(this.hitColor);
                this.SetAnimation("clicked");
            }
        }
    }
}

class Paloma extends Obstacule{
    constructor(name, position, imgSrc, height, width, jugador){
        super(name, position, imgSrc, height, width, jugador);
        this.clicks = 0;
        this.OnClick = function(e){
            this.deactivate();
            canvasManager.clickObjects.delete(this.hitColor);
            this.SetAnimation("clicked");
        }
    }
}

class Coche extends Obstacule{
    constructor(name, position, imgSrc, height, width, jugador){
        super(name, position, imgSrc, height, width, jugador);

        this.velocity.add(new Vector2(-10,0));

        this.OnClick = function(e){
            this.deactivate();
            canvasManager.clickObjects.delete(this.hitColor);
            this.SetAnimation("clicked");
        }
    }
}

class Perro extends Obstacule{
    constructor(name, position, imgSrc, height, width, jugador){
        super(name, position, imgSrc, height, width, jugador);
        this.ladridos = 0;
        this.stopped = false;
        this.clicks = 0;
        this.interval;

        this.OnClick = function(e){
            clicks++;
            if(clicks == 2){
                if(interval){
                    clearInterval(interval);
                }
                this.deactivate();
                canvasManager.clickObjects.delete(this.hitColor);
                this.SetAnimation("clicked");
            }
        }
    }

    Update(timeDelta, hitbox){
        if(ladridos == 2){
            clearInterval(interval);
            this.velocity = new Vector2(-130,0);
            super.Update(timeDelta, hitbox);
        }else if(this.position <= 700 && !stopped){
            interval = setInterval(Ladrar,1000);
            this.velocity = new Vector2(0,0);
            super.Update(timeDelta, hitbox);
            this.stopped = true;
        }else{
            super.Update(timeDelta, hitbox);
        }
    }

    Ladrar() {
        this.SetAnimation("ladrar");
        this.ladridos++;
    }
}

var canvasManager;
var menuObjects;
var gameObjects;
window.addEventListener("load",function(ev){
    canvasManager = new CanvasManager("gameCanvas",1280,720);
    canvasManager.ClearCanvas();
    LoadObjects(ev);
    StartGame();
})
window.addEventListener("keydown",function(ev){
    if(ev.key=="e"){
        canvasManager.ClearCanvas();
    }else{
        canvasManager.AddList(gameObjects);
    }
})

function LoadObjects(ev){
    gameObjects = [];
    for (let i = 0; i < 5; i++) {
        gameObjects[i] = [];
    }
    let timmy = new SpriteObject("player", new Vector2(150,550),"none",300,300);
    let back = new SpriteObject("a",new Vector2(0,0),"assets/img/Back.jpeg",720,3000);
    let animation = new Animation("assets/img/Timmy_spritesheet.png",8,138,400,0.1);
    back.velocity = new Vector2(-100,0);
    timmy.AddAnimation(animation,"idle");
    timmy.SetAnimation("idle");
    timmy.anchor = new Vector2(0.5,0.5);
    gameObjects[4].push(timmy);
    gameObjects[0].push(back);
}

function LoadLevel(){}

function StartGame(){
    canvasManager.ClearCanvas();
    canvasManager.AddList(gameObjects);
    canvasManager.Start();
}
