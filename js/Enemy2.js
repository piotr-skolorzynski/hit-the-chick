import { generateId } from "./DOMElements.js";

export class Enemy {

    constructor(gameContainer, left, top) {
        this.gameContainer = gameContainer; //rodzic do którego ma trafić
        this.left = left;
        this.top = top;
        this.id = generateId(); //identyfikator
        this.enemyContainer = document.createElement('div'); //kontener reprezentujący obiekt na stronie
    }

    init = () => {
        this.setEnemyPosition();
    }

    setEnemyPosition = () => {
        this.enemyContainer.classList.add('invader'); //nadaj div-owi klasę invader
        this.enemyContainer.setAttribute('data-id', `${this.id}`); //nadaj identyfikator
        this.gameContainer.appendChild(this.enemyContainer); //umieść w rodzicu
        this.enemyContainer.style.left = `${this.left}%`;
        this.enemyContainer.style.top = `${this.top}%`;
    }
}