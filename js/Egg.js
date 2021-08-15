import { generateNumber } from "./DOMElements.js";

export class Egg {
    constructor (left, top, gameContainer, eggId) {
        this.left = left;
        this.top = top;
        this.gameContainer = gameContainer; //rodzic czyli plansza gry
        this.eggContainer = document.createElement('div'); //pudełko na jajo
        this.id = eggId; //id jaja
        this.eggMoveInterval = null; //id interwału animacji ruchu
        this.speed = generateNumber(7, 15); //prędkość przemieszczania się jaj
        this.eggCheckCollisionInterval = null; //id interwału do sprawdzania kolizji
        this.eggBroken = generateNumber(93, 98) / 100; //procentowa wysokość planszy na której będzie łamało się jajo 
    }

    init() {
        this.setEggPosition();
        this.animateEggMove();
        this.checkEggLeavingGameboard();
    }

    setEggPosition = () => {
        this.eggContainer.classList.add('egg'); //nadaj kontenerowi na jajo klasę egg
        this.eggContainer.setAttribute('data-id', this.id); //nadaj kontenerowi id
        this.gameContainer.appendChild(this.eggContainer); //wrzuć kontener z jajem na planszę
        this.eggContainer.style.left = `${this.left - this.eggContainer.offsetWidth / 2}px`; //położenie na osi X
        this.eggContainer.style.top = `${this.top + this.eggContainer.offsetTop / 2}px`; //położenie na osi Y
    }

    animateEggMove = () => {
        this.eggMoveInterval = setInterval(() => this.eggContainer.style.top = `${this.eggContainer.offsetTop + 1}px`, this.speed); 
    }

    checkEggLeavingGameboard = () => {
        this.eggCheckCollisionInterval = setInterval(() => {
            const eggOnGameboard = document.querySelector(`[data-id="${this.id}"]`);
            if (eggOnGameboard.offsetTop >= window.innerHeight * this.eggBroken) {
                eggOnGameboard.classList.add('broken-egg');
                eggOnGameboard.classList.remove('egg');
                clearInterval(this.eggMoveInterval);
                clearInterval(this.eggCheckCollisionInterval);
                const timeOutInterval = setTimeout(() => {
                    eggOnGameboard.remove();
                    clearTimeout(timeOutInterval);
                }, 1000)
            }
        }, 1)
    }

}