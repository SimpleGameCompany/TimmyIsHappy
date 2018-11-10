
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
    constructor(name, position, imgSrc, height, width, jugador, hitnumber){
        super(name, position, imgSrc, height, width, jugador, hitnumber);
    }

    OnClick(e){
        super.OnClick(e);
    }
}

class Perro extends Obstacule{
    constructor(name, position, imgSrc, height, width, jugador, hitnumber, ladridos){
        super(name, position, imgSrc, height, width, jugador, hitnumber);
        this._ladridos = ladridos;
        this._stopped = false;
        this.interval;
        this._dead = false;
    }

    OnClick(e){
        super.OnClick(e);
        if(this._hitnumber == 0){
            if(this.interval){
                clearInterval(this.interval);
            }
            //this.velocity = new Vector2(speed+65,0);
            this._dead = true;
        }
        
    }

    Update(timeDelta, hitbox){
        if(this._ladridos == 0 && !this._dead){
            clearInterval(this.interval);
            this.velocity = new Vector2(speed+65,0);
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
var loading;
window.addEventListener("load",function(ev){
    loading = $(".loading");
    canvasManager = new CanvasManager("gameCanvas",1280,720);
    canvasManager.ClearCanvas();
    StartLoad();
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

document.addEventListener("dblclick",function(ev){
    ev.preventDefault();
})

var timmy; 
var speed = -50;

function LoadObjects(ev){
    gameObjects = [];
    for (let i = 0; i < 5; i++) {
        gameObjects[i] = [];
    }

    timmy = new SpriteObject("player", new Vector2(70,525),"none",205,138);
    let animation = new Animation("assets/img/Timmy_spritesheet.png",8,138,205,0.1);
    timmy.AddAnimation(animation,"idle");
    timmy.SetAnimation("idle");
    timmy.anchor = new Vector2(0.5,0.5);
    gameObjects[2].push(timmy);

    let backSun = new SpriteObject("backSun",new Vector2(0,0),"none",720,1280);
    let backSunAnim = new Animation("assets/img/Sol_spritesheet.png",8,1280,720,0.5);
    backSun.velocity = new Vector2(0,0);
    backSun.AddAnimation(backSunAnim,"idle");
    backSun.SetAnimation("idle");
    gameObjects[0].push(backSun);

    let backClouds = new SpriteObject("backClouds",new Vector2(0,0),"none",720,2560);
    let backCloudsAnim = new Animation("assets/img/Nubes_spritesheet.png",4,2560,720,0.5);
    backClouds.velocity = new Vector2(speed/8,0);
    backClouds.AddAnimation(backCloudsAnim,"idle");
    backClouds.SetAnimation("idle");
    gameObjects[0].push(backClouds);

    let backMountains = new SpriteObject("backMountains",new Vector2(0,0),"none",720,5120);
    let backMountainsAnim = new Animation("assets/img/Fondo_spritesheet.png",3,5120,720,0.5);
    backMountains.velocity = new Vector2(speed/2,0);
    backMountains.AddAnimation(backMountainsAnim,"idle");
    backMountains.SetAnimation("idle");
    gameObjects[0].push(backMountains);

    let backAcera = new SpriteObject("backAcera",new Vector2(0,0),"none",720,1280);
    let backAceraAnim = new Animation("assets/img/Aceras_spritesheet.png",4,1280,720,0.5);
    backAcera.velocity = new Vector2(speed,0);
    backAcera.AddAnimation(backAceraAnim,"idle");
    backAcera.SetAnimation("idle");
    gameObjects[0].push(backAcera);

    let backCarretera = new SpriteObject("backCarretera",new Vector2(0,0),"none",720,1280);
    let backCarreteraAnim = new Animation("assets/img/Carretera_spritesheet.png",4,1280,720,0.5);
    backCarretera.velocity = new Vector2(speed,0);
    backCarretera.AddAnimation(backCarreteraAnim,"idle");
    backCarretera.SetAnimation("idle");
    gameObjects[0].push(backCarretera);
}

function LoadLevel(jsonName,container){
    $.getJSON("assets/files/"+jsonName+".json", function (json) {
        for(var obj of json){
            switch(obj.type){
                case "perro":
                    let perro = new Perro(obj.name,new Vector2(obj.positionx,obj.positiony),"none",obj.height,obj.width,timmy,obj.hitnumber, obj.ladridos);
                    perro.anchor = new Vector2(0.5,0.5);
                    perro.velocity = new Vector2(speed,0);
                    container[obj.layer].push(perro);
                break;
                case "alcantarilla":
                    let alcantarilla = new Alcantarilla(obj.name,new Vector2(obj.positionx,obj.positiony),"none",obj.height,obj.width,timmy,obj.hitnumber);
                    alcantarilla.anchor = new Vector2(0.5,0.5);
                    alcantarilla.velocity = new Vector2(speed,0);
                    container[obj.layer].push(alcantarilla);
                break;
                case "coche":
                    let coche = new Coche(obj.name,new Vector2(obj.positionx,obj.positiony),"none",obj.height,obj.width,timmy,obj.hitnumber);
                    let cocheAnim = new Animation("assets/img/Coche_spritesheet.png",8,557,184,0.1);
                    coche.anchor = new Vector2(0.5,0.5);
                    coche.velocity = new Vector2(speed - 20,0);
                    coche.AddAnimation(cocheAnim,"idle");
                    coche.SetAnimation("idle");
                    container[obj.layer].push(coche);
                break;
                case "paloma":
                    let paloma = new Paloma(obj.name,new Vector2(obj.positionx,obj.positiony),"none",obj.height,obj.width,timmy,obj.hitnumber);
                    let PalomaAnim = new Animation("none",8,557,184,0.1);
                    paloma.anchor = new Vector2(0.5,0.5);
                    paloma.velocity = new Vector2(speed - 20,0);
                    paloma.AddAnimation(palomaAnim,"idle");
                    paloma.SetAnimation("idle");
                    container[obj.layer].push(paloma);
                break;
            }
        }
        StartGame(container);
    });
}

function StartGame(container){
    canvasManager.ClearCanvas();
    canvasManager.AddList(container);
    canvasManager.RenderAndUpdate(0);
    setTimeout(function(){
        StopLoad();
        canvasManager.Start();
    },1000);
}

function StartLoad(){
    loading.show();
}

function StopLoad(){
    loading.hide();
}
