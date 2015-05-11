var PlayerManager = (function () {
    'use strict';

    var STEP_X = 6,
        STEP_Y = 6,
        STROKE_WIDTH = 5,
        DEBUG = false,
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
        this.isDead = false;
        this.color = color;
        this.curve = 0;
        this.name;

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
        if (!this.isDead) {
            var tail = this.path.firstChild;

            //            if (this.lastDirection !== this.actualDirection) {
            //                this.curve += 1;
            //
            //                var firstPoint = tail._segments[this.curve]._point;
            //                var lastPoint = tail.getLastSegment()._point;
            //
            //                var newTail = new Path({
            //                    segments: [lastPoint, firstPoint]
            //                });
            //
            //                this.path.firstChild.replaceWith(newTail);
            //                tail = newTail;
            //                this.lastDirection = this.actualDirection;
            //            }

            this.path.lastChild.remove();
            tail.lineBy(this.stepX, this.stepY);

            var lastPoint = tail.getLastSegment()._point;
            var head = new Path({
                segments: [[lastPoint.x, lastPoint.y], [lastPoint.x + this.stepX, lastPoint.y + this.stepY]]
            });

            this.path.addChild(head);
        }
    };

    Player.prototype.checkAutoCollision = function () {
        if (!this.isDead && (this.stepX + this.stepY) !== 0) {
            var head = this.path.lastChild,
                tail = this.path.firstChild;

            if (head.getIntersections(tail).length > 1) {
                this.isDead = true;
            }
        }
    };

    Player.prototype.checkBoundCollision = function (width, height) {
        if (!this.isDead) {
            var head = this.path.lastChild,
                lastPoint = head.getLastSegment()._point;

            // 10 es el border del juego
            if (lastPoint.x > width || lastPoint.y > height || lastPoint.x < 10 || lastPoint.y < 10) {
                this.isDead = true;
            }
        }
    }

    Player.prototype.checkCollisionWithOtherPlayer = function (playerPath) {
        if (!this.isDead) {
            var head = this.path.lastChild;

            if (playerPath.getIntersections(head).length > 0) {
                this.isDead = true;
            }
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