var Speedometer = (function (_super) {
    __extends(Speedometer, _super);
    function Speedometer() {
        _super.call(this);
        this.createView();
    }
    var d = __define,c=Speedometer,p=c.prototype;
    p.createView = function () {
        var bg = Utils.createBitmap('speedometer_png');
        this.addChild(bg);
        this.needle = Utils.createBitmap('needle_png');
        this.needle.anchorOffsetX = 7;
        this.needle.anchorOffsetY = 48;
        this.needle.x = 90;
        this.needle.y = 93;
        this.addChild(this.needle);
        this.x = 1;
        this.y = 12;
    };
    p.setNeedle = function (speed) {
        var rotation = speed / 30 * 180 - 90;
        this.needle.rotation = rotation;
    };
    return Speedometer;
}(egret.Sprite));
egret.registerClass(Speedometer,'Speedometer');
//# sourceMappingURL=Speedometer.js.map