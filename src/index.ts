import CanvasMap from "./CanvasMap";
import CanvasMapConfiguration from "./CanvasMapConfiguration";
import Direction from "./Direction";

var canvas = document.getElementById("map-canvas") as HTMLCanvasElement
canvas.width = 352
canvas.height = 352
if(canvas === null){
    throw new Error("Cannot get canvas")
}
var config = new CanvasMapConfiguration()
config.drawGrid = true
var map = new CanvasMap(canvas, config)
map.startRendering()

window.addEventListener("keydown", (e) => {
    switch(e.code){
        case "ArrowDown":
            map.moveCharacter(Direction.Down);
        break;
        case "ArrowUp":
            map.moveCharacter(Direction.Up);
        break;
        case "ArrowLeft":
        map.moveCharacter(Direction.Left);
        break;
        case "ArrowRight":
        map.moveCharacter(Direction.Right);
        break;
    }
    updatePosition()
})

var updatePosition = () => {
    var xPosition = document.getElementById("x-position")
    var yPosition = document.getElementById("y-position")
    var position = map.mapPosition
    if(xPosition === null){
        throw new Error("Cannot get x-position")
    }
    xPosition.innerText = position.x.toString()
    if(yPosition === null){
        throw new Error("Cannot get y-position")
    }
    yPosition.innerHTML = position.y.toString()
}

updatePosition()