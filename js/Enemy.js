import { generateNumber } from "./DOMElements.js";

export class Enemy {
    constructor(gameContainer, left, top) {
        this.gameContainer = gameContainer; //rodzic do którego ma trafić
        this.left = left;
        this.top = top;
        this.id = generateNumber(); //identyfikator
        this.enemyContainer = document.createElement('div'); //kontener reprezentujący obiekt na stronie
        this.isHitted = false; //czy jestem trafiony
        this.interval = null; //interwał do kontroli animacji przeciwnika
        this.animateEnemyMoveInterval = null;
    }

    init = () => {
        this.setEnemyPosition();
        this.animateEnemyAfterHit();
        this.interval = setInterval(() => this.animateEnemyAfterHit(), 1);
        this.animateEnemyMoveInterval = setInterval(() => this.animateEnemyMove(), 10000); //animacja wrogów
    }

    setEnemyPosition = () => {
        this.enemyContainer.classList.add('invader'); //nadaj div-owi klasę invader
        this.enemyContainer.setAttribute('data-id', `${this.id}`); //nadaj identyfikator
        this.gameContainer.appendChild(this.enemyContainer); //umieść w rodzicu
        this.enemyContainer.style.left = `${this.left}%`;
        this.enemyContainer.style.top = `${this.top}%`;
    }
    // animuj ruch przeciwników
    animateEnemyMove = () => {
        let enemyOnGameboard = document.querySelector(`[data-id="${this.id}"]`);
        
        //ustaw interwał na ruch w prawo 
        const intervalIdNumOne = setInterval(() => {
            enemyOnGameboard.style.left = `${enemyOnGameboard.offsetLeft + 1}px`;
        }, 7);
        
        //zatrzymaj interwał na ruch w prawo i odpal na ruch w dół
        let intervalIdNumTwo = null;
        const timeoutIdNumOne = setTimeout(() => {
            clearInterval(intervalIdNumOne);
            enemyOnGameboard = document.querySelector(`[data-id="${this.id}"]`);
            //ruch w dół
            intervalIdNumTwo = setInterval(() => {
                enemyOnGameboard.style.top = `${enemyOnGameboard.offsetTop + 1}px`;
            }, 10);
        }, 1200);

        //zatrzymaj interwał na ruch w dół i odpal na ruch w lewo
        let intervalIdNumThree = null;
        const timeoutIdNumTwo = setTimeout(() => {
            clearInterval(intervalIdNumTwo);
            clearTimeout(timeoutIdNumOne);
            enemyOnGameboard = document.querySelector(`[data-id="${this.id}"]`);
            //ruch w lewo
            intervalIdNumThree = setInterval(() => {
                enemyOnGameboard.style.left = `${enemyOnGameboard.offsetLeft - 1}px`
            }, 7);
        }, 2400);

        //zatrzymaj interwał na ruch w lewo i odpal w górę
        let intervalIdNumFour = null;
        const timeoutIdNumThree = setTimeout(() => {
            clearInterval(intervalIdNumThree);
            clearTimeout(timeoutIdNumTwo);
            enemyOnGameboard = document.querySelector(`[data-id="${this.id}"]`);
            //ruch w górę
            intervalIdNumFour = setInterval(() => {
                enemyOnGameboard.style.top = `${enemyOnGameboard.offsetTop - 1}px`;
            }, 10);
        }, 4800);

        //zatrzymaj interwał na ruch w górę i odpal w prawo
        let intervalIdNumFive = null;
        const timeoutIdNumFour = setTimeout(() => {
            clearInterval(intervalIdNumFour);
            clearTimeout(timeoutIdNumThree);
            enemyOnGameboard = document.querySelector(`[data-id="${this.id}"]`);
            //ruch w prawo
            intervalIdNumFive = setInterval(() => {
                enemyOnGameboard.style.left = `${enemyOnGameboard.offsetLeft + 1}px`;
            }, 7)
        }, 6000);

        //zatrzymaj ruch w prawo
        const stopMoveRight = setTimeout(() => {
            clearInterval(intervalIdNumFive);
            clearTimeout(timeoutIdNumFour);
            return clearTimeout(stopMoveRight);
        }, 7200);
    }

    animateEnemyAfterHit = () => {
        if (this.isHitted) {
            clearInterval(this.interval);
            clearInterval(this.animateEnemyMoveInterval);
            const enemyOnGameboard = document.querySelector(`[data-id="${this.id}"]`);
            enemyOnGameboard.classList.add('explosion--big'); //nie usuwam klasy inavder bo jest przesłaniana poprzez położenie tej klasy niżej w kodzie
            const timeout = setTimeout(() => {
                enemyOnGameboard.remove();
                return clearTimeout(timeout);
            }, 1000);
        }
    }
}