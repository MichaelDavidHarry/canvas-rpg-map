import CanvasMapConfiguration from "./CanvasMapConfiguration";
import Direction from "./Direction";

export default class CanvasMap{
    constructor(private canvas: HTMLCanvasElement, private configuration: CanvasMapConfiguration = new CanvasMapConfiguration()){
        var context = canvas.getContext("2d")
        if(context === null){
            throw new Error("Could not get canvas context")
        }
        this.context = context
    }

    moveMap(direction: Direction) {
        var intervalHandle: number = 0
        if(direction === Direction.Up || direction === Direction.Down){
            intervalHandle = setInterval(() => {
                if(direction === Direction.Up){
                    this.yOffset -= this.configuration.mapMoveStepPixels
                }
                else{
                    this.yOffset += this.configuration.mapMoveStepPixels
                }
                this.yOffset = this.yOffset % this.configuration.tileSize
                if(this.yOffset === 0){
                    clearInterval(intervalHandle)
                }
            }, this.configuration.drawFrequencyMilliseconds)
        }
        else{
            intervalHandle = setInterval(() => {
                if(direction === Direction.Right){
                    this.xOffset += this.configuration.mapMoveStepPixels
                }
                else{
                    this.xOffset -= this.configuration.mapMoveStepPixels
                }
                this.xOffset = this.xOffset % this.configuration.tileSize
                if(this.xOffset === 0){
                    clearInterval(intervalHandle)
                }
            }, this.configuration.drawFrequencyMilliseconds)
        }
    }

    public async startRendering(){
        var that = this
        this.backgroundTileImageElement = await this.loadImageAsset(this.configuration.backgroundTileImageUrl)
        
        setInterval(() => {
            that.draw()
        }, this.configuration.drawFrequencyMilliseconds)
    }

    private draw(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.drawBackground()
        if(this.configuration.drawGrid){
            this.drawGrid()
        }
    }

    private drawBackground(){
        for(var i = -1 * this.configuration.tileSize; i < this.canvas.width + this.configuration.tileSize; i = i + this.configuration.tileSize){
            for(var j = -1 * this.configuration.tileSize; j < this.canvas.height + this.configuration.tileSize; j = j + this.configuration.tileSize){
                if(this.backgroundTileImageElement != null){
                    this.context.drawImage(this.backgroundTileImageElement, i + this.xOffset, j + this.yOffset)
                }
            }
        }
    }

    private drawGrid(){
        for(var i = -1 * this.configuration.tileSize; i < this.canvas.width + this.configuration.tileSize; i = i + this.configuration.tileSize){
            this.context.beginPath()
            this.context.moveTo(i + this.xOffset, 0)
            this.context.lineTo(i + this.xOffset, 320)
            this.context.stroke()

            this.context.beginPath()
            this.context.moveTo(0, i + this.yOffset)
            this.context.lineTo(this.canvas.width, i + this.yOffset)
            this.context.stroke()
        }
    }

    private loadImageAsset(imageAssetUrl: string) : Promise<HTMLImageElement>{
        var imageElement = new Image(0, 0)
        var loadPromise = new Promise<HTMLImageElement>((resolve, reject) => {
            imageElement.addEventListener("load", () => {
                resolve(imageElement)
            })
        })
        imageElement.src = imageAssetUrl
        return loadPromise
    }

    private context: CanvasRenderingContext2D
    private xOffset: number = 0
    private yOffset: number = 0
    private backgroundTileImageElement: HTMLImageElement | null = null
}