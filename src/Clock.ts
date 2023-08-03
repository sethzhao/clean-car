class Clock extends egret.Sprite{
    
    private textField: egret.TextField;
    private timer: egret.Timer;
    private time: number;
    
    public constructor(time: number) {
        super();
        this.time = time;
        this.createView();
    }
    
    private createView(): void {
        var bg = Utils.createBitmap('clock_png');
        this.addChild(bg);

        this.textField = new egret.TextField();
        
        this.textField.bold = true;
        this.textField.textColor = 0xffffff;
        this.textField.size = 36;
        this.textField.text = '00:' + (this.time > 9 ? this.time : '0' + this.time);
        this.textField.x = 80;
        this.textField.y = 47;
        this.addChild(this.textField);
        this.x = 398;
        this.y = 33;
    }
    
    public start(){
        this.timer = new egret.Timer(1000, this.time);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
        this.timer.start();
    }

    public reset() {
        this.textField.text = '00:' + (this.time > 9 ? this.time : '0' + this.time);
    }
    
    public stop(){
        this.timer.stop();
    }
    
    private timerFunc(event: egret.TimerEvent) {
        var currentCount = (<egret.Timer>event.target).currentCount;
        var timeLeft = this.time - currentCount;
        this.textField.text = '00:' + (timeLeft > 9 ? timeLeft : '0' + timeLeft);
    }
    private timerComFunc(event: egret.TimerEvent) {
        this.dispatchEventWith('timeUp');
    }
}