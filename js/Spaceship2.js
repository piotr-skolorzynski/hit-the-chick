export class Spaceship {
    //zmienne globalne do sterowania okrętem
    moveValue = 5; //wartość przesunięcia statku
    //status załączenia przycisku
    leftArrow = false;
    rightArrow = false;
    upArrow = false;
    downArrow = false;

    // //tablica przechowująca wystrzelone pociski
    // projectiles = [];

    constructor(shipContainer, gameContainer) {
        this.shipContainer = shipContainer;
        this.gameContainer = gameContainer;
    }

    //umożliwia uruchomienie właściwości obiektu
    init = () => {
        this.setPosition();
        this.keyPressListener();
        this.moveLoop();
    }

    //ustaw pozycję obiektu w połowie szerokości, i na dole ekranu
    setPosition = () => {
        this.shipContainer.style.bottom = '0px'; //oś Y
        this.shipContainer.style.left = `${window.innerWidth / 2 - this.shipContainer.offsetLeft + this.shipContainer.offsetWidth / 2}px`; //oś X
    }

    //nasłuchuj na przyciskach i zmieniaj ich status
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

        //nasłuchuj na odpuszczony przycisk
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
                    // this.handleShipFire(); //wystrzel pocisk
                    break;    
            }
        });
    }
    
    //pobierz aktualną pozycję statku na osi x
    getXposition = () => {
        return parseInt(this.shipContainer.style.left, 10);
    }
    
    //pobierz akualną pozycję statku na osi y
    getYposition = () => {
        return parseInt(this.shipContainer.style.bottom, 10);
    }
    
    //kieruj statkiem
    controlShipMove = () => {
        if (this.leftArrow && this.getXposition() > 5) {
            this.shipContainer.style.left = `${this.getXposition() - this.moveValue}px`;
        }
        if (this.rightArrow && this.getXposition() < window.innerWidth - this.shipContainer.offsetWidth - 5) {
            this.shipContainer.style.left = `${this.getXposition() + this.moveValue}px`;
        }
        if (this.upArrow && this.getYposition() < window.innerHeight - this.shipContainer.offsetHeight - 5) {
            this.shipContainer.style.bottom = `${this.getYposition() + this.moveValue}px`;
        }
        if (this.downArrow && this.getYposition() > 0) {
            this.shipContainer.style.bottom = `${this.getYposition() - this.moveValue}px`;
        }
    }
    
    //pętla uruchamiająca z częstotliwością działania requestAnimationFrame funkcję controlShipMove
    moveLoop = () => {
        this.controlShipMove();
        requestAnimationFrame(this.moveLoop);
    }
}