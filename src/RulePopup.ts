class RulePopup extends egret.Sprite {
    private _panel: egret.Sprite;

    public constructor() {
        super();
        this.createView();
    }

    private createView() {
        var width = egret.MainContext.instance.stage.stageWidth;
        var height = egret.MainContext.instance.stage.stageHeight;

        this._panel = new egret.Sprite();
        var bgBmp: egret.Bitmap = Utils.createBitmap("rule-popup_png");
        this._panel.addChild(bgBmp);

        this._panel.x = (width - this._panel.width) / 2;
        this._panel.y = (height - this._panel.height) / 2;
        this.addChild(this._panel);

        var goBtn: egret.Sprite= new egret.Sprite();
        var goBmp: egret.Bitmap = Utils.createBitmap("go-btn_png");
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

    }

    private go() {
        this.dispatchEventWith('go');
        this.close();
    }
    
    private close() {
        this.parent.removeChild(this);
    }
}


