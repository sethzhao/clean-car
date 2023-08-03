class FailPopup extends egret.Sprite {
    private _panel: egret.Sprite;

    public constructor() {
        super();
        this.createView();
    }

    private createView() {
        var width = egret.MainContext.instance.stage.stageWidth;
        var height = egret.MainContext.instance.stage.stageHeight;

        this._panel = new egret.Sprite();
        var bgBmp: egret.Bitmap = Utils.createBitmap("popup-bg1_png");
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

        var retryBtn: egret.Sprite= new egret.Sprite();
        var retryBmp: egret.Bitmap = Utils.createBitmap("retry-btn_png");
        retryBtn.addChild(retryBmp);
        retryBtn.x = (this._panel.width - retryBtn.width) / 2;
        retryBtn.y = 342;
        retryBtn.touchEnabled = true;
        retryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.retry, this);
        this._panel.addChild(retryBtn);

        var shareBtn: egret.Sprite= new egret.Sprite();
        var shareBmp: egret.Bitmap = Utils.createBitmap("share-btn_png");
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
    }

    private intro(){
        this.dispatchEventWith('intro');
        this.close();
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


