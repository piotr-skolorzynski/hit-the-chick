class Projectile {
    constructor(x, y, container) {
        //współrzędne pocisku
        this.x = x;
        this.y = y;
        this.container = container; //rodzic czyli główna plansza gry
        this.element = document.createElement('div'); //pudełko na wizualną reprezentację pocisku
        this.interval = null; //umożliwienie kontroli nad interwałowym przemieszczaniem pocisku
    }
    //inicjacja pocisku
    init() {
        //stwórz diva i nadaj mu klasę projectile
        this.element.classList.add('projectile');
        //wrzuć pocisk do kontenera
        this.container.appendChild(this.element);
        //nadaj mu współrzędne
        //po osi x
        this.element.style.left = `${this.x - this.element.offsetWidth / 2}px`;
        //po osi y
        this.element.style.top = `${this.y - this.element.offsetTop / 2}px`;
        //zmieniaj wartość odległości pocisku od górnej krawędzi o 1px co 5 msec
        this.interval = setInterval(() => this.element.style.top = `${this.element.offsetTop - 1}px`,5);
    }
    //metoda usuwająca pocisk z planszy i czyszcząca jego interwał
    removeProjectile = () => {
        clearInterval(this.interval);
        this.element.remove();
    }
}

export { Projectile };