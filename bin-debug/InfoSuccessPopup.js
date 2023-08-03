var InfoSuccessPopup = (function (_super) {
    __extends(InfoSuccessPopup, _super);
    function InfoSuccessPopup() {
        _super.call(this);
        this.createView();
    }
    var d = __define,c=InfoSuccessPopup,p=c.prototype;
    p.createView = function () {
        var width = egret.MainContext.instance.stage.stageWidth;
        var height = egret.MainContext.instance.stage.stageHeight;
        this._panel = new egret.Sprite();
        var bgBmp = Utils.createBitmap("popup-bg2_png");
        this._panel.addChild(bgBmp);
        this._panel.x = (width - this._panel.width) / 2;
        this._panel.y = (height - this._panel.height) / 2;
        this.addChild(this._panel);
        var title = Utils.createBitmap('info-success_png');
        title.x = (this._panel.width - title.width) / 2;
        title.y = 57;
        this._panel.addChild(title);
        var more = Utils.createBitmap('more_png');
        more.x = (this._panel.width - more.width) / 2;
        more.y = 413;
        more.touchEnabled = true;
        more.addEventListener(egret.TouchEvent.TOUCH_TAP, this.intro, this);
        this._panel.addChild(more);
        var shareBtn = new egret.Sprite();
        var shareBmp = Utils.createBitmap("share-btn_png");
        shareBtn.addChild(shareBmp);
        shareBtn.x = (this._panel.width - shareBtn.width) / 2;
        shareBtn.y = 211;
        shareBtn.touchEnabled = true;
        shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this);
        this._panel.addChild(shareBtn);
        var retryBtn = new egret.Sprite();
        var retryBmp = Utils.createBitmap("retry-btn_png");
        retryBtn.addChild(retryBmp);
        retryBtn.x = (this._panel.width - retryBtn.width) / 2;
        retryBtn.y = 291;
        retryBtn.touchEnabled = true;
        retryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.retry, this);
        this._panel.addChild(retryBtn);
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
    return InfoSuccessPopup;
}(egret.Sprite));
egret.registerClass(InfoSuccessPopup,'InfoSuccessPopup');
//# sourceMappingURL=InfoSuccessPopup.js.map