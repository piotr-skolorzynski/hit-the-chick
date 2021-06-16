class Spaceship {
    moveValue = 5; //wartość jednostkowego przesunięcia
    //status załączenia przycisku
    leftArrow = false;
    rightArrow = false;

    constructor(element) {
        this.element = element;
    }
    //umożliwia uruchomienie obiektu
    init = () => {
        this.setPosition();
        this.keyPressListener();
        this.moveLoop();
    }
    //ustaw pozycję obiektu w połowie szerokości, i na dole ekranu
    setPosition = () => {
        this.element.style.bottom = '0px'; //oś Y
        this.element.style.left = `${window.innerWidth / 2 - this.element.offsetLeft + this.element.offsetWidth / 2}px`; //oś X
    }
    //steruj okrętem
    keyPressListener = () => {
        //nasłuchuj na wciśnięty przycisk
        document.addEventListener('keydown', e => {
            switch (e.key) {
                case "Left":
                case "ArrowLeft":
                    this.leftArrow = true;
                    break;
                case "Right":
                case "ArrowRight":
                    this.rightArrow = true;
                    break;
            }
        });
        //nasłuchuj na podniesiony przycisk
        document.addEventListener('keyup', e => {
            switch (e.key) {
                case "Left":
                case "ArrowLeft":
                    this.leftArrow = false;
                    break;
                case "Right":
                case "ArrowRight":
                    this.rightArrow = false;
                    break;
            }
        });
    }
    //funkcja działająca w pętli w cyklu życia gry, wywyłuje się z częstotliwością działania metody requestAnimationFrame przeglądarki, z tą częstotliwością uruchamia metodę whatKeyEvent kierująca statkiem
    moveLoop = () => {
        this.controlShipMove();
        requestAnimationFrame(this.moveLoop);
    }
    //kieruj statkiem
    controlShipMove = () => {
        if (this.leftArrow && this.getXposition() > 3) {
            this.element.style.left = `${this.getXposition() - this.moveValue}px`;
        }
        if (this.rightArrow && this.getXposition() < window.innerWidth - this.element.offsetWidth - 3) {
            this.element.style.left = `${this.getXposition() + this.moveValue}px`;
        }
    }
    //pobierz aktualną pozycję statku na osi x
    getXposition = () => {
        return parseInt(this.element.style.left, 10);
    }
}

export { Spaceship };
