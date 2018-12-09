import CanvasMap from "./CanvasMap";
import CanvasMapConfiguration from "./CanvasMapConfiguration";
import Direction from "./Direction";

var canvas = document.getElementById("map-canvas") as HTMLCanvasElement
canvas.width = 320
canvas.height = 320
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
            map.moveMap(Direction.Up);
        break;
        case "ArrowUp":
            map.moveMap(Direction.Down);
        break;
        case "ArrowLeft":
        map.moveMap(Direction.Right);
        break;
        case "ArrowRight":
        map.moveMap(Direction.Left);
        break;
    }
})