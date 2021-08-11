import { generateId } from "./DOMElements.js";

export class Enemy {

    enemiesPosition = []; //tablica do przechowywania pozycji wygenerowanych przeciwników

    constructor(gameContainer) {
        this.gameContainer = gameContainer; //rodzic do którego ma trafić
        this.enemyId = generateId(); //identyfikator
        this.enemyContainer = document.createElement('div'); //kontener reprezentujący obiekt na stronie
    }

    init = () => {
        this.setEnemyPosition();
        this.storeEnemyPositionOnGameBoard();
    }

    setEnemyPosition = () => {
        this.enemyContainer.classList.add('invader'); //nadaj div-owi klasę invader
        this.enemyContainer.setAttribute('data-id', `${this.enemyId}`); //nadaj identyfikator
        this.gameContainer.appendChild(this.enemyContainer); //umieść w rodzicu
        this.enemyContainer.style.left = '50%'
        this.enemyContainer.style.top = '30%';
    }

    storeEnemyPositionOnGameBoard = () => {
        const enemyOnGameBoard = document.querySelector(`[data-id="${this.enemyId}"]`);
        const enemyPosition = {
            id: `${this.enemyId}`,
            top: enemyOnGameBoard.offsetTop,
            left: enemyOnGameBoard.offsetLeft,
            right: enemyOnGameBoard.offsetLeft + enemyOnGameBoard.offsetWidth,
            bottom: enemyOnGameBoard.offsetTop + enemyOnGameBoard.offsetHeight
        }
        console.log(enemyPosition)
        this.enemiesPosition = [...this.enemiesPosition, enemyPosition]
        console.log(this.enemiesPosition)
    }
}