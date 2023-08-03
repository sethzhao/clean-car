var RulePopup = (function (_super) {
    __extends(RulePopup, _super);
    function RulePopup() {
        _super.call(this);
        this.createView();
    }
    var d = __define,c=RulePopup,p=c.prototype;
    p.createView = function () {
        var width = egret.MainContext.instance.stage.stageWidth;
        var height = egret.MainContext.instance.stage.stageHeight;
        this._panel = new egret.Sprite();
        var bgBmp = Utils.createBitmap("rule-popup_png");
        this._panel.addChild(bgBmp);
        this._panel.x = (width - this._panel.width) / 2;
        this._panel.y = (height - this._panel.height) / 2;
        this.addChild(this._panel);
        var goBtn = new egret.Sprite();
        var goBmp = Utils.createBitmap("go-btn_png");
        goBtn.addChild(goBmp);
        goBtn.x = (this._panel.width - goBtn.width) / 2;
        goBtn.y = 703;
        goBtn.touchEnabled = true;
        goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.go, this);
        this._panel.addChild(goBtn);
        this.touchEnabled = true;
        this.graphics.beginFill(0x000000, .8);
        this.graphics.drawRect(0, 0, width, height);
        this.graphics.endFill();
    };
    p.go = function () {
        this.dispatchEventWith('go');
        this.close();
    };
    p.close = function () {
        this.parent.removeChild(this);
    };
    return RulePopup;
}(egret.Sprite));
egret.registerClass(RulePopup,'RulePopup');
//# sourceMappingURL=RulePopup.js.map