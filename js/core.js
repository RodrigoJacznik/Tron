/*global Player,console*/
var Core = (function (Player) {
    'use strict';

    var CANVAS_WIDTH = 600,
        CANVAS_HEIGHT = 600,
        PLAYERS = [],
        CANVAS = null,
        CONTEXT = null,
        BACKGROUND = [0, 0, 0, 255],
        LINE_BACKGROUND = [0, 255, 255, 255],
        WALLS = [0, 255, 255, 255],
        UP = 38,
        RIGTH = 39,
        DOWN = 40,
        LEFT = 37,
        A = 65,
        S = 83,
        D = 68,
        W = 87;

    function addPlayer(player) {
        PLAYERS.push(player)
    }

    function initCanvas() {
        CANVAS = document.getElementById('canvas');
        CONTEXT = CANVAS.getContext('2d');

        makeBackground();
    }

    function makeBackground() {
        CONTEXT.save();
        // BLUR paredes
        //                CONTEXT.shadowColor = "#0cf";
        //                CONTEXT.shadowBlur = 20;
        //                CONTEXT.shadowOffsetX = 0;
        //                CONTEXT.shadowOffsetY = 0;

        CONTEXT.fillStyle = getRGBAColor(BACKGROUND);
        CONTEXT.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        CONTEXT.strokeStyle = getRGBAColor(LINE_BACKGROUND);
        CONTEXT.lineWidth = 1;

        // GRILLA
        //for (var i = 10; i < canvasHeight; i += 30) {
        //                    CONTEXT.beginPath();
        //                    CONTEXT.moveTo(i, 0);
        //                    CONTEXT.lineTo(i, canvasWidth);
        //                    CONTEXT.stroke();
        //                    CONTEXT.clearRect(i, 0, 1, canvasWidth);
        //                                        CONTEXT.moveTo(0, i);
        //                                        CONTEXT.strokeRect(0, i, 1, canvasHeight);
        //                                        CONTEXT.lineTo(canvasHeight, i);
        //                                        CONTEXT.stroke();
        //}

        CONTEXT.lineWidth = 10;
        CONTEXT.strokeStyle = getRGBAColor(WALLS);
        CONTEXT.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        CONTEXT.restore();
    }

    function getRGBAColor(arrayColor) {
        var r, g, b, a;
        r = arrayColor[0];
        g = arrayColor[1];
        b = arrayColor[2];
        a = arrayColor[3];

        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
    }

    function drawLine(player) {
        CONTEXT.save();
        CONTEXT.lineTo(player.x, player.y);
        setUpLine(player);
        CONTEXT.stroke();
        CONTEXT.restore();
    }

    function setUpLine(player) {
        CONTEXT.strokeStyle = player.color;
        // CONTEXT.shadowColor = "#f11";
        CONTEXT.lineCap = 'round';
        // CONTEXT.shadowOffsetY = 0;
        CONTEXT.lineWidth = 6;
    }

    function startLineDraw(player) {
        CONTEXT.beginPath();
        CONTEXT.moveTo(player.x, player.y);
    }

    function updateGame() {
        var i, player;

        for (i = 0; i < PLAYERS.length; i += 1) {
            player = PLAYERS[i];
            //        player.checkCollition();
            startLineDraw(player);
            player.move();
            drawLine(player);
        }
    }

    function keypress(e) {
        switch (e.keyCode) {
        case UP:
            PLAYERS[0].up();
            break;
        case RIGTH:
            PLAYERS[0].right();
            break;
        case DOWN:
            PLAYERS[0].down();
            break;
        case LEFT:
            PLAYERS[0].left();
            break;
        case W:
            PLAYERS[1].up();
            break;
        case D:
            PLAYERS[1].right();
            break;
        case S:
            PLAYERS[1].down();
            break;
        case A:
            PLAYERS[1].left();
            break;
        }
    }

    function initGame() {
        document.onkeydown = keypress;
        addPlayer(new Player("#f55", 200, 200, 0, 0));
        addPlayer(new Player("#55f", 200, 200, 0, 0));

        initCanvas();
        updateGame();
        setInterval(updateGame, 20);
    }

    return {
        initGame: initGame
    };

}(PlayerManager.Player));