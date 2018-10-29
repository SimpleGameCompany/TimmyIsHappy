
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
    StartGame();
})


function LoadObjects(ev){}
function LoadLevel(){}
function StartGame(){
    canvasManager.ClearCanvas();
    let timmy = new SpriteObject("player", new Vector2(50,350),"none",300,300);
    let animation = new Animation("assets/img/Timmy_spritesheet.png",8,138,400,0.1);
    let back = new SpriteObject("a",new Vector2(0,0),"assets/img/back.jpeg",720,3000);
    back.velocity = new Vector2(-100,0);
    canvasManager.AddObject(back,0);
    //timmy.velocity= new Vector2(100,0);
    timmy.AddAnimation(animation,"idle");
    timmy.SetAnimation("idle");
    canvasManager.AddObject(timmy,4);
    canvasManager.Start();
}
