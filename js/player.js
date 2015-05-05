var PlayerManager = (function () {

    'use strict';

    var STEP_X = 5,
        STEP_Y = 5;

    function Player(color, x, y, stepX, stepY) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.stepX = stepX;
        this.stepY = stepY;
    }

    Player.prototype.move = function () {
        this.x += this.stepX;
        this.y += this.stepY;
    };

    Player.prototype.up = function () {
        this.stepY = -STEP_Y;
        this.stepX = 0;
    };

    Player.prototype.right = function () {
        this.stepY = 0;
        this.stepX = STEP_X;
    };

    Player.prototype.down = function () {
        this.stepY = STEP_Y;
        this.stepX = 0;
    };

    Player.prototype.left = function () {
        this.stepY = 0;
        this.stepX = -STEP_X;
    };

    // TODO: Hacer colisiones con paper
    //Player.prototype.checkCollition = function () {
    //    var imageData;
    //    if (this.stepX > 0) {
    //        imageData = context.getImageData(this.x + 3, this.y, this.stepX, 3);
    //    }
    //    if (this.stepX < 0) {
    //        imageData = context.getImageData(this.x - 3, this.y, this.stepX, 3);
    //    }
    //    if (this.stepY > 0) {
    //        imageData = context.getImageData(this.x, this.y + 3, 3, this.stepY);
    //    }
    //    if (this.stepY < 0) {
    //        imageData = context.getImageData(this.x, this.y - 3, 3, this.stepY);
    //    }
    //
    //    if (imageData !== undefined) {
    //        imageData = imageData.data;
    //        var dataLength = imageData.length;
    //        var colision;
    //        for (var i = 0; i < dataLength; i += 4) {
    //            colision = (imageData[i] !== BACKGROUND[0] ||
    //                    imageData[i + 1] !== BACKGROUND[1] ||
    //                    imageData[i + 2] !== BACKGROUND[2] ||
    //                    imageData[i + 3] !== BACKGROUND[3]) &&
    //                (imageData[i] !== WALLS[0] ||
    //                    imageData[i + 1] !== WALLS[1] ||
    //                    imageData[i + 2] !== WALLS[2] ||
    //                    imageData[i + 3] !== WALLS[3])
    //
    //            if (colision) {
    //                var playerID;
    //                if (this.color === "#f55") {
    //                    playerID = "player1";
    //                } else if (this.color === "#55f") {
    //                    playerID = "player2"
    //                }
    //
    //                var td = document.getElementById(playerID);
    //                td.innerHTML = parseInt(td.innerHTML) + 1;
    //            }
    //        }
    //    }
    //};

    return {
        Player: Player
    };
}());