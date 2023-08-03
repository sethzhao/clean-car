class Car extends egret.Sprite {

    private places = [130, 208, 285, 362, 439];
    private placeIndex = 2;
    private moving: boolean = false;
    private moveSpeed = 80;
    private carBg: egret.Bitmap;
    private _mugNum: number = 0;
    private timer: egret.Timer;
    private flashId: number;

    public constructor() {
        super();
        this.createViews();
    }

    private createViews(): void {
        this.carBg = new egret.Bitmap();
        this.addChild(this.carBg);

        var stageHeight = egret.MainContext.instance.stage.stageHeight;
        this.y = stageHeight;
        this.x = this.places[this.placeIndex];
    }

    public start(callback: Function) {
        this.mugNum = 0;
        var stageHeight = egret.MainContext.instance.stage.stageHeight;
        this.y = stageHeight;
        this.placeIndex = 2;
        this.x = this.places[this.placeIndex];
        egret.Tween.get(this).to({ y: stageHeight - 225 }, 400).call(callback);

        this.timer = new egret.Timer(3000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, () => {
            this.addMud();
        }, this);
        this.timer.start();
    }

    public stopTimer() {
        this.timer.stop();
    }

    public turnLeft() {
        if (this.placeIndex - 1 < 0) {
            return;
        }

        egret.Tween.get(this).to({ x: this.places[--this.placeIndex] }, this.moveSpeed);
    }

    public turnRight() {
        if (this.placeIndex + 1 > this.places.length - 1) {
            return;
        }

        egret.Tween.get(this).to({ x: this.places[++this.placeIndex] }, this.moveSpeed);
    }
    
    public addMud(num: number = 1) {
        this.mugNum += num;
    }

    public subMud(num: number = 1) {
        this.mugNum -= num;
    }

    private set mugNum(mugNum: number){
        if (mugNum < 0) {
            this._mugNum = 0;
        } else if (mugNum > 9) {
            this.dispatchEventWith('fullMug');
            return;
        } else {
            this._mugNum = mugNum;
        }
        
        if (this._mugNum === 9) {
            if (!this.flashId) {
                this.flash();
            }
        } else {
            clearInterval(this.flashId);
            this.flashId = null;
            this.carBg.texture = RES.getRes(`car-ramp_${this._mugNum * 3 > 9 ? this._mugNum * 3 : `0${this._mugNum * 3}`}_png`);
        }
    }

    private flash() {
        var flag = false;
        this.flashId = setInterval(() => {
            if (flag) {
                flag = false;
                this.carBg.texture = RES.getRes(`car-ramp_${this._mugNum * 3 > 9 ? this._mugNum * 3 : `0${this._mugNum * 3}`}_png`);
            } else {
                flag = true;
                this.carBg.texture = RES.getRes(`car-flash_png`);
            }
        }, 200);
    }

    private get mugNum(): number {
        return this._mugNum;
    }
}