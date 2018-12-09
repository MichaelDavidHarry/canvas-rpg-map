export default class CanvasMapConfiguration{
    constructor(){
        this.tileSize = 32
        this.drawFrequencyMilliseconds = 33
        this.drawGrid = false
        this.mapMoveStepPixels = 2
        this.backgroundTileImageUrl = "./tile.png"
    }
    tileSize: number = 32
    drawFrequencyMilliseconds: number = 33
    drawGrid: boolean = false
    mapMoveStepPixels: number = 2
    backgroundTileImageUrl: string = "./tile.png"
}