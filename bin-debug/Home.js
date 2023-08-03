var Home = (function (_super) {
    __extends(Home, _super);
    function Home() {
        _super.call(this);
        this.createViews();
    }
    var d = __define,c=Home,p=c.prototype;
    p.createViews = function () {
        var stageWidth = egret.MainContext.instance.stage.stageWidth;
        var stageHeight = egret.MainContext.instance.stage.stageHeight;
        var bg = Utils.createBitmap('home-bg_png');
        bg.width = stageWidth;
        bg.height = stageHeight;
        this.addChild(bg);
        var container = new egret.DisplayObjectContainer();
        this.createCloud(container);
        this.createCar(container);
        var wall = Utils.createBitmap('wall_png');
        wall.x = 210;
        wall.y = 733;
        container.addChild(wall);
        this.startBtn = new egret.Sprite();
        var startBmp = Utils.createBitmap("start-btn_png");
        this.startBtn.addChild(startBmp);
        this.startBtn.x = 103;
        this.startBtn.y = 821;
        this.startBtn.touchEnabled = true;
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
        this.startBtn.alpha = 0;
        container.addChild(this.startBtn);
        this.ruleBtn = new egret.Sprite();
        var ruleBmp = Utils.createBitmap("rule-btn_png");
        this.ruleBtn.addChild(ruleBmp);
        this.ruleBtn.x = 333;
        this.ruleBtn.y = 821;
        this.ruleBtn.touchEnabled = true;
        this.ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rule, this);
        this.ruleBtn.alpha = 0;
        container.addChild(this.ruleBtn);
        this.addChild(container);
        container.y = (stageHeight - container.height) / 2;
        this.rulePopup = new RulePopup();
        this.rulePopup.addEventListener('go', this.start, this);
    };
    p.showRuleBtn = function () {
        var _this = this;
        egret.Tween.get(this.ruleBtn).to({ alpha: 1, y: this.ruleBtn.y - 20 }, 600).call(function () { return _this.showStartBtn(); });
    };
    p.showStartBtn = function () {
        egret.Tween.get(this.startBtn).to({ alpha: 1, y: this.startBtn.y - 20 }, 600);
    };
    p.createCar = function (container) {
        var _this = this;
        var car = Utils.createBitmap('home-car_png');
        car.anchorOffsetX = car.width / 2;
        car.anchorOffsetY = car.height / 2;
        car.x = 330;
        car.y = 720;
        car.scaleX = -0.5;
        car.scaleY = 0.5;
        container.addChild(car);
        egret.Tween.get(car)
            .to({ x: 342, y: 750 }, 500)
            .to({ x: 352, y: 800, scaleX: -0.6, scaleY: .6 }, 700)
            .set({ scaleX: 0.6 })
            .call(function () {
            egret.Tween.get(car)
                .to({ x: 320, y: 843, scaleX: .7, scaleY: .7 }, 500)
                .to({ x: 180, y: 940, scaleX: 1, scaleY: 1 }, 1300).call(function () { return _this.showRuleBtn(); });
        });
    };
    p.createCloud = function (container) {
        var cloud1 = Utils.createBitmap('cloud1_png');
        var cloud2 = Utils.createBitmap('cloud2_png');
        var cloud3 = Utils.createBitmap('cloud3_png');
        var cloud4 = Utils.createBitmap('cloud4_png');
        var cloud5 = Utils.createBitmap('cloud5_png');
        var cloud6 = Utils.createBitmap('cloud6_png');
        var cloud7 = Utils.createBitmap('cloud7_png');
        var cloud8 = Utils.createBitmap('cloud8_png');
        container.addChild(cloud7);
        container.addChild(cloud8);
        var home = Utils.createBitmap('home_png');
        container.addChild(home);
        container.addChild(cloud1);
        container.addChild(cloud2);
        container.addChild(cloud3);
        container.addChild(cloud4);
        container.addChild(cloud5);
        container.addChild(cloud6);
        cloud1.x = 460;
        cloud1.y = 95;
        cloud2.x = 559;
        cloud2.y = 389;
        cloud3.x = 481;
        cloud3.y = 514;
        cloud4.x = 322;
        cloud4.y = 576;
        cloud5.x = 15;
        cloud5.y = 566;
        cloud6.x = 31;
        cloud6.y = 189;
        cloud7.x = 35;
        cloud7.y = 43;
        cloud8.x = 422;
        cloud8.y = 50;
        this.move(cloud1);
        this.move(cloud2);
        this.move(cloud3);
        this.move(cloud4);
        this.move(cloud5);
        this.move(cloud6);
        this.move(cloud7);
        this.move(cloud8);
    };
    p.move = function (cloud) {
        var _this = this;
        var duration = Utils.random(1500, 2000);
        var direction = Utils.random(0, 1);
        var distance = Utils.random(15, 20);
        egret.Tween.get(cloud)
            .to({ x: direction ? cloud.x + distance : cloud.x - distance }, duration).call(function () {
            egret.Tween.get(cloud).to({ x: direction ? cloud.x - distance : cloud.x + distance }, duration).call(function () {
                _this.move(cloud);
            });
        });
    };
    p.start = function () {
        this.dispatchEventWith('start');
    };
    p.rule = function () {
        this.addChild(this.rulePopup);
    };
    return Home;
}(egret.Sprite));
egret.registerClass(Home,'Home');
//# sourceMappingURL=Home.js.map