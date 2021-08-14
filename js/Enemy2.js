import { generateNumber } from "./DOMElements.js";
import { Egg } from "./Egg.js";

export class Enemy {

    constructor(gameContainer, left, top) {
        this.gameContainer = gameContainer; //rodzic do którego ma trafić
        this.left = left;
        this.top = top;
        this.id = generateNumber(); //identyfikator
        this.enemyContainer = document.createElement('div'); //kontener reprezentujący obiekt na stronie
        this.isHitted = false; //czy jestem trafiony
        this.interval = null; //interwał do kontroli animacji przeciwnika
    }

    init = () => {
        this.setEnemyPosition();
        this.animateEnemyAfterHit();
        this.interval = setInterval(() => this.animateEnemyAfterHit(), 1);
        this.fireEggs();
    }

    setEnemyPosition = () => {
        this.enemyContainer.classList.add('invader'); //nadaj div-owi klasę invader
        this.enemyContainer.setAttribute('data-id', `${this.id}`); //nadaj identyfikator
        this.gameContainer.appendChild(this.enemyContainer); //umieść w rodzicu
        this.enemyContainer.style.left = `${this.left}%`;
        this.enemyContainer.style.top = `${this.top}%`;
    }

    animateEnemyAfterHit = () => {
        if (this.isHitted) {
            const enemyOnGameboard = document.querySelector(`[data-id="${this.id}"]`);
            enemyOnGameboard.classList.add('explosion--big'); //nie usuwam klasy inavder bo jest przesłaniana poprzez położenie tej klasy niżej w kodzie
            setTimeout(() => {
                enemyOnGameboard.remove();
            }, 1000);
            clearInterval(this.interval);
        }
    }

    fireEggs = () => {
        const eggId = generateNumber();
        const enemyOnGameboard = document.querySelector(`[data-id="${this.id}"]`);
        const left = enemyOnGameboard.offsetLeft + enemyOnGameboard.offsetWidth / 2;
        const top = enemyOnGameboard.offsetTop + enemyOnGameboard.offsetHeight / 3;
        const egg = new Egg(left, top, this.gameContainer, eggId);
        egg.init();
    }

}