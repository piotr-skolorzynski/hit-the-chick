import { generateId } from "./DOMElements.js";

export class Projectile {

    constructor(xPosition, yPosition, gameContainer) {
        //współrzędne pocisku
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.gameContainer = gameContainer; //rodzic czyli główna plansza gry
        this.projectileContainer = document.createElement('div'); //pudełko na wizualną reprezentację pocisku
        this.projectileId = generateId();
        this.interval = null; //umożliwienie kontroli nad interwałowym przemieszczaniem pocisku
    }

    //inicjacja życia pocisku
    init() {
        this.setProjectilePosition();
        this.animateProjectileMove();
        this.controlProjectileFlight();
    }

    //nadaj położenie pociskowi
    setProjectilePosition = () => {
        this.projectileContainer.classList.add('projectile'); //nadaj kontenerowi na pocisk klasę projectile
        this.projectileContainer.setAttribute('data-id', this.projectileId); //nadaj kontenerowi pocisku unikalne ID
        this.gameContainer.appendChild(this.projectileContainer); //wrzuć pocisk na planszę gry
        this.projectileContainer.style.left = `${this.xPosition - this.projectileContainer.offsetWidth / 2}px`; //położenie na osi X
        this.projectileContainer.style.top = `${this.yPosition - this.projectileContainer.offsetTop / 2}px`; //położenie na osi Y
    }

    //zmniejszaj odległość pocisku od górnej krawędzi o 1px co 5 msec
    animateProjectileMove = () => {
        this.interval = setInterval(() => this.projectileContainer.style.top = `${this.projectileContainer.offsetTop - 1}px`,5); 
    }

    //reaguj na położenie pocisku na planszy
    controlProjectileAnimation = projectilePosition => {

        //jeśli dolna krawędź pocisku przekroczyła górną krawędź planszy usuń pocisk, wyczyść jego interwał
        if (projectilePosition.bottom < 0) {
            this.removeProjectile();
            // projectileArray.splice(projectileIndex, 1);
        }
    }

    //wykonuj w pętli sprawdzenie położenia pocisku i reaguj na sytuację
    controlProjectileFlight = () => {
        const projectileOnBoardGame = document.querySelector(`[data-id="${this.projectileId}"]`); //uchwyć kontener posisku na planszy

        if (!projectileOnBoardGame) return; //jeśli pocisk już nie istnieje zakończ działanie

        const projectilePosition = {
            top: projectileOnBoardGame.offsetTop, //odległość od górnej krawędzi pocisku
            left: projectileOnBoardGame.offsetLeft, //odległość do lewej krawędzi pocisku
            right: (projectileOnBoardGame.offsetLeft + projectileOnBoardGame.offsetWidth), //odległość od prawej krawędzi pocisku
            bottom: (projectileOnBoardGame.offsetTop + projectileOnBoardGame.offsetHeight) //odległość dolnej krawędzi pocisku od górnej krawędzi planszy
        }

        this.controlProjectileAnimation(projectilePosition);
        requestAnimationFrame(this.controlProjectileFlight);
    }

    //metoda usuwająca pocisk z planszy i czyszcząca jego interwał
    removeProjectile = () => {
        clearInterval(this.interval);
        this.projectileContainer.remove();
    }
}