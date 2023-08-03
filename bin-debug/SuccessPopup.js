var SuccessPopup = (function (_super) {
    __extends(SuccessPopup, _super);
    function SuccessPopup() {
        _super.call(this);
        this.createView();
    }
    var d = __define,c=SuccessPopup,p=c.prototype;
    p.createView = function () {
        var width = egret.MainContext.instance.stage.stageWidth;
        var height = egret.MainContext.instance.stage.stageHeight;
        this._panel = new egret.Sprite();
        var bgBmp = Utils.createBitmap("popup-bg1_png");
        this._panel.addChild(bgBmp);
        this._panel.x = (width - this._panel.width) / 2;
        this._panel.y = (height - this._panel.height) / 2;
        this.addChild(this._panel);
        var title = Utils.createBitmap('success_png');
        title.x = (this._panel.width - title.width) / 2;
        title.y = 108;
        this._panel.addChild(title);
        var product = Utils.createBitmap('product_png');
        product.x = (this._panel.width - product.width) / 2;
        product.y = 554;
        this._panel.addChild(product);
        var more = Utils.createBitmap('more_png');
        more.x = (this._panel.width - more.width) / 2;
        more.y = 801;
        more.touchEnabled = true;
        more.addEventListener(egret.TouchEvent.TOUCH_TAP, this.intro, this);
        this._panel.addChild(more);
        var submitBtn = new egret.Sprite();
        var submitBmp = Utils.createBitmap("submit-btn_png");
        submitBtn.addChild(submitBmp);
        submitBtn.x = (this._panel.width - submitBtn.width) / 2;
        submitBtn.y = 342;
        submitBtn.touchEnabled = true;
        submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.submit, this);
        this._panel.addChild(submitBtn);
        var retryBtn = new egret.Sprite();
        var retryBmp = Utils.createBitmap("retry-btn_png");
        retryBtn.addChild(retryBmp);
        retryBtn.x = (this._panel.width - retryBtn.width) / 2;
        retryBtn.y = 418;
        retryBtn.touchEnabled = true;
        retryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.retry, this);
        this._panel.addChild(retryBtn);
        this.result = new egret.TextField();
        this.result.bold = true;
        this.result.textColor = 0x00f0ff;
        this.result.size = 38;
        this.result.text = '您行驶了n米';
        this.result.width = this._panel.width - 100;
        this.result.textAlign = 'center';
        this.result.x = (this._panel.width - this.result.width) / 2;
        this.result.y = 235;
        this._panel.addChild(this.result);
        this.touchEnabled = true;
        this.graphics.beginFill(0x000000, .8);
        this.graphics.drawRect(0, 0, width, height);
        this.graphics.endFill();
    };
    p.intro = function () {
        this.dispatchEventWith('intro');
        this.close();
    };
    p.setDistance = function (distance) {
        this.result.text = "\u60A8\u884C\u9A76\u4E86" + (distance * 30 / 1000).toFixed(2) + "\u7C73";
    };
    p.submit = function () {
        this.dispatchEventWith('submit');
        this.close();
    };
    p.retry = function () {
        this.dispatchEventWith('retry');
        this.close();
    };
    p.close = function () {
        this.parent.removeChild(this);
    };
    return SuccessPopup;
}(egret.Sprite));
egret.registerClass(SuccessPopup,'SuccessPopup');
//# sourceMappingURL=SuccessPopup.js.map