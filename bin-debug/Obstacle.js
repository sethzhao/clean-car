var Obstacle = (function (_super) {
    __extends(Obstacle, _super);
    function Obstacle() {
        _super.call(this);
        this.createBitmap();
    }
    var d = __define,c=Obstacle,p=c.prototype;
    p.createBitmap = function () {
        this.addChild(Utils.createBitmap(this.getAssetName()));
    };
    return Obstacle;
}(egret.Sprite));
egret.registerClass(Obstacle,'Obstacle');
//# sourceMappingURL=Obstacle.js.map