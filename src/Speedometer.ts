class Speedometer extends egret.Sprite {

    private needle: egret.Bitmap;

    public constructor() {
        super();
        this.createView();
    }

    private createView(): void {
        var bg = Utils.createBitmap('speedometer_png');
        this.addChild(bg);

        this.needle = Utils.createBitmap('needle_png');
        this.needle.anchorOffsetX = 7;
        this.needle.anchorOffsetY = 48;
        this.needle.x = 90;
        this.needle.y = 93;
        this.addChild(this.needle);

        this.x = 1;
        this.y = 12;
    }

    public setNeedle(speed) {
        const rotation = speed / 30 * 180 - 90;

        this.needle.rotation = rotation;
    }

}