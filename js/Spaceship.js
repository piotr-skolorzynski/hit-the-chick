import { Projectile } from "./Projectile.js";

class Spaceship {
    moveValue = 5; //wartość jednostkowego przesunięcia
    //status załączenia przycisku
    leftArrow = false;
    rightArrow = false;
    upArrow = false;
    downArrow = false;
    //tablica przechowująca wystrzelone pociski
    projectiles = [];

    constructor(element, container) {
        this.element = element;
        this.container = container;
    }
    //umożliwia uruchomienie właściwości obiektu
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
                case "Up":
                case "ArrowUp":
                    this.upArrow = true;
                    break;
                case "Down":
                case "ArrowDown":
                    this.downArrow = true;
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
                case "Up":
                case "ArrowUp":
                    this.upArrow = false;
                    break;
                case "Down":
                case "ArrowDown":
                    this.downArrow = false;
                    break;
                case " ":
                    this.handleShipFire();
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
        if (this.leftArrow && this.getXposition() > 5) {
            this.element.style.left = `${this.getXposition() - this.moveValue}px`;
        }
        if (this.rightArrow && this.getXposition() < window.innerWidth - this.element.offsetWidth - 5) {
            this.element.style.left = `${this.getXposition() + this.moveValue}px`;
        }
        if (this.upArrow && this.getYposition() < window.innerHeight - this.element.offsetHeight - 5) {
            this.element.style.bottom = `${this.getYposition() + this.moveValue}px`;
        }
        if (this.downArrow && this.getYposition() > 0) {
            this.element.style.bottom = `${this.getYposition() - this.moveValue}px`;
        }
    }
    //pobierz aktualną pozycję statku na osi x
    getXposition = () => {
        return parseInt(this.element.style.left, 10);
    }
    //pobierz akualną pozycję statku na osi y
    getYposition = () => {
        return parseInt(this.element.style.bottom, 10);
    }
    //realizuj strzelanie
    handleShipFire = () => {
        //utwórz pocisk 
        const projectile = new Projectile(this.getXposition() + this.element.offsetWidth / 2, this.element.offsetTop + this.element.offsetHeight / 2, this.container);
        //animuj pocisk
        projectile.init(); 
        //zapisz pocisk w tabeli
        this.projectiles.push(projectile);
    }
}

export { Spaceship };
