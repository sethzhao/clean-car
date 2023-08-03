var Clock = (function (_super) {
    __extends(Clock, _super);
    function Clock(time) {
        _super.call(this);
        this.time = time;
        this.createView();
    }
    var d = __define,c=Clock,p=c.prototype;
    p.createView = function () {
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
    };
    p.start = function () {
        this.timer = new egret.Timer(1000, this.time);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        this.timer.start();
    };
    p.reset = function () {
        this.textField.text = '00:' + (this.time > 9 ? this.time : '0' + this.time);
    };
    p.stop = function () {
        this.timer.stop();
    };
    p.timerFunc = function (event) {
        var currentCount = event.target.currentCount;
        var timeLeft = this.time - currentCount;
        this.textField.text = '00:' + (timeLeft > 9 ? timeLeft : '0' + timeLeft);
    };
    p.timerComFunc = function (event) {
        this.dispatchEventWith('timeUp');
    };
    return Clock;
}(egret.Sprite));
egret.registerClass(Clock,'Clock');
//# sourceMappingURL=Clock.js.map