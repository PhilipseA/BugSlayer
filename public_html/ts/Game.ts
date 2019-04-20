/*
 * This class runs the game and contains all Gameitems with their functions
 */
class Game {

    private _element: HTMLElement = document.getElementById('container');
    private _bug: Bug;
    private _player: Player;
    private _bugPlayer: BugPlayer;
    private _counter: Counter;
    private _counterBug: Counter;
    private generatedBug: string;

    /*
     * An key array to be able to use multiple keys
     */
    private keys: Array<boolean> = [];

    constructor() {
        var bugs = new Array("bug", "http", "nullPointer", "stackOverflow", "glitch", "missingno", "variable", "syntax", "first");
        var randomBug = Math.floor(Math.random() * bugs.length);
        let randomX = Math.floor((Math.random() * 1250) + 10);
        let randomY = Math.floor((Math.random() * 550) + 10);
        this.generatedBug = bugs[randomBug];
        this._bug = new Bug(this.generatedBug, 0, randomX, randomY);
        this._player = new Player('bugslayer', 10, 60);
        this._bugPlayer = new BugPlayer('bugPlayer', 1240, 60);
        this._counter = new Counter("score");
        this._counterBug = new Counter("scoreBug");

        this.draw();
        this.loop();

        window.addEventListener('keydown', (e) => {

            this.keys[e.keyCode] = true;

            console.log(e.keyCode);

        });

        window.addEventListener('keyup', (e) => {

            this.keys[e.keyCode] = false;

        });

    }

    /*
     * This loop checks which keys are pressed and updates the position accordingly
     * This function also updates the counter and the winner frame
     */
    public loop = (): void => {

        this.collide();
        this._player.update();
        this._bugPlayer.update();
        this._bug.update();
        this._counter.update();
        this._counterBug.update();
        this.winner(document.getElementById('container'));

        if (this.keys[65]) {
            this._player.move(-10, 0);
        }

        if (this.keys[87]) {
            this._player.move(0, -10);
        }

        if (this.keys[68]) {
            this._player.move(+10, 0);
        }

        if (this.keys[83]) {

            this._player.move(0, +10);
        }

        if (this.keys[72]) {
            this._bugPlayer.moveBug(-10, 0);
        }

        if (this.keys[85]) {
            this._bugPlayer.moveBug(0, -10);
        }

        if (this.keys[75]) {
            this._bugPlayer.moveBug(+10, 0);
        }

        if (this.keys[74]) {
            this._bugPlayer.moveBug(0, +10);
        }

        requestAnimationFrame(this.loop);
    }

    /*
     * This function draws all elements on the gamefield
     */
    public draw(): void {
        this._player.draw(this._element);
        this._bug.draw(this._element);
        this._counter.draw(this._element);
        this._counterBug.draw(this._element);
        this._bugPlayer.draw(this._element);
    }

    /*
     * This function is needed to draw a new bug when one is eaten
     */
    public drawBug(): void {
        this._bug.draw(this._element);
    }

    /*
     * This function checks if there is a collision between elements
     */
    private collide() {

        const bSlayerRect = document.getElementById('bugslayer').getBoundingClientRect();
        const bPlayerRect = document.getElementById('bugPlayer').getBoundingClientRect();
        let genBug = this.generatedBug + '-0';
        const bugRect = document.getElementById(genBug).getBoundingClientRect();


        if (bSlayerRect.left < bugRect.left + bugRect.width &&
            bSlayerRect.left + bSlayerRect.width > bugRect.left &&
            bSlayerRect.top < bugRect.top + bugRect.height &&
            bSlayerRect.height + bSlayerRect.top > bugRect.top) {
            console.log("Bug gevangen door Daan!");
            this._bug.remove(this._element);
            this._counter.updateCounter();

            var bugs = new Array("bug", "http", "nullPointer", "stackOverflow", "glitch", "missingno", "variable", "syntax", "first");
            var randomBug = Math.floor(Math.random() * bugs.length);
            let randomX = Math.floor((Math.random() * 1250) + 10);
            let randomY = Math.floor((Math.random() * 550) + 10);
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
            let randomX = Math.floor((Math.random() * 1250) + 10);
            let randomY = Math.floor((Math.random() * 550) + 10);
            this.generatedBug = bugs[randomBug];
            this._bug = new Bug(this.generatedBug, 0, randomX, randomY);

            this.drawBug();
        }

    }

    /*
     * This function makes a winner frame for the player that wins
     * @param HTMLElement container
     */
    private winner(container: HTMLElement) {
        if (this._counter.score >= 20) {
            this._bug.remove(this._element);
            this._player.remove(this._element);
            this._bugPlayer.remove(this._element);
            this._counter.remove(this._element);
            this._counterBug.remove(this._element);

            this._element = document.createElement('div');
            this._element.className = "winnerBugSlayer";
            this._element.id = "winnerBugSlayer";

            const image = document.createElement('img');
            image.src = `./assets/daann.gif `;

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

            const image = document.createElement('img');
            image.src = `./assets/bugwins.gif `;

            this._element.appendChild(image);
            container.appendChild(this._element);
            console.log("Bug wint!");

            window.onload = this.timedRefresh(5000);
        }
    }

    /*
     * This function reloads the game if someone wins
     * @param boolean timeoutPeriod 
     */
    private timedRefresh(timeoutPeriod: any): any {
        setTimeout("location.reload(true);", timeoutPeriod);
    }

}





