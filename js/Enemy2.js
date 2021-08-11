import { generateId } from "./DOMElements.js";

export class Enemy {

    constructor(gameContainer) {
        this.gameContainer = gameContainer; //rodzic do którego ma trafić
        this.enemyId = generateId(); //identyfikator
        this.enemyContainer = document.createElement('div'); //kontener reprezentujący obiekt na stronie
    }

    init = () => {
        this.setEnemyPosition();
    }

    setEnemyPosition = () => {
        this.enemyContainer.classList.add('invader'); //nadaj div-owi klasę invader
        this.enemyContainer.setAttribute('data-id', `${this.enemyId}`); //nadaj identyfikator
        this.gameContainer.appendChild(this.enemyContainer); //umieść w rodzicu
        this.enemyContainer.style.left = '50%'
        this.enemyContainer.style.top = '30%';
    }
}