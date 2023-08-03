var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        _super.call(this);
        this._speed = Game.BASE_SPEED;
        this.isSuspend = false;
        this.isRecovery = false;
        this.distance = 0;
        this.isAccelerate = false;
        this.isDecelerate = false;
        this.isOver = false;
        this.overType = Game.NOT_OVER;
        this.frameCount = 0;
        this.hitTestResultPoint = new egret.Point();
        this.createViews();
        this.touchEnabled = true;
        this.keyCtrl = this.keyCtrl.bind(this);
    }
    var d = __define,c=Game,p=c.prototype;
    p.start = function () {
        var _this = this;
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
        this.car.start(function () {
            _this.export.start();
            _this.addFrameListen();
            _this.addSwiperListen();
            _this.addKeyListener();
            _this.clock.start();
        });
    };
    p.retry = function () {
        this.start();
    };
    p.fullMug = function () {
        this.removeFrameListen();
        this.addChild(this.failPopup);
    };
    p.finish = function () {
        this.removeFrameListen();
        this.successPopup.setDistance(this.distance);
        this.addChild(this.successPopup);
    };
    p.readyStop = function (type) {
        this.overType = type;
        if (type === Game.FULL_MUG) {
            this.clock.stop();
        }
        this.car.stopTimer();
        this.removeSwiperListen();
        this.removeKeyListener();
        this.isOver = true;
        this.targetSpeed = this.speed;
    };
    d(p, "speed"
        ,function () {
            return this._speed;
        }
        ,function (speed) {
            if (speed < Game.MIN_SPEED) {
                this._speed = Game.MIN_SPEED;
            }
            else if (speed > Game.MAX_SPEED) {
                this._speed = Game.MIN_SPEED;
            }
            else {
                this._speed = speed;
            }
        }
    );
    d(p, "targetSpeed"
        ,function () {
            return this._targetSpeed;
        }
        ,function (speed) {
            if (speed < Game.MIN_SPEED) {
                this._targetSpeed = Game.MIN_SPEED;
            }
            else if (speed > Game.MAX_SPEED) {
                this._targetSpeed = Game.MIN_SPEED;
            }
            else {
                this._targetSpeed = speed;
            }
        }
    );
    p.addSwiperListen = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    };
    p.removeSwiperListen = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    };
    p.touchBegin = function (e) {
        this.beginX = e.stageX;
    };
    p.touchEnd = function (e) {
        if (this.isSuspend) {
            return;
        }
        var distance = this.beginX - e.stageX;
        if (Math.abs(distance) < 20) {
            return;
        }
        distance < 0 ? this.car.turnRight() : this.car.turnLeft();
    };
    p.addKeyListener = function () {
        document.addEventListener("keydown", this.keyCtrl);
    };
    p.removeKeyListener = function () {
        document.removeEventListener("keydown", this.keyCtrl);
    };
    p.keyCtrl = function (event) {
        if (this.isSuspend) {
            return;
        }
        switch (event.keyCode) {
            case 39:
                this.car.turnRight();
                break;
            case 37:
                this.car.turnLeft();
                break;
        }
    };
    p.createViews = function () {
        var _this = this;
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
        this.car.addEventListener('fullMug', function () { return _this.readyStop(Game.FULL_MUG); }, this);
        this.addChild(this.car);
        this.clock = new Clock(Game.TIME);
        this.addChild(this.clock);
        this.clock.addEventListener('timeUp', function () { return _this.readyStop(Game.TIMEOUT); }, this);
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
    };
    p.intro = function () {
        this.addChild(this.introPopup);
    };
    p.share = function () {
        this.addChild(this.sharePanel);
    };
    p.toInfo = function () {
        this.addChild(this.infoPopup);
    };
    p.submit = function () {
        this.addChild(this.infoSuccessPopup);
    };
    p.addFrameListen = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
    };
    p.removeFrameListen = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
    };
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
    p.gameViewUpdate = function () {
        // const speedOffset = this.speedOffset();
        this.frameCount++;
        if (this.isOver) {
            if (this.speed > 0) {
                this._speed -= this.targetSpeed / (1 * Game.FPS);
                if (this.speed < 0) {
                    this._speed = 0;
                }
            }
            else {
                if (this.overType === Game.TIMEOUT) {
                    this.finish();
                }
                else if (this.overType === Game.FULL_MUG) {
                    this.fullMug();
                }
                return;
            }
        }
        else if (this.isSuspend) {
            if (this.speed > 0) {
                this._speed -= this.targetSpeed / (.5 * Game.FPS);
                if (this.speed < 0) {
                    this._speed = 0;
                }
            }
            else {
                this.isSuspend = false;
                this.isRecovery = true;
            }
        }
        else if (this.isRecovery) {
            if (this.speed < this.targetSpeed) {
                this._speed += this.targetSpeed / (.5 * Game.FPS);
                if (this.speed > this.targetSpeed) {
                    this._speed = this.targetSpeed;
                }
            }
            else {
                this.isRecovery = false;
            }
        }
        else if (this.isAccelerate) {
            if (this.speed < this.targetSpeed) {
                this.speed += this.targetSpeed / (1 * Game.FPS);
                if (this.speed > this.targetSpeed) {
                    this.speed = this.targetSpeed;
                }
            }
            else {
                this.isAccelerate = false;
            }
        }
        else if (this.isDecelerate) {
            if (this.speed > this.targetSpeed) {
                this.speed -= this.targetSpeed / (1 * Game.FPS);
                if (this.speed < this.targetSpeed) {
                    this.speed = this.targetSpeed;
                }
            }
            else {
                this.isDecelerate = false;
            }
        }
        else {
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
    };
    p.hitTest = function () {
        var obstacles = this.export.getObstacles();
        for (var i = 0; i < obstacles.length; i++) {
            var obstacle = obstacles[i];
            if (obstacle.y < (this.car.y - obstacle.height)) {
                continue;
            }
            obstacle.localToGlobal(obstacle.width / 2, obstacle.height / 2, this.hitTestResultPoint);
            if (this.car.hitTestPoint(this.hitTestResultPoint.x, this.hitTestResultPoint.y)) {
                this.export.removeObstacle(obstacle);
                if (obstacle instanceof Bad1) {
                    if (!this.isSuspend && !this.isRecovery) {
                        this.targetSpeed = this.speed - 1;
                    }
                    this.car.addMud();
                    this.isDecelerate = true;
                }
                else if (obstacle instanceof Bad2) {
                    if (!this.isSuspend && !this.isRecovery) {
                        this.targetSpeed = Game.MIN_SPEED;
                    }
                    this.isSuspend = true;
                }
                else if (obstacle instanceof Good1) {
                    if (!this.isSuspend && !this.isRecovery) {
                        this.targetSpeed = this.speed + 1;
                    }
                    this.car.subMud(2);
                    this.isAccelerate = true;
                }
                else if (obstacle instanceof Good2) {
                    if (!this.isSuspend && !this.isRecovery) {
                        this.targetSpeed = this.speed + 2;
                    }
                    this.car.subMud();
                    this.isAccelerate = true;
                }
                break;
            }
        }
    };
    Game.BASE_SPEED = 12;
    Game.MIN_SPEED = 8;
    Game.MAX_SPEED = 30;
    Game.TIME = 45;
    Game.FPS = 60;
    Game.NOT_OVER = 0;
    Game.TIMEOUT = 1;
    Game.FULL_MUG = 2;
    return Game;
}(egret.DisplayObjectContainer));
egret.registerClass(Game,'Game');
//# sourceMappingURL=Game.js.map