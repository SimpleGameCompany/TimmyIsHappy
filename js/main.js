
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
            this.velocity = new Vector2(50,0);
            this._dead = true;
        }
        
    }

    Update(timeDelta, hitbox){
        if(this._ladridos == 0 && !this._dead){
            clearInterval(this.interval);
            this.velocity = this.velocity.add(this.acceleration);
        }else if(this.position.x <= 1200 && !this._stopped && !this._dead){
            this.interval = setInterval(this.Ladrar.bind(this),1000);
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
    LoadLevel("nivel1",gameObjects);
})
window.addEventListener("keydown",function(ev){
    if(ev.key=="e"){
        canvasManager.ClearCanvas();
    }else{
        canvasManager.AddList(gameObjects);
    }
})

/*document.addEventListener("dblclick",function(ev){
    ev.preventDefault();
})*/

var timmy; 
var speed = -50;

function LoadObjects(ev){
    gameObjects = [];
    for (let i = 0; i < 5; i++) {
        gameObjects[i] = [];
    }
    timmy = new SpriteObject("player", new Vector2(150,550),"none",300,300);
    let back = new SpriteObject("a",new Vector2(0,0),"assets/img/Back.jpeg",720,3000);
    let animation = new Animation("assets/img/Timmy_spritesheet.png",8,138,400,0.1);
    back.velocity = new Vector2(speed,0);
    timmy.AddAnimation(animation,"idle");
    timmy.SetAnimation("idle");
    timmy.anchor = new Vector2(0.5,0.5);
    gameObjects[4].push(timmy);
    gameObjects[3].push(back);
}

function LoadLevel(jsonName,container){
    $.getJSON("assets/files/"+jsonName+".json", function (json) {
        for(var obj of json){
            switch(obj.type){
                case "perro":
                    let perro = new Perro(obj.name,new Vector2(obj.positionx,obj.positiony),obj.img,obj.height,obj.width,timmy,obj.hitnumber,new Vector2(obj.accelerationx,obj.accelerationy), obj.ladridos);
                    perro.anchor = new Vector2(0.5,0.5);
                    perro.velocity = new Vector2(speed,0);
                    container[obj.layer].push(perro);
                break;
                case "alcantarilla":
                    let alcantarilla = new Alcantarilla(obj.name,new Vector2(obj.positionx,obj.positiony),obj.img,obj.height,obj.width,timmy,obj.hitnumber);
                    alcantarilla.anchor = new Vector2(0.5,0.5);
                    alcantarilla.velocity = new Vector2(speed,0);
                    container[obj.layer].push(alcantarilla);
                break;
            }
        }
        StartGame(container);
    });
}

function StartGame(container){
    canvasManager.ClearCanvas();
    canvasManager.AddList(container);
    canvasManager.Start();
}

function StartLoad(){}
