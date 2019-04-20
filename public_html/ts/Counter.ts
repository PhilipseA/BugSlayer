/// <reference path ="Gameitem.ts"/>

/*
 * This class creates a counter element for the scores
 */
class Counter extends Gameitem {
    private _score: number;

    /*
     * Constructor
     * @param string name
     */
    constructor(name: string) {
        super(name);
        this._score = 0;
    }

    /*
     * Gets the score
     */
    public get score(): number {
        return this._score;
    }
    
    /*      
     * this function draws the counter element      
     * @param HTMLElement container     
     */
    public draw(container: HTMLElement) {
        this._element = document.createElement('div');
        this._element.className = this._name;
        this._element.id = this._name;

        const p = document.createElement('p');
        p.innerHTML = 'Score: ';

        const span = document.createElement('span');
        span.innerHTML = this._score.toString();

        p.appendChild(span);
        this._element.appendChild(p);
        container.appendChild(this._element);
    }

    /*
     * This function updates the counter by 1
     */
    public update() {
        const scoreSpan = (<HTMLElement> this._element.childNodes[0].childNodes[1]);
        scoreSpan.innerHTML = this._score.toString();
    }

    /*
     * This function iterates the counter by 1
     */
    public updateCounter() {
        this._score += 1;
    }

    /*
     * Removes the counter element
     * @param HTMLElement container
     */
    public remove(container: HTMLElement) {
        const elem = document.getElementById(`${this._name}`);
        container.removeChild(elem);
    }
}


