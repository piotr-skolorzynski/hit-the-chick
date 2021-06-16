class Projectile {
    constructor(x, y, container) {
        //współrzędne pocisku
        this.x = x;
        this.y = y;
        this.container = container;
        this.element = document.createElement('div')
    }
    //inicjacja pocisku
    init() {
        //stwórz diva i nadaj mu klasę projectile
        this.element.classList.add('projectile');
        //wrzuć pocisk do kontenera
        this.container.appendChild(this.element);
        //nadaj mu współrzędne
        //po osi x
        this.element.style.left = `${this.x}px`;
        //po osi y
        this.element.style.top = `${this.y}px`;
        //zmieniaj wartość odległości pocisku od górnej krawędzi o 1px co 5 msec
        setInterval(() => this.element.style.top = `${this.element.offsetTop - 1}px`,5);
    }
}

export { Projectile };