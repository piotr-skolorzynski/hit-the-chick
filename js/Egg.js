import { generateNumber } from "./DOMElements.js";

export class Egg {
    constructor (left, top, gameContainer, eggId) {
        this.left = left;
        this.top = top;
        this.gameContainer = gameContainer; //rodzic czyli plansza gry
        this.eggContainer = document.createElement('div'); //pudełko na jajo
        this.id = eggId; //id jaja
        this.eggMoveInterval = null; //id interwału animacji ruchu
        this.speed = generateNumber(10, 20); //prędkość przemieszczania się jaj
        this.whenToBroke = generateNumber(93, 98) / 100; //procentowa wysokość planszy na której będzie łamało się jajo 
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
        this.eggMoveInterval = setInterval(() => this.eggContainer.style.top = `${this.eggContainer.offsetTop + 1}px`, this.speed); 
    }
}

// druga funkcja to sprawdzanie czy jajo trafiło w statek
//kolejny krok to gra ma iterować po przeciwnikach i sprawdzać czy któryś trafił i odejmować życie statkowi