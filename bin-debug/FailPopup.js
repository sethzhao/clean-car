var FailPopup = (function (_super) {
    __extends(FailPopup, _super);
    function FailPopup() {
        _super.call(this);
        this.createView();
    }
    var d = __define,c=FailPopup,p=c.prototype;
    p.createView = function () {
        var width = egret.MainContext.instance.stage.stageWidth;
        var height = egret.MainContext.instance.stage.stageHeight;
        this._panel = new egret.Sprite();
        var bgBmp = Utils.createBitmap("popup-bg1_png");
        this._panel.addChild(bgBmp);
        this._panel.x = (width - this._panel.width) / 2;
        this._panel.y = (height - this._panel.height) / 2;
        this.addChild(this._panel);
        var title = Utils.createBitmap('fail_png');
        title.x = (this._panel.width - title.width) / 2;
        title.y = 84;
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
        var retryBtn = new egret.Sprite();
        var retryBmp = Utils.createBitmap("retry-btn_png");
        retryBtn.addChild(retryBmp);
        retryBtn.x = (this._panel.width - retryBtn.width) / 2;
        retryBtn.y = 342;
        retryBtn.touchEnabled = true;
        retryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.retry, this);
        this._panel.addChild(retryBtn);
        var shareBtn = new egret.Sprite();
        var shareBmp = Utils.createBitmap("share-btn_png");
        shareBtn.addChild(shareBmp);
        shareBtn.x = (this._panel.width - shareBtn.width) / 2;
        shareBtn.y = 418;
        shareBtn.touchEnabled = true;
        shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this);
        this._panel.addChild(shareBtn);
        this.touchEnabled = true;
        this.graphics.beginFill(0x000000, .8);
        this.graphics.drawRect(0, 0, width, height);
        this.graphics.endFill();
    };
    p.intro = function () {
        this.dispatchEventWith('intro');
        this.close();
    };
    p.share = function () {
        this.dispatchEventWith('share');
    };
    p.retry = function () {
        this.dispatchEventWith('retry');
        this.close();
    };
    p.close = function () {
        this.parent.removeChild(this);
    };
    return FailPopup;
}(egret.Sprite));
egret.registerClass(FailPopup,'FailPopup');
//# sourceMappingURL=FailPopup.js.map