
var canvas = document.getElementById("map-canvas") as HTMLCanvasElement
canvas.width = 320;
canvas.height = 320;

var context = canvas.getContext("2d");
var tileSize = 32;
var img = new Image(0, 0);
img.src = './tile.png';

var xOffset = 0;
var yOffset = 0;

var mapMoveStep = 2;

var drawGrid = false;

var drawRateMillis = 33;

setTimeout(function(){
    setInterval(function() {
        draw();
    }, drawRateMillis);
}, 2000);

var draw = function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = -1 * tileSize; i < canvas.width + tileSize; i = i + tileSize){
        for(var j = -1 * tileSize; j < canvas.height + tileSize; j = j + tileSize){
            context.drawImage(img, i + xOffset, j + yOffset);
        }
    }
    if(drawGrid){
        for(var i = -1 * tileSize; i < canvas.width + tileSize; i = i + tileSize){
            context.beginPath();
            context.moveTo(i + xOffset, 0);
            context.lineTo(i + xOffset, 320);
            context.stroke();

            context.beginPath();
            context.moveTo(0, i + yOffset);
            context.lineTo(canvas.width, i + yOffset);
            context.stroke();
        }
    }
}
var moveMapDown = function(){
    var intervalHandle = setInterval(function(){
        yOffset += mapMoveStep;
        yOffset = yOffset % tileSize;
        if(yOffset === 0){
            clearInterval(intervalHandle);
        }
    }, drawRateMillis);
}
var moveMapUp = function(){
    var intervalHandle = setInterval(function(){
        yOffset -= mapMoveStep;
        yOffset = yOffset % tileSize;
        if(yOffset === 0){
            clearInterval(intervalHandle);
        }
    }, drawRateMillis);
}
var moveMapLeft = function(){
    var intervalHandle = setInterval(function(){
        xOffset -= mapMoveStep;
        xOffset = xOffset % tileSize;
        if(xOffset === 0){
            clearInterval(intervalHandle);
        }
    }, drawRateMillis);
}
var moveMapRight = function(){
    var intervalHandle = setInterval(function(){
        xOffset += mapMoveStep;
        xOffset = xOffset % tileSize;
        if(xOffset === 0){
            clearInterval(intervalHandle);
        }
    }, drawRateMillis);
}
document.addEventListener("keypress", function(e){
    switch(e.code){
        case "ArrowDown":
        moveMapUp();
        break;
        case "ArrowUp":
        moveMapDown();
        break;
        case "ArrowLeft":
        moveMapRight();
        break;
        case "ArrowRight":
        moveMapLeft();
        break;
    }
})