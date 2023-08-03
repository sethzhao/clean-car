var Export = (function (_super) {
    __extends(Export, _super);
    function Export() {
        _super.call(this);
        this.places = [128, 206, 283, 360, 437];
        this.lastDistance = 0;
        this.randomDistance = 0;
        this.obstacles = [];
        this.bad1Pool = [];
        this.bad2Pool = [];
        this.good1Pool = [];
        this.good2Pool = [];
        this.createView();
    }
    var d = __define,c=Export,p=c.prototype;
    p.createView = function () {
        this.obstacleLayer = new egret.DisplayObjectContainer();
        this.addChild(this.obstacleLayer);
    };
    p.getObstacles = function () {
        return this.obstacles;
    };
    p.start = function () {
        this.randomGenerate();
    };
    p.setRandomDistance = function (distance) {
        this.randomDistance = distance;
    };
    p.setNowDistance = function (distance) {
        if (distance - this.lastDistance > this.randomDistance) {
            this.generate();
            this.randomGenerate();
            this.lastDistance = distance;
        }
    };
    p.randomGenerate = function () {
        this.setRandomDistance(Utils.random(Export.BASE_MIN_DISTANCE, Export.BASE_MAX_DISTANCE));
    };
    p.generate = function () {
        var randomMissile = Utils.random(0, 9);
        var obstacle = null;
        if (randomMissile < 5) {
            obstacle = this.bad1Pool.length ? this.bad1Pool.pop() : new Bad1();
        }
        else if (randomMissile < 8) {
            obstacle = this.bad2Pool.length ? this.bad2Pool.pop() : new Bad2();
        }
        else if (randomMissile < 9) {
            obstacle = this.good1Pool.length ? this.good1Pool.pop() : new Good1();
        }
        else {
            obstacle = this.good2Pool.length ? this.good2Pool.pop() : new Good2();
        }
        var randomPlace = Utils.random(0, 4);
        obstacle.x = this.places[randomPlace];
        obstacle.y = -79;
        this.obstacleLayer.addChild(obstacle);
        this.obstacles.push(obstacle);
    };
    p.removeObstacle = function (obstacle) {
        this.obstacleLayer.removeChild(obstacle);
        this.obstacles.splice(this.obstacles.indexOf(obstacle), 1);
        if (obstacle instanceof Bad1) {
            this.bad1Pool.push(obstacle);
        }
        else if (obstacle instanceof Bad2) {
            this.bad2Pool.push(obstacle);
        }
        else if (obstacle instanceof Good1) {
            this.good1Pool.push(obstacle);
        }
        else if (obstacle instanceof Good2) {
            this.good2Pool.push(obstacle);
        }
    };
    p.move = function (speed) {
        var stageHeight = egret.MainContext.instance.stage.stageHeight;
        for (var i = 0; i < this.obstacles.length; i++) {
            var child = this.obstacles[i];
            if (child.y <= stageHeight) {
                child.y += speed;
            }
            else {
                this.removeObstacle(child);
                i--;
            }
        }
    };
    p.clear = function () {
        this.obstacleLayer.removeChildren();
        this.obstacles = [];
        this.lastDistance = 0;
        this.randomDistance = 0;
    };
    Export.BASE_MIN_DISTANCE = 100;
    Export.BASE_MAX_DISTANCE = 300;
    return Export;
}(egret.Sprite));
egret.registerClass(Export,'Export');
//# sourceMappingURL=Export.js.map