/*
 * This class makes Gameitems and is the super class of all other items in the game
 */
class Gameitem {
    protected _element: HTMLElement;
    protected _name: string;
    protected _xPos: number;
    protected _yPos: number;

    /*     
     * Constructo     
     * @param string nam     
     * @param number xPositio     
     * @param number yPositio     
     */
    constructor(name: string, xPosition: number = 0, yPosition: number = 0) {
        this._name = name
        this._xPos = xPosition;
        this._yPos = yPosition;
    }

    /*
     * Sets a xPos for an element
     * @param number xPos
     */
    public set xPos(xPosition: number) {
        this._xPos = xPosition;
    }

    /*
     * Sets a yPos for an element
     * @param number yPos
     */
    public set yPos(yPosition: number) {
        this._yPos = yPosition;
    }

    /*
     * Draws an Gameitem element
     * @param HTMLElement container
     */
    public draw(container: HTMLElement) {
        this._element = document.createElement('div');
        this._element.className = this._name;
        this._element.id = this._name;
        this._element.style.transform = `translate(${this._xPos}px, ${this._yPos}px)`;

        const image = document.createElement('img');
        image.src = `./assets/${this._name}.png `;

        this._element.appendChild(image);
        container.appendChild(this._element);
    }

    /*
     * Updates the position of an element
     */
    public update() {
        this._element.style.transform = `translate(${this._xPos}px, ${this._yPos}px)`;
    }



}



