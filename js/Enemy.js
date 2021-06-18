class Enemy {
    constructor(container, id) {
        //rodzic do którego ma trafić
        this.container = container;
        //identyfikator
        this.id = id;
        //reprezentacja wizualna wroga
        this.element = document.createElement('div');
    }
    //inicjalizacja przeciwnika
    init = () => {
        //nadaj div-owi klasę invader
        this.element.classList.add('invader');
        //nadaj identyfikator
        this.element.setAttribute('data-id', `${this.id}`);
        //umieść w rodzicu
        this.container.appendChild(this.element);
    }
}

export { Enemy };