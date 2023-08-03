var IntroPopup = (function (_super) {
    __extends(IntroPopup, _super);
    function IntroPopup() {
        _super.call(this);
        this.createView();
    }
    var d = __define,c=IntroPopup,p=c.prototype;
    p.createView = function () {
        var width = egret.MainContext.instance.stage.stageWidth;
        var height = egret.MainContext.instance.stage.stageHeight;
        var group = new eui.Group();
        var img = new eui.Image("resource/assets/intro.png");
        group.addChild(img);
        var myScroller = new eui.Scroller();
        myScroller.width = width;
        myScroller.height = height;
        myScroller.viewport = group;
        myScroller.skinName = 'resource/ScrollerSkin.exml';
        this.addChild(myScroller);
        var retryBtn = new egret.Sprite();
        var retryBmp = Utils.createBitmap("retry-btn_png");
        retryBtn.addChild(retryBmp);
        retryBtn.x = 105;
        retryBtn.y = 1791;
        retryBtn.touchEnabled = true;
        retryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.retry, this);
        group.addChild(retryBtn);
        var shareBtn = new egret.Sprite();
        var shareBmp = Utils.createBitmap("share-btn_png");
        shareBtn.addChild(shareBmp);
        shareBtn.x = 337;
        shareBtn.y = 1791;
        shareBtn.touchEnabled = true;
        shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this);
        group.addChild(shareBtn);
        var shop = Utils.createBitmap("shop_png");
        shop.x = (width - shop.width) / 2;
        shop.y = 1888;
        shop.touchEnabled = true;
        shop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toShop, this);
        group.addChild(shop);
        this.touchEnabled = true;
    };
    p.toShop = function () {
        console.log('toShop');
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
    return IntroPopup;
}(egret.Sprite));
egret.registerClass(IntroPopup,'IntroPopup');
//# sourceMappingURL=IntroPopup.js.map