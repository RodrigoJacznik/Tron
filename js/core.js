/*global Player,console*/
var Core = (function (Player) {
    'use strict';

    var CANVAS_WIDTH = 600,
        CANVAS_HEIGHT = 600,
        PLAYERS = [],
        CANVAS = null,
        CONTEXT = null,
        FLAT = [50, 50, 50, 255],
        FLAT_LINES = [0, 255, 255, 255],
        WALLS = [0, 143, 179, 255],
        UP = 38,
        RIGTH = 39,
        DOWN = 40,
        LEFT = 37,
        A = 65,
        S = 83,
        D = 68,
        W = 87;

    function addPlayer(player) {
        PLAYERS.push(player);
    }

    function initCanvas() {
        makeBackground();
    }

    function makeBackground() {
        var background = new Raster('background');
        background.position = view.center;
        background.width = view.width;
        background.height = view.height;

        var walls_shadow = [WALLS[0], WALLS[1] - 50, WALLS[2], WALLS[3]];
        var walls = new Path.Rectangle({
            from: [0, 0],
            to: [view.size.width, view.size.height],
            strokeColor: getRGBAColor(WALLS),
            strokeWidth: 10,
            shadowColor: getRGBAColor(walls_shadow),
            shadowBlur: 20
        });
        view.draw();
    }

    function getRGBAColor(arrayColor) {
        var r, g, b, a;
        r = arrayColor[0];
        g = arrayColor[1];
        b = arrayColor[2];
        a = arrayColor[3];

        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
    }

    function movePlayer(player) {
        player.move()
        view.draw();
    }

    function keypress(e) {
        console.log(e.keyCode);
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

    function updateGame() {
        var i, j, player;

        for (i = 0; i < PLAYERS.length; i += 1) {
            player = PLAYERS[i];
            movePlayer(player);

            player.checkAutoCollision();
            player.checkBoundCollision(view.size.width - 10, view.size.height - 10);
            for (j = 0; j < PLAYERS.length; j += 1) {
                if (j !== i) {
                    player.checkCollisionWithOtherPlayer(PLAYERS[j].path);
                }
            }

        }
    }

    function initGame() {
        document.onkeydown = keypress;
        initCanvas();
        addPlayer(new Player("rgba(255, 0, 0, 0.6)", 10, 100, 0, 0));
        addPlayer(new Player("rgba(0, 255, 0, 0.6)", 200, 10, 0, 0));
        updateGame();
        setInterval(updateGame, 10);
    }

    return {
        initGame: initGame
    };

}(PlayerManager.Player, paper, window));