var InfoPopup = (function (_super) {
    __extends(InfoPopup, _super);
    function InfoPopup() {
        _super.call(this);
        this.createView();
    }
    var d = __define,c=InfoPopup,p=c.prototype;
    p.createView = function () {
        var width = egret.MainContext.instance.stage.stageWidth;
        var height = egret.MainContext.instance.stage.stageHeight;
        this._panel = new egret.Sprite();
        var bgBmp = Utils.createBitmap("popup-bg2_png");
        this._panel.addChild(bgBmp);
        this._panel.x = (width - this._panel.width) / 2;
        this._panel.y = (height - this._panel.height) / 2;
        this.addChild(this._panel);
        var title = Utils.createBitmap('info_png');
        title.x = 47;
        title.y = 57;
        this._panel.addChild(title);
        this.nameField = new egret.TextField();
        this.nameField.bold = true;
        this.nameField.background = true;
        this.nameField.backgroundColor = 0xffffff;
        this.nameField.textColor = 0x000000;
        this.nameField.size = 36;
        this.nameField.width = 330;
        this.nameField.height = 58;
        this.nameField.textAlign = 'center';
        this.nameField.verticalAlign = 'middle';
        this.nameField.x = 135;
        this.nameField.y = 160;
        this.nameField.type = egret.TextFieldType.INPUT;
        this._panel.addChild(this.nameField);
        this.telField = new egret.TextField();
        this.telField.bold = true;
        this.telField.background = true;
        this.telField.backgroundColor = 0xffffff;
        this.telField.textColor = 0x000000;
        this.telField.size = 36;
        this.telField.width = 330;
        this.telField.height = 58;
        this.telField.textAlign = 'center';
        this.telField.verticalAlign = 'middle';
        this.telField.x = 135;
        this.telField.y = 240;
        this.telField.type = egret.TextFieldType.INPUT;
        this.telField.restrict = '0-9';
        this._panel.addChild(this.telField);
        var submitBtn = new egret.Sprite();
        var submitBmp = Utils.createBitmap("submit-btn_png");
        submitBtn.addChild(submitBmp);
        submitBtn.x = (this._panel.width - submitBtn.width) / 2;
        submitBtn.y = 369;
        submitBtn.touchEnabled = true;
        submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.submit, this);
        this._panel.addChild(submitBtn);
        this.touchEnabled = true;
        this.graphics.beginFill(0x000000, .8);
        this.graphics.drawRect(0, 0, width, height);
        this.graphics.endFill();
    };
    p.submit = function () {
        console.log(this.nameField.text);
        console.log(this.telField.text);
        this.dispatchEventWith('submit');
        this.close();
    };
    p.close = function () {
        this.parent.removeChild(this);
    };
    return InfoPopup;
}(egret.Sprite));
egret.registerClass(InfoPopup,'InfoPopup');
//# sourceMappingURL=InfoPopup.js.map