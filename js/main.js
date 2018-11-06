
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
    constructor(name, position, imgSrc, height, width,jugador, hitnumber){
        super(name, position, imgSrc, height, width);
        this._player = jugador;
        this._hitnumber = hitnumber; 
    }

    OnClick(e){
        this._hitnumber --;
        if(this._hitnumber == 0){
            this.deactivate();
            canvasManager.clickObjects.delete(this.hitColor);
            this.SetAnimation("clicked");
        }
    }
}

class Alcantarilla extends Obstacule{
    constructor(name, position, imgSrc, height, width, jugador, hitnumber){
        super(name, position, imgSrc, height, width, jugador, hitnumber);
    }
}

class ObjetoVolador extends Obstacule{
    constructor(name, position, imgSrc, height, width, jugador, hitnumber){
        super(name, position, imgSrc, height, width, jugador, hitnumber);
    }
    OnClick(e){
        super.OnClick(e);
    }
}

class Caca extends Obstacule{
    constructor(name, position, imgSrc, height, width, jugador, hitnumber){
        super(name, position, imgSrc, height, width, jugador, hitnumber);
    }

    OnClick(e){
        super.OnClick(e);
    }
}

class Paloma extends Obstacule{
    constructor(name, position, imgSrc, height, width, jugador, hitnumber){
        super(name, position, imgSrc, height, width, jugador, hitnumber);
    }

    OnClick(e){
        super.OnClick(e);
    }
}

class Coche extends Obstacule{
    constructor(name, position, imgSrc, height, width, jugador, hitnumber, speed){
        super(name, position, imgSrc, height, width, jugador, hitnumber);

        this.velocity = this.velocity.add(speed);
    }

    OnClick(e){
        super.OnClick(e);
    }
}

class Perro extends Obstacule{
    constructor(name, position, imgSrc, height, width, jugador, hitnumber, speed, ladridos){
        super(name, position, imgSrc, height, width, jugador, hitnumber);
        this._ladridos = ladridos;
        this._stopped = false;
        this.interval;
        this.acceleration = speed;
        this._dead = false;
    }

    OnClick(e){
        super.OnClick(e);
        if(this._hitnumber == 0){
            if(this.interval){
                clearInterval(this.interval);
            }
            this.velocity = new Vector2(30,0);
            this._dead = true;
        }
        
    }

    Update(timeDelta, hitbox){
        if(this._ladridos == 0 && !this._dead){
            clearInterval(this.interval);
            this.velocity = this.velocity.add(this.acceleration);
        }else if(this.position.x <= 700 && !this._stopped && !this._dead){
            this.interval = setInterval(this.Ladrar.bind(this),1000);
            this.velocity = new Vector2(0,0);
            this._stopped = true;
        }
        super.Update(timeDelta, hitbox);
    }

    Ladrar() {
        this.SetAnimation("ladrar");
        this._ladridos--;
        console.log("Guau");
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
    let alcantarilla = new Alcantarilla("alcantarilla",new Vector2(1000,600),"assets/img/alcantarilla.png",50,100,timmy,1);
    let perro = new Perro("perro",new Vector2(1500,600),"assets/img/perro.png",100,-150,timmy,2,new Vector2(-30,0), 2);
    back.velocity = new Vector2(-100,0);
    alcantarilla.anchor = new Vector2(0.5,0.5);
    alcantarilla.velocity = back.velocity;
    perro.anchor = new Vector2(0.5,0.5);
    perro.velocity = back.velocity
    timmy.AddAnimation(animation,"idle");
    timmy.SetAnimation("idle");
    timmy.anchor = new Vector2(0.5,0.5);
    gameObjects[4].push(alcantarilla);
    gameObjects[4].push(timmy);
    gameObjects[4].push(perro);
    gameObjects[3].push(back);
}

function LoadLevel(){}

function StartGame(){
    canvasManager.ClearCanvas();
    canvasManager.AddList(gameObjects);
    canvasManager.Start();
}
