var PlayerManager = (function () {
    'use strict';

    var STEP_X = 6,
        STEP_Y = 6,
        STROKE_WIDTH = 5,
        DEBUG = true,
        NORTH = 'N',
        EAST = 'E',
        SOUTH = 'S',
        WEST = 'W';

    function Player(color, x, y, stepX, stepY) {
        this.x = x;
        this.y = y;
        this.stepX = stepX;
        this.stepY = stepY;
        this.actualDirection = EAST;
        this.lastDirection = EAST;

        var initialPoint = new paper.Point(x, y);


        var tail = new Path({
            segments: [[x, y], [x + 5, y]],
            name: 'tail'
        });

        var head = new Path({
            segments: [[x + 5, y], [x + 10, y]],
            name: 'head'
        });

        this.path = new CompoundPath({
            children: [tail, head],
            strokeWidth: 6,
            strokeColor: color,
            selected: DEBUG
        });
    }

    Player.prototype.move = function () {
        var tail = this.path.firstChild;

        //        if (this.lastDirection !== this.actualDirection) {
        //            var firstPoint = tail.getFirstSegment()._point;
        //            var lastPoint = tail.getLastSegment()._point;
        //
        //            var newTail = new Path({
        //                segments: [firstPoint, lastPoint]
        //            });
        //
        //            this.path.firstChild.replaceWith(newTail);
        //            tail = newTail;
        //            this.lastDirection = this.actualDirection;
        //        }

        this.path.lastChild.remove();
        tail.lineBy(this.stepX, this.stepY);

        var lastPoint = tail.getLastSegment()._point;
        var head = new Path({
            segments: [[lastPoint.x, lastPoint.y], [lastPoint.x + this.stepX, lastPoint.y + this.stepY]]
        });

        this.path.addChild(head);
    };

    Player.prototype.checkAutoCollision = function () {
        var head = this.path.firstChild,
            tail = this.path.lastChild;

        if (head.getIntersections(tail).length > 1) {
            this.stop();
        }
    };

    Player.prototype.checkBoundCollision = function (width, height) {
        var head = this.path.firstChild,
            lastPoint = head.getLastSegment()._point;

        if (lastPoint.x > width || lastPoint.y > height || lastPoint.x < 0 || lastPoint.y < 0) {
            this.stop();
        }
    }

    Player.prototype.checkCollisionWithOtherPlayer = function (playerPath) {
        var head = this.path.firstChild;

        if (playerPath.getIntersections(head).length > 0) {
            this.stop();
        }
    }

    Player.prototype.getLastPoint = function () {
        return new Point(this.x, this.y);
    };

    Player.prototype.up = function () {
        this.stepY = -STEP_Y;
        this.stepX = 0;
        this.lastDirection = this.actualDirection;
        this.actualDirection = NORTH;
    };

    Player.prototype.right = function () {
        this.stepY = 0;
        this.stepX = STEP_X;
        this.lastDirection = this.actualDirection;
        this.actualDirection = EAST;
    };

    Player.prototype.down = function () {
        this.stepY = STEP_Y;
        this.stepX = 0;
        this.lastDirection = this.actualDirection;
        this.actualDirection = SOUTH;
    };

    Player.prototype.left = function () {
        this.stepY = 0;
        this.stepX = -STEP_X;
        this.lastDirection = this.actualDirection;
        this.actualDirection = WEST;
    };

    Player.prototype.stop = function () {
        this.stepX = 0;
        this.stepY = 0;
    };

    return {
        Player: Player
    };
}(paper));