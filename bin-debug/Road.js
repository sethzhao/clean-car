var Road = (function (_super) {
    __extends(Road, _super);
    function Road() {
        _super.call(this);
        this.roadArr = [];
        this.createViews();
    }
    var d = __define,c=Road,p=c.prototype;
    p.createViews = function () {
        var stageHeight = egret.MainContext.instance.stage.stageHeight;
        var start = Utils.createBitmap('road-start_png');
        start.y = stageHeight - start.height;
        start.name = 'start';
        this.addChild(start);
        for (var i = 1; i <= 2; i++) {
            var repeatBmp = Utils.createBitmap('road-repeat_png');
            repeatBmp.y = start.y - repeatBmp.height * i;
            this.roadArr.push(repeatBmp);
            this.addChild(repeatBmp);
        }
    };
    p.move = function (speed) {
        var stageHeight = egret.MainContext.instance.stage.stageHeight;
        for (var i = 0; i < this.numChildren; i++) {
            var child = this.getChildAt(i);
            if (child.y <= stageHeight) {
                child.y += speed;
            }
            else {
                if (child.name === 'start') {
                    this.removeChild(child);
                    i--;
                }
                else {
                    child.y = this.roadArr[1].y - child.height;
                    this.roadArr.shift();
                    this.roadArr.push(child);
                }
            }
        }
    };
    p.reset = function () {
        this.removeChildren();
        this.roadArr = [];
        this.createViews();
    };
    return Road;
}(egret.Sprite));
egret.registerClass(Road,'Road');
//# sourceMappingURL=Road.js.map