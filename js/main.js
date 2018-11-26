
class Obstacle extends HitableObject{
    /**
     * 
     * @param {String} name 
     * @param {Vector2} position 
     * @param {String} imgSrc 
     * @param {number} height 
     * @param {number} width 
     * @param {SpriteObject} player
     
     */
    constructor(name, position, imgSrc, height, width,player, hits){
        super(name, position, imgSrc, height, width);
        this._player = player;
        this._hits = hits; 
    }

    OnClick(e,audio){
        this._hits --;
        if(this._hits == 0){
            audio.PlayOneShot();
            this.deactivate();
            canvasManager.clickObjects.delete(this.hitColor);
            //this.SetAnimation("clicked");
        }
    }

    Update(timeDelta, hitbox){
        super.Update(timeDelta, hitbox);
        this.OnCollision(timeDelta, hitbox);
    }

    OnCollision(timeDelta, hitbox){
        if(this._activeHit && this.position.x - this._player.width < this._player.position.x){
            this.CollisionEvent(timeDelta, hitbox);
        }
    }
    CollisionEvent(timeDelta, hitbox){
        this._activeHit = false
        
        LoseGame();
        //PauseGame(null);
    }

}

class SoundManager{
    LoadSounds(){
        this._openAudio = new AudioObject("assets/audio/Alcantarilla/Alcantarilla_Open.ogg",0);
        this._closeAudio = new AudioObject("assets/audio/Alcantarilla/Alcantarilla_Close.ogg",0);
        this._AvionDeadAudio = new AudioObject("assets/audio/Avion/Avion_Eliminated.ogg",0);
        this._AvionLoopAudio = new AudioObject("assets/audio/Avion/Avion_Loop.ogg",0.5);
        this._AvionSpawnAudio = new AudioObject("assets/audio/Avion/Avion_Spawn.ogg",0);
        this._PalomaDeadAudio = new AudioObject("assets/audio/Paloma/Paloma_Eliminated.ogg",0);
        this._PalomaSpawnAudio = new AudioObject("assets/audio/Paloma/Paloma_Spawn.ogg",0);
        this._CacaDeadAudio = new AudioObject("assets/audio/Caca/Caca_Eliminated.ogg",0);
        this._CacaSpawnAudio = new AudioObject("assets/audio/Caca/Caca_Spawn.ogg",0);
        this._CocheLoopAudio = new AudioObject("assets/audio/Coche/Coche_Move.ogg",0.9);
        this._CocheClaxonAudio = new AudioObject("assets/audio/Coche/Coche_Bocina.ogg",0);
        this._CocheDeadAudio = new AudioObject("assets/audio/Coche/Coche_Eliminated.ogg",0);
        this._PerroDeadAudio = new AudioObject("assets/audio/Perro/Perro_Eliminated.ogg",0);
        this._PerroBarkAudio = new AudioObject("assets/audio/Perro/Dog_bark_1.ogg",0);
        this._PerroWarnAudio = new AudioObject("assets/audio/Perro/Perro_Warn.ogg",0);
        this._PerroAttackAudio = new AudioObject("assets/audio/Perro/Perro_Attack.ogg",0);
    }

    StopAudio(){
        this._openAudio.Stop();
        this._closeAudio.Stop();
        this._AvionDeadAudio.Stop();
        this._AvionLoopAudio.Stop();
        this._AvionSpawnAudio.Stop();
        this._PalomaDeadAudio.Stop();
        this._PalomaSpawnAudio.Stop();
        this._CacaDeadAudio.Stop();
        this._CacaSpawnAudio.Stop();
        this._CocheLoopAudio.Stop();
        this._CocheClaxonAudio.Stop();
        this._CocheDeadAudio.Stop();
        this._PerroDeadAudio.Stop();
        this._PerroBarkAudio.Stop();
        this._PerroWarnAudio.Stop();
        this._PerroAttackAudio.Stop();
    }
}

var soundManager = new SoundManager();

class Sewer extends Obstacle{
    constructor(name, position, imgSrc, height, width, player, hits, open){
        super(name, position, imgSrc, height, width, player, hits);
        this._open = open;
        //this._openAudio = new AudioObject("assets/audio/Alcantarilla/Alcantarilla_Open.ogg",0);
        //this._closeAudio = new AudioObject("assets/audio/Alcantarilla/Alcantarilla_Close.ogg",0);
    }

    OnClick(e){
        if(this._open){
            this._open = !this._open;
            soundManager._closeAudio.PlayOneShot();
            //canvasManager.clickObjects.delete(this.hitColor);
            this.SetAnimation("close");
        }else{
            this._open = !this._open;
            soundManager._openAudio.PlayOneShot();
            //canvasManager.clickObjects.delete(this.hitColor);
            this.SetAnimation("open");
        }

    }

    CollisionEvent(timeDelta,hitbox){
        if(this._open){
            super.CollisionEvent();
        }
    }
}

class FlyingObject extends Obstacle{
    constructor(name, position, imgSrc, height, width, player, hits){
        super(name, position, imgSrc, height, width, player, hits);
        //this._deadAudio = new AudioObject("assets/audio/Avion/Avion_Eliminated.ogg",0);
        //this._loopAudio = new AudioObject("assets/audio/Avion/Avion_Loop.ogg",0.5);
        //this._spawnAudio = new AudioObject("assets/audio/Avion/Avion_Spawn.ogg",0);
    }
    OnClick(e){
        super.OnClick(e,soundManager._AvionDeadAudio);
        if(this._hits == 0){
            soundManager._AvionLoopAudio.Stop();
            soundManager._AvionSpawnAudio.Stop();
            this.velocity = new Vector2(100,-50);
        }
    }

    Update(timeDelta, hitbox){
        if(this.position.x <= 1280 && !this._inCanvas){
            soundManager._AvionSpawnAudio.volume = 0.6;
            soundManager._AvionSpawnAudio.PlayOneShot();
            this._inCanvas = true;
            this.velocity = new Vector2(speed-20,20)
        }else if(this.position.x+this._width <= 1500 && !this._stopped){
            soundManager._AvionLoopAudio.PlayOnLoop();
            setTimeout(soundManager._AvionSpawnAudio.Stop.bind(this._spawnAudio),50);
            this._stopped = true;
            this.velocity = new Vector2(0,0);
        }
            super.Update(timeDelta,hitbox);
        
    }
}

class Poop extends Obstacle{
    constructor(name, position, imgSrc, height, width, player, hits){
        super(name, position, imgSrc, height, width, player, hits);
        //this._deadAudio = new AudioObject("assets/audio/Caca/Caca_Eliminated.ogg",0);
        //this._spawnAudio = new AudioObject("assets/audio/Caca/Caca_Spawn.ogg",0);
    }

    OnClick(e){
        super.OnClick(e,soundManager._CacaDeadAudio);
    }

    Update(timeDelta, hitbox){
        if(this.position.x <= 1280 && !this._inCanvas){
            soundManager._CacaSpawnAudio.PlayOneShot();
            this._inCanvas = true;
        }
            super.Update(timeDelta,hitbox);
        
    }
}

class Dove extends Obstacle{
    constructor(name, position, imgSrc, height, width, player, hits){
        super(name, position, imgSrc, height, width, player, hits);
        //this._deadAudio = new AudioObject("assets/audio/Paloma/Paloma_Eliminated.ogg",0);
        //this._spawnAudio = new AudioObject("assets/audio/Paloma/Paloma_Spawn.ogg",0);
    }

    OnClick(e){
        super.OnClick(e,soundManager._PalomaDeadAudio);
    }

    Update(timeDelta, hitbox){
        if(this.position.x <= 1280 && !this._inCanvas){
            soundManager._PalomaSpawnAudio.PlayOneShot();
            this._inCanvas = true;
        }
            super.Update(timeDelta,hitbox);
        
    }
}

class Car extends Obstacle{
    constructor(name, position, imgSrc, height, width, player, hits){
        super(name, position, imgSrc, height, width, player, hits);
        //this._loopAudio = new AudioObject("assets/audio/Coche/Coche_Move.ogg",0.9);
        //this._claxonAudio = new AudioObject("assets/audio/Coche/Coche_Bocina.ogg",0);
        //this._deadAudio = new AudioObject("assets/audio/Coche/Coche_Eliminated.ogg",0);
        this._inCanvas = false;
    }

    OnClick(e){
        super.OnClick(e,soundManager._CocheDeadAudio);
        if(this._hits==0){
            soundManager._CocheLoopAudio.Stop();
        }
    }

    Update(timeDelta, hitbox){
        if(this.position.x-(this.width*this._anchor.x) <= 1280 && !this._inCanvas){
            soundManager._CocheLoopAudio.PlayOnLoop();
            this._inCanvas = true;
        }
            super.Update(timeDelta,hitbox);
        
    }
}

class Dog extends Obstacle{
    constructor(name, position, imgSrc, height, width, player, hits, barkNum){
        super(name, position, imgSrc, height, width, player, hits);
        this._bark = barkNum;
        this._stopped = false;
        this.interval;
        this._dead = false;
        this._attacking = false;
        //this._deadAudio = new AudioObject("assets/audio/Perro/Perro_Eliminated.ogg",0);
        //this._warnAudio = new AudioObject("assets/audio/Perro/Perro_Warn.ogg",0);
        //this._attackAudio = new AudioObject("assets/audio/Perro/Perro_Attack.ogg",0);
    }

    OnClick(e){
        super.OnClick(e,soundManager._PerroDeadAudio);
        if(this._hits == 0){
            if(this.interval){
                clearInterval(this.interval);
            }
            this._dead = true;
        }  
    }

    Update(timeDelta, hitbox){
        if(this._bark == 0 && !this._dead && !this._attacking){
            clearInterval(this.interval);
            soundManager._PerroAttackAudio.PlayOneShot();
            this.velocity = new Vector2(speed-65,0);
            this._attacking = true;
        }else if(this.position.x <= 1200 && !this._stopped && !this._dead){
            soundManager._PerroWarnAudio.PlayOneShot();
            this.interval = setInterval(this.Ladrar.bind(this),1000);
            this._stopped = true;
        }
        super.Update(timeDelta, hitbox);
    }

    Ladrar() {
        //this.SetAnimation("ladrar");
        soundManager._PerroBarkAudio.PlayOneShot();
        this._bark--;
        console.log("Guau");
    }
}

class Scrollable{
    constructor(name, position, img, height, width, animName, frames, vel, fps){
        this.active = true;
        this.b1 = new SpriteObject(name, position, img, height, width);
        this.b1.velocity = new Vector2(vel,0);
        let position2 = position.add(new Vector2(width-1,0));
        this.b2 = new SpriteObject(name, position2, img, height, width);
        this.b2.velocity = new Vector2(vel,0);
        let anim = new Animation(animName,frames,width,height,1/fps,0);

        this.b1.AddAnimation(anim,"idle");
        this.b1.SetAnimation("idle");
        this.b2.AddAnimation(anim,"idle");
        this.b2.SetAnimation("idle");
    }

    Update(deltaTime, hitBox){
        this.b1.Update(deltaTime, hitBox);
        this.b2.Update(deltaTime, hitBox);

        if(this.b1.position.x <= -this.b1.width){
            this.b1.position.x = this.b2.position.x+this.b2.width-1;
        }else if(this.b2.position.x <= -this.b2.width){
            this.b2.position.x = this.b1.position.x+this.b1.width-1;
        }
    }

    Render(renderCanvas){
        this.b1.Render(renderCanvas);
        this.b2.Render(renderCanvas);
    }
}


class HTMLBackGround{
    constructor(name,img,vel,zIndex){
        this.b1 =$("<img src ='"+img+"' class ='loading'/>").appendTo( $(canvasManager.canvasElement).parent());
        this.b2 =$("<img src ='"+img+"' class ='loading'/>").appendTo( $(canvasManager.canvasElement).parent());
        this.b1.css("zIndex",zIndex);
        this.b2.css("zIndex",zIndex);
        this.vel = vel;
        this.b1.pos = 0;
        this.b2.pos = 100;
        this.active = true;
    }

    Update(deltaTime,hitBox){
        this.b1.pos +=this.vel*deltaTime;
        this.b2.pos += this.vel*deltaTime;
       
        if(this.b1.pos <=-100){
            this.b1.pos = 100;
        }
        if(this.b2.pos <=-100){
            this.b2.pos = 100;
        }


        this.b2.css("left",this.b2.pos + "%");
        this.b1.css("left",this.b1.pos + "%");
    }

    Render(renderCanvas){}
}


var canvasManager;
var menuObjects;
var gameObjects;
var loading;
var loadingCount;
var totalLoading;
var imageCount;
window.addEventListener("load",function(ev){
    loading = $(".loading");
    soundManager.LoadSounds();
    loading.hide();
    canvasManager = new CanvasManager("gameCanvas",1280,720);
    StartMenuGame();
    canvasManager.Start();

   
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
var jojoMensaje;
var speed;
var transparencyPause;
var pauseContinue;


function StartMenuGame(){
    canvasManager.ClearCanvas();
    

    if(menuObjects == undefined){
        menuObjects = [];
        menuObjects[0] = [];
        menuObjects [1] = [];
        let Fodo = new SpriteObject("fondo", new Vector2(0,0),"assets/img/fondoMenu.png",720,1280);
        //let Titulo = new SpriteObject("titulo",new Vector2(640,410),"none",813,978);
        //let TituloAnim = new Animation("assets/img/Animated_Title_spritesheet.png",4,978,813,1/12,0);
        //Titulo.anchor = new Vector2(0.5,0.5);
        //Titulo.AddAnimation(TituloAnim,"idle");
        //Titulo.SetAnimation("idle");
        let continueButton = new HitableObject("continuar", new Vector2(640,350),"assets/img/play.png",200,300);
        continueButton.anchor = new Vector2(0.5,0.5);
        continueButton.OnClick = function(ev){
            loadGameFromLevel(ev);
        }
        let opciones = new HitableObject("opciones", new Vector2(640,590),"assets/img/setings.png",100,200);
        opciones.anchor = new Vector2(0.5,0.5);
        menuObjects[0].push(Fodo);
        menuObjects[1].push(continueButton);
        menuObjects[1].push(opciones);
        //menuObjects[1].push(Titulo);
    }
        canvasManager.AddList(menuObjects);
    
}

function loadGameFromLevel(ev){
    StartLoad();
    LoadObjects(ev);
    LoadLevel("nivel1",gameObjects);
}

function LoseGame(){
    //TODO
    soundManager.StopAudio();
    canvasManager.RenderAndUpdate(0);
    let image = canvasManager.canvasScene.getImageData(0,0,1280,720);
    let d = image.data;
    for (var i=0; i<d.length; i+=4) {
        var r = d[i];
        var g = d[i+1];
        var b = d[i+2];
        d[i] = (r * .23) + (g *.61) + (b * .17);
        d[i+1] =  (r * .27) + (g *.62) + (b * .03);
        d[i+2] = (r * .18) + (g *.32) + (b * (-0.02));
      }
    canvasManager.canvasScene.putImageData(image,0,0);
    let fondo = new SpriteObject("fondo",new Vector2(0,0),canvasManager.canvasElement.toDataURL(),720,1280);
    canvasManager.ClearCanvas();
    for(let i = 0; i < 5; i++){
        gameObjects[i] = [];
    }

    canvasManager.AddObject(fondo,0);
    canvasManager.canvasScene.filter = "";
    canvasManager.AddObject(pauseContinue,5);
    canvasManager.AddObject(jojoMensaje,5);
    

    //StartMenuGame();
}

function LoadObjects(ev){
    loadingCount = 0;
    totalLoading = 0;
    gameObjects = [];
    for (let i = 0; i < 6; i++) {
        gameObjects[i] = [];
    }


    jojoMensaje = new SpriteObject("jojo",new Vector2(946,612),"none",57,310);
        let jojoAnim = new Animation("assets/img/To_be_continued_spritesheet.png",4,310,57,1/8,0);
        jojoMensaje.AddAnimation(jojoAnim,"idle");
        jojoMensaje.SetAnimation("idle");
  
    
    timmy = new SpriteObject("player", new Vector2(110,449),"none",205,138);
    let animation = new Animation("assets/img/Timmy_spritesheet.png",8,138,205,1/8,0);
    timmy.AddAnimation(animation,"idle");
    totalLoading++;
    timmy.SetAnimation("idle");
    //timmy.anchor = new Vector2(0.5,0.5);
    gameObjects[2].push(timmy);

    let sun = new HTMLBackGround("sun","assets/img/Cielo_animado.gif",0,0);
    
    gameObjects[0].push(sun);

    let clouds = new HTMLBackGround("clouds","assets/img/Nubes_animado.gif",-50/8,1);



    gameObjects[0].push(clouds);
    totalLoading++;
    let mountains = new Scrollable("mountains",new Vector2(0,325),"none",720,5120,"assets/img/Fondo_spritesheet.png",3,-50/2,8);
    gameObjects[0].push(mountains);
    totalLoading++;
    let sidewalks = new Scrollable("sidewalks",new Vector2(0,557),"none",720,1280,"assets/img/Aceras_spritesheet.png",4,-50,8);
    gameObjects[0].push(sidewalks);
    totalLoading++;
    let road = new Scrollable("road",new Vector2(0,589),"none",720,1280,"assets/img/Carretera_spritesheet.png",4,-50,8);
    gameObjects[0].push(road);
    totalLoading++;
    let opciones = new HitableObject("opciones",new Vector2(1280,0),"assets/img/opciones.png",50,50);
    opciones.anchor = new Vector2(1,0);
    opciones.OnClick = PauseGame;
    gameObjects[5].push(opciones);

    transparencyPause = new SpriteObject("transparencia",new Vector2(0,0),"assets/img/fondo.png",720,1280);
    pauseContinue = new HitableObject("continuar",new Vector2(640,300),"assets/img/continuar.jpg",200,350);
    pauseContinue.OnClick = function(ev){canvasManager.ClearCanvas();canvasManager.AddList(gameObjects)}
    pauseContinue.anchor = new Vector2(0.5,0.5);
    let text = new TextObject("Prueba", new Vector2(0,0),"24px");
    gameObjects[5].push(text);

}

function LoadLevel(jsonName,container){
    
    $.getJSON("assets/files/"+jsonName+".json", function (json) {
        for(var obj of json){
            switch(obj.type){
                case "speed":
                    speed = obj.speed;
                break;
                case "dog":
                    let dog = new Dog("perro",new Vector2(obj.positionx,500),"none",184,209,timmy, 1, 3);
                    let dogRunning = new Animation("assets/img/PerroCorriendo_spritesheet.png",8,209,184,1/16,0);
                    totalLoading +=1;
                    //dog.anchor = new Vector2(0,0.5);
                    dog.velocity = new Vector2(speed,0);
                    dog.AddAnimation(dogRunning,"run");
                    dog.SetAnimation("run");
                    container[3].push(dog);
                break;
                case "sewer":
                    let sewer = new Sewer("alcantarilla",new Vector2(obj.positionx,635),"none",39,105,timmy,1, obj.open);
                    let openSewer = new Animation("assets/img/Alcantarilla_spritesheet.png",4,105,39,1/8,0);
                    let closeSewer = new Animation("assets/img/Alcantarilla_spritesheet.png",4,105,39,1/8,105*4);
                    totalLoading +=2;
                    //sewer.anchor = new Vector2(0,0.5);
                    sewer.velocity = new Vector2(speed,0);
                    sewer.AddAnimation(openSewer,"open");
                    sewer.AddAnimation(closeSewer,"close");
                    if(obj.open){
                        sewer.SetAnimation("open");
                    }else{
                        sewer.SetAnimation("close");
                    }
                    container[1].push(sewer);
                break;
                case "car":
                    let car = new Car("coche",new Vector2(obj.positionx,460),"none",184,557,timmy,2);
                    let carAnim = new Animation("assets/img/Coche_spritesheet.png",8,557,184,1/12,0);
                    totalLoading +=1;
                    //car.anchor = new Vector2(0,0.5);
                    car.velocity = new Vector2(speed - 20,0);
                    car.AddAnimation(carAnim,"idle");
                    car.SetAnimation("idle");
                    container[4].push(car);
                break;
                case "dove":
                    let dove = new Dove("paloma",new Vector2(obj.positionx,obj.positiony),"none",150,90,timmy,1);
                    let doveAnim = new Animation("assets/img/Paloma_spritesheet.png",8,90,150,1/12,0);
                    totalLoading +=1;
                    //dove.anchor = new Vector2(0,0.5);
                    dove.velocity = new Vector2(speed-20,0);
                    dove.AddAnimation(doveAnim,"idle");
                    dove.SetAnimation("idle");
                    container[3].push(dove);
                break;
                case "poop":
                    let poop = new Poop("caca",new Vector2(obj.positionx,615),"none", 55,33,timmy,1);
                    let poopAnim = new Animation("assets/img/Caca_spritesheet.png",4,33,55,1/8,0);
                    totalLoading +=1;
                    //poop.anchor = new Vector2(0,0.5);
                    poop.velocity = new Vector2(speed,0);
                    poop.AddAnimation(poopAnim,"idle");
                    poop.SetAnimation("idle");
                    container[1].push(poop);
                break;
                case "plane":
                    let plane = new FlyingObject("avion",new Vector2(obj.positionx,-480),"none",480,1111,timmy,2);
                    let planeAnim = new Animation("assets/img/Avion_spritesheet.png",4,1112,480,1/8,0);
                    totalLoading +=1;
                    //plane.anchor = new Vector2(0,0.5);
                    plane.velocity = new Vector2(speed,0);
                    plane.AddAnimation(planeAnim,"idle");
                    plane.SetAnimation("idle");
                    container[4].push(plane);
                break; 
                default:
                break;
            }
           
            //totalLoading+=14;
        }
        StartGame(container,10);
    });
}

function StartGame(container,loadTime){
    canvasManager.ClearCanvas();
    canvasManager.AddList(container);
    canvasManager.RenderAndUpdate(0);
    setTimeout(function(){
        GoGame(loadTime);    
    },loadTime);
}

function GoGame (loadtime){
    if(loadingCount >= totalLoading){
        canvasManager.RenderAndUpdate(0);
        StopLoad();
        canvasManager.Start();
        
    }else{
        setTimeout(GoGame,loadtime,loadtime);
    }
}

function StartLoad(){
    loading.show();
}

function StopLoad(){
    loading.hide();
}


function PauseGame(ev){
    let fondo = new SpriteObject("fondo",new Vector2(0,0),canvasManager.canvasElement.toDataURL(),720,1280);
    
    canvasManager.ClearCanvas();
    canvasManager.AddObject(fondo,2);
    canvasManager.AddObject(transparencyPause,3);
    canvasManager.AddObject(pauseContinue,4);
    
}
