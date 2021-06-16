class Spaceship {
    moveValue = 5; //wartość jednostkowego przesunięcia

    constructor(element) {
        this.element = element;
    }
    //umożliwia uruchomienie obiektu
    init() {
        console.log('pozdrowienia z klasy Spaceship');
        this.setPosition();
        this.controlShip();
    }
    //ustaw pozycję obiektu w połowie szerokości, i na dole ekranu
    setPosition() {
        this.element.style.bottom = '0px'; //oś Y
        this.element.style.left = `${window.innerWidth / 2 - this.element.offsetLeft - this.element.offsetWidth / 2}px`; //oś X
    }
    //steruj okrętem
    controlShip() {
        document.addEventListener('keydown', e => {
            switch (e.key) {
                case "Left":
                case "ArrowLeft":
                    this.element.style.left = `${parseInt(this.element.style.left, 10) - this.moveValue}px`;
                    break;
                case "Right":
                case "ArrowRight":
                    this.element.style.left = `${parseInt(this.element.style.left, 10) + this.moveValue}px`;
                    break;
            }
        })
    }
}

export { Spaceship };
