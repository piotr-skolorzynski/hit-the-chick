import { generateId } from "./DOMElements.js";

export class Enemy {

    constructor(gameContainer, xPosition, yPosition) {
        this.gameContainer = gameContainer; //rodzic do którego ma trafić
        this.xPosition = xPosition;
        this.yPosition = yPosition;
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
        this.enemyContainer.style.left = `${this.xPosition}%`;
        this.enemyContainer.style.top = `${this.yPosition}%`;
    }

    getEnemyPosition = () => {
        const enemyOnGameBoard = document.querySelector(`[data-id="${this.enemyId}"]`);
        const enemyPosition = {
            id: `${this.enemyId}`,
            top: enemyOnGameBoard.offsetTop,
            left: enemyOnGameBoard.offsetLeft,
            right: enemyOnGameBoard.offsetLeft + enemyOnGameBoard.offsetWidth,
            bottom: enemyOnGameBoard.offsetTop + enemyOnGameBoard.offsetHeight
        }
        return enemyPosition;
    }
}