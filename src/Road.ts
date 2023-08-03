class Road extends egret.Sprite {

    private roadArr:egret.Bitmap[] = [];

    public constructor() {
        super();
        this.createViews();
    }

    private createViews(): void {
        var stageHeight = egret.MainContext.instance.stage.stageHeight;

        var start = Utils.createBitmap('road-start_png');
        start.y = stageHeight - start.height;
        start.name = 'start';
        this.addChild(start);

        for(var i = 1; i<= 2; i++) {
            var repeatBmp:egret.Bitmap = Utils.createBitmap('road-repeat_png');
            repeatBmp.y = start.y -  repeatBmp.height * i;
            this.roadArr.push(repeatBmp);
            this.addChild(repeatBmp);
        }
    }

    public move(speed: number) {
        var stageHeight = egret.MainContext.instance.stage.stageHeight;

        for (let i = 0; i < this.numChildren; i++) {
            let child: egret.Bitmap = <egret.Bitmap>this.getChildAt(i);

            if (child.y <= stageHeight) {
                child.y += speed;
            } else {
                if (child.name === 'start') {
                    this.removeChild(child);
                    i--;
                } else {
                    child.y = this.roadArr[1].y- child.height;
                    this.roadArr.shift(); 
                    this.roadArr.push(child);
                }
            }
        }
    }

    public reset() {
        this.removeChildren();
        this.roadArr = [];
        this.createViews();
    }
}