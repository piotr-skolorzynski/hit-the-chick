import { generateNumber } from "./DOMElements.js";

export class Egg {
    constructor (left, top, gameContainer, eggId) {
        this.left = left;
        this.top = top;
        this.gameContainer = gameContainer; //rodzic czyli plansza gry
        this.eggContainer = document.createElement('div'); //pudełko na jajo
        this.id = eggId; //id jaja
        this.interval = null; //id interwału
        this.speed = generateNumber(7, 15); //prędkość przemieszczania się jaj
    }

    init() {
        this.setEggPosition();
        this.animateEggMove();
    }

    setEggPosition = () => {
        this.eggContainer.classList.add('egg'); //nadaj kontenerowi na jajo klasę egg
        this.eggContainer.setAttribute('data-id', this.id); //nadaj kontenerowi id
        this.gameContainer.appendChild(this.eggContainer); //wrzuć kontener z jajem na planszę
        this.eggContainer.style.left = `${this.left - this.eggContainer.offsetWidth / 2}px`; //położenie na osi X
        this.eggContainer.style.top = `${this.top + this.eggContainer.offsetTop / 2}px`; //położenie na osi Y
    }

    animateEggMove = () => {
        this.interval = setInterval(() => this.eggContainer.style.top = `${this.eggContainer.offsetTop + 1}px`, this.speed); 
    }

}