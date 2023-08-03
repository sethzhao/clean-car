class IntroPopup extends egret.Sprite {
    
    public constructor() {
        super();
        this.createView();
    }

    private createView() {
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
        
        var retryBtn: egret.Sprite= new egret.Sprite();
        var retryBmp: egret.Bitmap = Utils.createBitmap("retry-btn_png");
        retryBtn.addChild(retryBmp);
        retryBtn.x = 105;
        retryBtn.y = 1791;
        retryBtn.touchEnabled = true;
        retryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.retry, this);
        group.addChild(retryBtn);

        var shareBtn: egret.Sprite= new egret.Sprite();
        var shareBmp: egret.Bitmap = Utils.createBitmap("share-btn_png");
        shareBtn.addChild(shareBmp);
        shareBtn.x = 337;
        shareBtn.y = 1791;
        shareBtn.touchEnabled = true;
        shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this);
        group.addChild(shareBtn);

        var shop: egret.Bitmap = Utils.createBitmap("shop_png");
        shop.x = (width - shop.width) / 2;
        shop.y = 1888;
        shop.touchEnabled = true;
        shop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toShop, this);
        group.addChild(shop);
        
        this.touchEnabled = true;
    }

    private toShop() {
        console.log('toShop');
    }

    private share(){
        this.dispatchEventWith('share');
    }

    private retry() {
        this.dispatchEventWith('retry');
        this.close();
    }
    
    private close() {
        this.parent.removeChild(this);
    }
}