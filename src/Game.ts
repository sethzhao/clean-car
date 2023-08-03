class Game extends egret.DisplayObjectContainer {
    
    public static BASE_SPEED = 12;
    public static MIN_SPEED = 8;
    public static MAX_SPEED = 30;
    private static TIME = 45;
    private static FPS = 60;
    private _speed = Game.BASE_SPEED;
    private _targetSpeed;
    private road: Road;
    private export: Export;
    private car: Car;
    private beginX: number;
    private isSuspend: boolean = false;
    private isRecovery: boolean = false;
    private clock: Clock;
    private speedometer: Speedometer;
    private distance = 0;
    private _lastTime: number;
    private isAccelerate: boolean = false;
    private isDecelerate: boolean = false;
    private isOver: boolean = false;
    private static NOT_OVER = 0;
    private static TIMEOUT = 1;
    private static FULL_MUG = 2;
    private overType = Game.NOT_OVER;
    private frameCount: number = 0;
    private hitTestResultPoint: egret.Point = new egret.Point();

    private successPopup: SuccessPopup;
    private failPopup: FailPopup;
    private infoPopup: InfoPopup;
    private infoSuccessPopup: InfoSuccessPopup;
    private introPopup: IntroPopup;

    private sharePanel: SharePanel;
    
    public constructor() {
        super();
        this.createViews();

        this.touchEnabled = true;

        this.keyCtrl = this.keyCtrl.bind(this);
    }

    public start() {
        this.road.reset();
        this.distance = 0;
        this.speed = Game.BASE_SPEED;
        this.speedometer.setNeedle(this.speed);
        this.export.clear();
        this.clock.reset();
        this.isSuspend = false;
        this.isRecovery = false;
        this.isAccelerate = false;
        this.isDecelerate = false;
        this._lastTime = null;
        this.isOver = false;
        this.overType = Game.NOT_OVER;
        this.frameCount = 0;

        this.car.start(() => {
            this.export.start();

            this.addFrameListen();
            this.addSwiperListen();
            this.addKeyListener();
            
            this.clock.start();
        });
    }

    private retry() {
        this.start();
    }

    private fullMug(){
        this.removeFrameListen();
        this.addChild(this.failPopup);
    }

    private finish(){
        this.removeFrameListen();
        this.successPopup.setDistance(this.distance);
        this.addChild(this.successPopup);
    }

    private readyStop(type) {
        this.overType = type
        if (type === Game.FULL_MUG) {
            this.clock.stop();
        }

        this.car.stopTimer();
        
        this.removeSwiperListen();
        this.removeKeyListener();

        this.isOver = true;
        this.targetSpeed = this.speed;
    }

    private set speed(speed: number) {
        if (speed < Game.MIN_SPEED) {
            this._speed = Game.MIN_SPEED;
        } else if (speed > Game.MAX_SPEED) {
            this._speed = Game.MIN_SPEED;
        } else {
            this._speed = speed;
        }
    }

    private set targetSpeed(speed: number) {
        if (speed < Game.MIN_SPEED) {
            this._targetSpeed = Game.MIN_SPEED;
        } else if (speed > Game.MAX_SPEED) {
            this._targetSpeed = Game.MIN_SPEED;
        } else {
            this._targetSpeed = speed;
        }
    }

    private get targetSpeed(): number {
        return this._targetSpeed;
    }

    private get speed(): number {
        return this._speed;
    }

    private addSwiperListen() {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    }

    private removeSwiperListen() {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    }

    private touchBegin(e) {
        this.beginX = e.stageX;
    }

    private touchEnd(e) {
        if (this.isSuspend) {
            return;
        }

        const distance = this.beginX - e.stageX;

        if (Math.abs(distance) < 20) {
            return;
        }

        distance < 0 ? this.car.turnRight() : this.car.turnLeft();
    }

    private addKeyListener(){
        document.addEventListener("keydown", this.keyCtrl);
    }

    private removeKeyListener(){
        document.removeEventListener("keydown", this.keyCtrl);
    }

    private keyCtrl(event:KeyboardEvent) {
        if (this.isSuspend) {
            return;
        }

        switch (event.keyCode){
            case 39:
                this.car.turnRight();
                break;
            case 37:
                this.car.turnLeft();
                break;
        }
    }
    
    private createViews(): void {
        var stageWidth = egret.MainContext.instance.stage.stageWidth;
        var stageHeight = egret.MainContext.instance.stage.stageHeight;

        var bg = Utils.createBitmap('game-bg_png');
        bg.width = stageWidth;
        bg.height = stageHeight;
        this.addChild(bg);

        this.road = new Road();
        this.addChild(this.road);

        this.export = new Export();
        this.addChild(this.export);

        this.car = new Car();
        this.car.addEventListener('fullMug', () => this.readyStop(Game.FULL_MUG), this);
        this.addChild(this.car);

        this.clock = new Clock(Game.TIME);
        this.addChild(this.clock);
        this.clock.addEventListener('timeUp', () => this.readyStop(Game.TIMEOUT),this);

        this.speedometer = new Speedometer();
        this.addChild(this.speedometer);

        this.successPopup = new SuccessPopup();
        this.successPopup.addEventListener('retry', this.retry, this);
        this.successPopup.addEventListener('submit', this.toInfo, this);
        this.successPopup.addEventListener('intro', this.intro, this);

        this.failPopup = new FailPopup();
        this.failPopup.addEventListener('retry', this.retry, this);
        this.failPopup.addEventListener('share', this.share, this);
        this.failPopup.addEventListener('intro', this.intro, this);

        this.infoPopup = new InfoPopup();
        this.infoPopup.addEventListener('submit', this.submit, this);

        this.infoSuccessPopup = new InfoSuccessPopup();
        this.infoSuccessPopup.addEventListener('retry', this.retry, this);
        this.infoSuccessPopup.addEventListener('share', this.share, this);
        this.infoSuccessPopup.addEventListener('intro', this.intro, this);

        this.introPopup = new IntroPopup();
        this.introPopup.addEventListener('retry', this.retry, this);
        this.introPopup.addEventListener('share', this.share, this);

        this.sharePanel = new SharePanel();
    }

    private intro() {
        this.addChild(this.introPopup);
    }

    private share() {
        this.addChild(this.sharePanel);
    }

    private toInfo() {
        this.addChild(this.infoPopup);
    }

    private submit() {
        this.addChild(this.infoSuccessPopup);
    }

    private addFrameListen(){
        this.addEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this);
    }
    
    private removeFrameListen() {
        this.removeEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this);
    }

    // private speedOffset(): number {
    //     var nowTime: number = egret.getTimer();
    //     if (!this._lastTime) {
    //         this._lastTime = nowTime;
    //         return 1;
    //     } else {
    //         var fps: number = 1000 / (nowTime - this._lastTime);
    //         this._lastTime = nowTime;
    //         return Game.FPS / fps;
    //     }
    // }

    private gameViewUpdate() {
        // const speedOffset = this.speedOffset();
        this.frameCount++;

        if (this.isOver) {
            if (this.speed > 0) {
                this._speed -= this.targetSpeed / (1 * Game.FPS);
                if (this.speed < 0) {
                    this._speed = 0;
                }
            } else {
                if (this.overType === Game.TIMEOUT) {
                    this.finish();
                } else if (this.overType === Game.FULL_MUG) {
                    this.fullMug();
                }

                return;
            }
        } else if (this.isSuspend) {
            if (this.speed > 0) {
                this._speed -= this.targetSpeed / (.5 * Game.FPS);
                if (this.speed < 0) {
                    this._speed = 0;
                }
            } else {
                this.isSuspend = false;
                this.isRecovery = true;
            }
        } else if (this.isRecovery) {
            if (this.speed < this.targetSpeed) {
                this._speed += this.targetSpeed / (.5 * Game.FPS);
                if (this.speed > this.targetSpeed) {
                    this._speed = this.targetSpeed;
                }
            } else {
                this.isRecovery = false;
            }
        } else if (this.isAccelerate) {
            if (this.speed < this.targetSpeed) {
                this.speed += this.targetSpeed / (1 * Game.FPS);
                if (this.speed > this.targetSpeed) {
                    this.speed = this.targetSpeed;
                }
            } else {
                this.isAccelerate = false;
            }
        } else if (this.isDecelerate) {
            if (this.speed > this.targetSpeed) {
                this.speed -= this.targetSpeed / (1 * Game.FPS);
                if (this.speed < this.targetSpeed) {
                    this.speed = this.targetSpeed;
                }
            } else {
                this.isDecelerate = false;
            }
        } else {
            this.speed -= 0.005;
        }

        this.speedometer.setNeedle(this.speed);

        // const fixSpeed = this.speed * speedOffset;

        this.distance += this.speed;

        this.export.setNowDistance(this.distance);

        this.road.move(this.speed);
        this.export.move(this.speed);

        if (!this.isOver && this.frameCount % 10 === 0) {
            this.hitTest();
        }
    }

    private hitTest() {
        const obstacles: Obstacle[] = this.export.getObstacles();

        for (let i = 0; i < obstacles.length; i++) {
            const obstacle = obstacles[i];

            if (obstacle.y < (this.car.y - obstacle.height)) {
                continue;
            }

            obstacle.localToGlobal(obstacle.width/2, obstacle.height/2, this.hitTestResultPoint);

            if(this.car.hitTestPoint(this.hitTestResultPoint.x, this.hitTestResultPoint.y)) {
                this.export.removeObstacle(obstacle);

                if (obstacle instanceof Bad1) {
                    if (!this.isSuspend && !this.isRecovery) {
                        this.targetSpeed = this.speed - 1;
                    }
                    this.car.addMud();
                    this.isDecelerate = true;
                } else if (obstacle instanceof Bad2) {
                    if (!this.isSuspend && !this.isRecovery) {
                        this.targetSpeed = Game.MIN_SPEED;
                    }
                    this.isSuspend = true;
                } else if (obstacle instanceof Good1) {
                    if (!this.isSuspend && !this.isRecovery) {
                        this.targetSpeed = this.speed + 1;
                    }
                    this.car.subMud(2);
                    this.isAccelerate = true;
                } else if (obstacle instanceof Good2) {
                    if (!this.isSuspend && !this.isRecovery) {
                        this.targetSpeed = this.speed + 2;
                    }
                    this.car.subMud();
                    this.isAccelerate = true;
                }
                
                break;
            }
        }
    }

}