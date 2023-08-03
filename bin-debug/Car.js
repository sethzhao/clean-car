var Car = (function (_super) {
    __extends(Car, _super);
    function Car() {
        _super.call(this);
        this.places = [130, 208, 285, 362, 439];
        this.placeIndex = 2;
        this.moving = false;
        this.moveSpeed = 80;
        this._mugNum = 0;
        this.createViews();
    }
    var d = __define,c=Car,p=c.prototype;
    p.createViews = function () {
        this.carBg = new egret.Bitmap();
        this.addChild(this.carBg);
        var stageHeight = egret.MainContext.instance.stage.stageHeight;
        this.y = stageHeight;
        this.x = this.places[this.placeIndex];
    };
    p.start = function (callback) {
        var _this = this;
        this.mugNum = 0;
        var stageHeight = egret.MainContext.instance.stage.stageHeight;
        this.y = stageHeight;
        this.placeIndex = 2;
        this.x = this.places[this.placeIndex];
        egret.Tween.get(this).to({ y: stageHeight - 225 }, 400).call(callback);
        this.timer = new egret.Timer(3000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, function () {
            _this.addMud();
        }, this);
        this.timer.start();
    };
    p.stopTimer = function () {
        this.timer.stop();
    };
    p.turnLeft = function () {
        if (this.placeIndex - 1 < 0) {
            return;
        }
        egret.Tween.get(this).to({ x: this.places[--this.placeIndex] }, this.moveSpeed);
    };
    p.turnRight = function () {
        if (this.placeIndex + 1 > this.places.length - 1) {
            return;
        }
        egret.Tween.get(this).to({ x: this.places[++this.placeIndex] }, this.moveSpeed);
    };
    p.addMud = function (num) {
        if (num === void 0) { num = 1; }
        this.mugNum += num;
    };
    p.subMud = function (num) {
        if (num === void 0) { num = 1; }
        this.mugNum -= num;
    };
    d(p, "mugNum"
        ,function () {
            return this._mugNum;
        }
        ,function (mugNum) {
            if (mugNum < 0) {
                this._mugNum = 0;
            }
            else if (mugNum > 9) {
                this.dispatchEventWith('fullMug');
                return;
            }
            else {
                this._mugNum = mugNum;
            }
            if (this._mugNum === 9) {
                if (!this.flashId) {
                    this.flash();
                }
            }
            else {
                clearInterval(this.flashId);
                this.flashId = null;
                this.carBg.texture = RES.getRes("car-ramp_" + (this._mugNum * 3 > 9 ? this._mugNum * 3 : "0" + this._mugNum * 3) + "_png");
            }
        }
    );
    p.flash = function () {
        var _this = this;
        var flag = false;
        this.flashId = setInterval(function () {
            if (flag) {
                flag = false;
                _this.carBg.texture = RES.getRes("car-ramp_" + (_this._mugNum * 3 > 9 ? _this._mugNum * 3 : "0" + _this._mugNum * 3) + "_png");
            }
            else {
                flag = true;
                _this.carBg.texture = RES.getRes("car-flash_png");
            }
        }, 200);
    };
    return Car;
}(egret.Sprite));
egret.registerClass(Car,'Car');
//# sourceMappingURL=Car.js.map