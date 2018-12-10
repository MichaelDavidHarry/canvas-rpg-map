import CanvasMapConfiguration from "./CanvasMapConfiguration";
import Direction from "./Direction";
import MapPosition from "./MapPosition";

export default class CanvasMap{
    constructor(private canvas: HTMLCanvasElement, private configuration: CanvasMapConfiguration = new CanvasMapConfiguration()){
        var context = canvas.getContext("2d")
        if(context === null){
            throw new Error("Could not get canvas context")
        }
        this.context = context
    }

    moveCharacter(direction: Direction) {
        if(this.mapMoving){
            return
        }
        this.mapMoving = true
        var intervalHandle: number = 0
        if(direction === Direction.Up || direction === Direction.Down){
            if(direction === Direction.Up){
                this.yPosition++
            }
            else{
                this.yPosition--
            }
            intervalHandle = setInterval(() => {
                if(direction === Direction.Up){
                    this.yOffset += this.configuration.mapMoveStepPixels
                }
                else{
                    this.yOffset -= this.configuration.mapMoveStepPixels
                }
                this.yOffset = this.yOffset % this.configuration.tileSize
                if(this.yOffset === 0){
                    clearInterval(intervalHandle)
                    this.mapMoving = false
                }
            }, this.configuration.drawFrequencyMilliseconds)
        }
        else{
            if(direction == Direction.Left){
                this.xPosition--
            }
            else{
                this.xPosition++
            }
            intervalHandle = setInterval(() => {
                if(direction === Direction.Right){
                    this.xOffset -= this.configuration.mapMoveStepPixels
                }
                else{
                    this.xOffset += this.configuration.mapMoveStepPixels
                }
                this.xOffset = this.xOffset % this.configuration.tileSize
                if(this.xOffset === 0){
                    clearInterval(intervalHandle)
                    this.mapMoving = false
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
        this.drawCharacter()
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
            this.context.lineTo(i + this.xOffset, this.canvas.height)
            this.context.stroke()

            this.context.beginPath()
            this.context.moveTo(0, i + this.yOffset)
            this.context.lineTo(this.canvas.width, i + this.yOffset)
            this.context.stroke()
        }
    }

    private drawCharacter(){
        var center = this.canvas.width / 2
        var tileSize = this.configuration.tileSize
        var offsetCenter = center - tileSize / 2
        this.context.fillRect(offsetCenter, offsetCenter, tileSize, tileSize)
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

    get mapPosition() : MapPosition{
        return new MapPosition(this.xPosition, this.yPosition)
    }

    private context: CanvasRenderingContext2D
    private xOffset: number = 0
    private yOffset: number = 0
    private xPosition: number = 0
    private yPosition: number = 0
    private mapMoving: boolean = false
    private backgroundTileImageElement: HTMLImageElement | null = null
}