
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
            this.active = false;
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
        /*this._openAudio = new AudioObject("assets/audio/Alcantarilla/Alcantarilla_Open.ogg",0);
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
        this._PerroAttackAudio = new AudioObject("assets/audio/Perro/Perro_Attack.ogg",0);*/
    }

    StopAudio(){
        for(let i= 0; i<gameObjects.length; i++){
            for(let j = 0; j<gameObjects[i].length; j++){
                if(gameObjects[i][j].StopAudio){
                    gameObjects[i][j].StopAudio();
                }
            }
        }
        /*this._openAudio.Stop();
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
        this._PerroAttackAudio.Stop();*/
    }
}

var soundManager = new SoundManager();

class Sewer extends Obstacle{
    constructor(name, position, imgSrc, height, width, player, hits, open){
        super(name, position, imgSrc, height, width, player, hits);
        this._open = open;
        this._openAudio = new AudioObject("assets/audio/Alcantarilla/Alcantarilla_Open.ogg",0);
        this._closeAudio = new AudioObject("assets/audio/Alcantarilla/Alcantarilla_Close.ogg",0);
    }

    OnClick(e){
        if(this._open){
            this._open = !this._open;
            this._closeAudio.PlayOneShot();
            //canvasManager.clickObjects.delete(this.hitColor);
            this.SetAnimation("close");
        }else{
            this._open = !this._open;
            this._openAudio.PlayOneShot();
            //canvasManager.clickObjects.delete(this.hitColor);
            this.SetAnimation("open");
        }

    }

    CollisionEvent(timeDelta,hitbox){
        if(this._open){
            super.CollisionEvent();
        }
    }
    StopAudio(){}
}

class FlyingObject extends Obstacle{
    constructor(name, position, imgSrc, height, width, player, hits){
        super(name, position, imgSrc, height, width, player, hits);
        this._AvionDeadAudio = new AudioObject("assets/audio/Avion/Avion_Eliminated.ogg",0);
        this._AvionLoopAudio = new AudioObject("assets/audio/Avion/Avion_Loop.ogg",0.5);
        this._AvionSpawnAudio = new AudioObject("assets/audio/Avion/Avion_Spawn.ogg",0);
    }
    OnClick(e){
        super.OnClick(e,this._AvionDeadAudio);
        if(this._hits == 0){
            this._AvionLoopAudio.Stop();
            this._AvionSpawnAudio.Stop();
            this.velocity = new Vector2(-speed,speed/2);
            this.active = false;
        }
    }

    Update(timeDelta, hitbox){
        if(this.position.x <= 1280 && !this._inCanvas){
            this._AvionSpawnAudio.volume = 0.6;
            this._AvionSpawnAudio.PlayOneShot();
            this._inCanvas = true;
            this.velocity = new Vector2(speed,-speed/4);
        }else if(this.position.x+this._width <= 1500 && !this._stopped){
            this._AvionLoopAudio.PlayOnLoop();
            setTimeout(this._AvionSpawnAudio.Stop.bind(this._spawnAudio),50);
            this._stopped = true;
            this.velocity = new Vector2(0,0);
        }
            super.Update(timeDelta,hitbox);
        
    }

    StopAudio(){
        this._AvionDeadAudio.Stop();
        this._AvionLoopAudio.Stop();
        this._AvionSpawnAudio.Stop();
    }
}

class Poop extends Obstacle{
    constructor(name, position, imgSrc, height, width, player, hits){
        super(name, position, imgSrc, height, width, player, hits);
        this._CacaDeadAudio = new AudioObject("assets/audio/Caca/Caca_Eliminated.ogg",0);
        this._CacaSpawnAudio = new AudioObject("assets/audio/Caca/Caca_Spawn.ogg",0);
    }

    OnClick(e){
        super.OnClick(e,this._CacaDeadAudio);
    }

    Update(timeDelta, hitbox){
        if(this.position.x <= 1280 && !this._inCanvas){
            this._CacaSpawnAudio.PlayOneShot();
            this._inCanvas = true;
        }
            super.Update(timeDelta,hitbox);
        
    }

    StopAudio(){
        this._CacaDeadAudio.Stop();
        this._CacaSpawnAudio.Stop();
    }
}

class Dove extends Obstacle{
    constructor(name, position, imgSrc, height, width, player, hits){
        super(name, position, imgSrc, height, width, player, hits);
        this._PalomaDeadAudio = new AudioObject("assets/audio/Paloma/Paloma_Eliminated.ogg",0);
        this._PalomaSpawnAudio = new AudioObject("assets/audio/Paloma/Paloma_Spawn.ogg",0);
    }

    OnClick(e){
        super.OnClick(e,this._PalomaDeadAudio);
    }

    Update(timeDelta, hitbox){
        if(this.position.x <= 1280 && !this._inCanvas){
            this._PalomaSpawnAudio.PlayOneShot();
            this._inCanvas = true;
        }
            super.Update(timeDelta,hitbox);
        
    }

    StopAudio(){
        this._PalomaDeadAudio.Stop();
        this._PalomaSpawnAudio.Stop();
    }
}

class Car extends Obstacle{
    constructor(name, position, imgSrc, height, width, player, hits){
        super(name, position, imgSrc, height, width, player, hits);
        this._CocheLoopAudio = new AudioObject("assets/audio/Coche/Coche_Move.ogg",0.9);
        this._CocheClaxonAudio = new AudioObject("assets/audio/Coche/Coche_Bocina.ogg",0);
        this._CocheDeadAudio = new AudioObject("assets/audio/Coche/Coche_Eliminated.ogg",0);
        this._inCanvas = false;
    }

    OnClick(e){
        super.OnClick(e,this._CocheDeadAudio);
        if(this._hits==0){
            this._CocheLoopAudio.Stop();
        }
    }

    Update(timeDelta, hitbox){
        if(this.position.x-(this.width*this._anchor.x) <= 1280 && !this._inCanvas){
            this._CocheLoopAudio.PlayOnLoop();
            this._inCanvas = true;
        }
            super.Update(timeDelta,hitbox);
        
    }

    StopAudio(){
        this._CocheLoopAudio.Stop();
        this._CocheClaxonAudio.Stop();
        this._CocheDeadAudio.Stop();
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
        this._PerroDeadAudio = new AudioObject("assets/audio/Perro/Perro_Eliminated.ogg",0);
        this._PerroBarkAudio = new AudioObject("assets/audio/Perro/Dog_bark_1.ogg",0);
        this._PerroWarnAudio = new AudioObject("assets/audio/Perro/Perro_Warn.ogg",0);
        this._PerroAttackAudio = new AudioObject("assets/audio/Perro/Perro_Attack.ogg",0);
    }

    OnClick(e){
        super.OnClick(e,this._PerroDeadAudio);
        if(this._hits == 0){
            if(this.interval){
                clearInterval(this.interval);
            }
            //this._dead = true;
        }  
    }

    Update(timeDelta, hitbox){
        if(this._bark == 0 && !this._attacking){
            this._PerroAttackAudio.PlayOneShot();
            this.velocity = new Vector2(speed-65,0);
            this._attacking = true;
        }else if(this.position.x <= 1280 && !this._stopped){
            this._PerroWarnAudio.PlayOneShot();
            this.interval = setInterval(this.Ladrar.bind(this),1000);
            this._stopped = true;
        }
        super.Update(timeDelta, hitbox);
    }

    Ladrar() {
        //this.SetAnimation("ladrar");
        this._PerroBarkAudio.PlayOneShot();
        this._bark--;
        console.log("Guau");
        if(this._bark == 0){
            clearInterval(this.interval);
        }
    }

    StopAudio(){
        this._PerroDeadAudio.Stop();
        this._PerroBarkAudio.Stop();
        this._PerroWarnAudio.Stop();
        this._PerroAttackAudio.Stop();
        clearInterval(this.interval);
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
    constructor(name,img,vel,zIndex,scale){
        this.b1 =$("<img src ='"+img+"' class ='background'/>").appendTo( $(canvasManager.canvasElement).parent());
        this.b2 =$("<img src ='"+img+"' class ='background'/>").appendTo( $(canvasManager.canvasElement).parent());
        this.b2.click = function(ev){ev.preventDefault()}
        this.b1.click = function(ev){ev.preventDefault()}
        this.b1.css("zIndex",zIndex);
        this.b2.css("zIndex",zIndex);
        this.b1.css("width",100*scale +"%");
        this.b2.css("width",100*scale +"%");
        this.vel = vel;
        this.b1.pos = 0;
        this.b2.pos = 100*scale;
        this.scale = scale;
        this.active = true;
    }

    Update(deltaTime,hitBox){
        this.b1.pos +=(this.vel*deltaTime)
        this.b2.pos += (this.vel*deltaTime)
       
        if(this.b1.pos <=-100*this.scale){
            this.b1.pos = 100*this.scale;
        }
        if(this.b2.pos <=-100*this.scale){
            this.b2.pos = 100*this.scale;
        }


        this.b2.css("left",this.b2.pos + "%");
        this.b1.css("left",this.b1.pos + "%");
    }

    Render(renderCanvas){}

    ChangeImg(imgSrc){
        this.b1.attr("src",imgSrc);
        this.b2.attr("src",imgSrc);
    }
}

class Timmy extends SpriteObject{
    constructor(name, position,img,height,width){
        super(name,position,img,height,width);
    }

    Update(deltaTime,hitBox){
        super.Update(deltaTime,hitBox);
        distanciaRecorrida -= deltaTime*speed;
        if(distanciaRecorrida >= tamaño){
            canvasManager.ClearCanvas();
            EndLevel();
        }
    }
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
    
    loading.hide();
    canvasManager = new CanvasManager("gameCanvas",1280,720);
    StartMenuGame();
    canvasManager.Start();

   
})
document.addEventListener("dblclick",function(ev){
    ev.preventDefault();
})

var timmy; 
var sky;
var cloud;
var hills;
var buildings;
var road;
var jojoMensaje;
var speed;
var transparencyPause;
var pauseContinue;
var distanciaRecorrida;
var tamaño;


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
    canvasManager.ClearCanvas();
    puntuacionText = new TextObject("Puntos: ",new Vector2(0,0),3,"Arial",canvasManager,"white");
    puntuacionText.activate=false;
    puntuacionText.puntos = 0;
    gameObjects = [];
    for (let i = 0; i < 6; i++) {
        gameObjects[i] = [];
    }
    sky = new HTMLBackGround("sun","none",0,0,1);
    road = new HTMLBackGround("road","none",-50,4,4);
    buildings = new HTMLBackGround("build","none",-35,3,4);
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
    let volverMenu = new HitableObject("volver",new Vector2(640,300),"assets/img/continuar.jpg",200,350);
    volverMenu.anchor = new Vector2(0.5,0.5);
    volverMenu.OnClick = function(ev){
        puntuacionText.puntos = 0;
        StartLoad();
        LoadLevel("nivel"+actualLevel,gameObjects);
    }
    canvasManager.ClearCanvas();
    for(let i = 0; i < 5; i++){
        gameObjects[i] = [];
    }
    sky.ChangeImg("assets/img/Cielo_sepia.png");   
    road.ChangeImg("assets/img/AceraConCarretera_sepia"+levelname+".png");
    buildings.ChangeImg("assets/img/Edificios_sepia"+levelname+".png");
    canvasManager.AddObject(fondo,0);
    canvasManager.AddObject(volverMenu,5);
    canvasManager.AddObject(jojoMensaje,5);
    

    //StartMenuGame();
}

var actualLevel;
var levelname;

function LoadObjects(level){
    actualLevel = level;
    loadingCount = 0;
    totalLoading = 0;
   
    level = "_nivel"+level;
    levelname = level;
    


    jojoMensaje = new SpriteObject("jojo",new Vector2(946,612),"none",57,310);
        let jojoAnim = new Animation("assets/img/To_be_continued_spritesheet.png",4,310,57,1/8,0);
        jojoMensaje.AddAnimation(jojoAnim,"idle");
        jojoMensaje.SetAnimation("idle");
  
    
    timmy = new Timmy("player", new Vector2(110,449),"none",205,138);
    let animation = new Animation("assets/img/Timmy_spritesheet"+level+".png",8,138,205,1/8,0);
    timmy.AddAnimation(animation,"idle");
    totalLoading++;
    timmy.SetAnimation("idle");
    //timmy.anchor = new Vector2(0.5,0.5);
    gameObjects[2].push(timmy);
    sky.ChangeImg("assets/img/Cielo_animado"+level+".gif");  
    sky.vel = 0;
    buildings.vel = (speed*100)/1280;
    buildings.ChangeImg("assets/img/Edificios_animado"+level+".gif");
    road.vel = (speed*100)/1280;
    road.ChangeImg("assets/img/AceraConCarretera_animado"+level+".gif");
    gameObjects[0].push(sky);
    gameObjects[0].push(buildings);
    gameObjects[0].push(road);
    let opciones = new HitableObject("opciones",new Vector2(1280,0),"assets/img/opciones.png",50,50);
    opciones.anchor = new Vector2(1,0);
    opciones.OnClick = PauseGame;
    gameObjects[5].push(opciones);

    let black = new SpriteObject("black", new Vector2(tamaño,0),"assets/img/FondoFinal.png",720,1280);
    black.velocity = new Vector2(speed,0);
    gameObjects[4].push(black);
    let tunelLejos = new SpriteObject("tunellejos", new Vector2(tamaño-494,0),"none",720,496);
    let tunelLejosAnim = new Animation("assets/img/TunelLejos_spritesheet"+levelname+".png",4,496,720,1/8,0);
    tunelLejos.velocity = new Vector2(speed,0);
    tunelLejos.AddAnimation(tunelLejosAnim,"idle");
    tunelLejos.SetAnimation("idle");
    gameObjects[1].push(tunelLejos);
    let tunelCerca = new SpriteObject("tunelcerca", new Vector2(tamaño-495,0),"none",720,496);
    let tunelCercaAnim = new Animation("assets/img/TunelCerca_spritesheet"+levelname+".png",4,496,720,1/8,0);
    tunelCerca.velocity = new Vector2(speed,0);
    tunelCerca.AddAnimation(tunelCercaAnim,"idle");
    tunelCerca.SetAnimation("idle");
    gameObjects[4].push(tunelCerca);
    let tunelSalida = new SpriteObject("tunelsalida", new Vector2(0,0),"none",720,315);
    let tunelSalidaAnim = new Animation("assets/img/TunelSalida_spritesheet"+levelname+".png",4,315,720,1/8,0);
    tunelSalida.velocity = new Vector2(speed,0);
    tunelSalida.AddAnimation(tunelSalidaAnim,"idle");
    tunelSalida.SetAnimation("idle");
    gameObjects[4].push(tunelSalida);

    transparencyPause = new SpriteObject("transparencia",new Vector2(0,0),"assets/img/fondo.png",720,1280);
    pauseContinue = new HitableObject("continuar",new Vector2(640,300),"assets/img/continuar.jpg",200,350);
    pauseContinue.OnClick = function(ev){canvasManager.ClearCanvas();canvasManager.AddList(gameObjects)}
    pauseContinue.anchor = new Vector2(0.5,0.5);
    

}

function EndLevel(){
    let Continue = new HitableObject("continuar",new Vector2(640,300),"assets/img/continuar.jpg",200,350);
    Continue.OnClick = function(ev){
        canvasManager.ClearCanvas();
        StartLoad();
        LoadLevel("nivel"+(actualLevel+1),gameObjects);
    }
    Continue.anchor = new Vector2(0.5,0.5);
    canvasManager.AddObject(Continue,5);
}

function LoadLevel(jsonName,container){
    $.getJSON("assets/files/"+jsonName+".json", function (json) {
        for(var obj of json){
            switch(obj.type){
                case "speed":
                    speed = obj.speed;
                    LoadObjects(obj.nivel);
                break;
                case "tamaño":
                    tamaño = obj.valor;
                    distanciaRecorrida = 0;
                    let black = new SpriteObject("black", new Vector2(tamaño,0),"assets/img/FondoFinal.png",720,1280);
                    black.velocity = new Vector2(-90,0);
                    gameObjects[4].push(black);
                break;
                case "dog":
                    let dog = new Dog("perro",new Vector2(obj.positionx,500),"none",184,209,timmy, 1, 3);
                    let dogRunning = new Animation("assets/img/PerroCorriendo_spritesheet"+levelname+".png",8,209,184,1/16,0);
                    totalLoading +=1;
                    //dog.anchor = new Vector2(0,0.5);
                    dog.velocity = new Vector2(speed,0);
                    dog.AddAnimation(dogRunning,"run");
                    dog.SetAnimation("run");
                    container[3].push(dog);
                break;
                case "sewer":
                    let sewer = new Sewer("alcantarilla",new Vector2(obj.positionx,635),"none",39,105,timmy,1, obj.open);
                    let openSewer = new Animation("assets/img/Alcantarilla_spritesheet"+levelname+".png",4,105,39,1/8,0);
                    let closeSewer = new Animation("assets/img/Alcantarilla_spritesheet"+levelname+".png",4,105,39,1/8,105*4);
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
                    let carAnim = new Animation("assets/img/Coche_spritesheet"+levelname+".png",8,557,184,1/12,0);
                    totalLoading +=1;
                    //car.anchor = new Vector2(0,0.5);
                    car.velocity = new Vector2(speed - 20,0);
                    car.AddAnimation(carAnim,"idle");
                    car.SetAnimation("idle");
                    container[4].push(car);
                break;
                case "dove":
                    let dove = new Dove("paloma",new Vector2(obj.positionx,obj.positiony),"none",150,90,timmy,1);
                    let doveAnim = new Animation("assets/img/Paloma_spritesheet"+levelname+".png",8,90,150,1/12,0);
                    totalLoading +=1;
                    //dove.anchor = new Vector2(0,0.5);
                    dove.velocity = new Vector2(speed-20,0);
                    dove.AddAnimation(doveAnim,"idle");
                    dove.SetAnimation("idle");
                    container[3].push(dove);
                break;
                case "poop":
                    let poop = new Poop("caca",new Vector2(obj.positionx,615),"none", 55,33,timmy,1);
                    let poopAnim = new Animation("assets/img/Caca_spritesheet"+levelname+".png",4,33,55,1/8,0);
                    totalLoading +=1;
                    //poop.anchor = new Vector2(0,0.5);
                    poop.velocity = new Vector2(speed,0);
                    poop.AddAnimation(poopAnim,"idle");
                    poop.SetAnimation("idle");
                    container[1].push(poop);
                break;
                case "plane":
                    let plane = new FlyingObject("avion",new Vector2(obj.positionx,-480),"none",480,1111,timmy,2);
                    let planeAnim = new Animation("assets/img/Avion_spritesheet"+levelname+".png",4,1112,480,1/8,0);
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
        StartGame(container,3000);
    });
}

function StartGame(container,loadTime){
    canvasManager.ClearCanvas();
    setTimeout(function(){
        GoGame(loadTime);    
    },loadTime);
}

function GoGame (loadtime){   
        canvasManager.RenderAndUpdate(0);
        StopLoad();
        canvasManager.AddList(gameObjects);
        canvasManager.Start();
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
