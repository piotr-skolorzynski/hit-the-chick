import { generateNumber } from "./DOMElements.js";
import { Egg } from "./Egg.js";

export class Enemy {

    firedEggsArray = []; //tablica na wystrzelone jaja

    constructor(gameContainer, left, top) {
        this.gameContainer = gameContainer; //rodzic do którego ma trafić
        this.left = left;
        this.top = top;
        this.id = generateNumber(); //identyfikator
        this.enemyContainer = document.createElement('div'); //kontener reprezentujący obiekt na stronie
        this.isHitted = false; //czy jestem trafiony
        this.interval = null; //interwał do kontroli animacji przeciwnika
        this.eggIntervalLength = generateNumber(10000, 30000); //losowo ustaw interwał w generowaniu jaj
        this.eggGeneratorInterval = null; //interwał do kontroli generacji jaj
        this.animateEnemyMoveInterval = null;
    }

    init = () => {
        this.setEnemyPosition();
        this.animateEnemyAfterHit();
        this.interval = setInterval(() => this.animateEnemyAfterHit(), 1);
        this.eggGeneratorInterval = setInterval(() => this.fireEggs(), this.eggIntervalLength);
        // this.animateEnemyMoveInterval = setInterval(() => this.animateEnemyMove(), 20000);
        this.checkEggsCollisionsInterval = setInterval(() => this.checkEggsCollisions(), 1);
    }

    setEnemyPosition = () => {
        this.enemyContainer.classList.add('invader'); //nadaj div-owi klasę invader
        this.enemyContainer.setAttribute('data-id', `${this.id}`); //nadaj identyfikator
        this.gameContainer.appendChild(this.enemyContainer); //umieść w rodzicu
        this.enemyContainer.style.left = `${this.left}%`;
        this.enemyContainer.style.top = `${this.top}%`;
    }
    // animuj ruch przeciwników
    animateEnemyMove = () => {
        let enemyOnGameboard = document.querySelector(`[data-id="${this.id}"]`);
        
        //ustaw interwał na ruch w prawo 
        const intervalIdNumOne = setInterval(() => {
            enemyOnGameboard.style.left = `${enemyOnGameboard.offsetLeft + 1}px`;
        }, 7);
        
        //zatrzymaj interwał na ruch w prawo i odpal na ruch w dół
        let intervalIdNumTwo = null;
        const timeoutIdNumOne = setTimeout(() => {
            clearInterval(intervalIdNumOne);
            enemyOnGameboard = document.querySelector(`[data-id="${this.id}"]`);
            //ruch w dół
            intervalIdNumTwo = setInterval(() => {
                enemyOnGameboard.style.top = `${enemyOnGameboard.offsetTop + 1}px`;
            }, 10);
        }, 1200);

        //zatrzymaj interwał na ruch w dół i odpal na ruch w lewo
        let intervalIdNumThree = null;
        const timeoutIdNumTwo = setTimeout(() => {
            clearInterval(intervalIdNumTwo);
            clearTimeout(timeoutIdNumOne);
            enemyOnGameboard = document.querySelector(`[data-id="${this.id}"]`);
            //ruch w lewo
            intervalIdNumThree = setInterval(() => {
                enemyOnGameboard.style.left = `${enemyOnGameboard.offsetLeft - 1}px`
            }, 7);
        }, 2400);

        //zatrzymaj interwał na ruch w lewo i odpal w górę
        let intervalIdNumFour = null;
        const timeoutIdNumThree = setTimeout(() => {
            clearInterval(intervalIdNumThree);
            clearTimeout(timeoutIdNumTwo);
            enemyOnGameboard = document.querySelector(`[data-id="${this.id}"]`);
            //ruch w górę
            intervalIdNumFour = setInterval(() => {
                enemyOnGameboard.style.top = `${enemyOnGameboard.offsetTop - 1}px`;
            }, 10);
        }, 4800);

        //zatrzymaj interwał na ruch w górę i odpal w prawo
        let intervalIdNumFive = null;
        const timeoutIdNumFour = setTimeout(() => {
            clearInterval(intervalIdNumFour);
            clearTimeout(timeoutIdNumThree);
            enemyOnGameboard = document.querySelector(`[data-id="${this.id}"]`);
            //ruch w prawo
            intervalIdNumFive = setInterval(() => {
                enemyOnGameboard.style.left = `${enemyOnGameboard.offsetLeft + 1}px`;
            }, 7)
        }, 6000);

        //zatrzymaj ruch w prawo
        setTimeout(() => {
            clearInterval(intervalIdNumFive);
            clearTimeout(timeoutIdNumFour);
        }, 7200);
    }

    animateEnemyAfterHit = () => {
        if (this.isHitted) {
            const enemyOnGameboard = document.querySelector(`[data-id="${this.id}"]`);
            enemyOnGameboard.classList.add('explosion--big'); //nie usuwam klasy inavder bo jest przesłaniana poprzez położenie tej klasy niżej w kodzie
            setTimeout(() => {
                enemyOnGameboard.remove();
            }, 1000);
            clearInterval(this.eggGeneratorInterval);
            clearInterval(this.interval);
            clearInterval(this.animateEnemyMoveInterval);
            clearInterval(this.checkEggsCollisionsInterval);
            //po trafierniu przecwinika wszystkie wytrzelone jaja mają się rozwalić a tablica wyzerować
            this.firedEggsArray.map(egg => {
                const eggOnGameboard = document.querySelector(`[data-id="${egg.id}"]`);
                eggOnGameboard.classList.add('broken-egg');
                eggOnGameboard.classList.remove('egg');
                clearInterval(egg.eggMoveInterval);
                const timeOutInterval = setTimeout(() => {
                    eggOnGameboard.remove();
                    clearTimeout(timeOutInterval);
                }, 1000);
            });
            this.firedEggsArray = null;
        }
    }

    fireEggs = () => {
        const eggId = generateNumber();
        const enemyOnGameboard = document.querySelector(`[data-id="${this.id}"]`);
        const left = enemyOnGameboard.offsetLeft + enemyOnGameboard.offsetWidth / 2;
        const top = enemyOnGameboard.offsetTop + enemyOnGameboard.offsetHeight / 3;
        const egg = new Egg(left, top, this.gameContainer, eggId);
        egg.init();
        this.firedEggsArray = [...this.firedEggsArray, egg];
    }

    checkEggsCollisions = () => {

        this.firedEggsArray.map((egg, eggIndex, eggsArray) => {
            const eggOnGameboard = document.querySelector(`[data-id="${egg.id}"]`);
            //czyszczenie jaj z gry i tablicy które nie trafiły
            if (eggOnGameboard.offsetTop >= window.innerHeight * egg.whenToBroke) {
                eggOnGameboard.classList.add('broken-egg');
                eggOnGameboard.classList.remove('egg');
                clearInterval(egg.eggMoveInterval);
                eggsArray.splice(eggIndex, 1); //usuń jajo z tablicy
                const timeOutInterval = setTimeout(() => {
                    eggOnGameboard.remove();
                    clearTimeout(timeOutInterval);
                }, 1000);
            }
            //usuwanie z tablicy oraz planszy jaj które explodowały 
            if (eggOnGameboard.classList.contains('explosion--big')) {
                clearInterval(egg.eggMoveInterval);
                eggsArray.splice(eggIndex, 1); //usuń jajo z tablicy
                const timeOutInterval = setTimeout(() => {
                    eggOnGameboard.remove();
                    clearTimeout(timeOutInterval);
                }, 1000);
            }
        })
    }
}