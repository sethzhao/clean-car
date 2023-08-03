abstract class Obstacle extends egret.Sprite {
    
    public constructor() {
        super();
        this.createBitmap();
    }
    
    private createBitmap(){
        this.addChild(Utils.createBitmap(this.getAssetName()));
    }
    
    abstract getAssetName(): string;
}