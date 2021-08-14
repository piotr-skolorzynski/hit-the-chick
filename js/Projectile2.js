export class Projectile {

    constructor(left, top, gameContainer, projectileId) {
        //współrzędne pocisku
        this.left = left;
        this.top = top;
        this.gameContainer = gameContainer; //rodzic czyli główna plansza gry
        this.projectileContainer = document.createElement('div'); //pudełko na wizualną reprezentację pocisku
        this.id = projectileId,
        this.interval = null; //id interwału
    }

    //inicjacja życia pocisku
    init() {
        this.setProjectilePosition();
        this.animateProjectileMove();
    }

    //nadaj położenie pociskowi
    setProjectilePosition = () => {
        this.projectileContainer.classList.add('projectile'); //nadaj kontenerowi na pocisk klasę projectile
        this.projectileContainer.setAttribute('data-id', this.id); //nadaj kontenerowi pocisku unikalne ID
        this.gameContainer.appendChild(this.projectileContainer); //wrzuć pocisk na planszę gry
        this.projectileContainer.style.left = `${this.left - this.projectileContainer.offsetWidth / 2}px`; //położenie na osi X
        this.projectileContainer.style.top = `${this.top - this.projectileContainer.offsetTop / 2}px`; //położenie na osi Y
    }

    //zmniejszaj odległość pocisku od górnej krawędzi o 1px co 5 msec
    animateProjectileMove = () => {
        this.interval = setInterval(() => this.projectileContainer.style.top = `${this.projectileContainer.offsetTop - 1}px`,5); 
    }

    //metoda usuwająca pocisk z planszy i czyszcząca jego interwał
    removeProjectile = () => {
        clearInterval(this.interval);
        this.projectileContainer.remove();
    }
}