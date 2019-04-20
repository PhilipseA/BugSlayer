/// <reference path ="Gameitem.ts"/>

/*
 * This class creates a bug image
 */
class Bug extends Gameitem {

    private _id: number;

   /* constructor which extends from Gameitem class
    * @param string name
    * @param number id
    * @param number xPosition
    * @param number yPosition
    */
    constructor(name: string, id: number, xPosition: number = 0, yPosition: number = 0) {
        super(name, xPosition, yPosition);
        this._id = id;
    }

   /*
    *Draws the bug img element
    *@param HTMLElement container
    */
    public draw(container: HTMLElement) {

        this._element = document.createElement('div');
        this._element.className = this._name;
        this._element.id = `${this._name}-${this._id}`;
        this._element.style.transform = `translate(${this._xPos}px, ${this._yPos}px)`;

        const image = document.createElement('img');
        image.src = `./assets/${this._name}.png `;

        this._element.appendChild(image);
        container.appendChild(this._element);
    }

   /*
    * Removes the bug img element
    * @param HTMLElement container
    */
    public remove(container: HTMLElement) {
        const elem = document.getElementById(`${this._name}-${this._id}`);
        container.removeChild(elem);
    }

}

