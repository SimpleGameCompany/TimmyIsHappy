
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
    let timmy = new SpriteObject("player", new Vector2(50,350),"none",300,300);
    let back = new SpriteObject("a",new Vector2(0,0),"assets/img/back.jpeg",720,3000);
    let animation = new Animation("assets/img/Timmy_spritesheet.png",8,138,400,0.1);
    back.velocity = new Vector2(-100,0);
    timmy.AddAnimation(animation,"idle");
    timmy.SetAnimation("idle");
    gameObjects[2].push(timmy);
    gameObjects[0].push(back);
}
function LoadLevel(){}
function StartGame(){
    canvasManager.ClearCanvas();
    canvasManager.AddList(gameObjects);
    canvasManager.Start();
}
