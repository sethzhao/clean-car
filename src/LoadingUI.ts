class LoadingUI extends egret.Sprite {

    public constructor() {
        super();
        this.createView();
    }

    private textField:egret.TextField;

    private createView():void {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 640;
        this.textField.height = 100;
        this.textField.textColor = 0x000000;
        this.textField.textAlign = "center";
    }

    public setProgress(current, total):void {
        this.textField.text = "Loading..." + current + "/" + total;
    }
}
