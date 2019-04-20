var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var app;
(function () {
    var init = function () {
        app = new Game();
    };
    window.addEventListener('load', init);
})();
var Gameitem = (function () {
    function Gameitem(name, xPosition, yPosition) {
        if (xPosition === void 0) { xPosition = 0; }
        if (yPosition === void 0) { yPosition = 0; }
        this._name = name;
        this._xPos = xPosition;
        this._yPos = yPosition;
    }
    Object.defineProperty(Gameitem.prototype, "xPos", {
        set: function (xPosition) {
            this._xPos = xPosition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gameitem.prototype, "yPos", {
        set: function (yPosition) {
            this._yPos = yPosition;
        },
        enumerable: true,
        configurable: true
    });
    Gameitem.prototype.draw = function (container) {
        this._element = document.createElement('div');
        this._element.className = this._name;
        this._element.id = this._name;
        this._element.style.transform = "translate(" + this._xPos + "px, " + this._yPos + "px)";
        var image = document.createElement('img');
        image.src = "./assets/" + this._name + ".png ";
        this._element.appendChild(image);
        container.appendChild(this._element);
    };
    Gameitem.prototype.update = function () {
        this._element.style.transform = "translate(" + this._xPos + "px, " + this._yPos + "px)";
    };
    return Gameitem;
}());
var Bug = (function (_super) {
    __extends(Bug, _super);
    function Bug(name, id, xPosition, yPosition) {
        if (xPosition === void 0) { xPosition = 0; }
        if (yPosition === void 0) { yPosition = 0; }
        var _this = _super.call(this, name, xPosition, yPosition) || this;
        _this._id = id;
        return _this;
    }
    Bug.prototype.draw = function (container) {
        this._element = document.createElement('div');
        this._element.className = this._name;
        this._element.id = this._name + "-" + this._id;
        this._element.style.transform = "translate(" + this._xPos + "px, " + this._yPos + "px)";
        var image = document.createElement('img');
        image.src = "./assets/" + this._name + ".png ";
        this._element.appendChild(image);
        container.appendChild(this._element);
    };
    Bug.prototype.remove = function (container) {
        var elem = document.getElementById(this._name + "-" + this._id);
        container.removeChild(elem);
    };
    return Bug;
}(Gameitem));
var BugPlayer = (function (_super) {
    __extends(BugPlayer, _super);
    function BugPlayer(name, xPosition, yPosition) {
        if (xPosition === void 0) { xPosition = 0; }
        if (yPosition === void 0) { yPosition = 0; }
        return _super.call(this, name, xPosition, yPosition) || this;
    }
    Object.defineProperty(BugPlayer.prototype, "xPos", {
        get: function () {
            return this._xPos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BugPlayer.prototype, "yPos", {
        get: function () {
            return this._yPos;
        },
        enumerable: true,
        configurable: true
    });
    BugPlayer.prototype.moveBug = function (xPos, yPos) {
        var img = document.getElementById("bugPlayer");
        img.style.transform = "translate(" + (this._xPos + xPos) + "px," + (this._yPos + yPos) + "px" + ")";
        if (this._xPos > 10) {
            this._xPos -= 10;
        }
        if (this._xPos < 1250) {
            this._xPos += 10;
        }
        if (this._yPos < 550) {
            this._yPos += 10;
        }
        if (this._yPos > 20) {
            this._yPos -= 10;
        }
        this._xPos += xPos;
        this._yPos += yPos;
    };
    BugPlayer.prototype.remove = function (container) {
        var elem = document.getElementById("" + this._name);
        container.removeChild(elem);
    };
    return BugPlayer;
}(Gameitem));
var Counter = (function (_super) {
    __extends(Counter, _super);
    function Counter(name) {
        var _this = _super.call(this, name) || this;
        _this._score = 0;
        return _this;
    }
    Object.defineProperty(Counter.prototype, "score", {
        get: function () {
            return this._score;
        },
        enumerable: true,
        configurable: true
    });
    Counter.prototype.draw = function (container) {
        this._element = document.createElement('div');
        this._element.className = this._name;
        this._element.id = this._name;
        var p = document.createElement('p');
        p.innerHTML = 'Score: ';
        var span = document.createElement('span');
        span.innerHTML = this._score.toString();
        p.appendChild(span);
        this._element.appendChild(p);
        container.appendChild(this._element);
    };
    Counter.prototype.update = function () {
        var scoreSpan = this._element.childNodes[0].childNodes[1];
        scoreSpan.innerHTML = this._score.toString();
    };
    Counter.prototype.updateCounter = function () {
        this._score += 1;
    };
    Counter.prototype.remove = function (container) {
        var elem = document.getElementById("" + this._name);
        container.removeChild(elem);
    };
    return Counter;
}(Gameitem));
var Game = (function () {
    function Game() {
        var _this = this;
        this._element = document.getElementById('container');
        this.keys = [];
        this.loop = function () {
            _this.collide();
            _this._player.update();
            _this._bugPlayer.update();
            _this._bug.update();
            _this._counter.update();
            _this._counterBug.update();
            _this.winner(document.getElementById('container'));
            if (_this.keys[65]) {
                _this._player.move(-10, 0);
            }
            if (_this.keys[87]) {
                _this._player.move(0, -10);
            }
            if (_this.keys[68]) {
                _this._player.move(+10, 0);
            }
            if (_this.keys[83]) {
                _this._player.move(0, +10);
            }
            if (_this.keys[72]) {
                _this._bugPlayer.moveBug(-10, 0);
            }
            if (_this.keys[85]) {
                _this._bugPlayer.moveBug(0, -10);
            }
            if (_this.keys[75]) {
                _this._bugPlayer.moveBug(+10, 0);
            }
            if (_this.keys[74]) {
                _this._bugPlayer.moveBug(0, +10);
            }
            requestAnimationFrame(_this.loop);
        };
        var bugs = new Array("bug", "http", "nullPointer", "stackOverflow", "glitch", "missingno", "variable", "syntax", "first");
        var randomBug = Math.floor(Math.random() * bugs.length);
        var randomX = Math.floor((Math.random() * 1250) + 10);
        var randomY = Math.floor((Math.random() * 550) + 10);
        this.generatedBug = bugs[randomBug];
        this._bug = new Bug(this.generatedBug, 0, randomX, randomY);
        this._player = new Player('bugslayer', 10, 60);
        this._bugPlayer = new BugPlayer('bugPlayer', 1240, 60);
        this._counter = new Counter("score");
        this._counterBug = new Counter("scoreBug");
        this.draw();
        this.loop();
        window.addEventListener('keydown', function (e) {
            _this.keys[e.keyCode] = true;
            console.log(e.keyCode);
        });
        window.addEventListener('keyup', function (e) {
            _this.keys[e.keyCode] = false;
        });
    }
    Game.prototype.draw = function () {
        this._player.draw(this._element);
        this._bug.draw(this._element);
        this._counter.draw(this._element);
        this._counterBug.draw(this._element);
        this._bugPlayer.draw(this._element);
    };
    Game.prototype.drawBug = function () {
        this._bug.draw(this._element);
    };
    Game.prototype.collide = function () {
        var bSlayerRect = document.getElementById('bugslayer').getBoundingClientRect();
        var bPlayerRect = document.getElementById('bugPlayer').getBoundingClientRect();
        var genBug = this.generatedBug + '-0';
        var bugRect = document.getElementById(genBug).getBoundingClientRect();
        if (bSlayerRect.left < bugRect.left + bugRect.width &&
            bSlayerRect.left + bSlayerRect.width > bugRect.left &&
            bSlayerRect.top < bugRect.top + bugRect.height &&
            bSlayerRect.height + bSlayerRect.top > bugRect.top) {
            console.log("Bug gevangen door Daan!");
            this._bug.remove(this._element);
            this._counter.updateCounter();
            var bugs = new Array("bug", "http", "nullPointer", "stackOverflow", "glitch", "missingno", "variable", "syntax", "first");
            var randomBug = Math.floor(Math.random() * bugs.length);
            var randomX = Math.floor((Math.random() * 1250) + 10);
            var randomY = Math.floor((Math.random() * 550) + 10);
            this.generatedBug = bugs[randomBug];
            this._bug = new Bug(this.generatedBug, 0, randomX, randomY);
            this.drawBug();
        }
        if (bPlayerRect.left < bugRect.left + bugRect.width &&
            bPlayerRect.left + bPlayerRect.width > bugRect.left &&
            bPlayerRect.top < bugRect.top + bugRect.height &&
            bPlayerRect.height + bPlayerRect.top > bugRect.top) {
            console.log("Bug gevangen door Bugplayer!");
            this._bug.remove(this._element);
            this._counterBug.updateCounter();
            var bugs = new Array("bug", "http", "nullPointer", "stackOverflow", "glitch", "missingno", "variable", "syntax", "first");
            var randomBug = Math.floor(Math.random() * bugs.length);
            var randomX = Math.floor((Math.random() * 1250) + 10);
            var randomY = Math.floor((Math.random() * 550) + 10);
            this.generatedBug = bugs[randomBug];
            this._bug = new Bug(this.generatedBug, 0, randomX, randomY);
            this.drawBug();
        }
    };
    Game.prototype.winner = function (container) {
        if (this._counter.score >= 20) {
            this._bug.remove(this._element);
            this._player.remove(this._element);
            this._bugPlayer.remove(this._element);
            this._counter.remove(this._element);
            this._counterBug.remove(this._element);
            this._element = document.createElement('div');
            this._element.className = "winnerBugSlayer";
            this._element.id = "winnerBugSlayer";
            var image = document.createElement('img');
            image.src = "./assets/daann.gif ";
            this._element.appendChild(image);
            container.appendChild(this._element);
            console.log("Daan wint!");
            window.onload = this.timedRefresh(5000);
        }
        if (this._counterBug.score >= 20) {
            this._bug.remove(this._element);
            this._player.remove(this._element);
            this._bugPlayer.remove(this._element);
            this._counter.remove(this._element);
            this._counterBug.remove(this._element);
            this._element = document.createElement('div');
            this._element.className = "winnerBug";
            this._element.id = "winnerBug";
            var image = document.createElement('img');
            image.src = "./assets/bugwins.gif ";
            this._element.appendChild(image);
            container.appendChild(this._element);
            console.log("Bug wint!");
            window.onload = this.timedRefresh(5000);
        }
    };
    Game.prototype.timedRefresh = function (timeoutPeriod) {
        setTimeout("location.reload(true);", timeoutPeriod);
    };
    return Game;
}());
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(name, xPosition, yPosition) {
        if (xPosition === void 0) { xPosition = 0; }
        if (yPosition === void 0) { yPosition = 0; }
        return _super.call(this, name, xPosition, yPosition) || this;
    }
    Object.defineProperty(Player.prototype, "xPos", {
        get: function () {
            return this._xPos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "yPos", {
        get: function () {
            return this._yPos;
        },
        enumerable: true,
        configurable: true
    });
    Player.prototype.move = function (xPos, yPos) {
        var img = document.getElementById("bugslayer");
        img.style.transform = "translate(" + (this._xPos + xPos) + "px," + (this._yPos + yPos) + "px" + ")";
        if (this._xPos > 10) {
            this._xPos -= 10;
        }
        if (this._xPos < 1250) {
            this._xPos += 10;
        }
        if (this._yPos < 550) {
            this._yPos += 10;
        }
        if (this._yPos > 20) {
            this._yPos -= 10;
        }
        this._xPos += xPos;
        this._yPos += yPos;
    };
    Player.prototype.remove = function (container) {
        var elem = document.getElementById("" + this._name);
        container.removeChild(elem);
    };
    return Player;
}(Gameitem));
//# sourceMappingURL=main.js.map