/// <reference path ="Gameitem.ts"/>

/*
 * This class makes the player element
 */
class Player extends Gameitem {
    
    /*      
     * constructor that extends from Gameitem class      
     * @param string name      
     * @param number xPosition      
     * @param number yPosition      
     */
    constructor(name: string, xPosition: number = 0, yPosition: number = 0) {
        super(name, xPosition, yPosition);
    }

    /*
     * Get the x position of the element
     */
    get xPos(): number {
        return this._xPos;
    }

    /*
     * Get the y position of the element
     */
    get yPos(): number {
        return this._yPos;
    }

    /*
     * Move function to move the player element
     * @param number xPos
     * @param number yPos
     */
    move(xPos: number, yPos: number) {

        let img = document.getElementById("bugslayer");

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
    }
    
    /* removes the player eleme        
     * @param HTMLElement contain        
     */
    public remove(container: HTMLElement) {
        const elem = document.getElementById(`${this._name}`);
        container.removeChild(elem);
    }
}


