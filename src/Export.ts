class Export extends egret.Sprite {
    
    private places = [128, 206, 283, 360, 437];
    private obstacleLayer: egret.DisplayObjectContainer;
    private obstacles: Obstacle[];
    private bad1Pool: Bad1[];
    private bad2Pool: Bad2[];
    private good1Pool: Good1[];
    private good2Pool: Good2[];
    private static BASE_MIN_DISTANCE = 100;
    private static BASE_MAX_DISTANCE = 300;
    private lastDistance: number = 0;
    private randomDistance: number = 0;
    
    private timeoutId;
    
    public constructor() {
        super();
        this.obstacles = [];
        this.bad1Pool = [];
        this.bad2Pool = [];
        this.good1Pool = [];
        this.good2Pool = [];
        this.createView();
    }
    
    private createView(): void {
        this.obstacleLayer = new egret.DisplayObjectContainer();
        this.addChild(this.obstacleLayer);
    }
    
    public getObstacles(): Obstacle[]{
        return this.obstacles;
    }
    
    public start(){
        this.randomGenerate();
    }

    public setRandomDistance(distance: number) {
        this.randomDistance = distance;
    }

    public setNowDistance(distance: number) {
        if (distance - this.lastDistance > this.randomDistance) {
            this.generate();
            this.randomGenerate();
            this.lastDistance = distance;
        }
    }

    private randomGenerate() {
        this.setRandomDistance(Utils.random(Export.BASE_MIN_DISTANCE, Export.BASE_MAX_DISTANCE));
    }
    
    private generate(){
        var randomMissile = Utils.random(0, 9);
        var obstacle:Obstacle = null;
        if(randomMissile < 5){
            obstacle = this.bad1Pool.length ? this.bad1Pool.pop() : new Bad1();
        } else if(randomMissile < 8){
            obstacle = this.bad2Pool.length ? this.bad2Pool.pop() : new Bad2();
        } else if(randomMissile < 9){
            obstacle = this.good1Pool.length ? this.good1Pool.pop() : new Good1();
        } else {
            obstacle = this.good2Pool.length ? this.good2Pool.pop() : new Good2();
        }
        var randomPlace = Utils.random(0, 4);
        obstacle.x = this.places[randomPlace];
        obstacle.y = -79;
        
        this.obstacleLayer.addChild(obstacle);
        this.obstacles.push(obstacle);
    }
    
    public removeObstacle(obstacle: Obstacle){
        this.obstacleLayer.removeChild(obstacle);
        this.obstacles.splice(this.obstacles.indexOf(obstacle),1);

        if (obstacle instanceof Bad1) {
            this.bad1Pool.push(obstacle);
        } else if (obstacle instanceof Bad2) {
            this.bad2Pool.push(obstacle);
        } else if (obstacle instanceof Good1) {
            this.good1Pool.push(obstacle);
        } else if (obstacle instanceof Good2) {
            this.good2Pool.push(obstacle);
        }
    }

    public move(speed: number) {
        var stageHeight = egret.MainContext.instance.stage.stageHeight;

        for (let i = 0; i < this.obstacles.length; i++) {
            let child: Obstacle = this.obstacles[i];

            if (child.y <= stageHeight) {
                child.y += speed;
            } else {
                this.removeObstacle(child);
                i--;
            }
        }
    }

    public clear() {
        this.obstacleLayer.removeChildren();
        this.obstacles = [];
        this.lastDistance = 0;
        this.randomDistance = 0;
    }
}